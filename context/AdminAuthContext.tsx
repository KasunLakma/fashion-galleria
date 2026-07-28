"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type AdminRole = "Super Admin" | "Owner" | "Staff";

export interface AdminUser {
  email: string;
  name: string;
  role: AdminRole;
}

interface AdminAuthContextType {
  adminUser: AdminUser | null;
  role: AdminRole | null;
  isAuthenticated: boolean;
  login: (email: string, roleChoice: AdminRole, customName?: string) => boolean;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("fg_admin_auth_v1");
      if (saved) {
        setAdminUser(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const login = (email: string, roleChoice: AdminRole, customName?: string) => {
    let defaultName = "Fulfillment Staff";
    if (roleChoice === "Super Admin") defaultName = "Super Administrator";
    else if (roleChoice === "Owner") defaultName = "Atelier Owner";

    const user: AdminUser = {
      email,
      name: customName || defaultName,
      role: roleChoice,
    };
    setAdminUser(user);
    try {
      localStorage.setItem("fg_admin_auth_v1", JSON.stringify(user));
    } catch {
      // ignore
    }
    return true;
  };

  const logout = () => {
    setAdminUser(null);
    try {
      localStorage.removeItem("fg_admin_auth_v1");
    } catch {
      // ignore
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        role: adminUser ? adminUser.role : null,
        isAuthenticated: !!adminUser,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};
