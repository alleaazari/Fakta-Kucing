"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Heart, Search, RefreshCw, Filter, Wifi, WifiOff, MapPin, Calendar, Info } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

interface AnimalFact {
  id: string
  fact: string
  animal: string
  category: string
  image: string
  source: "api" | "fallback"
  // Extended properties for cats
  name?: string
  breed?: string
  age?: string
  location?: string
  personality?: string[]
  adoptionStatus?: "available" | "pending" | "adopted"
  specialNeeds?: string
}

interface ApiResponse {
  facts: string[]
  images?: string[]
}

const categories = ["Semua", "Mamalia", "Tersedia", "Proses Adopsi", "Sudah Diadopsi"]

const baseCatData = [
  {
    name: "Luna",
    breed: "Persian",
    age: "2 tahun",
    location: "Jakarta Selatan",
    personality: ["Penyayang", "Tenang", "Ramah"],
    adoptionStatus: "available" as const,
    specialNeeds: undefined,
    image: "/images/luna.jpg",
  },
  {
    name: "Milo",
    breed: "Maine Coon",
    age: "3 tahun",
    location: "Bandung",
    personality: ["Aktif", "Sabar", "Cerdas"],
    adoptionStatus: "available" as const,
    specialNeeds: undefined,
    image: "/images/milo.jpg",
  },
  {
    name: "Bella",
    breed: "Scottish Fold",
    age: "1 tahun",
    location: "Surabaya",
    personality: ["Playful", "Energik", "Sosial"],
    adoptionStatus: "pending" as const,
    specialNeeds: undefined,
    image: "/images/bella.jpg",
  },
  {
    name: "Oscar",
    breed: "British Shorthair",
    age: "4 tahun",
    location: "Yogyakarta",
    personality: ["Mandiri", "Tenang", "Setia"],
    adoptionStatus: "available" as const,
    specialNeeds: undefined,
    image: "/images/oscar.jpg",
  },
  {
    name: "Coco",
    breed: "Siamese",
    age: "2 tahun",
    location: "Medan",
    personality: ["Vokal", "Cerdas", "Ekspresif"],
    adoptionStatus: "available" as const,
    specialNeeds: "Membutuhkan stimulasi mental yang tinggi",
    image: "/images/coco.jpg",
  },
  {
    name: "Shadow",
    breed: "Bombay",
    age: "3 tahun",
    location: "Semarang",
    personality: ["Loyal", "Affectionate", "Mengikuti"],
    adoptionStatus: "adopted" as const,
    specialNeeds: undefined,
    image: "/images/shadow.jpg",
  },
]

