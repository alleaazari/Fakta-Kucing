import Link from "next/link"
import { Heart, Github, Twitter, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black/20 backdrop-blur-lg border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl"> 😼</span>
              <span className="text-xl font-bold text-white">Fakta Kucing</span>
            </div>
            <p className="text-gray-400 text-sm">
              Platform terdepan untuk menemukan, berbagi, dan mempelajari fakta-fakta menakjubkan tentang kucing yang imoet dan menggemaskan.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Navigasi</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/explore" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Jelajahi
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Favorit
                </Link>
              </li>
              <li>
                <Link href="/contribute" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Kontribusi
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Sumber Daya</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Kontak
                </Link>
              </li>
              <li>
                <a
                  href=" https://meowfacts.herokuapp.com/?count=6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Cat API
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Ikuti Kami</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Fakta Hewan. Dibuat dengan <Heart className="h-4 w-4 inline text-red-500" /> untuk pecinta hewan.
          </p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">Data dari berbagai sumber terpercaya dan API real-time.</p>
        </div>
      </div>
    </footer>
  )
}
