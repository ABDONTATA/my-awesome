import React, { useState, useEffect } from "react";
import { Laptop, BookOpen, ArrowRight, Zap, Plus, Shirt, Smartphone, Star, X, Trash2, Edit3, Check, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const icons = { 
  Laptop: { component: Laptop, label: "Laptop" }, 
  BookOpen: { component: BookOpen, label: "Book" }, 
  Shirt: { component: Shirt, label: "Apparel" }, 
  Smartphone: { component: Smartphone, label: "Phone" } 
};

const colorOptions = {
  "bg-black": "Black",
  "bg-yellow-500": "Gold",
  "bg-gray-700": "Dark Gray",
  "bg-white": "White"
};

const categories = ["Electronics", "Clothing", "Books", "Phones"];

export const Products = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "MacBook Pro", icon: "Laptop", color: "bg-black", price: "$1999", tag: "Bestseller", description: "Powerful laptop", rating: 4.8, image: "https://via.placeholder.com/50", category: "Electronics" },
    { id: 2, name: "Nike Air Max", icon: "Shirt", color: "bg-yellow-500", price: "$129", tag: "New", description: "Running shoes", rating: 4.5, image: "https://via.placeholder.com/50", category: "Clothing" },
    { id: 3, name: "React for Dummies", icon: "BookOpen", color: "bg-gray-700", price: "$29", tag: "Sale", description: "React guide", rating: 4.0, image: "https://via.placeholder.com/50", category: "Books" },
    { id: 4, name: "iPhone 15", icon: "Smartphone", color: "bg-white", price: "$999", tag: "Popular", description: "Latest smartphone", rating: 4.7, image: "https://via.placeholder.com/50", category: "Phones" },
  ]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newProduct, setNewProduct] = useState({ id: 0, name: "", price: "", tag: "", description: "", color: "bg-black", icon: "Laptop", image: "", category: "Electronics" });
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  useEffect(() => {
    console.log("Products updated:", products);
  }, [products]);

  const validateProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      alert("Name and price are required.");
      return false;
    }
    return true;
  };

  const addProduct = () => {
    if (!validateProduct()) return;
    setLoading(true);
    setTimeout(() => {
      setProducts([...products, { id: Date.now(), ...newProduct, rating: 4.0 }]);
      setNewProduct({ id: 0, name: "", price: "", tag: "", description: "", color: "bg-black", icon: "Laptop", image: "", category: "Electronics" });
      setLoading(false);
    }, 500);
  };

  const updateProduct = (id: number) => {
    if (!validateProduct()) return;
    setLoading(true);
    setTimeout(() => {
      setProducts(products.map(p => p.id === id ? { ...newProduct, id, rating: p.rating } : p));
      setEditingId(null);
      setLoading(false);
    }, 500);
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
    setSelectedProducts(selectedProducts.filter(pid => pid !== id));
  };

  const handleBulkDelete = () => {
    setProducts(products.filter(p => !selectedProducts.includes(p.id)));
    setSelectedProducts([]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setImage: (image: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    return [...Array(5)].map((_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < fullStars ? "text-yellow-500 fill-current" : "text-gray-400"}`} />
    ));
  };

  const filteredProducts = products
    .filter(p => filter === "All" || p.tag === filter)
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => sortBy === "price" ? parseFloat(b.price.replace("$", "")) - parseFloat(a.price.replace("$", "")) : a.name.localeCompare(b.name));

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 bg-black text-white">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-6xl mx-auto shadow-lg">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-500 animate-pulse" />
            <h2 className="text-2xl font-bold">LUXE Collection <span className="text-gray-400">({products.length})</span></h2>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="All">All</option>
              <option value="Bestseller">Bestsellers</option>
              <option value="New">New</option>
              <option value="Sale">Sale</option>
              <option value="Popular">Popular</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
            </select>
            <button
              onClick={() => { setEditingId(0); setNewProduct({ ...newProduct, id: 0 }); }}
              className="flex items-center gap-2 px-3 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition"
            >
              <Plus className="w-5 h-5" /> Add
            </button>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-8 text-gray-400">No products found.</div>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => {
              const Icon = icons[product.icon]?.component || Laptop;
              const isDark = product.color === "bg-black" || product.color === "bg-gray-700";
              const isEditing = editingId === product.id;

              return (
                <motion.li
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl border ${isDark ? "border-gray-800" : "border-gray-600"} ${product.color} ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-start mb-3">
                      <div className={`p-2 rounded-lg ${isDark ? "bg-gray-800" : "bg-white"}`}>
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-6 h-6 object-cover rounded"
                            onClick={() => setZoomedImage(product.image)}
                          />
                        ) : (
                          <Icon className={`w-6 h-6 ${isDark ? "text-yellow-500" : "text-gray-700"}`} />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={(e) => {
                            if (e.target.checked) setSelectedProducts([...selectedProducts, product.id]);
                            else setSelectedProducts(selectedProducts.filter(id => id !== product.id));
                          }}
                          className="w-4 h-4 text-yellow-500 border-gray-700 bg-gray-800 rounded"
                        />
                        {product.tag && (
                          <span className={`text-xs px-2 py-1 rounded-full ${product.tag === "Bestseller" ? "bg-yellow-500 text-black" : "bg-gray-700 text-white"}`}>
                            {product.tag}
                          </span>
                        )}
                      </div>
                    </div>
                    {isEditing ? (
                      <div className="space-y-2">
                        <input
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                          placeholder="Name"
                          className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
                        />
                        <input
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                          placeholder="Price"
                          className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
                        />
                        <select
                          value={newProduct.category}
                          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                          className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
                        >
                          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, (image) => setNewProduct({ ...newProduct, image }))}
                          className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
                        />
                        <textarea
                          value={newProduct.description}
                          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                          placeholder="Description"
                          className="w-full p-2 bg-gray-800 border border-gray-700 rounded h-16"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateProduct(product.id)}
                            disabled={loading}
                            className="flex-1 px-3 py-1 bg-green-500 text-black rounded hover:bg-green-600 disabled:opacity-50"
                          >
                            {loading ? "Saving..." : <Check className="w-5 h-5" />}
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="px-3 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{product.name}</h3>
                        <p className="text-sm text-gray-400 line-clamp-2">{product.description}</p>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex space-x-1">{renderStars(product.rating)}</div>
                          <p className={`text-lg font-bold ${isDark ? "text-yellow-500" : "text-gray-900"}`}>{product.price}</p>
                        </div>
                      </div>
                    )}
                    {!isEditing && (
                      <div className="flex justify-end gap-2 mt-2">
                        <button
                          onClick={() => { setEditingId(product.id); setNewProduct({ ...product }); }}
                          className="text-gray-400 hover:text-yellow-500"
                        >
                          <Edit3 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="text-red-500 hover:text-red-400"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>
                </motion.li>
              );
            })}
          </ul>
        )}

        {}
        {editingId === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 border border-gray-800 rounded-xl p-4 mt-4"
          >
            <div className="space-y-2">
              <input
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                placeholder="Name"
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
              />
              <input
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                placeholder="Price"
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
              />
              <select
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, (image) => setNewProduct({ ...newProduct, image }))}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
              />
              <textarea
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                placeholder="Description"
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded h-16"
              />
              <div className="flex gap-2">
                <button
                  onClick={addProduct}
                  disabled={loading}
                  className="flex-1 px-3 py-1 bg-green-500 text-black rounded hover:bg-green-600 disabled:opacity-50"
                >
                  {loading ? "Adding..." : <Check className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="px-3 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Image Zoom Modal */}
        <AnimatePresence>
          {zoomedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
              onClick={() => setZoomedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="bg-gray-900 rounded-xl p-4 w-full max-w-md shadow-lg relative"
                onClick={e => e.stopPropagation()}
              >
                <button
                  onClick={() => setZoomedImage(null)}
                  className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-700"
                >
                  <X className="w-5 h-5 text-gray-300" />
                </button>
                <img src={zoomedImage} alt="Zoomed" className="w-full h-auto rounded-lg" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};