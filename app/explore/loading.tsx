export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 via-pink-800 to-green-900 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="h-12 bg-white/20 rounded-lg mb-4 animate-pulse"></div>
          <div className="h-6 bg-white/20 rounded-lg max-w-2xl mx-auto animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-6 animate-pulse"
            >
              <div className="h-4 bg-white/20 rounded mb-4"></div>
              <div className="h-20 bg-white/20 rounded mb-4"></div>
              <div className="h-4 bg-white/20 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
