// src/pages/FlowerDetails.tsx
import { useParams, Link } from "react-router-dom";
import flowerDetails from "../data/flowerDetails.json";
import { useState, useEffect } from "react";
import { FiChevronLeft, FiHeart, FiShare2, FiChevronRight, FiInfo, FiDroplet, FiSun, FiThermometer, FiCalendar, FiMapPin, FiStar } from "react-icons/fi";

// Debug: Log the first flower to see structure
console.log("First flower in flowerDetails:", flowerDetails[0]);

// Base URL for flower images
const FLOWERS_ASSETS_BASE_URL = "https://flowers-assets.s3-ap-southeast-1.amazonaws.com/img/";

export default function FlowerDetails() {
  const { slug } = useParams();
  const flower: any = flowerDetails.find((f: any) => f.slug === slug);
  const variants = flower?.variants || [];
  const [activeVariant, setActiveVariant] = useState(variants[0] || {});
  const [isLoved, setIsLoved] = useState(false);
  const [currentImageSrc, setCurrentImageSrc] = useState("");

  // Debug: Log the found flower
  useEffect(() => {
    if (flower) {
      console.log("Found flower:", {
        name: flower.name,
        hasThumbnail: !!flower.thumbnail_url,
        hasImageUrl: !!flower.image_url,
        hasImage: !!flower.image,
        thumbnail_url: flower.thumbnail_url,
        image_url: flower.image_url,
        image: flower.image,
        variants: flower.variants?.map((v: any) => ({
          colour: v.colour,
          hasThumbnail: !!v.thumbnail_url,
          hasImageUrl: !!v.image_url,
          thumbnail_url: v.thumbnail_url,
          image_url: v.image_url
        }))
      });
    }
  }, [flower]);

  // Function to get color code for placeholder
  const getColorCode = (colorName: string = "pink"): string => {
    const colorMap: Record<string, string> = {
      "red": "ef4444", "white": "ffffff", "yellow": "fbbf24", "blue": "3b82f6",
      "purple": "8b5cf6", "pink": "ec4899", "orange": "f97316", "green": "10b981",
      "violet": "7c3aed", "lavender": "a78bfa", "rose": "f43f5e", "crimson": "dc2626",
      "gold": "f59e0b", "silver": "9ca3af", "bronze": "b45309", "maroon": "991b1b",
      "teal": "0d9488", "cyan": "06b6d4", "magenta": "db2777", "indigo": "4f46e5",
      "peach": "fb923c", "mint": "34d399", "lilac": "c084fc", "coral": "f87171"
    };
    
    const normalizedColor = colorName.toLowerCase().split(' ')[0];
    return colorMap[normalizedColor] || "ec4899";
  };

  // Function to get placeholder image
  const getPlaceholderImage = (flowerName: string, color: string = "pink"): string => {
    const colorCode = getColorCode(color);
    const text = encodeURIComponent(flowerName.substring(0, 20));
    return `https://placehold.co/600x600/${colorCode}/white?text=${text}`;
  };

  // Function to normalize and fix URL
  const normalizeUrl = (url: string): string => {
    if (!url || url.trim() === "") return "";
    
    // Remove any backslashes
    let normalizedUrl = url.replace(/\\/g, '');
    
    // Check if it's already a full URL
    if (normalizedUrl.startsWith('http://') || normalizedUrl.startsWith('https://')) {
      return normalizedUrl;
    }
    
    // Check if it's a data URL
    if (normalizedUrl.startsWith('data:')) {
      return normalizedUrl;
    }
    
    // Check if it's a relative URL starting with /
    if (normalizedUrl.startsWith('/')) {
      return normalizedUrl;
    }
    
    // For flower song URLs, extract the path and prepend with assets base URL
    if (normalizedUrl.includes('flowersong.in/flowers/')) {
      const pathMatch = normalizedUrl.match(/flowersong\.in\/flowers\/(.+)/);
      if (pathMatch && pathMatch[1]) {
        return `${FLOWERS_ASSETS_BASE_URL}${pathMatch[1]}`;
      }
    }
    
    // For other relative paths, prepend with assets base URL
    return `${FLOWERS_ASSETS_BASE_URL}${normalizedUrl}`;
  };

  // Function to get image path - CHECK ALL POSSIBLE PROPERTIES
  const getImagePath = (flower: any, variant: any = null): string => {
    // Try to get image from variant first, then flower
    const imageSource = variant || flower;
    
    // Check all possible image properties in order of priority
    const possibleImageProps = ['thumbnail_url', 'image_url', 'image', 'picture', 'photo', 'url'];
    
    let imageUrl = "";
    for (const prop of possibleImageProps) {
      if (imageSource?.[prop]) {
        imageUrl = imageSource[prop];
        break;
      }
    }
    
    // If no image found, return placeholder
    if (!imageUrl || imageUrl.trim() === "") {
      const color = variant?.colour || flower?.colour || "pink";
      const name = flower?.name || "Flower";
      return getPlaceholderImage(name, color);
    }
    
    // Normalize the URL
    const normalizedUrl = normalizeUrl(imageUrl);
    
    // If normalization returned empty string, use placeholder
    if (!normalizedUrl) {
      const color = variant?.colour || flower?.colour || "pink";
      const name = flower?.name || "Flower";
      return getPlaceholderImage(name, color);
    }
    
    return normalizedUrl;
  };

  // Initialize active variant and image source
  useEffect(() => {
    if (variants.length > 0) {
      const defaultVariant = variants[0];
      setActiveVariant(defaultVariant);
      setCurrentImageSrc(getImagePath(flower, defaultVariant));
    } else if (flower) {
      setCurrentImageSrc(getImagePath(flower));
    }
  }, [flower, variants]);

  if (!flower) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-rose-50/30 to-pink-50/30">
        <div className="text-center max-w-md">
          <div className="relative inline-block mb-4">
            <div className="absolute -inset-4 bg-gradient-to-r from-rose-200 to-pink-200 rounded-full blur-xl opacity-30"></div>
            <div className="relative text-6xl">🌸</div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Flower Not Found</h1>
          <p className="text-gray-600 mb-8">
            The flower you're looking for doesn't exist in our collection.
          </p>
          <Link
            to="/flowers"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-3 font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            <FiChevronLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to Flowers
          </Link>
        </div>
      </div>
    );
  }

  // Handle variant image click
  const handleVariantClick = (variant: any) => {
    setActiveVariant(variant);
    setCurrentImageSrc(getImagePath(flower, variant));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-rose-50/20 to-pink-50/10">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-rose-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-200/20 to-rose-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Back Button with Enhanced Design */}
        <div className="mb-6">
          <Link
            to="/flowers"
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-600 hover:text-rose-600 hover:border-rose-200 hover:bg-white shadow-sm hover:shadow transition-all duration-300"
          >
            <FiChevronLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to Collection
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Flower Header with Enhanced Design */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-rose-100 to-pink-100 rounded-3xl blur-xl opacity-30 -z-10"></div>
              <div className="relative bg-gradient-to-r from-white to-rose-50/30 rounded-2xl p-6 border border-rose-100 shadow-sm">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-4 py-1.5 text-sm font-semibold text-white shadow-sm">
                    {flower.family || "Ornamental"}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                    <FiMapPin className="w-4 h-4" />
                    {flower.place ? flower.place.split(',')[0] : "Various Regions"}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                    <FiStar className="w-4 h-4" />
                    Featured
                  </span>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-rose-900 to-pink-800 bg-clip-text text-transparent">
                  {flower.name}
                </h1>
                <p className="text-xl font-semibold mb-4">
                  <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                    {activeVariant?.colour || flower.colour || "Vibrant"} Variant
                  </span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-lg font-medium text-gray-600">
                    {flower.bot_name || "Beautiful Species"}
                  </span>
                </p>
              </div>
            </div>

            {/* Main Image with Enhanced Frame */}
            <div className="relative group">
              {/* Decorative Corner Elements */}
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-rose-400 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-rose-400 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-rose-400 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-rose-400 rounded-br-lg opacity=0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-50 via-white to-pink-50 border-2 border-rose-100/50 shadow-xl group-hover:shadow-2xl transition-all duration-500">
                {/* Top Gradient Accent */}
                <div className="h-2 bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400"></div>
                
                <div className="aspect-square p-8 md:p-12 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    {/* Floating Petals Decoration */}
                    <div className="absolute top-4 left-4 text-2xl opacity-20">🌸</div>
                    <div className="absolute top-4 right-4 text-2xl opacity-20">🌺</div>
                    <div className="absolute bottom-4 left-4 text-2xl opacity-20">🌼</div>
                    <div className="absolute bottom-4 right-4 text-2xl opacity-20">🌹</div>
                    
                    <img
                      src={currentImageSrc}
                      alt={flower.name}
                      className="h-full w-full object-contain drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        const target = e.currentTarget;
                        const color = activeVariant?.colour || flower.colour || "pink";
                        target.src = getPlaceholderImage(flower.name, color);
                        target.onerror = null;
                      }}
                    />
                  </div>
                </div>
                
                {/* Image Actions with Enhanced Design */}
                <div className="absolute top-6 right-6 flex gap-3">
                  <button
                    onClick={() => setIsLoved(!isLoved)}
                    className={`relative p-3.5 rounded-full backdrop-blur-md border transition-all duration-300 transform hover:scale-110 ${
                      isLoved
                        ? "bg-gradient-to-br from-rose-500 to-pink-600 text-white border-rose-600 shadow-lg shadow-rose-500/30"
                        : "bg-white/90 text-gray-700 border-white/40 hover:bg-white"
                    }`}
                  >
                    <FiHeart className={`w-5 h-5 ${isLoved ? "fill-current animate-pulse" : ""}`} />
                    {isLoved && (
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 animate-ping opacity-30"></div>
                    )}
                  </button>
                  <button className="p-3.5 rounded-full bg-white/90 backdrop-blur-md border border-white/40 text-gray-700 hover:bg-white hover:text-rose-600 transition-all duration-300 transform hover:scale-110">
                    <FiShare2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Description Section with Enhanced Cards */}
            <div className="space-y-6">
              {/* Description Card */}
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-rose-100 to-pink-100 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                <div className="relative bg-gradient-to-br from-white to-rose-50/30 rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-rose-100 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500">
                      <FiInfo className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Description</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                    {activeVariant?.description || flower.description}
                  </p>
                </div>
              </div>

              {/* Symbolic Meaning Card */}
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-rose-100 to-pink-100 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                <div className="relative bg-gradient-to-br from-rose-50/50 to-pink-50/50 rounded-2xl p-6 border border-rose-100 hover:border-pink-200 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-400">
                      <FiStar className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Symbolic Meaning</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {activeVariant?.significance || flower.significance}
                  </p>
                </div>
              </div>

              {/* Cultural Significance Card */}
              {activeVariant?.comment || flower.comment ? (
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-rose-100 to-pink-100 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                  <div className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-rose-100 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-400">
                        <FiCalendar className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Cultural Significance</h3>
                    </div>
                    <blockquote className="relative text-lg italic text-gray-700 border-l-4 border-rose-500 pl-6 py-3">
                      <div className="absolute -top-2 -left-2 text-2xl text-rose-300">"</div>
                      "{activeVariant?.comment || flower.comment}"
                      <div className="absolute -bottom-2 -right-2 text-2xl text-rose-300">"</div>
                    </blockquote>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {/* Sidebar with Enhanced Design */}
          <div className="space-y-8">
            {/* Color Variants Card */}
            {variants.length > 0 ? (
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-rose-100 to-pink-100 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                <div className="relative bg-gradient-to-b from-white to-rose-50/30 rounded-2xl p-6 shadow-lg border border-rose-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Color Variants</h3>
                  <div className="space-y-4">
                    {variants.map((variant: any, index: number) => (
                      <button
                        key={index}
                        onClick={() => handleVariantClick(variant)}
                        className={`group/variant flex items-center gap-4 w-full p-4 rounded-xl transition-all duration-300 ${
                          activeVariant.colour === variant.colour
                            ? "bg-gradient-to-r from-rose-50 to-pink-50 border-2 border-rose-300 shadow-md"
                            : "hover:bg-gradient-to-r hover:from-gray-50 hover:to-rose-50/30 border border-gray-200 hover:border-rose-200"
                        }`}
                      >
                        {/* Color Indicator */}
                        <div className={`relative h-16 w-16 overflow-hidden rounded-xl flex-shrink-0 ${
                          activeVariant.colour === variant.colour 
                            ? "ring-2 ring-rose-500 ring-offset-2" 
                            : ""
                        }`}>
                          <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-pink-200"></div>
                          <img
                            src={getImagePath(flower, variant)}
                            alt={variant.colour}
                            className="relative h-full w-full object-cover transform group-hover/variant:scale-110 transition-transform duration-300"
                            onError={(e) => {
                              const target = e.currentTarget;
                              target.src = getPlaceholderImage(variant.colour || flower.name, variant.colour);
                              target.onerror = null;
                            }}
                          />
                          {activeVariant.colour === variant.colour && (
                            <div className="absolute inset-0 bg-gradient-to-t from-rose-500/20 to-transparent"></div>
                          )}
                        </div>
                        
                        {/* Variant Info */}
                        <div className="text-left flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <div className={`h-3 w-3 rounded-full ${
                              activeVariant.colour === variant.colour 
                                ? "bg-gradient-to-r from-rose-500 to-pink-500" 
                                : "bg-gray-300"
                            }`}></div>
                            <div className="font-semibold text-gray-900 truncate">{variant.colour}</div>
                          </div>
                          <div className="text-sm text-gray-500 line-clamp-2 mt-1">
                            {variant.description?.substring(0, 60)}...
                          </div>
                        </div>
                        
                        {/* Chevron */}
                        <FiChevronRight className={`text-lg ${
                          activeVariant.colour === variant.colour 
                            ? "text-rose-500 transform translate-x-1" 
                            : "text-gray-400 group-hover/variant:text-rose-400"
                        } transition-all duration-300`} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            {/* Quick Facts Card with Enhanced Gradient */}
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600"></div>
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent"></div>
              
              <div className="relative p-6 text-white">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-white/20">
                    <FiInfo className="w-4 h-4" />
                  </div>
                  Quick Facts
                </h3>
                <div className="space-y-3">
                  {[
                    { icon: FiDroplet, label: "Family", value: flower.family || "Unknown" },
                    { icon: FiSun, label: "Climate", value: flower.climate || "Various" },
                    { icon: FiThermometer, label: "Size", value: flower.size || "Medium" },
                    { icon: FiCalendar, label: "Type", value: flower.type || "Flower" },
                    { icon: FiMapPin, label: "Origin", value: flower.place ? flower.place.split(',')[0] : "Global" },
                  ].map((fact, index) => (
                    <div 
                      key={index}
                      className="flex justify-between items-center py-3 border-b border-white/20 last:border-b-0 group/fact"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg bg-white/10 group-hover/fact:bg-white/20 transition-colors">
                          <fact.icon className="w-4 h-4" />
                        </div>
                        <span className="text-white/90">{fact.label}</span>
                      </div>
                      <span className="font-semibold text-white">{fact.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Info Card */}
            {flower.bot_name && (
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-rose-100 to-pink-100 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                <div className="relative bg-gradient-to-b from-white to-gray-50 rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-rose-100 transition-all duration-300">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Botanical Information</h3>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-gray-50 to-rose-50/30 rounded-xl p-4">
                      <div className="text-sm text-gray-500 mb-1">Scientific Name</div>
                      <div className="font-mono font-bold text-gray-900 text-lg">{flower.bot_name}</div>
                    </div>
                    {flower.other_names && (
                      <div className="bg-gradient-to-r from-rose-50/30 to-pink-50/30 rounded-xl p-4">
                        <div className="text-sm text-gray-500 mb-1">Also Known As</div>
                        <div className="font-medium text-gray-900">{flower.other_names}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons with Enhanced Design */}
            <div className="space-y-4">
              <button className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 py-4 font-bold text-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center gap-2">
                  Add to Collection
                  <FiStar className="w-5 h-5 transform group-hover:rotate-12 transition-transform" />
                </span>
              </button>
              <button className="group w-full rounded-2xl border-2 border-rose-300 bg-gradient-to-r from-white to-rose-50 py-4 font-bold text-rose-600 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                <div className="relative flex items-center justify-center gap-2">
                  <FiShare2 className="w-5 h-5 transform group-hover:rotate-12 transition-transform" />
                  Share This Flower
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}