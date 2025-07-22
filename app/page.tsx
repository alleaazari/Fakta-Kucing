"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, BookOpen, PlusCircle, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import AxolotlDemo from "@/components/axolotl-demo"

interface AnimalFact {
  id: string
  fact: string
  animal: string
  category: string
  image: string
}

const featuredFacts: AnimalFact[] = [
  {
    id: "featured-1",
    fact: "Kucing memiliki lebih dari 30 otot yang mengontrol telinga mereka, memungkinkan mereka memutar telinga 180 derajat untuk mendeteksi suara dari berbagai arah.",
    animal: "Kucing Persia",
    category: "Mamalia",
    image: "/images/persia.jpg",
  },
  {
    id: "featured-2",
    fact: "Kucing dapat berlari dengan kecepatan hingga 48 km/jam dan melompat hingga 6 kali panjang tubuh mereka dalam sekali lompatan.",
    animal: "Kucing Maine Coon",
    category: "Mamalia",
    image: "/images/maine.jpg",
  },
  {
    id: "featured-3",
    fact: "Kucing memiliki organ khusus bernama 'Jacobson's organ' di langit-langit mulut yang memungkinkan mereka 'mencicipi' aroma di udara.",
    animal: "Kucing Siamese",
    category: "Mamalia",
    image: "/images/siamese.jpg",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Fakta{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">Kucing</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Jelajahi dunia menakjubkan kucing dengan fakta-fakta luar biasa yang akan mengubah cara Anda melihat alam.
              Dengan data real-time dari API dan kontribusi komunitas global.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/explore">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-gray-600 to-white hover:from-gray-700 hover:to-gray-100 text-black"
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Mulai Jelajahi
                </Button>
              </Link>
              <Link href="/contribute">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                >
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Kontribusi Fakta
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Axolotl API Demo Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <AxolotlDemo />
          </motion.div>
        </div>
      </section>

      {/* Featured Facts */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Fakta Kucing Pilihan Hari Ini</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Temukan fakta-fakta menakjubkan tentang kucing yang telah dipilih khusus untuk menginspirasi rasa ingin
              tahu Anda tentang sahabat berbulu kita.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredFacts.map((fact, index) => (
              <motion.div
                key={fact.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 3 + index * 0.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: index * 0.5,
                  }}
                >
                  <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300 group overflow-hidden shadow-xl hover:shadow-2xl">
                    <CardContent className="p-0">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={fact.image || "/placeholder.svg"}
                          alt={fact.animal}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <Badge className="absolute top-3 left-3 bg-gradient-to-r from-gray-600/80 to-white/80 text-black border-0 backdrop-blur-sm">
                          {fact.category}
                        </Badge>

                        {/* Floating heart icon */}
                        <motion.div
                          className="absolute top-3 right-3"
                          animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 5, -5, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                            delay: index * 0.3,
                          }}
                        >
                          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                            <Heart className="w-4 h-4 text-red-400" />
                          </div>
                        </motion.div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-semibold text-white">{fact.animal}</h3>
                          <motion.div
                            animate={{
                              rotate: [0, 360],
                            }}
                            transition={{
                              duration: 8,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "linear",
                            }}
                          >
                            <Sparkles className="w-4 h-4 text-yellow-400" />
                          </motion.div>
                        </div>
                        <p className="text-gray-200 leading-relaxed text-sm">{fact.fact}</p>

                        {/* Floating dots decoration */}
                        <div className="flex justify-center mt-4 space-x-1">
                          {[0, 1, 2].map((dotIndex) => (
                            <motion.div
                              key={dotIndex}
                              className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                                delay: dotIndex * 0.2 + index * 0.1,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Mengapa Memilih Fakta Kucing?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Platform terdepan untuk pembelajaran interaktif tentang dunia kucing dengan teknologi terkini.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-center p-6">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-white rounded-full flex items-center justify-center mx-auto">
                    <Sparkles className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Data Real-Time</h3>
                  <p className="text-gray-300">
                    Fakta terbaru dari API eksternal dan database yang selalu diperbarui untuk pengalaman pembelajaran
                    yang segar tentang kucing.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-center p-6">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-white to-gray-600 rounded-full flex items-center justify-center mx-auto">
                    <Heart className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Sistem Favorit</h3>
                  <p className="text-gray-300">
                    Simpan fakta kucing favorit Anda dan akses kapan saja untuk pembelajaran yang dipersonalisasi.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-center p-6">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-white rounded-full flex items-center justify-center mx-auto">
                    <PlusCircle className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Kontribusi Komunitas</h3>
                  <p className="text-gray-300">
                    Bagikan pengetahuan Anda tentang kucing dan berkontribusi pada database fakta kucing terbesar.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Siap Memulai Petualangan Belajar?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan pecinta kucing lainnya dan mulai jelajahi fakta-fakta menakjubkan hari ini.
            </p>
            <Link href="/explore">
              <Button
                size="lg"
                className="bg-gradient-to-r from-gray-600 to-white hover:from-gray-700 hover:to-gray-100 text-black"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Mulai Sekarang
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
