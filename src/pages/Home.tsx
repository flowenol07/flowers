// src/pages/Home.tsx
import flowers from "../data/flowers.json";
import type { Flower } from "../types/flower";
import FlowerCard from "../components/FlowerCard";
import { FiArrowRight, FiHeart, FiStar, FiAward, FiCalendar } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
  const featuredFlowers = flowers.slice(0, 8); // Changed from 6 to 8 for 2 rows of 4
  const [heroFlowers, setHeroFlowers] = useState<Flower[]>([]);
  const [bottomImages, setBottomImages] = useState<Flower[]>([]);

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

  // Initialize 5 curated flowers for hero grid
  useEffect(() => {
    const selectedIndices = [12, 45, 28, 67, 8];
    const selectedFlowers = selectedIndices.map(i => flowers[i]).filter(Boolean);

    if (selectedFlowers.length < 5) {
      const additional = [...flowers]
        .filter(f => !selectedFlowers.includes(f))
        .sort(() => 0.5 - Math.random())
        .slice(0, 5 - selectedFlowers.length);
      selectedFlowers.push(...additional);
    }

    setHeroFlowers(selectedFlowers.slice(0, 5));

    // Initialize different images for bottom boxes (indices 15, 22)
    const bottomIndices = [15, 22];
    const bottomFlowers = bottomIndices.map(i => flowers[i]).filter(Boolean);

    if (bottomFlowers.length < 2) {
      const additional = [...flowers]
        .filter(f => !selectedFlowers.includes(f) && !bottomFlowers.includes(f))
        .sort(() => 0.5 - Math.random())
        .slice(0, 2 - bottomFlowers.length);
      bottomFlowers.push(...additional);
    }

    setBottomImages(bottomFlowers.slice(0, 2));
  }, []);

  // Get random flowers for blog images
  const blogFlowers = [...flowers].sort(() => 0.5 - Math.random()).slice(0, 3);

  // Blog data with your requested content
  const blogs = [
    {
      id: 1,
      title: "Intimacy with the Divine (Part 1)",
      date: "08 Jan",
      author: "Richard Eggenberger",
      description: "Exploring the spiritual connection between human consciousness and floral symbolism in sacred traditions.",
      category: "Spirituality",
      slug: "intimacy-with-divine-part1",
      flower: blogFlowers[0]
    },
    {
      id: 2,
      title: "The Mystical World of Bulbs (Part 1)",
      date: "08 Jan",
      author: "Richard Eggenberger",
      description: "Unveiling the hidden symbolism and spiritual significance of bulb flowers across different cultures.",
      category: "Mysticism",
      slug: "mystical-bulbs-part1",
      flower: blogFlowers[1]
    },
    {
      id: 3,
      title: "Silence and the Passion Flowers (Part 1)",
      date: "08 Jan",
      author: "Richard Eggenberger",
      description: "How moments of quiet contemplation reveal the deeper meanings within passion flower symbolism.",
      category: "Contemplation",
      slug: "silence-passion-flowers-part1",
      flower: blogFlowers[2]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Responsive Layout */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-pink-50 py-12 md:py-16 min-h-[75vh]">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ec4899'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-pink-200 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-rose-200 rounded-full opacity-5 blur-3xl"></div>

        {/* Main Content Container - Responsive Grid/Flex */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 h-full">

            {/* Text Content (Left Side on Desktop) */}
            <div className="relative max-w-xl lg:w-1/2 pt-10 lg:pt-0 -mt-2">
              <span className="inline-block rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-3 py-1 text-xs font-semibold text-white mb-3">
                Flower song
              </span>

              <h1 className="mb-4 text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
                The Significance of Flowers
              </h1>

              <div className="mb-6 text-sm md:text-base text-gray-800 leading-relaxed space-y-3 italic">
                <p className="border-l-4 border-pink-300 pl-4 py-1">
                  "When I give flowers, it is an answer to the aspiration coming from the very depths of your being.
                </p>
                <p className="border-l-4 border-rose-300 pl-4 py-1">
                  It is an aspiration or a need - it depends on the person. It may fill a void, or else give you the impetus to progress, or it may help you to find the inner harmony to establish peace.
                </p>
                <p className="border-l-4 border-pink-300 pl-4 py-1">
                  I give you flowers so that you may develop the Divine qualities they symbolize. And they can directly transmit into your soul all that they contain, pure, unalloyed. They possess a very subtle and very deep power and influence."
                </p>
              </div>

              <div className="-mt-2 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/flowers"
                  className="inline-flex items-center justify-center gap-1 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl hover:from-rose-600 hover:to-pink-600"
                >
                  Explore Flower Meanings
                  <FiArrowRight className="text-base" />
                </Link>
                <Link
                  to="/message-of-flowers"
                  className="inline-flex items-center justify-center gap-1 rounded-full border-2 border-rose-200 bg-white/80 backdrop-blur-sm px-5 py-2.5 text-sm font-semibold text-rose-600 transition-all hover:bg-rose-50 hover:border-rose-300"
                >
                  Discover Symbolism
                </Link>
              </div>

              {/* Two small image boxes below the text - Responsive */}
              <div className="mt-6 hidden lg:flex gap-2 max-w-lg xl:max-w-xl">
                {/* First image box - wider, height fixed */}
                <div className="relative overflow-hidden rounded-lg group flex-[2] h-[11rem] xl:h-[11.75rem]">
                  {bottomImages[0] && (
                    <>
                      <img
                        src={getImageUrl(bottomImages[0])}
                        alt={bottomImages[0].name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.src = getPlaceholderImage(bottomImages[0].name);
                          target.onerror = null;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-black/5 to-transparent"></div>
                    </>
                  )}
                  <div className="absolute inset-0 border border-white/40 rounded-lg"></div>
                </div>
                {/* Second image box - smaller */}
                <div className="relative overflow-hidden rounded-lg group flex-1 aspect-[4/3]">
                  {bottomImages[1] && (
                    <>
                      <img
                        src={getImageUrl(bottomImages[1])}
                        alt={bottomImages[1].name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.src = getPlaceholderImage(bottomImages[1].name);
                          target.onerror = null;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-black/5 to-transparent"></div>
                    </>
                  )}
                  <div className="absolute inset-0 border border-white/40 rounded-lg"></div>
                </div>
              </div>
            </div>

            {/* Asymmetric CSS Grid (Right Side on Desktop) - Responsive */}
            <div className="w-full lg:w-1/2 max-w-lg mx-auto lg:max-w-none lg:mx-0 aspect-square">
              <div className="grid grid-cols-3 grid-rows-3 gap-3 h-full">
                {/* Primary Grid Cell - Featured image (spans 2x2) - Larger */}
                <div className="relative col-span-2 row-span-2 overflow-hidden rounded-2xl group">
                  {heroFlowers[0] && (
                    <>
                      <img
                        src={getImageUrl(heroFlowers[0])}
                        alt={heroFlowers[0].name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.src = getPlaceholderImage(heroFlowers[0].name);
                          target.onerror = null;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-black/10 to-transparent"></div>
                      <div className="absolute top-5 left-5">
                        <span className="bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
                          Featured
                        </span>
                      </div>
                    </>
                  )}
                  <div className="absolute inset-0 border-3 border-white/40 rounded-2xl"></div>
                </div>

                {/* Secondary Grid Cell 1 - Top right */}
                <div className="relative overflow-hidden rounded-xl group">
                  {heroFlowers[1] && (
                    <>
                      <img
                        src={getImageUrl(heroFlowers[1])}
                        alt={heroFlowers[1].name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.src = getPlaceholderImage(heroFlowers[1].name);
                          target.onerror = null;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent"></div>
                    </>
                  )}
                  <div className="absolute inset-0 border-2 border-white/30 rounded-xl"></div>
                </div>

                {/* Secondary Grid Cell 2 - Middle right */}
                <div className="relative overflow-hidden rounded-xl group">
                  {heroFlowers[2] && (
                    <>
                      <img
                        src={getImageUrl(heroFlowers[2])}
                        alt={heroFlowers[2].name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.src = getPlaceholderImage(heroFlowers[2].name);
                          target.onerror = null;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent"></div>
                    </>
                  )}
                  <div className="absolute inset-0 border-2 border-white/30 rounded-xl"></div>
                </div>

                {/* Tertiary Grid Cell 1 - Bottom left (spans 2 columns) */}
                <div className="relative col-span-2 overflow-hidden rounded-xl group">
                  {heroFlowers[3] && (
                    <>
                      <img
                        src={getImageUrl(heroFlowers[3])}
                        alt={heroFlowers[3].name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.src = getPlaceholderImage(heroFlowers[3].name);
                          target.onerror = null;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent"></div>
                    </>
                  )}
                  <div className="absolute inset-0 border-2 border-white/30 rounded-xl"></div>
                </div>

                {/* Tertiary Grid Cell 2 - Bottom right */}
                <div className="relative overflow-hidden rounded-xl group">
                  {heroFlowers[4] && (
                    <>
                      <img
                        src={getImageUrl(heroFlowers[4])}
                        alt={heroFlowers[4].name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.src = getPlaceholderImage(heroFlowers[4].name);
                          target.onerror = null;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent"></div>
                    </>
                  )}
                  <div className="absolute inset-0 border-2 border-white/30 rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Flowers Section - Professional Design */}
      <section className="relative py-20 bg-gradient-to-b from-white via-rose-50/20 to-white">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-rose-100/40 to-pink-100/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-rose-50/30 to-pink-50/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-[500px] h-[500px] bg-gradient-to-r from-rose-50/10 to-pink-50/5 rounded-full blur-2xl"></div>
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header with elegant design */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent"></div>
              <span className="text-sm font-semibold tracking-widest text-rose-600 uppercase">
                Divine Selection
              </span>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent"></div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Sacred <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-500">Floral Collection</span>
            </h2>

            <div className="mx-auto max-w-3xl">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 to-pink-400 rounded-lg blur opacity-20"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-white/40 shadow-xl">
                  <p className="text-gray-700 text-lg italic leading-relaxed font-serif">
                    "Flowers indicate a blossoming in the consciousness, sometimes with special
                    reference to the psychic or the psychicised vital, mental, and physical
                    consciousness."
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <div className="w-8 h-px bg-gradient-to-r from-rose-300 to-pink-300"></div>
                    <span className="text-sm text-gray-500">Sri Aurobindo</span>
                    <div className="w-8 h-px bg-gradient-to-r from-pink-300 to-rose-300"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Flowers Grid with enhanced styling */}
          <div className="relative mb-16">
            {/* Grid background effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent rounded-3xl"></div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 relative">
              {featuredFlowers.map((flower: Flower, index) => (
                <div
                  key={flower.slug}
                  className="group relative"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  {/* Card background glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-200 via-pink-200 to-rose-200 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>

                  <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-white/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <FlowerCard key={flower.slug} flower={flower} />

                    {/* Hover overlay with gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                    {/* Decorative corner accents */}
                    <div className="absolute top-0 left-0 w-12 h-12">
                      <div className="absolute top-2 left-2 w-2 h-2 bg-rose-400 rounded-full"></div>
                      <div className="absolute top-2 left-6 w-1 h-1 bg-pink-300 rounded-full"></div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-12 h-12">
                      <div className="absolute bottom-2 right-2 w-2 h-2 bg-pink-400 rounded-full"></div>
                      <div className="absolute bottom-2 right-6 w-1 h-1 bg-rose-300 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button with elegant styling */}
          <div className="text-center">
            <div className="relative inline-block">
              {/* Button background glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>

              <Link
                to="/flowers"
                className="relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-white to-rose-50 px-8 py-4 text-sm font-semibold text-gray-900 shadow-xl border border-white/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:scale-105 group"
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full blur opacity-75 group-hover:opacity-100"></div>
                  <div className="relative bg-gradient-to-r from-rose-500 to-pink-500 p-2 rounded-full">
                    <FiArrowRight className="text-white text-lg" />
                  </div>
                </div>
                <span className="bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent font-bold tracking-wide">
                  Explore All Sacred Flowers
                </span>
                <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
                </div>
              </Link>

              {/* Decorative dots */}
              <div className="absolute -top-2 -left-2 w-3 h-3 bg-rose-300 rounded-full animate-ping opacity-75"></div>
              <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-pink-300 rounded-full animate-ping opacity-75 delay-300"></div>
            </div>

            {/* Subtext */}
            <p className="mt-6 text-sm text-gray-500 max-w-md mx-auto">
              Discover the spiritual essence of over 100 flowers and their divine symbolism
            </p>
          </div>
        </div>
      </section>

      {/* Latest Blogs Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Blogs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Deepen your understanding with insights into floral spirituality and symbolism
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div key={blog.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={getImageUrl(blog.flower)}
                    alt={blog.flower.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.src = getPlaceholderImage(blog.flower.name);
                      target.onerror = null;
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {blog.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <FiCalendar className="text-rose-400" />
                    <span>{blog.date} 2025</span>
                    <span className="mx-2">•</span>
                    <span className="text-rose-600 font-medium">Part 1</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm italic">
                    {blog.description}
                  </p>
                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <p className="text-sm text-gray-500 mb-3">
                      <span className="font-medium">Written by:</span> {blog.author}
                    </p>
                    <Link
                      to={`/blog/${blog.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-rose-600 hover:text-rose-800 transition-colors"
                    >
                      Read More
                      <FiArrowRight className="text-xs" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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

      {/* Column 4: Newsletter */}
      <div>
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
          Newsletter
        </h4>
        <p className="text-gray-400 text-sm mb-4">
          Subscribe to receive spiritual insights and floral wisdom directly in your inbox.
        </p>
        <form className="space-y-3">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent backdrop-blur-sm"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/20"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>

    {/* New Section: Platform Links */}
    <div className="mt-12 pt-8 border-t border-gray-700/50">
      <div className="text-center mb-6">
        <h4 className="text-lg font-semibold mb-2 flex items-center justify-center gap-2">
          <FiAward className="text-rose-400" />
          Explore Our Spiritual Ecosystem
          <FiAward className="text-pink-400" />
        </h4>
        <p className="text-gray-400 text-sm max-w-2xl mx-auto">
          Discover more divine wisdom across our integrated platforms
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* IncarnateWord */}
        <a 
          href="https://incarnateword.in/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group bg-gradient-to-r from-gray-800 to-gray-900 hover:from-rose-900/30 hover:to-gray-900 rounded-xl p-4 border border-gray-700 hover:border-rose-500/50 transition-all duration-300 hover:scale-[1.02]"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-r from-rose-500/20 to-rose-600/20 p-2 rounded-lg">
              <FiAward className="text-rose-400 text-lg" />
            </div>
            <span className="font-semibold text-white group-hover:text-rose-300 transition-colors">
              IncarnateWord
            </span>
          </div>
          <p className="text-gray-400 text-sm">
            Explore the complete works and teachings
          </p>
        </a>

        {/* VMLT */}
        <a 
          href="https://vmlt.in/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group bg-gradient-to-r from-gray-800 to-gray-900 hover:from-pink-900/30 hover:to-gray-900 rounded-xl p-4 border border-gray-700 hover:border-pink-500/50 transition-all duration-300 hover:scale-[1.02]"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-r from-pink-500/20 to-pink-600/20 p-2 rounded-lg">
              <FiStar className="text-pink-400 text-lg" />
            </div>
            <span className="font-semibold text-white group-hover:text-pink-300 transition-colors">
              VMLT Institute
            </span>
          </div>
          <p className="text-gray-400 text-sm">
            Visual Meditations and Learning Tools
          </p>
        </a>

        {/* Auroverse */}
        <a 
          href="https://auroverse.in/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group bg-gradient-to-r from-gray-800 to-gray-900 hover:from-rose-900/30 hover:to-gray-900 rounded-xl p-4 border border-gray-700 hover:border-rose-500/50 transition-all duration-300 hover:scale-[1.02]"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-r from-rose-500/20 to-rose-600/20 p-2 rounded-lg">
              <FiHeart className="text-rose-400 text-lg" />
            </div>
            <span className="font-semibold text-white group-hover:text-rose-300 transition-colors">
              Auroverse
            </span>
          </div>
          <p className="text-gray-400 text-sm">
            Immersive spiritual experiences and community
          </p>
        </a>

        {/* Savitri */}
        <a 
          href="https://savitri.in/1/1/1" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group bg-gradient-to-r from-gray-800 to-gray-900 hover:from-pink-900/30 hover:to-gray-900 rounded-xl p-4 border border-gray-700 hover:border-pink-500/50 transition-all duration-300 hover:scale-[1.02]"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-r from-pink-500/20 to-pink-600/20 p-2 rounded-lg">
              <FiAward className="text-pink-400 text-lg" />
            </div>
            <span className="font-semibold text-white group-hover:text-pink-300 transition-colors">
              Savitri
            </span>
          </div>
          <p className="text-gray-400 text-sm">
            The epic poem of spiritual transformation
          </p>
        </a>
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