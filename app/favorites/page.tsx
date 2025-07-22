"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Share2, Trash2, RefreshCw, ExternalLink, AlertTriangle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface AnimalFact {
  id: string
  fact: string
  animal: string
  category: string
  image: string
  source?: "api" | "fallback"
}

interface AxolotlData {
  facts: string[]
  images: string[]
}

// Fallback axolotl data for inspiration section
const fallbackAxolotlFacts = [
  "Axolotl dapat meregenerasi anggota tubuh mereka dengan sempurna!",
  "Axolotl adalah salamander yang tetap dalam bentuk larva seumur hidup.",
  "Axolotl memiliki kemampuan regenerasi yang luar biasa bahkan untuk organ internal.",
]

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [favoriteFacts, setFavoriteFacts] = useState<AnimalFact[]>([])
  const [axolotlData, setAxolotlData] = useState<AxolotlData | null>(null)
  const [apiLoading, setApiLoading] = useState(false)
  const [apiStatus, setApiStatus] = useState<"loading" | "success" | "error">("loading")
  const [displayFacts, setDisplayFacts] = useState<string[]>(fallbackAxolotlFacts)
  const { toast } = useToast()

const fetchAxolotlData = async () => {
  setApiLoading(true)
  setApiStatus("loading")

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    const response = await fetch("https://meowfacts.herokuapp.com/?count=6", {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
      },
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    // ✅ Sesuaikan dengan struktur API
    if (data.data && data.data.length > 0) {
      setDisplayFacts(data.data.slice(0, 4))
      setApiStatus("success")
    } else {
      throw new Error("No facts in API response")
    }
  } catch (error) {
    console.warn("Axolotl API not available, using fallback data:", error)
    setDisplayFacts(fallbackAxolotlFacts)
    setApiStatus("error")
  } finally {
    setApiLoading(false)
  }
}



  useEffect(() => {
    loadFavorites()
    fetchAxolotlData()
  }, [])

  const loadFavorites = () => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("animalFactFavorites")
      const savedFacts = localStorage.getItem("animalFactsData")

      if (saved && savedFacts) {
        try {
          const favoriteIds = JSON.parse(saved)
          const factsData = JSON.parse(savedFacts)

          setFavorites(favoriteIds)
          // Only show facts that are still in favorites
          setFavoriteFacts(factsData.filter((fact: AnimalFact) => favoriteIds.includes(fact.id)))
        } catch (error) {
          console.error("Error loading favorites:", error)
          setFavorites([])
          setFavoriteFacts([])
        }
      }
    }
  }

  const removeFavorite = (factId: string) => {
    const newFavorites = favorites.filter((id) => id !== factId)
    const removedFact = favoriteFacts.find((fact) => fact.id === factId)

    setFavorites(newFavorites)
    setFavoriteFacts(favoriteFacts.filter((fact) => fact.id !== factId))

    if (typeof window !== "undefined") {
      localStorage.setItem("animalFactFavorites", JSON.stringify(newFavorites))

      // Update facts data
      const savedFacts = localStorage.getItem("animalFactsData")
      if (savedFacts) {
        try {
          const factsData = JSON.parse(savedFacts)
          const updatedFacts = factsData.filter((fact: AnimalFact) => fact.id !== factId)
          localStorage.setItem("animalFactsData", JSON.stringify(updatedFacts))
        } catch (error) {
          console.error("Error updating facts data:", error)
        }
      }
    }

    if (removedFact) {
      toast({
        title: "Dihapus dari favorit",
        description: `Fakta ${removedFact.animal} telah dihapus dari favorit Anda.`,
      })
    }
  }

  const clearAllFavorites = () => {
    setFavorites([])
    setFavoriteFacts([])

    if (typeof window !== "undefined") {
      localStorage.removeItem("animalFactFavorites")
      localStorage.removeItem("animalFactsData")
    }

    toast({
      title: "Semua favorit dihapus",
      description: "Semua fakta favorit telah dihapus dari koleksi Anda.",
    })
  }

  const shareFact = (fact: string) => {
    if (typeof window !== "undefined") {
      if (navigator.share) {
        navigator
          .share({
            title: "Fakta Hewan Menakjubkan",
            text: fact,
            url: window.location.href,
          })
          .catch(console.error)
      } else {
        navigator.clipboard
          .writeText(fact)
          .then(() => {
            toast({
              title: "Berhasil disalin",
              description: "Fakta berhasil disalin ke clipboard!",
            })
          })
          .catch(() => {
            toast({
              title: "Gagal menyalin",
              description: "Tidak dapat menyalin ke clipboard",
              variant: "destructive",
            })
          })
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-white">
      <section className="py-16 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Fakta Favorit Saya</h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Koleksi pribadi fakta-fakta Axolotl menakjubkan dari API yang telah Anda simpan untuk pembelajaran lebih
              lanjut.
            </p>
          </motion.div>

          {/* Axolotl API Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold text-white flex items-center">
                       😸 Inspirasi Kucing Hari Ini
                    {apiStatus === "error" && <AlertTriangle className="h-5 w-5 text-yellow-400 ml-2" />}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        apiLoading
                          ? "bg-yellow-400 animate-pulse"
                          : apiStatus === "success"
                            ? "bg-green-400"
                            : "bg-red-400"
                      }`}
                    ></div>
                    <Button
                      onClick={fetchAxolotlData}
                      size="sm"
                      variant="ghost"
                      className="text-pink-400 hover:text-pink-300"
                      disabled={apiLoading}
                    >
                      <RefreshCw className={`h-4 w-4 ${apiLoading ? "animate-spin" : ""}`} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {apiLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div key={index} className="animate-pulse">
                        <div className="h-16 bg-white/20 rounded-lg"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {displayFacts.map((fact, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                      >
                        <p className="text-gray-200 text-sm leading-relaxed">• {fact}</p>
                      </motion.div>
                    ))}
                  </div>
                )}

                <div className="text-center">
                  <a
                    href="https://meowfacts.herokuapp.com/?count=6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-pink-400 hover:text-pink-300 text-sm"
                  >
                    {apiStatus === "success" ? "Data dari The Cat API" : "The Axolotl API (offline)"}
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Favorites Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-center p-6">
              <CardContent className="space-y-2">
                <div className="text-3xl font-bold text-white">{favoriteFacts.length}</div>
                <div className="text-gray-300">Fakta Tersimpan</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-center p-6">
              <CardContent className="space-y-2">
                <div className="text-3xl font-bold text-white">
                  {favoriteFacts.filter((fact) => fact.source === "api").length}
                </div>
                <div className="text-gray-300">Dari Live API</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-center p-6">
              <CardContent className="space-y-2">
                <div className="text-3xl font-bold text-white">
                  {favoriteFacts.reduce((total, fact) => total + fact.fact.length, 0)}
                </div>
                <div className="text-gray-300">Total Karakter</div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Favorites Actions */}
          {favoriteFacts.length > 0 && (
            <motion.div
              className="flex justify-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                onClick={clearAllFavorites}
                variant="outline"
                className="border-red-500/50 text-red-400 hover:bg-red-500/10 bg-transparent"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Hapus Semua Favorit
              </Button>
            </motion.div>
          )}

          {/* Favorites Grid */}
          {favoriteFacts.length === 0 ? (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="text-6xl mb-6">💔</div>
              <h2 className="text-2xl font-bold text-white mb-4">Belum Ada Fakta Favorit</h2>
              <p className="text-gray-300 mb-8 max-w-md mx-auto">
                Mulai jelajahi fakta-fakta Axolotl menakjubkan dari API dan simpan yang paling menarik untuk Anda!
              </p>
              <Link href="/explore">
                <Button className="bg-gradient-to-r from-gray-600 to-white hover:from-gray-700 hover:to-gray-100 text-black">
                  Jelajahi Fakta Sekarang
                </Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteFacts.map((fact, index) => (
                <motion.div
                  key={fact.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300 group overflow-hidden shadow-xl">
                    <CardContent className="p-0">
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={fact.image || "/placeholder.svg"}
                          alt={fact.animal}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                        {/* Category badge */}
                        <div className="absolute top-3 left-3 flex gap-2">
                          <Badge className="bg-gradient-to-r from-gray-600/80 to-white/80 text-black border-0 backdrop-blur-sm">
                            {fact.category}
                          </Badge>
                          {fact.source === "api" && (
                            <Badge className="bg-green-600/80 text-white border-0 backdrop-blur-sm">Live API</Badge>
                          )}
                          {fact.source === "fallback" && (
                            <Badge className="bg-orange-600/80 text-white border-0 backdrop-blur-sm">Fallback</Badge>
                          )}
                        </div>

                        {/* Action buttons */}
                        <div className="absolute top-3 right-3 flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFavorite(fact.id)}
                            className="text-white hover:bg-red-500/20 p-2 backdrop-blur-sm bg-white/10 border border-white/20"
                          >
                            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => shareFact(fact.fact)}
                            className="text-white hover:bg-white/20 p-2 backdrop-blur-sm bg-white/10 border border-white/20"
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-white mb-3">{fact.animal}</h3>
                        <p className="text-gray-200 leading-relaxed text-sm">{fact.fact}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
