// src/pages/ArtGallery.tsx
import { FiImage, FiCamera, FiClock } from "react-icons/fi";

export default function ArtGallery() {
  const artworks = Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    title: `Floral Artwork ${i + 1}`,
    artist: `Artist ${String.fromCharCode(65 + i)}`,
    category: i % 3 === 0 ? "Painting" : i % 3 === 1 ? "Photography" : "Digital Art"
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-violet-50/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 sm:text-5xl">
            Floral Art Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A curated collection of floral art, photography, and illustrations celebrating 
            nature's timeless beauty through different artistic mediums.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-xl p-6 text-center border border-gray-100">
            <FiImage className="w-8 h-8 text-violet-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">24</div>
            <div className="text-sm text-gray-600">Artworks</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center border border-gray-100">
            <FiCamera className="w-8 h-8 text-pink-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">12</div>
            <div className="text-sm text-gray-600">Photographers</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center border border-gray-100">
            <div className="text-2xl font-bold text-gray-900">8</div>
            <div className="text-sm text-gray-600">Painters</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center border border-gray-100">
            <FiClock className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">3</div>
            <div className="text-sm text-gray-600">Exhibitions</div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {artworks.map((art) => (
            <div
              key={art.id}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-100 to-pink-100 aspect-square p-8 hover:shadow-xl transition-all duration-500 hover:scale-[1.02]"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-4 opacity-20 group-hover:opacity-30 transition-opacity">
                    {art.category === "Painting" ? "🎨" : art.category === "Photography" ? "📷" : "💻"}
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="font-semibold text-gray-900">{art.title}</h3>
                    <p className="text-sm text-gray-600">{art.artist}</p>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 bg-white/80 backdrop-blur-sm text-sm rounded-full">
                  {art.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 p-8 md:p-12 text-center text-white">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6">Gallery Launching Soon</h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              We're preparing a stunning collection of floral artworks from talented artists around the world. 
              Sign up to be notified when we launch!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-6 py-3 rounded-full text-gray-900 outline-none"
              />
              <button className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-full hover:bg-gray-100 transition-colors">
                Notify Me
              </button>
            </div>
          </div>
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
}