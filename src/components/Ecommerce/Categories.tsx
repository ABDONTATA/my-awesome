import { BookOpen, Shirt, Tv2, ChevronRight, Sparkles, Plus, ArrowRight, Trash2, Edit3, Check, X, BarChart2, Download, Eye, EyeOff, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ICONS = {
  Tv2,
  BookOpen,
  Shirt,
};

const ICON_OPTIONS = [
  { label: "Electronics", icon: Tv2 },
  { label: "Books", icon: BookOpen },
  { label: "Clothing", icon: Shirt },
];

export const Categories = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Electronics",
      icon: Tv2,
      color: "bg-gray-800",
      textColor: "text-yellow-500",
      count: 142,
      trend: "↑12%",
      description: "High-end gadgets and tech accessories",
      tasks: ["Update stock", "Check warranties"],
      image: "https://via.placeholder.com/50",
      active: true,
      editing: false,
    },
    {
      id: 2,
      name: "Books",
      icon: BookOpen,
      color: "bg-gray-800",
      textColor: "text-yellow-500",
      count: 89,
      trend: "↑3%",
      description: "Latest novels and educational materials",
      tasks: ["Restock bestsellers", "Organize shelves"],
      image: "https://via.placeholder.com/50",
      active: true,
      editing: false,
    },
    {
      id: 3,
      name: "Clothing",
      icon: Shirt,
      color: "bg-gray-800",
      textColor: "text-yellow-500",
      count: 210,
      trend: "↓5%",
      description: "Trendy apparel and luxury outfits",
      tasks: ["Launch new collection", "Discount old stock"],
      image: "https://via.placeholder.com/50",
      active: true,
      editing: false,
    },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [newCategory, setNewCategory] = useState<{
    id: number;
    name: string;
    color: string;
    textColor: string;
    icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>>;
    description: string;
    tasks: string[];
    image: string;
    active: boolean;
    count?: number;
    trend?: string;
  }>({
    id: 0,
    name: "",
    color: "bg-gray-800",
    textColor: "text-yellow-500",
    icon: Shirt,
    description: "",
    tasks: [],
    image: "",
    active: true,
  });
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<"name" | "count">("name");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
  const [filterTrend, setFilterTrend] = useState<"all" | "up" | "down">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  useEffect(() => {
    console.log("Categories state updated:", categories);
  }, [categories]);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const reorderedCategories = Array.from(categories);
    const [movedCategory] = reorderedCategories.splice(result.source.index, 1);
    reorderedCategories.splice(result.destination.index, 0, movedCategory);
    setCategories(reorderedCategories);
  };

  const validateCategory = () => {
    if (!newCategory.name.trim()) {
      alert("Category name is required.");
      return false;
    }
    return true;
  };

  const addCategory = () => {
    if (!validateCategory()) return;
    setLoading(true);
    setTimeout(() => {
      setCategories([...categories, { id: Date.now(), ...newCategory, count: 0, trend: "→0%", editing: false }]);
      setNewCategory({
        id: 0,
        name: "",
        color: "bg-gray-800",
        textColor: "text-yellow-500",
        icon: Shirt,
        description: "",
        tasks: [],
        image: "",
        active: true,
      });
      setLoading(false);
    }, 500);
  };

  const updateCategory = (id: number) => {
    if (!validateCategory()) return;
    setLoading(true);
    setTimeout(() => {
      setCategories(categories.map(cat => cat.id === id ? { ...newCategory, id, count: newCategory.count || cat.count, trend: newCategory.trend || cat.trend, editing: false } : cat));
      setEditingId(null);
      setLoading(false);
    }, 500);
  };

  const handleDeleteCategory = (id: number) => {
    console.log("Deleting category with id:", id);
    setCategories(categories.filter(c => c.id !== id));
    setSelectedCategories(selectedCategories.filter(catId => catId !== id));
  };

  const toggleEdit = (id: number) => {
    const category = categories.find(cat => cat.id === id);
    if (category && id !== 0) {
      setEditingId(id);
      setNewCategory({ ...category, id });
    } else if (id === 0) {
      setEditingId(0);
    } else {
      console.log("Category not found for editing:", id);
    }
  };

  const addTask = (id: number, task: string) => {
    setCategories(categories.map(cat => cat.id === id ? { ...cat, tasks: [...cat.tasks, task] } : cat));
  };

  const toggleStatus = (id: number, active: boolean) => {
    setCategories(categories.map(cat => cat.id === id ? { ...cat, active } : cat));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setImage: (image: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleBulkDelete = () => {
    console.log("Bulk deleting categories:", selectedCategories);
    setCategories(categories.filter(cat => !selectedCategories.includes(cat.id)));
    setSelectedCategories([]);
  };

  const handleBulkStatusChange = (active: boolean) => {
    setCategories(categories.map(cat => selectedCategories.includes(cat.id) ? { ...cat, active } : cat));
    setSelectedCategories([]);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(categories, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "categories.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const totalItems = categories.reduce((sum, cat) => sum + cat.count, 0);
  const avgTrend = (
    categories.reduce((sum, cat) => sum + parseFloat(cat.trend.match(/[+-]?\d+(\.\d+)?/)?.[0] || "0"), 0) /
    categories.length
  ).toFixed(1) + "%";

  const filteredCategories = categories
    .filter(cat => filterStatus === "all" || (filterStatus === "active" ? cat.active : !cat.active))
    .filter(cat => filterTrend === "all" || (filterTrend === "up" ? cat.trend.includes("↑") : cat.trend.includes("↓")))
    .filter(cat => cat.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => sortBy === "name" ? a.name.localeCompare(b.name) : b.count - a.count);

  return (
    <div className="bg-black border border-gray-800 rounded-2xl p-6 max-w-5xl mx-auto shadow-lg">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="bg-gradient-to-r from-yellow-500 to-yellow-400 bg-clip-text text-transparent">Categories</span>
        </h2>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search categories..."
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "name" | "count")}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="name">Name</option>
            <option value="count">Count</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as "all" | "active" | "inactive")}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <select
            value={filterTrend}
            onChange={(e) => setFilterTrend(e.target.value as "all" | "up" | "down")}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="all">All Trends</option>
            <option value="up">Up</option>
            <option value="down">Down</option>
          </select>
          <button
            onClick={() => toggleEdit(0)}
            className="flex items-center gap-2 px-3 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition"
          >
            <Plus className="w-5 h-5" /> Add
          </button>
          <button
            onClick={handleExport}
            className="p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {selectedCategories.length > 0 && (
        <div className="bg-gray-900 p-3 rounded-lg mb-6 border border-gray-800 flex items-center gap-3">
          <p className="text-white">{selectedCategories.length} selected</p>
          <button onClick={handleBulkDelete} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
          <button onClick={() => handleBulkStatusChange(true)} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">Activate</button>
          <button onClick={() => handleBulkStatusChange(false)} className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-500">Deactivate</button>
        </div>
      )}

      <div className="bg-gray-900 p-4 rounded-lg mb-6 border border-gray-800">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-gray-400">Total Items</p>
            <p className="text-xl font-bold text-yellow-500">{totalItems}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400">Avg. Trend</p>
            <p className="text-xl font-bold text-yellow-500">{avgTrend}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400">Categories</p>
            <p className="text-xl font-bold text-yellow-500">{categories.length}</p>
          </div>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="categories">
          {(provided) => (
            <ul className="space-y-4" {...provided.droppableProps} ref={provided.innerRef}>
              {filteredCategories.map((category, index) => {
                const Icon = category.icon;
                const isEditing = editingId === category.id;
                return (
                  <Draggable key={category.id} draggableId={category.id.toString()} index={index}>
                    {(provided) => (
                      <motion.li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`p-4 rounded-xl ${category.color} border border-gray-800 ${!category.active ? "opacity-50" : ""}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex flex-col">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                checked={selectedCategories.includes(category.id)}
                                onChange={(e) => {
                                  if (e.target.checked) setSelectedCategories([...selectedCategories, category.id]);
                                  else setSelectedCategories(selectedCategories.filter(id => id !== category.id));
                                }}
                                className="w-4 h-4 text-yellow-500 border-gray-700 bg-gray-800 rounded"
                              />
                              {category.image && (
                                <img src={category.image} alt={category.name} className="w-10 h-10 object-cover rounded" onClick={() => setZoomedImage(category.image)} />
                              )}
                              {isEditing ? (
                                <div className="space-y-2 flex-1">
                                  <input
                                    value={newCategory.name}
                                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                    placeholder="Name"
                                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
                                  />
                                  <input
                                    type="number"
                                    value={newCategory.count || 0}
                                    onChange={(e) => setNewCategory({ ...newCategory, count: parseInt(e.target.value) || 0 })}
                                    placeholder="Count"
                                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
                                  />
                                  <input
                                    value={newCategory.trend || ""}
                                    onChange={(e) => setNewCategory({ ...newCategory, trend: e.target.value })}
                                    placeholder="Trend"
                                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
                                  />
                                  <textarea
                                    value={newCategory.description}
                                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                                    placeholder="Description"
                                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded h-12"
                                  />
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, (image) => setNewCategory({ ...newCategory, image }))}
                                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
                                  />
                                  {newCategory.image && (
                                    <div className="flex items-center gap-2">
                                      <img src={newCategory.image} alt="Preview" className="w-12 h-12 object-cover rounded" />
                                      <button onClick={() => setNewCategory({ ...newCategory, image: "" })} className="text-red-500"><Trash2 className="w-5 h-5" /></button>
                                    </div>
                                  )}
                                  <div className="flex items-center gap-2">
                                    <label className="text-gray-400">Active:</label>
                                    <input
                                      type="checkbox"
                                      checked={newCategory.active}
                                      onChange={(e) => setNewCategory({ ...newCategory, active: e.target.checked })}
                                      className="w-5 h-5 text-yellow-500 border-gray-700 bg-gray-800 rounded"
                                    />
                                  </div>
                                  <div className="flex gap-2 mt-2">
                                    <button onClick={() => updateCategory(category.id)} disabled={loading} className="px-3 py-1 bg-green-500 text-black rounded hover:bg-green-600">
                                      {loading ? "Saving..." : <Check className="w-5 h-5" />}
                                    </button>
                                    <button onClick={() => setEditingId(null)} className="px-3 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600">Cancel</button>
                                  </div>
                                </div>
                              ) : (
                                <div>
                                  <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                                  <p className="text-xs text-gray-400">{category.count} items • {category.trend}</p>
                                  <p className="text-xs text-gray-500 line-clamp-1">{category.description}</p>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <button onClick={() => toggleStatus(category.id, !category.active)} className={`${category.active ? "text-gray-400 hover:text-red-500" : "text-gray-400 hover:text-green-500"}`}>
                                {category.active ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                              </button>
                              <button onClick={() => toggleEdit(category.id)} className="text-gray-400 hover:text-yellow-500"><Edit3 className="w-5 h-5" /></button>
                              <button onClick={() => handleDeleteCategory(category.id)} className="text-red-500 hover:text-red-400"><Trash2 className="w-5 h-5" /></button>
                            </div>
                          </div>
                          <div className="mt-3 pl-14">
                            <div className="flex items-center gap-2 mb-2">
                              <BarChart2 className="w-4 h-4 text-gray-400" />
                              <span className="text-xs text-gray-400">{(category.count / (totalItems || 1) * 100).toFixed(1)}%</span>
                              <div className="w-full bg-gray-700 rounded-full h-1.5">
                                <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: `${(category.count / (totalItems || 1) * 100)}%` }}></div>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-white">Tasks</h4>
                              <ul className="space-y-1 mt-1">
                                {category.tasks.map((task, idx) => (
                                  <li key={idx} className="text-xs text-gray-300">{task}</li>
                                ))}
                                {isEditing && (
                                  <li>
                                    <input
                                      type="text"
                                      placeholder="Add task..."
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter" && (e.target as HTMLInputElement).value.trim()) {
                                          addTask(category.id, (e.target as HTMLInputElement).value.trim());
                                          (e.target as HTMLInputElement).value = "";
                                        }
                                      }}
                                      className="w-full px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    />
                                  </li>
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      {editingId === 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-900 border border-gray-800 rounded-xl p-4 mt-4">
          <div className="space-y-3">
            <input
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              placeholder="Category name"
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            />
            <textarea
              value={newCategory.description}
              onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              placeholder="Description"
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded h-12"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, (image) => setNewCategory({ ...newCategory, image }))}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            />
            {newCategory.image && (
              <div className="flex items-center gap-2">
                <img src={newCategory.image} alt="Preview" className="w-12 h-12 object-cover rounded" />
                <button onClick={() => setNewCategory({ ...newCategory, image: "" })} className="text-red-500"><Trash2 className="w-5 h-5" /></button>
              </div>
            )}
            <div className="flex gap-2">
              {ICON_OPTIONS.map(({ label, icon: IconComp }) => (
                <button
                  key={label}
                  onClick={() => setNewCategory({ ...newCategory, icon: IconComp })}
                  className={`p-2 rounded border-2 ${newCategory.icon === IconComp ? "border-yellow-500" : "border-transparent hover:border-gray-700"}`}
                >
                  <IconComp className={`w-5 h-5 ${newCategory.icon === IconComp ? "text-yellow-500" : "text-gray-400"}`} />
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <label className="text-gray-400">Active:</label>
              <input
                type="checkbox"
                checked={newCategory.active}
                onChange={(e) => setNewCategory({ ...newCategory, active: e.target.checked })}
                className="w-5 h-5 text-yellow-500 border-gray-700 bg-gray-800 rounded"
              />
            </div>
            <div className="flex gap-2">
              <button onClick={addCategory} disabled={loading} className="px-3 py-1 bg-green-500 text-black rounded hover:bg-green-600">
                {loading ? "Adding..." : <Check className="w-5 h-5" />}
              </button>
              <button onClick={() => setEditingId(null)} className="px-3 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600">Cancel</button>
            </div>
          </div>
        </motion.div>
      )}

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
              <button onClick={() => setZoomedImage(null)} className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-700">
                <X className="w-5 h-5 text-gray-300" />
              </button>
              <img src={zoomedImage} alt="Zoomed" className="w-full h-auto rounded-lg" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 text-center">
        <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-black bg-yellow-500 rounded-full hover:bg-yellow-600 transition">
          <Sparkles className="w-5 h-5" /> Discover More
        </button>
      </div>
    </div>
  );
};