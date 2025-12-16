// src/pages/Flowers.tsx
import flowers from "../data/flowers.json";
import FlowerCard from "../components/FlowerCard";
import { FiFilter, FiGrid, FiList, FiSearch } from "react-icons/fi";
import { useState } from "react";

export default function Flowers() {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const filteredFlowers = flowers.filter(flower =>
    flower.name.toLowerCase().includes(search.toLowerCase()) ||
    flower.significance.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-rose-50/20">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Flower Collection</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive collection of flowers, each with detailed symbolism, 
            historical context, and cultural significance.
          </p>
        </div>

        {/* Search and Controls */}
        <div className="mb-8">
          {/* Search Bar */}
          <div className="relative mb-6 max-w-2xl mx-auto">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search flowers by name or meaning..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold text-rose-600">{filteredFlowers.length}</span> of{" "}
              <span className="font-semibold">{flowers.length}</span> flowers
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid" 
                    ? "bg-rose-500 text-white" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <FiGrid className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list" 
                    ? "bg-rose-500 text-white" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <FiList className="w-5 h-5" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                <FiFilter />
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Results Message */}
        {search && (
          <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-blue-700">
              Found <span className="font-semibold">{filteredFlowers.length}</span> flowers matching "<span className="font-semibold">{search}</span>"
            </p>
          </div>
        )}

        {/* Flower Grid */}
        {filteredFlowers.length > 0 ? (
          <div className={`gap-6 ${viewMode === "grid" ? "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "space-y-4"}`}>
            {filteredFlowers.map((flower) => (
              <div key={flower.slug} className={viewMode === "list" ? "bg-white rounded-xl shadow-sm border border-gray-100 p-4" : ""}>
                <FlowerCard flower={flower} />
                {viewMode === "list" && (
                  <div className="mt-4">
                    <p className="text-gray-600 text-sm">{flower.significance}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex p-4 rounded-2xl bg-rose-50 mb-4">
              <FiSearch className="text-2xl text-rose-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No flowers found</h3>
            <p className="text-gray-600">Try a different search term or browse all flowers.</p>
            <button
              onClick={() => setSearch("")}
              className="mt-4 px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}