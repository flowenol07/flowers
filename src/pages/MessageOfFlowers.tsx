// src/pages/MessageOfFlowers.tsx
import { FiHeart, FiStar, FiZap, FiCoffee, FiUsers, FiGlobe } from "react-icons/fi";

export default function MessageOfFlowers() {
  const meanings = [
    {
      icon: <FiHeart />,
      title: "Love & Romance",
      colors: ["Rose", "Tulip", "Orchid"],
      description: "Red roses for passionate love, tulips for perfect love, orchids for luxury and beauty.",
      gradient: "from-rose-500 to-pink-500"
    },
    {
      icon: <FiStar />,
      title: "Friendship & Joy",
      colors: ["Sunflower", "Daisy", "Yellow Rose"],
      description: "Sunflowers for adoration, daisies for innocence, yellow roses for platonic friendship.",
      gradient: "from-yellow-400 to-orange-400"
    },
    {
      icon: <FiZap />,
      title: "New Beginnings",
      colors: ["Daffodil", "Cherry Blossom", "Lotus"],
      description: "Daffodils for new beginnings, cherry blossoms for renewal, lotus for spiritual rebirth.",
      gradient: "from-green-400 to-emerald-500"
    },
    {
      icon: <FiCoffee />,
      title: "Sympathy & Remembrance",
      colors: ["Lily", "Chrysanthemum", "White Rose"],
      description: "Lilies for restored innocence, chrysanthemums for honor, white roses for reverence.",
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      icon: <FiUsers />,
      title: "Congratulations",
      colors: ["Peony", "Hydrangea", "Gladiolus"],
      description: "Peonies for prosperity, hydrangeas for gratitude, gladiolus for strength of character.",
      gradient: "from-blue-400 to-cyan-500"
    },
    {
      icon: <FiGlobe />,
      title: "Healing & Wellness",
      colors: ["Lavender", "Chamomile", "Jasmine"],
      description: "Lavender for calmness, chamomile for patience, jasmine for soothing the spirit.",
      gradient: "from-teal-400 to-blue-500"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-rose-50/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 sm:text-5xl">
            The Language of Flowers
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the hidden meanings and secret messages conveyed through flowers. 
            From Victorian bouquets to modern arrangements, each bloom tells a story.
          </p>
        </div>

        {/* Meanings Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {meanings.map((meaning, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${meaning.gradient} mb-4`}>
                <div className="text-white text-xl">{meaning.icon}</div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">{meaning.title}</h3>
              
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-2">Common Flowers:</div>
                <div className="flex flex-wrap gap-2">
                  {meaning.colors.map((color, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
              
              <p className="text-gray-600">{meaning.description}</p>
            </div>
          ))}
        </div>

        {/* Historical Context */}
        <div className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl p-8 md:p-12 text-white mb-16">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">Historical Significance</h2>
            <p className="text-lg mb-6 opacity-90">
              Floriography, or the language of flowers, was especially popular during the Victorian era 
              when direct expression of feelings was discouraged. People used carefully arranged bouquets 
              to send coded messages, allowing them to express feelings that could not be spoken aloud.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold mb-2">19th Century</div>
                <div className="text-sm opacity-90">Victorian Era Popularity</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold mb-2">100+</div>
                <div className="text-sm opacity-90">Flowers with Meanings</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold mb-2">Global</div>
                <div className="text-sm opacity-90">Cultural Variations</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Create Your Floral Message</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Combine different flowers to create meaningful bouquets that speak your heart's language. 
            Perfect for special occasions or expressing emotions words can't capture.
          </p>
          <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-8 py-3 text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-shadow">
            Start Creating Your Bouquet
          </button>
        </div>
      </div>
    </div>
  );
}