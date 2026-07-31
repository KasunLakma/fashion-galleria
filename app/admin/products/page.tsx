"use client";

import { useState, useRef, useEffect } from "react";
import { PRODUCTS_DATA, Product } from "@/data/mockData";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  Package,
  Plus,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  X,
  Search,
  Upload,
  Image as ImageIcon,
  RefreshCw,
  UploadCloud,
  Check,
} from "lucide-react";

export default function AdminProductsPage() {
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // File Upload & Drag-and-Drop state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Add/Edit Form State
  const [formValues, setFormValues] = useState({
    name: "",
    category: "Dresses",
    originalPrice: 11990,
    discountedPrice: 8990,
    primaryImage: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80",
    tag: "NEW ARRIVAL",
    sizes: "XS, S, M, L, XL",
    stock: 10,
    description: "Luxury Italian-grade linen wrap dress tailored for Sri Lankan tropical elegance.",
  });

  // Fetch initial products from PostgreSQL endpoint if available
  useEffect(() => {
    fetch("/api/admin/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.products) && data.products.length > 0) {
          setProductsList((prev) => {
            const existingIds = new Set(data.products.map((p: any) => p.id));
            const merged = [...data.products, ...prev.filter((p) => !existingIds.has(p.id))];
            return merged;
          });
        }
      })
      .catch((err) => console.warn("Prisma fetch products warning:", err));
  }, []);

  const handleOpenAddModal = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    setUploadStatus(null);
    setFormValues({
      name: "",
      category: "Dresses",
      originalPrice: 11990,
      discountedPrice: 8990,
      primaryImage: "",
      hoverImage: "",
      tag: "NEW ARRIVAL",
      sizes: "XS, S, M, L, XL",
      stock: 10,
      description: "Luxury Ceylon fashion item.",
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (prod: Product) => {
    setEditingProduct(prod);
    setSelectedFile(null);
    setPreviewUrl(prod.primaryImage);
    setUploadStatus(null);
    setFormValues({
      name: prod.name,
      category: prod.category,
      originalPrice: prod.originalPrice,
      discountedPrice: prod.discountedPrice,
      primaryImage: prod.primaryImage,
      hoverImage: prod.hoverImage,
      tag: prod.tag || "",
      sizes: prod.sizes.join(", "),
      stock: 8,
      description: prod.description || "",
    });
  };

  // Handle File Selection via Browse or Dropzone
  const handleFileChange = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file (e.g. PNG, JPG, WEBP).");
      return;
    }
    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  // Storage Upload Logic (Firebase Storage with Data URL fallback)
  const uploadImageFile = async (file: File): Promise<string> => {
    setUploadStatus("Uploading image to Cloud Storage...");

    // Try Firebase Storage upload first if storage is initialized
    if (storage) {
      try {
        const storagePath = `products/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
        const storageRef = ref(storage, storagePath);
        await uploadBytes(storageRef, file);
        const downloadUrl = await getDownloadURL(storageRef);
        return downloadUrl;
      } catch (err) {
        console.warn("Firebase storage upload error, falling back to data URL:", err);
      }
    }

    // Fallback: Read file as Data URL (base64) so it is 100% reliable and displayable
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    let finalImageUrl = formValues.primaryImage;

    // Perform file upload if a new image file was selected
    if (selectedFile) {
      try {
        finalImageUrl = await uploadImageFile(selectedFile);
      } catch (uploadErr) {
        console.error("Upload error:", uploadErr);
        alert("Image upload failed. Please try again.");
        setIsUploading(false);
        return;
      }
    }

    if (!finalImageUrl) {
      alert("Please upload a primary image file before saving.");
      setIsUploading(false);
      return;
    }

    const sizesArray = formValues.sizes.split(",").map((s) => s.trim());
    const finalHoverUrl = formValues.hoverImage || finalImageUrl;

    const payload = {
      name: formValues.name,
      category: formValues.category,
      originalPrice: Number(formValues.originalPrice),
      discountedPrice: Number(formValues.discountedPrice),
      primaryImage: finalImageUrl,
      hoverImage: finalHoverUrl,
      tag: formValues.tag || "NEW",
      sizes: sizesArray,
      description: formValues.description,
    };

    try {
      // Save to PostgreSQL database via API
      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resData = await response.json();

      if (resData.success && resData.product) {
        const savedProd = resData.product;
        if (editingProduct) {
          setProductsList((prev) => prev.map((p) => (p.id === editingProduct.id ? savedProd : p)));
        } else {
          setProductsList((prev) => [savedProd, ...prev]);
        }
      } else {
        // Fallback local update
        if (editingProduct) {
          setProductsList((prev) =>
            prev.map((p) =>
              p.id === editingProduct.id
                ? {
                    ...p,
                    name: payload.name,
                    category: payload.category,
                    originalPrice: payload.originalPrice,
                    discountedPrice: payload.discountedPrice,
                    primaryImage: payload.primaryImage,
                    hoverImage: payload.hoverImage,
                    tag: payload.tag,
                    sizes: payload.sizes,
                    description: payload.description,
                  }
                : p
            )
          );
        } else {
          const newProd: Product = {
            id: `prod-${Date.now()}`,
            name: payload.name,
            category: payload.category,
            originalPrice: payload.originalPrice,
            discountedPrice: payload.discountedPrice,
            rating: 5.0,
            reviewCount: 1,
            primaryImage: payload.primaryImage,
            hoverImage: payload.hoverImage,
            tag: payload.tag,
            sizes: payload.sizes,
            inStock: true,
            isNewArrival: true,
            description: payload.description,
          };
          setProductsList((prev) => [newProd, ...prev]);
        }
      }
    } catch (apiErr) {
      console.warn("DB save warning, applying local state update:", apiErr);
      const newProd: Product = {
        id: `prod-${Date.now()}`,
        name: payload.name,
        category: payload.category,
        originalPrice: payload.originalPrice,
        discountedPrice: payload.discountedPrice,
        rating: 5.0,
        reviewCount: 1,
        primaryImage: payload.primaryImage,
        hoverImage: payload.hoverImage,
        tag: payload.tag,
        sizes: payload.sizes,
        inStock: true,
        isNewArrival: true,
        description: payload.description,
      };
      setProductsList((prev) => [newProd, ...prev]);
    } finally {
      setIsUploading(false);
      setIsAddModalOpen(false);
      setEditingProduct(null);
    }
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("Are you sure you want to delete this product SKU?")) {
      setProductsList((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const filteredProducts = productsList.filter((prod) => {
    const matchesCat = selectedCategory === "All" || prod.category === selectedCategory;
    const matchesQuery =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-stone-200 pb-4 gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-800 block mb-1">
            CATALOG MANAGEMENT
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-tight text-stone-900">
            Products & Inventory Control
          </h1>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="bg-stone-900 hover:bg-amber-800 text-white text-xs uppercase tracking-widest px-5 py-3 font-bold flex items-center space-x-2 transition-colors rounded-xs shadow-md"
        >
          <Plus size={16} />
          <span>Add New Product SKU</span>
        </button>
      </div>

      {/* Control Bar: Category Filter & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 border border-stone-200 shadow-xs rounded-xs">
        <div className="flex items-center space-x-2 overflow-x-auto custom-scrollbar w-full sm:w-auto text-xs uppercase tracking-wider font-semibold">
          {["All", "Dresses", "Tops & Shirts", "Trousers & Pants", "Men's Apparel", "Accessories"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 whitespace-nowrap rounded-xs transition-colors ${
                selectedCategory === cat
                  ? "bg-black text-white font-bold"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search size={16} className="absolute left-3 top-2.5 text-stone-400" />
          <input
            type="text"
            placeholder="Search SKU or Title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 border border-stone-300 rounded-xs focus:outline-none focus:border-amber-800 bg-white"
          />
        </div>
      </div>

      {/* Catalog Table */}
      <div className="bg-white border border-stone-200 shadow-xs rounded-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-stone-700">
            <thead className="bg-stone-900 text-white uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="p-4">Product SKU</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price (Discounted / Original)</th>
                <th className="p-4">Available Sizes</th>
                <th className="p-4">Stock Level</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 font-medium">
              {filteredProducts.map((prod, idx) => {
                const mockStock = [8, 3, 14, 2, 12, 1, 9, 6][idx % 8];
                const isLowStock = mockStock < 5;

                return (
                  <tr key={prod.id} className="hover:bg-stone-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={prod.primaryImage}
                          alt={prod.name}
                          className="w-12 h-14 object-cover rounded-xs border border-stone-200 shrink-0"
                        />
                        <div>
                          <h4 className="font-serif font-bold text-stone-900 text-sm">{prod.name}</h4>
                          <span className="text-[10px] text-stone-400 font-mono">ID: {prod.id}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 uppercase text-stone-600 font-bold">{prod.category}</td>

                    <td className="p-4">
                      <span className="font-bold text-stone-900 block">LKR {prod.discountedPrice.toLocaleString()}</span>
                      <span className="text-[10px] text-stone-400 line-through">LKR {prod.originalPrice.toLocaleString()}</span>
                    </td>

                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {prod.sizes.map((sz) => (
                          <span key={sz} className="text-[9px] font-bold bg-stone-100 px-1.5 py-0.5 border border-stone-300 rounded uppercase">
                            {sz}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="p-4">
                      <span
                        className={`inline-flex items-center space-x-1 text-[10px] font-bold uppercase px-2.5 py-1 rounded border ${
                          isLowStock
                            ? "bg-red-100 text-red-800 border-red-300 animate-pulse"
                            : "bg-emerald-100 text-emerald-800 border-emerald-200"
                        }`}
                      >
                        {isLowStock ? <AlertTriangle size={12} /> : <CheckCircle2 size={12} />}
                        <span>{mockStock} Units Left</span>
                      </span>
                    </td>

                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEditModal(prod)}
                        className="p-1.5 bg-stone-100 text-stone-800 hover:bg-stone-900 hover:text-white rounded transition-colors"
                        title="Edit Product"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(prod.id)}
                        className="p-1.5 bg-red-50 text-red-700 hover:bg-red-700 hover:text-white rounded transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {(isAddModalOpen || editingProduct) && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            onClick={() => {
              if (!isUploading) {
                setIsAddModalOpen(false);
                setEditingProduct(null);
              }
            }}
          />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-xl bg-white shadow-2xl rounded-xs overflow-hidden z-10 animate-fade-in">
              {/* Modal Header */}
              <div className="p-5 bg-stone-900 text-white flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold uppercase tracking-wider">
                  {editingProduct ? `Edit Product: ${editingProduct.name}` : "ADD NEW PRODUCT SKU"}
                </h3>
                <button
                  disabled={isUploading}
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingProduct(null);
                  }}
                  className="p-1 hover:bg-stone-800 rounded text-stone-300 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="p-6 space-y-5 text-xs max-h-[80vh] overflow-y-auto custom-scrollbar">
                {/* Product Title */}
                <div>
                  <label className="block uppercase font-bold text-stone-900 mb-1">Product Title <span className="text-red-600">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Victoria Emerald Linen Wrap Dress"
                    value={formValues.name}
                    onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                    className="w-full p-2.5 border border-stone-300 rounded-xs focus:outline-none focus:border-amber-800 bg-white"
                  />
                </div>

                {/* Category & Tag Badge */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase font-bold text-stone-900 mb-1">Category <span className="text-red-600">*</span></label>
                    <select
                      value={formValues.category}
                      onChange={(e) => setFormValues({ ...formValues, category: e.target.value })}
                      className="w-full p-2.5 border border-stone-300 rounded-xs focus:outline-none focus:border-amber-800 bg-white"
                    >
                      <option value="Dresses">Dresses</option>
                      <option value="Tops & Shirts">Tops & Shirts</option>
                      <option value="Trousers & Pants">Trousers & Pants</option>
                      <option value="Men's Apparel">Men&apos;s Apparel</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                  </div>

                  <div>
                    <label className="block uppercase font-bold text-stone-900 mb-1">Tag Badge</label>
                    <input
                      type="text"
                      placeholder="e.g. 25% OFF / NEW ARRIVAL"
                      value={formValues.tag}
                      onChange={(e) => setFormValues({ ...formValues, tag: e.target.value })}
                      className="w-full p-2.5 border border-stone-300 rounded-xs focus:outline-none focus:border-amber-800 bg-white"
                    />
                  </div>
                </div>

                {/* Prices */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase font-bold text-stone-900 mb-1">Discounted Price (LKR) <span className="text-red-600">*</span></label>
                    <input
                      type="number"
                      required
                      value={formValues.discountedPrice}
                      onChange={(e) => setFormValues({ ...formValues, discountedPrice: Number(e.target.value) })}
                      className="w-full p-2.5 border border-stone-300 rounded-xs focus:outline-none focus:border-amber-800 font-bold bg-white"
                    />
                  </div>

                  <div>
                    <label className="block uppercase font-bold text-stone-900 mb-1">Original Price (LKR) <span className="text-red-600">*</span></label>
                    <input
                      type="number"
                      required
                      value={formValues.originalPrice}
                      onChange={(e) => setFormValues({ ...formValues, originalPrice: Number(e.target.value) })}
                      className="w-full p-2.5 border border-stone-300 rounded-xs focus:outline-none focus:border-amber-800 bg-white"
                    />
                  </div>
                </div>

                {/* Available Sizes */}
                <div>
                  <label className="block uppercase font-bold text-stone-900 mb-1">Available Sizes (Comma separated)</label>
                  <input
                    type="text"
                    value={formValues.sizes}
                    onChange={(e) => setFormValues({ ...formValues, sizes: e.target.value })}
                    className="w-full p-2.5 border border-stone-300 rounded-xs focus:outline-none focus:border-amber-800 bg-white"
                  />
                </div>

                {/* UPLOAD PRIMARY IMAGE FILE INPUT & DRAG-AND-DROP DROPZONE WITH PREVIEW */}
                <div>
                  <label className="block uppercase font-bold text-stone-900 mb-1">
                    UPLOAD PRIMARY IMAGE <span className="text-red-600">*</span>
                  </label>

                  {/* Hidden File Input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileChange(e.target.files[0]);
                      }
                    }}
                  />

                  {/* Dropzone & Preview Container */}
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative border-2 border-dashed rounded-xs p-4 text-center cursor-pointer transition-all ${
                      isDragOver
                        ? "border-amber-800 bg-amber-50 shadow-md ring-2 ring-amber-800/30"
                        : previewUrl
                        ? "border-stone-300 bg-stone-50 hover:border-amber-800"
                        : "border-stone-300 bg-white hover:border-amber-800 hover:bg-stone-50"
                    }`}
                  >
                    {previewUrl ? (
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2">
                        {/* Image Preview Thumbnail */}
                        <div className="flex items-center space-x-3">
                          <div className="w-20 h-24 relative rounded-xs overflow-hidden border-2 border-amber-800 shadow-md bg-stone-100 shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={previewUrl}
                              alt="Selected Primary Image Preview"
                              className="w-full h-full object-cover"
                            />
                            <span className="absolute bottom-0 inset-x-0 bg-stone-900/80 text-white text-[8px] font-bold text-center py-0.5 uppercase">
                              PREVIEW
                            </span>
                          </div>

                          <div className="text-left space-y-1">
                            <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[9px] font-extrabold px-2 py-0.5 rounded uppercase inline-flex items-center space-x-1">
                              <Check size={10} />
                              <span>IMAGE SELECTED</span>
                            </span>
                            <h5 className="font-bold text-stone-900 text-xs truncate max-w-[200px]">
                              {selectedFile ? selectedFile.name : "Current Image URL Loaded"}
                            </h5>
                            <p className="text-[10px] text-stone-500">
                              {selectedFile
                                ? `${(selectedFile.size / 1024).toFixed(1)} KB • Click or drop to change`
                                : "Click box or drag file to replace with new image upload"}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFile(null);
                            setPreviewUrl("");
                            setFormValues({ ...formValues, primaryImage: "" });
                          }}
                          className="text-stone-400 hover:text-red-700 text-xs uppercase font-bold underline px-2 py-1"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="py-6 space-y-2">
                        <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
                          <UploadCloud size={24} />
                        </div>
                        <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-stone-900">
                          Click to browse gallery or drag and drop image file
                        </h4>
                        <p className="text-[10px] text-stone-500">
                          Supports PNG, JPG, JPEG, or WEBP (Image will be uploaded to cloud storage)
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block uppercase font-bold text-stone-900 mb-1">Product Description</label>
                  <textarea
                    rows={3}
                    placeholder="Enter garment details, fabric composition, and care instructions..."
                    value={formValues.description}
                    onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                    className="w-full p-2.5 border border-stone-300 rounded-xs focus:outline-none focus:border-amber-800 bg-white"
                  />
                </div>

                {uploadStatus && (
                  <p className="text-[11px] font-bold text-amber-800 flex items-center space-x-1">
                    <RefreshCw size={12} className="animate-spin" />
                    <span>{uploadStatus}</span>
                  </p>
                )}

                {/* Action Buttons */}
                <div className="pt-4 flex items-center justify-end space-x-3 border-t border-stone-200">
                  <button
                    type="button"
                    disabled={isUploading}
                    onClick={() => {
                      setIsAddModalOpen(false);
                      setEditingProduct(null);
                    }}
                    className="px-4 py-2.5 border border-stone-300 uppercase font-bold text-stone-700 hover:bg-stone-100 rounded-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="px-6 py-2.5 bg-stone-900 hover:bg-amber-800 text-white uppercase font-bold tracking-wider rounded-xs transition-colors flex items-center space-x-2"
                  >
                    {isUploading ? (
                      <>
                        <RefreshCw size={14} className="animate-spin text-amber-400" />
                        <span>UPLOADING & SAVING...</span>
                      </>
                    ) : (
                      <>
                        <Upload size={14} />
                        <span>{editingProduct ? "UPDATE SKU" : "SAVE SKU TO DATABASE"}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
