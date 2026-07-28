import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

export interface AdminAccount {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Owner" | "Staff";
  createdAt?: string;
  status: "Active" | "Revoked";
}

// In-memory persistent cache fallback for demo/development environment
let mockAdminStore: AdminAccount[] = [
  {
    id: "adm-101",
    name: "Super Administrator",
    email: "superadmin@fashiongalleria.lk",
    role: "Super Admin",
    createdAt: "2026-01-10",
    status: "Active",
  },
  {
    id: "adm-102",
    name: "Atelier Owner",
    email: "owner@fashiongalleria.lk",
    role: "Owner",
    createdAt: "2026-02-01",
    status: "Active",
  },
  {
    id: "adm-103",
    name: "Kasun Jayawardena (Fulfillment)",
    email: "staff@fashiongalleria.lk",
    role: "Staff",
    createdAt: "2026-03-15",
    status: "Active",
  },
];

// Helper RBAC check
function checkSuperAdminPermission(roleHeader: string | null, bodyRole?: string): boolean {
  const role = roleHeader || bodyRole;
  return role === "Super Admin" || role === "Owner";
}

// GET: List all Admins (Super Admin / Owner only)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requesterRole = request.headers.get("x-admin-role") || searchParams.get("requesterRole");

    // RBAC Authorization Guard
    if (!checkSuperAdminPermission(requesterRole)) {
      return NextResponse.json(
        {
          success: false,
          error: "Access Denied: Only Super Admin users are authorized to view admin accounts.",
        },
        { status: 403 }
      );
    }

    // Attempt fetching from Firestore if configured
    if (db) {
      try {
        const querySnapshot = await getDocs(collection(db, "admins"));
        if (!querySnapshot.empty) {
          const firestoreAdmins: AdminAccount[] = querySnapshot.docs.map((docSnap) => {
            const data = docSnap.data();
            return {
              id: docSnap.id,
              name: data.name || "Admin User",
              email: data.email || "",
              role: data.role || "Staff",
              createdAt: data.createdAt ? new Date(data.createdAt.seconds * 1000).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
              status: data.status || "Active",
            };
          });

          // Merge with mock store avoiding duplicates
          const firestoreEmails = new Set(firestoreAdmins.map((a) => a.email.toLowerCase()));
          const combined = [
            ...firestoreAdmins,
            ...mockAdminStore.filter((m) => !firestoreEmails.has(m.email.toLowerCase())),
          ];
          return NextResponse.json({ success: true, admins: combined });
        }
      } catch (dbErr) {
        console.warn("Firestore admins fetch fallback:", dbErr);
      }
    }

    return NextResponse.json({ success: true, admins: mockAdminStore });
  } catch (error) {
    console.error("GET /api/admin/users Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error retrieving admin list." },
      { status: 500 }
    );
  }
}

// POST: Create New Admin Account (Super Admin / Owner only)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, role, requesterRole } = body;
    const headerRole = request.headers.get("x-admin-role");

    // 1. RBAC Check
    if (!checkSuperAdminPermission(headerRole, requesterRole)) {
      return NextResponse.json(
        {
          success: false,
          error: "Access Denied: Only Super Admin users can create or assign new admin accounts.",
        },
        { status: 403 }
      );
    }

    // 2. Field Validation
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: Name, Email, Password, and Role are mandatory." },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address format." },
        { status: 400 }
      );
    }

    if (!["Super Admin", "Owner", "Staff"].includes(role)) {
      return NextResponse.json(
        { success: false, error: "Invalid role specified." },
        { status: 400 }
      );
    }

    // 3. Duplicate Email Check
    const existsInMemory = mockAdminStore.some((a) => a.email.toLowerCase() === trimmedEmail);

    let existsInDb = false;
    if (db) {
      try {
        const q = query(collection(db, "admins"), where("email", "==", trimmedEmail));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          existsInDb = true;
        }
      } catch (err) {
        console.warn("Firestore duplicate check warning:", err);
      }
    }

    if (existsInMemory || existsInDb) {
      return NextResponse.json(
        { success: false, error: `An admin account with email '${trimmedEmail}' already exists.` },
        { status: 400 }
      );
    }

    const newAdminObj: AdminAccount = {
      id: `adm-${Date.now()}`,
      name: name.trim(),
      email: trimmedEmail,
      role: role as "Super Admin" | "Owner" | "Staff",
      createdAt: new Date().toISOString().split("T")[0],
      status: "Active",
    };

    // 4. Save to Firestore if available
    if (db) {
      try {
        const docRef = await addDoc(collection(db, "admins"), {
          name: newAdminObj.name,
          email: newAdminObj.email,
          role: newAdminObj.role,
          status: newAdminObj.status,
          createdAt: serverTimestamp(),
        });
        newAdminObj.id = docRef.id;
      } catch (dbWriteErr) {
        console.warn("Firestore add admin warning:", dbWriteErr);
      }
    }

    // Update in-memory store
    mockAdminStore = [newAdminObj, ...mockAdminStore];

    return NextResponse.json(
      {
        success: true,
        message: `Admin account '${newAdminObj.name}' (${newAdminObj.email}) created successfully as ${newAdminObj.role}.`,
        admin: newAdminObj,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/admin/users Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error creating admin account." },
      { status: 500 }
    );
  }
}

// DELETE: Revoke/Delete Admin Access (Super Admin / Owner only)
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const body = await request.json().catch(() => ({}));
    
    const id = searchParams.get("id") || body.id;
    const email = searchParams.get("email") || body.email;
    const requesterRole = request.headers.get("x-admin-role") || searchParams.get("requesterRole") || body.requesterRole;
    const requesterEmail = request.headers.get("x-admin-email") || searchParams.get("requesterEmail") || body.requesterEmail;

    // 1. RBAC Check
    if (!checkSuperAdminPermission(requesterRole)) {
      return NextResponse.json(
        {
          success: false,
          error: "Access Denied: Only Super Admin users can revoke admin access.",
        },
        { status: 403 }
      );
    }

    if (!id && !email) {
      return NextResponse.json(
        { success: false, error: "Missing Admin ID or Email for revocation." },
        { status: 400 }
      );
    }

    // 2. Self-Revocation Protection Check
    if (requesterEmail && email && requesterEmail.toLowerCase() === email.toLowerCase()) {
      return NextResponse.json(
        {
          success: false,
          error: "Security Restriction: You cannot revoke access for your own currently active Super Admin account.",
        },
        { status: 400 }
      );
    }

    // 3. Delete from Firestore if available
    if (db && id) {
      try {
        await deleteDoc(doc(db, "admins", id));
      } catch (dbDelErr) {
        console.warn("Firestore delete admin warning:", dbDelErr);
      }
    }

    // Remove from in-memory cache store
    mockAdminStore = mockAdminStore.filter(
      (a) => a.id !== id && a.email.toLowerCase() !== (email || "").toLowerCase()
    );

    return NextResponse.json({
      success: true,
      message: "Admin access revoked successfully.",
      revokedId: id,
    });
  } catch (error) {
    console.error("DELETE /api/admin/users Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error revoking admin access." },
      { status: 500 }
    );
  }
}
