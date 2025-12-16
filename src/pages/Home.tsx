// src/pages/Home.tsx
import flowers from "../data/flowers.json";
import type { Flower } from "../types/flower";
import FlowerCard from "../components/FlowerCard";
import { FiArrowRight, FiHeart, FiStar, FiAward } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
  const featuredFlowers = flowers.slice(0, 6);
  const [heroFlowers, setHeroFlowers] = useState<Flower[]>([]);
  const [flowerPositions, setFlowerPositions] = useState<Array<{
    top: string;
    left: string;
    size: string;
    rotation: number;
    zIndex: number;
  }>>([]);

  // Function to get color code for placeholder (same as FlowerCard)
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

  // Function to get placeholder image (same as FlowerCard)
  const getPlaceholderImage = (flowerName: string): string => {
    const colorCode = getColorCode();
    const text = encodeURIComponent(flowerName.substring(0, 15));
    return `https://placehold.co/400x400/${colorCode}/white?text=${text}&font=montserrat`;
  };

  // Get image URL with fallback (same as FlowerCard)
  const getImageUrl = (flower: Flower) => {
    if (!flower.thumbnail_url) {
      return getPlaceholderImage(flower.name);
    }
    
    if (flower.thumbnail_url.startsWith('http')) {
      return flower.thumbnail_url;
    }
    
    return `/images/${flower.thumbnail_url}`;
  };

  // Initialize random flowers and positions
  useEffect(() => {
    // Get 25 random flowers for more coverage
    const shuffled = [...flowers].sort(() => 0.5 - Math.random()).slice(0, 25);
    setHeroFlowers(shuffled);
    
    // Generate random positions for each flower
    const positions = shuffled.map(() => {
      // Random positions avoiding the text area in top-left
      let top, left;
      do {
        top = Math.random() * 85 + 5; // 5% to 90%
        left = Math.random() * 85 + 5; // 5% to 90%
      } while (top < 35 && left < 50); // Increased avoidance area for top-left corner
      
      const size = Math.random() * 50 + 25; // 25px to 75px base size
      const rotation = Math.random() * 20 - 10; // -10 to +10 degrees
      const zIndex = Math.floor(Math.random() * 5); // Lower z-index so text stays on top
      
      return {
        top: `${top}%`,
        left: `${left}%`,
        size: `${size}px`,
        rotation,
        zIndex,
      };
    });
    
    setFlowerPositions(positions);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with text at top-left */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-pink-50 py-12 md:py-16 min-h-[90vh]">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ec4899'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>
        
        {/* Randomly scattered flower images - Behind content */}
        <div className="absolute inset-0">
          {heroFlowers.map((flower, index) => {
            const position = flowerPositions[index];
            if (!position) return null;
            
            const size = position.size;
            const isLarge = parseFloat(size) > 55;
            const isMedium = parseFloat(size) > 40;
            
            return (
              <div
                key={`${flower.slug}-${index}`}
                className="absolute overflow-hidden rounded-lg transition-all duration-500 hover:scale-110 hover:z-30"
                style={{
                  top: position.top,
                  left: position.left,
                  width: `calc(${position.size} * 2)`,
                  height: `calc(${position.size} * 2)`,
                  transform: `rotate(${position.rotation}deg)`,
                  zIndex: position.zIndex,
                  boxShadow: isLarge 
                    ? '0 25px 50px -12px rgba(0, 0, 0, 0.15)' 
                    : isMedium 
                    ? '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    : '0 10px 15px -3px rgba(0, 0, 0, 0.07)',
                  filter: isLarge ? 'brightness(1.05)' : 'brightness(1)',
                }}
              >
                <div className="relative w-full h-full">
                  <img 
                    src={getImageUrl(flower)}
                    alt={flower.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.src = getPlaceholderImage(flower.name);
                      target.onerror = null;
                    }}
                  />
                  <div className={`absolute inset-0 ${
                    isLarge 
                      ? 'bg-gradient-to-tr from-black/20 via-transparent to-transparent' 
                      : isMedium
                      ? 'bg-gradient-to-t from-black/15 to-transparent'
                      : 'bg-gradient-to-t from-black/10 to-transparent'
                  }`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Decorative elements behind flowers */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-pink-200 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-rose-200 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-200 rounded-full opacity-5 blur-3xl"></div>

        {/* Text content positioned top-left - Above flowers */}
        <div className="relative h-full">
          {/* Reduced padding to push content more to top-left */}
          <div className="absolute top-4 left-4 md:top-8 md:left-8 lg:top-12 lg:left-12 max-w-md z-40">
            {/* Semi-transparent background for text - Slightly smaller */}
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-2xl -z-10"></div>
            <div className="relative p-5 md:p-6">
              <span className="inline-block rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-3 py-1 text-xs font-semibold text-white mb-3">
                Discover Floral Secrets
              </span>
              
              <h1 className="mb-3 text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
                The Hidden Language of
                <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">
                  Flowers Revealed
                </span>
              </h1>
              
              <p className="mb-5 text-sm md:text-base text-gray-700 leading-relaxed">
                Explore the rich symbolism and secret messages behind nature's most beautiful creations. 
                Each flower tells a story waiting to be discovered.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Link
                  to="/flowers"
                  className="inline-flex items-center justify-center gap-1 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl hover:from-rose-600 hover:to-pink-600"
                >
                  Browse Collection
                  <FiArrowRight className="text-sm" />
                </Link>
                <Link
                  to="/message-of-flowers"
                  className="inline-flex items-center justify-center gap-1 rounded-full border-2 border-rose-200 bg-white/80 backdrop-blur-sm px-5 py-2.5 text-sm font-semibold text-rose-600 transition-all hover:bg-rose-50 hover:border-rose-300"
                >
                  Learn Meanings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Flowers - Start directly after Hero */}
      <section className="py-16 bg-gradient-to-b from-white to-rose-50/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Flowers</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Discover our handpicked collection of blooms, each with unique stories and cultural significance.
            </p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredFlowers.map((flower: Flower) => (
              <FlowerCard key={flower.slug} flower={flower} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              to="/flowers" 
              className="inline-flex items-center gap-2 rounded-lg border border-rose-300 bg-white px-6 py-3 text-sm font-semibold text-rose-600 transition-all hover:bg-rose-50"
            >
              View All Flowers
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Explore With Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Experience floral symbolism like never before</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-rose-100 to-pink-100 mb-4">
                <FiHeart className="text-2xl text-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Rich History</h3>
              <p className="text-gray-600">Explore floral symbolism from Victorian era to modern times with detailed historical context.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100 mb-4">
                <FiStar className="text-2xl text-pink-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Cultural Insights</h3>
              <p className="text-gray-600">Discover how different cultures interpret the same flower across the globe.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-rose-100 to-pink-100 mb-4">
                <FiAward className="text-2xl text-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Practical Guide</h3>
              <p className="text-gray-600">Learn to use floral symbolism in weddings, gifts, and daily life with practical tips.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}