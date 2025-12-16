// src/pages/FlowerDetails.tsx
import { useParams, Link } from "react-router-dom";
import flowerDetails from "../data/flowerDetails.json";
import { useState, useEffect } from "react";
import { FiChevronLeft, FiHeart, FiShare2, FiChevronRight } from "react-icons/fi";

// Debug: Log the first flower to see structure
console.log("First flower in flowerDetails:", flowerDetails[0]);

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
      "red": "dc2626", "white": "ffffff", "yellow": "fbbf24", "blue": "3b82f6",
      "purple": "8b5cf6", "pink": "ec4899", "orange": "f97316", "green": "10b981",
      "violet": "7c3aed", "lavender": "a78bfa", "rose": "f43f5e", "crimson": "b91c1c",
      "gold": "f59e0b", "silver": "9ca3af", "bronze": "b45309", "maroon": "991b1b",
      "teal": "0d9488", "cyan": "06b6d4", "magenta": "db2777", "indigo": "4f46e5"
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

  // Function to get image path - CHECK ALL POSSIBLE PROPERTIES
  const getImagePath = (flower: any, variant: any = null): string => {
    // Try to get image from variant first, then flower
    const imageSource = variant || flower;
    
    // Check all possible image properties in order of priority
    const possibleImageProps = ['thumbnail_url', 'image_url', 'image', 'picture', 'photo'];
    
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
    
    // If it's already a full URL, use it as-is
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    
    // Check if it's a data URL
    if (imageUrl.startsWith('data:')) {
      return imageUrl;
    }
    
    // Otherwise, prepend with /images/ for local images
    return `/images/${imageUrl}`;
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
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🌸</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Flower Not Found</h1>
          <p className="text-gray-600 mb-8">
            The flower you're looking for doesn't exist in our collection.
          </p>
          <Link
            to="/flowers"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-3 font-semibold text-white hover:shadow-lg transition-shadow"
          >
            <FiChevronLeft />
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
    <div className="min-h-screen bg-gradient-to-b from-white to-rose-50/30">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/flowers"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-rose-600 group"
          >
            <FiChevronLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to Collection
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Flower Header */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-3 py-1 text-sm font-semibold text-white">
                  {flower.family || "Ornamental"}
                </span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-600">{flower.place ? flower.place.split(',')[0] : "Various Regions"}</span>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{flower.name}</h1>
              <p className="text-xl text-rose-600 font-semibold mb-4">
                {activeVariant?.colour || flower.colour || "Vibrant"} Variant
              </p>
            </div>

            {/* Main Image */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-50 to-pink-100 border border-rose-100">
              <div className="aspect-square p-8 md:p-12 flex items-center justify-center">
                <img
                  src={currentImageSrc}
                  alt={flower.name}
                  className="h-full w-full object-contain drop-shadow-2xl"
                  onError={(e) => {
                    const target = e.currentTarget;
                    const color = activeVariant?.colour || flower.colour || "pink";
                    target.src = getPlaceholderImage(flower.name, color);
                    target.onerror = null;
                  }}
                />
              </div>
              
              {/* Image Actions */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => setIsLoved(!isLoved)}
                  className={`p-3 rounded-full backdrop-blur-sm transition-all ${
                    isLoved
                      ? "bg-rose-500 text-white"
                      : "bg-white/80 text-gray-700 hover:bg-white"
                  }`}
                >
                  <FiHeart className={isLoved ? "fill-current" : ""} />
                </button>
                <button className="p-3 rounded-full bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white transition-colors">
                  <FiShare2 />
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {activeVariant?.description || flower.description}
                </p>
              </div>

              {/* Symbolic Meaning */}
              <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Symbolic Meaning</h3>
                <p className="text-gray-700 leading-relaxed">
                  {activeVariant?.significance || flower.significance}
                </p>
              </div>

              {/* Cultural Significance */}
              {activeVariant?.comment || flower.comment ? (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Cultural Significance</h3>
                  <blockquote className="text-lg italic text-gray-700 border-l-4 border-rose-500 pl-4 py-2">
                    "{activeVariant?.comment || flower.comment}"
                  </blockquote>
                </div>
              ) : null}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Color Variants */}
            {variants.length > 0 ? (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Color Variants</h3>
                <div className="space-y-3">
                  {variants.map((variant: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => handleVariantClick(variant)}
                      className={`flex items-center gap-4 w-full p-3 rounded-xl transition-all ${
                        activeVariant.colour === variant.colour
                          ? "bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200"
                          : "hover:bg-gray-50 border border-transparent"
                      }`}
                    >
                      <div className="h-16 w-16 overflow-hidden rounded-lg flex-shrink-0 bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center">
                        <img
                          src={getImagePath(flower, variant)}
                          alt={variant.colour}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.src = getPlaceholderImage(variant.colour || flower.name, variant.colour);
                            target.onerror = null;
                          }}
                        />
                      </div>
                      <div className="text-left flex-1">
                        <div className="font-medium text-gray-900">{variant.colour}</div>
                        <div className="text-sm text-gray-500 line-clamp-2">
                          {variant.description?.substring(0, 60)}...
                        </div>
                      </div>
                      <FiChevronRight className={`text-gray-400 ${
                        activeVariant.colour === variant.colour ? "text-rose-500" : ""
                      }`} />
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Quick Facts */}
            <div className="bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Quick Facts</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-white/20">
                  <span className="text-white/90">Family</span>
                  <span className="font-semibold">{flower.family || "Unknown"}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/20">
                  <span className="text-white/90">Climate</span>
                  <span className="font-semibold">{flower.climate || "Various"}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/20">
                  <span className="text-white/90">Size</span>
                  <span className="font-semibold">{flower.size || "Medium"}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-white/90">Type</span>
                  <span className="font-semibold">{flower.type || "Flower"}</span>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            {flower.bot_name && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Botanical Info</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Scientific Name:</span>
                    <span className="font-medium text-gray-900">{flower.bot_name}</span>
                  </div>
                  {flower.other_names && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Also Known As:</span>
                      <span className="font-medium text-gray-900">{flower.other_names}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-3">
              <button className="w-full rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 py-3 font-semibold text-white shadow-lg hover:shadow-xl transition-shadow">
                Add to Collection
              </button>
              <button className="w-full rounded-xl border-2 border-rose-300 bg-white py-3 font-semibold text-rose-600 hover:bg-rose-50 transition-colors">
                Share This Flower
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}