// src/components/FlowerCard.tsx
import { Link } from "react-router-dom";
import type { Flower } from "../types/flower";
import { FiChevronRight } from "react-icons/fi";

export default function FlowerCard({ flower }: { flower: Flower }) {
  // Function to get color code for placeholder
  const getColorCode = (): string => {
    const colors = [
      "dc2626", // red
      "ec4899", // pink
      "8b5cf6", // purple
      "3b82f6", // blue
      "10b981", // green
      "f59e0b", // amber
      "f97316", // orange
      "8b5cf6", // violet
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Function to get placeholder image
  const getPlaceholderImage = (flowerName: string): string => {
    const colorCode = getColorCode();
    const text = encodeURIComponent(flowerName.substring(0, 15));
    return `https://placehold.co/400x400/${colorCode}/white?text=${text}&font=montserrat`;
  };

  // Get image URL with fallback
  const getImageUrl = () => {
    if (!flower.thumbnail_url) {
      return getPlaceholderImage(flower.name);
    }
    
    if (flower.thumbnail_url.startsWith('http')) {
      return flower.thumbnail_url;
    }
    
    return `/images/${flower.thumbnail_url}`;
  };

  const imageUrl = getImageUrl();

  return (
    <Link 
      to={`/flowers/${flower.slug}`} 
      className="group relative block overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
    >
      {/* Image Container */}
      <div className="aspect-square overflow-hidden bg-gradient-to-br from-rose-50 to-pink-100">
        <img 
          src={imageUrl}
          alt={flower.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            const target = e.currentTarget;
            target.src = getPlaceholderImage(flower.name);
            target.onerror = null; // Prevent infinite loop
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Text Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white drop-shadow-lg mb-1">{flower.name}</h3>
            <p className="text-sm text-white/90 drop-shadow-md">{flower.significance}</p>
          </div>
          <div className="rounded-full bg-white/20 p-2 backdrop-blur-sm group-hover:bg-white/30 transition-colors">
            <FiChevronRight className="text-white" />
          </div>
        </div>
      </div>
      
      {/* Hover Badge */}
      <div className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-xs font-semibold text-rose-600">Explore</span>
      </div>
    </Link>
  );
}