// src/pages/Flowers.tsx
import flowers from "../data/flowers.json";
import FlowerCard from "../components/FlowerCard";
import { FiFilter, FiGrid, FiList, FiSearch, FiAward, FiHeart, FiStar } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Flowers() {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const filteredFlowers = flowers.filter(flower =>
    flower.name.toLowerCase().includes(search.toLowerCase()) ||
    flower.significance.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-rose-50/20 flex flex-col">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex-grow">
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
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 shadow-sm">
            <p className="text-blue-800 flex items-center gap-2">
              <span className="text-lg">🌼</span>
              Found <span className="font-bold text-blue-900">{filteredFlowers.length}</span> flowers matching "<span className="font-bold text-blue-900">{search}</span>"
            </p>
          </div>
        )}

        {/* Flower Grid */}
        {filteredFlowers.length > 0 ? (
          <div className={`gap-6 ${viewMode === "grid" ? "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "space-y-4"}`}>
            {filteredFlowers.map((flower) => (
              <div 
                key={flower.slug} 
                className={`
                  ${viewMode === "list" 
                    ? "bg-gradient-to-r from-white to-rose-50 rounded-2xl shadow-lg border border-rose-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1" 
                    : "relative group"
                  }
                `}
              >
                {/* Grid View Container */}
                {viewMode === "grid" && (
                  <div className="relative">
                    {/* Decorative corner elements */}
                    <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-rose-300 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-rose-300 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-rose-300 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-rose-300 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Card with enhanced design */}
                    <div className="bg-gradient-to-br from-white to-rose-50 rounded-2xl shadow-lg overflow-hidden border border-rose-100 group-hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                      {/* Top accent bar */}
                      <div className="h-2 bg-gradient-to-r from-rose-400 to-pink-400"></div>
                      
                      {/* Card content */}
                      <div className="p-5">
                        <FlowerCard flower={flower} />
                      </div>
                      
                      {/* Bottom decorative element */}
                      <div className="px-5 pb-4">
                        <div className="flex items-center justify-center">
                          <div className="flex space-x-1">
                            {[1, 2, 3].map((i) => (
                              <div 
                                key={i}
                                className="w-2 h-2 rounded-full bg-gradient-to-r from-rose-300 to-pink-300 opacity-70"
                                style={{ animationDelay: `${i * 100}ms` }}
                              ></div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* List View */}
                {viewMode === "list" && (
                  <>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="absolute -inset-2 bg-gradient-to-r from-rose-200 to-pink-200 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                          <div className="relative bg-white rounded-xl p-2 border border-rose-100">
                            <FlowerCard flower={flower} />
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{flower.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="px-3 py-1 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 rounded-full text-xs font-medium">
                              {flower.season}
                            </span>
                            <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full text-xs font-medium">
                              {flower.color}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{flower.significance}</p>
                        <div className="mt-4 pt-4 border-t border-rose-50">
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                              Origin: {flower.origin}
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-pink-400"></span>
                              Blooms: {flower.bloomingSeason}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* List view decorative elements */}
                    <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                      <div className="text-3xl">🌸</div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex p-6 rounded-3xl bg-gradient-to-r from-rose-50 to-pink-50 mb-6 shadow-lg border border-rose-100">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-rose-200 to-pink-200 rounded-full blur-xl opacity-30"></div>
                <FiSearch className="relative text-3xl text-rose-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No flowers found</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-8">Try a different search term or browse all flowers in our collection.</p>
            <button
              onClick={() => setSearch("")}
              className="px-8 py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-xl hover:from-rose-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Clear Search & Show All Flowers
            </button>
          </div>
        )}
      </div>
      
      {/* Footer Section */}
      <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Column 1: Logo and Description */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <FiAward className="text-rose-400 text-2xl" />
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400">
                  Flower Song
                </h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                A spiritual journey through the divine language of flowers. Exploring the
                symbolic significance of blossoms in consciousness and their connection
                to higher realms of existence.
              </p>
              <div className="mt-6 flex gap-4">
                <div className="bg-gradient-to-r from-rose-500/20 to-pink-500/20 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                  <FiHeart className="text-rose-400 text-xl" />
                </div>
                <div className="bg-gradient-to-r from-rose-500/20 to-pink-500/20 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                  <FiStar className="text-pink-400 text-xl" />
                </div>
                <div className="bg-gradient-to-r from-rose-500/20 to-pink-500/20 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                  <FiAward className="text-rose-400 text-xl" />
                </div>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                Explore
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/"
                    className="text-gray-400 hover:text-rose-300 transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1.5 h-1.5 bg-rose-400/50 rounded-full group-hover:bg-rose-400 transition-colors"></div>
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/flowers"
                    className="text-gray-400 hover:text-rose-300 transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1.5 h-1.5 bg-rose-400/50 rounded-full group-hover:bg-rose-400 transition-colors"></div>
                    <span>Flower Library</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/message-of-flowers"
                    className="text-gray-400 hover:text-rose-300 transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1.5 h-1.5 bg-rose-400/50 rounded-full group-hover:bg-rose-400 transition-colors"></div>
                    <span>Symbolic Meanings</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="text-gray-400 hover:text-rose-300 transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1.5 h-1.5 bg-rose-400/50 rounded-full group-hover:bg-rose-400 transition-colors"></div>
                    <span>Spiritual Insights</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Resources */}
            <div>
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                Resources
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/about"
                    className="text-gray-400 hover:text-pink-300 transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1.5 h-1.5 bg-pink-400/50 rounded-full group-hover:bg-pink-400 transition-colors"></div>
                    <span>About Us</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-gray-400 hover:text-pink-300 transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1.5 h-1.5 bg-pink-400/50 rounded-full group-hover:bg-pink-400 transition-colors"></div>
                    <span>Contact</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy"
                    className="text-gray-400 hover:text-pink-300 transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1.5 h-1.5 bg-pink-400/50 rounded-full group-hover:bg-pink-400 transition-colors"></div>
                    <span>Privacy Policy</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="text-gray-400 hover:text-pink-300 transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1.5 h-1.5 bg-pink-400/50 rounded-full group-hover:bg-pink-400 transition-colors"></div>
                    <span>Terms of Service</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Spiritual Ecosystem */}
            <div>
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                Spiritual Ecosystem
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://incarnateword.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-rose-300 transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1.5 h-1.5 bg-rose-400/50 rounded-full group-hover:bg-rose-400 transition-colors"></div>
                    <span>IncarnateWord</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://vmlt.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-pink-300 transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1.5 h-1.5 bg-pink-400/50 rounded-full group-hover:bg-pink-400 transition-colors"></div>
                    <span>VMLT Institute</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://auroverse.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-rose-300 transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1.5 h-1.5 bg-rose-400/50 rounded-full group-hover:bg-rose-400 transition-colors"></div>
                    <span>Auroverse</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://savitri.in/1/1/1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-pink-300 transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1.5 h-1.5 bg-pink-400/50 rounded-full group-hover:bg-pink-400 transition-colors"></div>
                    <span>Savitri</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Flower Song. All rights reserved.
                <span className="mx-2">•</span>
                <span className="text-rose-400/70">Flower Song</span>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
                  <span>Spiritual Growth</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                  <span>Divine Connection</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}