export default function ExplorePage() {
  const [facts, setFacts] = useState<AnimalFact[]>([])
  const [filteredFacts, setFilteredFacts] = useState<AnimalFact[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [loading, setLoading] = useState(true)
  const [apiStatus, setApiStatus] = useState<"loading" | "success" | "error">("loading")
  const [favorites, setFavorites] = useState<string[]>([])
  const { toast } = useToast()

  // Load favorites from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("animalFactFavorites")
      if (saved) {
        try {
          setFavorites(JSON.parse(saved))
        } catch (error) {
          console.error("Error loading favorites:", error)
          setFavorites([])
        }
      }
    }
  }, [])

  const fetchApiData = async () => {
    setLoading(true)
    setApiStatus("loading")
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 8000)
      const response = await fetch("https://meowfacts.herokuapp.com/?count=6", {
        signal: controller.signal,
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data && Array.isArray(data.data) && data.data.length > 0) {
        const apiFacts: AnimalFact[] = data.data.map((fact: string, index: number) => ({
          id: `api-meow-${index}-${Date.now()}`,
          fact: fact,
          animal: baseCatData[index]?.name || "Cat",
          category: "Mamalia",
          image: baseCatData[index]?.image || "/placeholder.svg?height=300&width=400",
          source: "api" as const,
          // Extended cat data
          name: baseCatData[index]?.name || `Cat ${index + 1}`,
          breed: baseCatData[index]?.breed || "Mixed",
          age: baseCatData[index]?.age || "Unknown",
          location: baseCatData[index]?.location || "Unknown",
          personality: baseCatData[index]?.personality || ["Friendly"],
          adoptionStatus: baseCatData[index]?.adoptionStatus || "available",
          specialNeeds: baseCatData[index]?.specialNeeds,
        }))

        setFacts(apiFacts)
        setFilteredFacts(apiFacts)
        setApiStatus("success")
        toast({
          title: "API Berhasil Terhubung",
          description: `Berhasil memuat ${apiFacts.length} fakta dari MeowFacts API`,
        })
      } else {
        throw new Error("Invalid API response structure")
      }
    } catch (error) {
      console.warn("API failed, using fallback data:", error)
      // Fallback data jika API tidak tersedia
      const fallbackFacts: AnimalFact[] = [
        {
          id: `fallback-cat-1-${Date.now()}`,
          fact: "Kucing dapat tidur hingga 16 jam sehari.",
          animal: "Luna",
          category: "Mamalia",
          image: "/images/luna-persian.png",
          source: "fallback",
          name: "Luna",
          breed: "Persian",
          age: "2 tahun",
          location: "Jakarta Selatan",
          personality: ["Penyayang", "Tenang", "Ramah"],
          adoptionStatus: "available",
        },
        {
          id: `fallback-cat-2-${Date.now()}`,
          fact: "Kucing mengeong hanya untuk berkomunikasi dengan manusia.",
          animal: "Milo",
          category: "Mamalia",
          image: "/images/milo-mainecoon.png",
          source: "fallback",
          name: "Milo",
          breed: "Maine Coon",
          age: "3 tahun",
          location: "Bandung",
          personality: ["Aktif", "Sabar", "Cerdas"],
          adoptionStatus: "available",
        },
        {
          id: `fallback-cat-3-${Date.now()}`,
          fact: "Kucing memiliki lebih dari 20 otot yang mengontrol telinga mereka.",
          animal: "Bella",
          category: "Mamalia",
          image: "/images/bella-scottishfold.png",
          source: "fallback",
          name: "Bella",
          breed: "Scottish Fold",
          age: "1 tahun",
          location: "Surabaya",
          personality: ["Playful", "Energik", "Sosial"],
          adoptionStatus: "pending",
        },
        {
          id: `fallback-cat-4-${Date.now()}`,
          fact: "Kucing bisa melompat hingga enam kali panjang tubuhnya.",
          animal: "Oscar",
          category: "Mamalia",
          image: "/images/oscar-british.png",
          source: "fallback",
          name: "Oscar",
          breed: "British Shorthair",
          age: "4 tahun",
          location: "Yogyakarta",
          personality: ["Mandiri", "Tenang", "Setia"],
          adoptionStatus: "available",
        },
        {
          id: `fallback-cat-5-${Date.now()}`,
          fact: "Kucing mendengkur sebagai bentuk relaksasi atau saat sakit.",
          animal: "Coco",
          category: "Mamalia",
          image: "/images/coco-siamese.png",
          source: "fallback",
          name: "Coco",
          breed: "Siamese",
          age: "2 tahun",
          location: "Medan",
          personality: ["Vokal", "Cerdas", "Ekspresif"],
          adoptionStatus: "available",
          specialNeeds: "Membutuhkan stimulasi mental yang tinggi",
        },
        {
          id: `fallback-cat-6-${Date.now()}`,
          fact: "Kucing domestik pertama kali dijinakkan di Timur Tengah sekitar 9.000 tahun lalu.",
          animal: "Shadow",
          category: "Mamalia",
          image: "/images/shadow-bombay.png",
          source: "fallback",
          name: "Shadow",
          breed: "Bombay",
          age: "3 tahun",
          location: "Semarang",
          personality: ["Loyal", "Affectionate", "Mengikuti"],
          adoptionStatus: "adopted",
        },
      ]

      setFacts(fallbackFacts)
      setFilteredFacts(fallbackFacts)
      setApiStatus("error")
      toast({
        title: "API Tidak Tersedia",
        description: "Menggunakan data fallback MeowFacts",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApiData()
  }, [])

  // Filter facts based on search and category
  useEffect(() => {
    let filtered = facts
    if (searchTerm) {
      filtered = filtered.filter(
        (fact) =>
          fact.fact.toLowerCase().includes(searchTerm.toLowerCase()) ||
          fact.animal.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (fact.name && fact.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (fact.breed && fact.breed.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }
    if (selectedCategory !== "Semua") {
      if (selectedCategory === "Tersedia") {
        filtered = filtered.filter((fact) => fact.adoptionStatus === "available")
      } else if (selectedCategory === "Proses Adopsi") {
        filtered = filtered.filter((fact) => fact.adoptionStatus === "pending")
      } else if (selectedCategory === "Sudah Diadopsi") {
        filtered = filtered.filter((fact) => fact.adoptionStatus === "adopted")
      } else {
        filtered = filtered.filter((fact) => fact.category === selectedCategory)
      }
    }
    setFilteredFacts(filtered)
  }, [searchTerm, selectedCategory, facts])

  const toggleFavorite = (factId: string, fact: AnimalFact) => {
    const isCurrentlyFavorite = favorites.includes(factId)
    let newFavorites: string[]

    if (isCurrentlyFavorite) {
      // Remove from favorites
      newFavorites = favorites.filter((id) => id !== factId)
      setFavorites(newFavorites)
      toast({
        title: "Dihapus dari favorit",
        description: `Fakta ${fact.animal} telah dihapus dari favorit Anda.`,
      })
    } else {
      // Add to favorites
      newFavorites = [...favorites, factId]
      setFavorites(newFavorites)
      toast({
        title: "Ditambahkan ke favorit",
        description: `Fakta ${fact.animal} telah ditambahkan ke favorit Anda.`,
      })
    }

    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("animalFactFavorites", JSON.stringify(newFavorites))
      // Save/update fact data
      const existingFacts = localStorage.getItem("animalFactsData")
      let factsData: AnimalFact[] = []

      if (existingFacts) {
        try {
          factsData = JSON.parse(existingFacts)
        } catch (error) {
          console.error("Error parsing existing facts:", error)
          factsData = []
        }
      }

      if (!isCurrentlyFavorite) {
        // Add fact to data if not already there
        const existingFactIndex = factsData.findIndex((f) => f.id === factId)
        if (existingFactIndex === -1) {
          factsData.push(fact)
        }
      } else {
        // Remove fact from data
        factsData = factsData.filter((f) => f.id !== factId)
      }

      localStorage.setItem("animalFactsData", JSON.stringify(factsData))
    }
  }

  const getApiStatusIcon = () => {
    if (loading) return <RefreshCw className="h-4 w-4 animate-spin text-yellow-400" />
    if (apiStatus === "success") return <Wifi className="h-4 w-4 text-green-400" />
    return <WifiOff className="h-4 w-4 text-red-400" />
  }

  const getApiStatusText = () => {
    if (loading) return "Memuat API..."
    if (apiStatus === "success") return "API Terhubung"
    return "Mode Offline"
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "available":
        return "bg-green-600/80 text-green-200 border-green-500/30"
      case "pending":
        return "bg-yellow-600/80 text-yellow-200 border-yellow-500/30"
      case "adopted":
        return "bg-gray-600/80 text-gray-300 border-gray-500/30"
      default:
        return "bg-gray-600/80 text-gray-300 border-gray-500/30"
    }
  }

  const getStatusText = (status?: string) => {
    switch (status) {
      case "available":
        return "Tersedia"
      case "pending":
        return "Proses Adopsi"
      case "adopted":
        return "Sudah Diadopsi"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <section className="py-16 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Jelajahi Fakta Kucing</h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Temukan fakta menakjubkan tentang Kucing dari API real-time dan simpan yang paling menarik!
            </p>
          </motion.div>

          {/* API Status */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="flex items-center gap-3 p-4">
                {getApiStatusIcon()}
                <span className="text-white text-sm font-medium">{getApiStatusText()}</span>
                {apiStatus === "success" && (
                  <Badge className="bg-green-600/20 text-green-300 border-green-500/30">Live API Data</Badge>
                )}
                {apiStatus === "error" && (
                  <Badge className="bg-red-600/20 text-red-300 border-red-500/30">Fallback Data</Badge>
                )}
                <Button
                  onClick={fetchApiData}
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                  disabled={loading}
                >
                  <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Cari fakta atau nama kucing..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 backdrop-blur-sm"
                />
              </div>
            </div>
            <div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white backdrop-blur-sm">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-600 backdrop-blur-lg">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category} className="text-white hover:bg-gray-800">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          {/* Results Info */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-gray-300">
              Menampilkan {filteredFacts.length} fakta Kucing
              {searchTerm && ` untuk "${searchTerm}"`}
              {selectedCategory !== "Semua" && ` dalam kategori ${selectedCategory}`}
            </p>
          </motion.div>

          {/* Facts Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                    <CardContent className="p-0">
                      <div className="h-48 bg-white/20 rounded-t-lg"></div>
                      <div className="p-6 space-y-3">
                        <div className="h-4 bg-white/20 rounded w-3/4"></div>
                        <div className="h-3 bg-white/20 rounded w-full"></div>
                        <div className="h-3 bg-white/20 rounded w-2/3"></div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : filteredFacts.length === 0 ? (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="text-6xl mb-6">🔍</div>
              <h2 className="text-2xl font-bold text-white mb-4">Tidak Ada Hasil</h2>
              <p className="text-gray-300 mb-8">Coba ubah kata kunci pencarian atau pilih kategori yang berbeda.</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("Semua")
                }}
                className="bg-gradient-to-r from-gray-600 to-white hover:from-gray-700 hover:to-gray-100 text-black"
              >
                Reset Filter
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFacts.map((fact, index) => (
                <motion.div
                  key={fact.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <motion.div
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 3 + index * 0.2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: index * 0.3,
                    }}
                  >
                    <Dialog>
                      <DialogTrigger asChild>
                        <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300 group overflow-hidden shadow-xl cursor-pointer">
                          <CardContent className="p-0">
                            <div className="relative h-48 overflow-hidden">
                              <Image
                                src={fact.image || "/placeholder.svg"}
                                alt={fact.animal}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                              {/* Badges */}
                              <div className="absolute top-3 left-3 flex gap-2">
                                <Badge className="bg-gradient-to-r from-gray-600/80 to-white/80 text-black border-0 backdrop-blur-sm">
                                  {fact.category}
                                </Badge>
                                {fact.source === "api" && (
                                  <Badge className="bg-green-600/80 text-white border-0 backdrop-blur-sm">
                                    Live API
                                  </Badge>
                                )}
                                {fact.source === "fallback" && (
                                  <Badge className="bg-orange-600/80 text-white border-0 backdrop-blur-sm">
                                    Fallback
                                  </Badge>
                                )}
                              </div>
                              {/* Favorite Button */}
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleFavorite(fact.id, fact)
                                }}
                                className="absolute top-3 right-3 text-white hover:bg-white/20 p-2 backdrop-blur-sm bg-white/10 border border-white/20 transition-all duration-200"
                              >
                                <Heart
                                  className={`h-4 w-4 transition-all duration-200 ${
                                    favorites.includes(fact.id)
                                      ? "fill-red-500 text-red-500 scale-110"
                                      : "text-gray-400 hover:text-red-400 hover:scale-105"
                                  }`}
                                />
                              </Button>
                            </div>
                            <div className="p-6">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-semibold text-white">{fact.name || fact.animal}</h3>
                                {fact.adoptionStatus && (
                                  <Badge className={`text-xs ${getStatusColor(fact.adoptionStatus)} border-0`}>
                                    {getStatusText(fact.adoptionStatus)}
                                  </Badge>
                                )}
                              </div>
                              {fact.breed && fact.age && (
                                <p className="text-gray-300 text-sm mb-2">
                                  {fact.breed} • {fact.age}
                                </p>
                              )}
                              {fact.location && (
                                <div className="flex items-center text-gray-400 text-xs mb-3">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {fact.location}
                                </div>
                              )}
                              <p className="text-gray-200 leading-relaxed text-sm">{fact.fact}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </DialogTrigger>

                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-800 text-white border-gray-700">
                        <DialogHeader>
                          <DialogTitle className="text-2xl text-white">{fact.name || fact.animal}</DialogTitle>
                          <DialogDescription className="text-gray-300">
                            {fact.breed &&
                              fact.age &&
                              fact.location &&
                              `${fact.breed} • ${fact.age} • ${fact.location}`}
                          </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6">
                          <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
                            <Image
                              src={fact.image || "/placeholder.svg"}
                              alt={fact.animal}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            {fact.adoptionStatus && (
                              <Badge className={getStatusColor(fact.adoptionStatus)}>
                                {getStatusText(fact.adoptionStatus)}
                              </Badge>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleFavorite(fact.id, fact)}
                              className="text-white hover:bg-gray-700"
                            >
                              <Heart
                                className={`h-4 w-4 mr-2 ${
                                  favorites.includes(fact.id) ? "fill-red-500 text-red-500" : "text-white"
                                }`}
                              />
                              {favorites.includes(fact.id) ? "Disukai" : "Suka"}
                            </Button>
                          </div>

                          <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4">
                            <h3 className="font-semibold mb-2 flex items-center text-blue-300">
                              <Info className="h-4 w-4 mr-2" />
                              Fakta Menarik tentang {fact.name || fact.animal}
                            </h3>
                            <p className="text-blue-100 leading-relaxed">{fact.fact}</p>
                            {fact.source === "api" && (
                              <p className="text-xs text-blue-400 mt-2 italic">
                                * Fakta ini didapat dari MeowFacts API
                              </p>
                            )}
                          </div>

                          {fact.personality && fact.personality.length > 0 && (
                            <div>
                              <h3 className="font-semibold mb-2 text-white">Kepribadian</h3>
                              <div className="flex flex-wrap gap-2">
                                {fact.personality.map((trait) => (
                                  <Badge key={trait} variant="outline" className="border-gray-600 text-gray-300">
                                    {trait}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {(fact.age || fact.location) && (
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              {fact.age && (
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                                  <span className="text-gray-400">Umur: </span>
                                  <span className="font-medium ml-1 text-white">{fact.age}</span>
                                </div>
                              )}
                              {fact.location && (
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                                  <span className="text-gray-400">Lokasi: </span>
                                  <span className="font-medium ml-1 text-white">{fact.location}</span>
                                </div>
                              )}
                            </div>
                          )}

                          {fact.specialNeeds && (
                            <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-4">
                              <h3 className="font-semibold text-yellow-300 mb-1">Kebutuhan Khusus</h3>
                              <p className="text-yellow-100 text-sm">{fact.specialNeeds}</p>
                            </div>
                          )}

                          {fact.adoptionStatus && (
                            <div className="flex gap-3 pt-4">
                              <Button
                                className="flex-1 bg-blue-600 hover:bg-blue-700"
                                disabled={fact.adoptionStatus === "adopted"}
                              >
                                {fact.adoptionStatus === "adopted"
                                  ? "Sudah Diadopsi"
                                  : fact.adoptionStatus === "pending"
                                    ? "Dalam Proses"
                                    : "Ajukan Adopsi"}
                              </Button>
                              <Button
                                variant="outline"
                                className="border-gray-600 text-white hover:bg-gray-700 bg-transparent"
                              >
                                Hubungi Pemilik
                              </Button>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {!loading && filteredFacts.length > 0 && (
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <Button
                onClick={fetchApiData}
                className="bg-gradient-to-r from-gray-600 to-white hover:from-gray-700 hover:to-gray-100 text-black"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Memuat...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Muat Ulang Data API
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
