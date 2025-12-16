// Template for other pages
export default function Blogs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[color]-50/30">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <div className="mb-16 text-center">
          <h1 className="mb-6 text-5xl font-bold text-gray-900">Page Title</h1>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Page description goes here. Make it engaging and informative.
          </p>
        </div>

        {/* Content Section */}
        <div className="rounded-2xl bg-white p-8 shadow-xl">
          <div className="text-center">
            <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-[color]-100 to-[color]-200">
              <span className="text-3xl">✨</span>
            </div>
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Coming Soon</h2>
            <p className="mb-8 text-gray-600">
              We're working hard to bring you this amazing feature. Stay tuned for updates!
            </p>
            <button className="rounded-lg bg-gradient-to-r from-[color]-500 to-[color]-600 px-6 py-3 font-semibold text-white shadow-md hover:shadow-lg">
              Notify Me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}