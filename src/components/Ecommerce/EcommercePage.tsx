import { useState } from "react";

export const EcommercePage = () => {
  const [activeTab, setActiveTab] = useState<"categories" | "products">("categories");

  return (
    <div className="p-6">
      <div className="flex border-b border-gray-200">
        <button
          className={`px-4 py-2 text-sm font-medium transition ${
            activeTab === "categories"
              ? "text-violet-700 border-b-2 border-violet-700"
              : "text-gray-500 hover:text-violet-700"
          }`}
          onClick={() => setActiveTab("categories")}
        >
          Categories
        </button>
        <button
          className={`ml-4 px-4 py-2 text-sm font-medium transition ${
            activeTab === "products"
              ? "text-violet-700 border-b-2 border-violet-700"
              : "text-gray-500 hover:text-violet-700"
          }`}
          onClick={() => setActiveTab("products")}
        >
          Products
        </button>
      </div>

      <div className="mt-6">
        {activeTab === "categories" ? (
          <div>
            <h2 className="text-lg font-semibold mb-2">Product Categories</h2>
            <ul className="list-disc pl-5">
              <li>Electronics</li>
              <li>Clothing</li>
              <li>Books</li>
            </ul>
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-semibold mb-2">Available Products</h2>
            <ul className="list-disc pl-5">
              <li>iPhone 14</li>
              <li>Running Shoes</li>
              <li>Data Science Book</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
