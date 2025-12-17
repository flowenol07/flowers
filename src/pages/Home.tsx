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
                Divine Floral Wisdom
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

      {/* Featured Flowers - Now with 4 images per row */}
      <section className="py-16 bg-gradient-to-b from-white to-rose-50/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Collection</h2>
            <div className="mx-auto max-w-2xl">
              <p className="text-gray-700 text-lg italic leading-relaxed">
                Flowers indicate a blossoming in the consciousness, sometimes with special
                reference to the psychic or the psychicised vital, mental, and physical
                consciousness.
              </p>
            </div>
          </div>

          {/* Changed from lg:grid-cols-3 to lg:grid-cols-4 */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
      <footer className="bg-gray-800 text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Column 1: Logo and Description */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-rose-400">Floral Wisdom</h3>
              <p className="text-sm text-gray-400">
                Exploring the spiritual and symbolic significance of flowers in life and consciousness.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/" className="hover:text-rose-400 transition-colors">Home</Link></li>
                <li><Link to="/flowers" className="hover:text-rose-400 transition-colors">Flowers</Link></li>
                <li><Link to="/message-of-flowers" className="hover:text-rose-400 transition-colors">Symbolism</Link></li>
                <li><Link to="/blog" className="hover:text-rose-400 transition-colors">Blog</Link></li>
              </ul>
            </div>

            {/* Column 3: Resources */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-rose-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-rose-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-rose-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-rose-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>

            {/* Column 4: Newsletter */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
              <p className="text-sm text-gray-400 mb-4">
                Subscribe to our newsletter for the latest insights.
              </p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="p-2 rounded-l-lg text-gray-900 text-sm w-full focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-rose-500 hover:bg-rose-600 text-white p-2 rounded-r-lg text-sm font-semibold transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-700 pt-8 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Flower Song. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}