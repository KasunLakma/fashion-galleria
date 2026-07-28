"use client";

import { useState } from "react";
import { PRODUCTS_DATA, Product } from "@/data/mockData";
import {
  Package,
  Plus,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  X,
  Search,
  Tag,
  DollarSign,
  Layers,
} from "lucide-react";

export default function AdminProductsPage() {
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Add/Edit Form State
  const [formValues, setFormValues] = useState({
    name: "",
    category: "Dresses",
    originalPrice: 10000,
    discountedPrice: 8500,
    primaryImage: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80",
    tag: "NEW ARRIVAL",
    sizes: "XS, S, M, L, XL",
    stock: 10,
    description: "Luxury Italian-grade linen wrap dress tailored for Sri Lankan tropical elegance.",
  });

  const handleOpenAddModal = () => {
    setFormValues({
      name: "",
      category: "Dresses",
      originalPrice: 11990,
      discountedPrice: 8990,
      primaryImage: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
      hoverImage: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80",
      tag: "NEW ARRIVAL",
      sizes: "XS, S, M, L, XL",
      stock: 10,
      description: "Luxury Ceylon fashion item.",
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (prod: Product) => {
    setEditingProduct(prod);
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

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const sizesArray = formValues.sizes.split(",").map((s) => s.trim());

    if (editingProduct) {
      // Update existing
      setProductsList((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: formValues.name,
                category: formValues.category,
                originalPrice: Number(formValues.originalPrice),
                discountedPrice: Number(formValues.discountedPrice),
                primaryImage: formValues.primaryImage,
                hoverImage: formValues.hoverImage,
                tag: formValues.tag,
                sizes: sizesArray,
                description: formValues.description,
              }
            : p
        )
      );
      setEditingProduct(null);
    } else {
      // Add new product
      const newProd: Product = {
        id: `prod-${Date.now()}`,
        name: formValues.name,
        category: formValues.category,
        originalPrice: Number(formValues.originalPrice),
        discountedPrice: Number(formValues.discountedPrice),
        rating: 5.0,
        reviewCount: 1,
        primaryImage: formValues.primaryImage,
        hoverImage: formValues.hoverImage,
        tag: formValues.tag || "NEW",
        sizes: sizesArray,
        inStock: true,
        isNewArrival: true,
        description: formValues.description,
      };
      setProductsList((prev) => [newProd, ...prev]);
      setIsAddModalOpen(false);
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
          <div className="fixed inset-0 bg-black/70 backdrop-blur-xs" onClick={() => { setIsAddModalOpen(false); setEditingProduct(null); }} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-xl bg-white shadow-2xl rounded-xs overflow-hidden z-10 animate-fade-in">
              <div className="p-5 bg-stone-900 text-white flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold uppercase tracking-wider">
                  {editingProduct ? `Edit Product: ${editingProduct.name}` : "Add New Product SKU"}
                </h3>
                <button onClick={() => { setIsAddModalOpen(false); setEditingProduct(null); }} className="p-1 hover:bg-stone-800 rounded">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="p-6 space-y-4 text-xs max-h-[80vh] overflow-y-auto custom-scrollbar">
                <div>
                  <label className="block uppercase font-bold text-stone-900 mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={formValues.name}
                    onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                    className="w-full p-2.5 border border-stone-300 rounded-xs focus:outline-none focus:border-amber-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase font-bold text-stone-900 mb-1">Category</label>
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
                      className="w-full p-2.5 border border-stone-300 rounded-xs focus:outline-none focus:border-amber-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase font-bold text-stone-900 mb-1">Discounted Price (LKR)</label>
                    <input
                      type="number"
                      required
                      value={formValues.discountedPrice}
                      onChange={(e) => setFormValues({ ...formValues, discountedPrice: Number(e.target.value) })}
                      className="w-full p-2.5 border border-stone-300 rounded-xs focus:outline-none focus:border-amber-800 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block uppercase font-bold text-stone-900 mb-1">Original Price (LKR)</label>
                    <input
                      type="number"
                      required
                      value={formValues.originalPrice}
                      onChange={(e) => setFormValues({ ...formValues, originalPrice: Number(e.target.value) })}
                      className="w-full p-2.5 border border-stone-300 rounded-xs focus:outline-none focus:border-amber-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block uppercase font-bold text-stone-900 mb-1">Available Sizes (Comma separated)</label>
                  <input
                    type="text"
                    value={formValues.sizes}
                    onChange={(e) => setFormValues({ ...formValues, sizes: e.target.value })}
                    className="w-full p-2.5 border border-stone-300 rounded-xs focus:outline-none focus:border-amber-800"
                  />
                </div>

                <div>
                  <label className="block uppercase font-bold text-stone-900 mb-1">Primary Image URL</label>
                  <input
                    type="text"
                    required
                    value={formValues.primaryImage}
                    onChange={(e) => setFormValues({ ...formValues, primaryImage: e.target.value })}
                    className="w-full p-2.5 border border-stone-300 rounded-xs focus:outline-none focus:border-amber-800"
                  />
                </div>

                <div>
                  <label className="block uppercase font-bold text-stone-900 mb-1">Product Description</label>
                  <textarea
                    rows={3}
                    value={formValues.description}
                    onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                    className="w-full p-2.5 border border-stone-300 rounded-xs focus:outline-none focus:border-amber-800"
                  />
                </div>

                <div className="pt-4 flex justify-end space-x-2 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => { setIsAddModalOpen(false); setEditingProduct(null); }}
                    className="px-4 py-2.5 border border-stone-300 uppercase font-bold text-stone-700 hover:bg-stone-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-black text-white uppercase font-bold hover:bg-amber-800 transition-colors"
                  >
                    Save SKU
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
