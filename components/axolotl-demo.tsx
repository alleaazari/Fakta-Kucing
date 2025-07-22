"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RefreshCw, AlertTriangle, Globe, Heart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AxolotlApiResponse {
  facts: string[]
  images: string[]
}

interface AxolotlFact {
  id: string
  fact: string
  animal: string
  category: string
  image: string
}

// Fallback data yang sesuai dengan API asli
const fallbackAxolotlData = {
  facts: [
    "Axolotls are critically endangered in the wild but common in laboratories.",
    "Axolotls can regenerate their limbs, organs, and even parts of their brain.",
    "Axolotls remain aquatic and gilled throughout their lives.",
  ],
  images: [
    "/placeholder.svg?height=200&width=300&text=Axolotl+1",
    "/placeholder.svg?height=200&width=300&text=Axolotl+2",
    "/placeholder.svg?height=200&width=300&text=Axolotl+3",
  ],
}

// Mock data untuk demo mode
const mockAxolotlData = {
  facts: [
    "Axolotls are critically endangered in the wild but common in laboratories.",
    "Axolotls can regenerate their limbs, organs, and even parts of their brain.",
    "Axolotls remain aquatic and gilled throughout their lives.",
  ],
  images: [
    "/placeholder.svg?height=200&width=300&text=Mock+Axolotl+1",
    "/placeholder.svg?height=200&width=300&text=Mock+Axolotl+2",
    "/placeholder.svg?height=200&width=300&text=Mock+Axolotl+3",
  ],
}

export default function AxolotlDemo() {
  const [apiData, setApiData] = useState<AxolotlApiResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [apiStatus, setApiStatus] = useState<"loading" | "success" | "error" | "demo">("loading")
  const [selectedApi, setSelectedApi] = useState("axolotl")
  const [displayFacts, setDisplayFacts] = useState<string[]>([])
  const [isDemoMode, setIsDemoMode] = useState(false)
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

  const fetchAxolotlData = async () => {
  setLoading(true);
  setApiStatus("loading");

  try {
    // Jika demo mode, gunakan mock data
    if (isDemoMode) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulasi loading
      setApiData(mockAxolotlData);
      setDisplayFacts(mockAxolotlData.facts);
      setApiStatus("demo");
      setLoading(false);
      return;
    }

    // Coba fetch dari API MeowFacts
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch("https://meowfacts.herokuapp.com/?count=6", {
      signal: controller.signal,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Struktur data: { data: ["fact1", "fact2", ...] }
    if (data && Array.isArray(data.data)) {
      const formattedData = {
        facts: data.data,
        images: [], // kosongkan atau isi kalau ada gambar
      };

      setApiData(formattedData);
      setDisplayFacts(formattedData.facts);
      setApiStatus("success");
    } else {
      throw new Error("Invalid API response format");
    }
  } catch (error) {
    console.warn("Axolotl API failed, using fallback:", error);
    setApiData(fallbackAxolotlData);
    setDisplayFacts(fallbackAxolotlData.facts);
    setApiStatus("error");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchAxolotlData()
  }, [isDemoMode])

  const toggleDemoMode = () => {
    setIsDemoMode(!isDemoMode)
  }

  const toggleFavorite = (fact: string, index: number) => {
    const factId = `axolotl-fact-${index}`
    const newFavorites = favorites.includes(factId) ? favorites.filter((id) => id !== factId) : [...favorites, factId]

    setFavorites(newFavorites)

    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("animalFactFavorites", JSON.stringify(newFavorites))

      // Also save the actual fact data for the favorites page
      const existingFacts = localStorage.getItem("animalFactsData")
      let factsData: AxolotlFact[] = []

      if (existingFacts) {
        try {
          factsData = JSON.parse(existingFacts)
        } catch (error) {
          console.error("Error parsing existing facts:", error)
        }
      }

      const newFact: AxolotlFact = {
        id: factId,
        fact: fact,
        animal: "Axolotl",
        category: "Amfibi",
        image: "/placeholder.svg?height=200&width=300&text=Axolotl",
      }

      if (!favorites.includes(factId)) {
        // Add to favorites
        factsData = factsData.filter((f) => f.id !== factId) // Remove if exists
        factsData.push(newFact)
        toast({
          title: "Ditambahkan ke favorit",
          description: "Fakta Axolotl telah ditambahkan ke favorit Anda.",
        })
      } else {
        // Remove from favorites
        factsData = factsData.filter((f) => f.id !== factId)
        toast({
          title: "Dihapus dari favorit",
          description: "Fakta Axolotl telah dihapus dari favorit Anda.",
        })
      }

      localStorage.setItem("animalFactsData", JSON.stringify(factsData))
    }
  }

  const getStatusBadge = () => {
    if (loading)
      return { text: "Loading...", color: "bg-yellow-500", icon: <RefreshCw className="h-3 w-3 animate-spin" /> }
    if (apiStatus === "success")
      return { text: "API Connected", color: "bg-green-500", icon: <Globe className="h-3 w-3" /> }
    if (apiStatus === "demo")
      return { text: "Demo Mode", color: "bg-yellow-500", icon: <AlertTriangle className="h-3 w-3" /> }
    return { text: "API Offline", color: "bg-red-500", icon: <AlertTriangle className="h-3 w-3" /> }
  }

  const statusBadge = getStatusBadge()

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Card className="bg-gradient-to-br from-black via-gray-900 to-white border-gray-600/30 shadow-2xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-xl font-bold flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Demo API Real-Time
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
            </CardTitle>
            <div className="flex items-center gap-3">
              <Select value={selectedApi} onValueChange={setSelectedApi}>
                <SelectTrigger className="w-40 bg-black/50 border-gray-600/50 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-600">
                  <SelectItem value="axolotl" className="text-white hover:bg-gray-800">
                      😸Cat API
                  </SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={fetchAxolotlData}
                size="sm"
                variant="ghost"
                className="text-white hover:bg-gray-800/50"
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              </Button>
            </div>
          </div>
          <p className="text-gray-300 text-sm mt-2">
            Pilih sumber API untuk melihat bagaimana aplikasi menangani berbagai kondisi jaringan
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Demo Mode Toggle */}
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${statusBadge.color}`}></div>
              <span className="text-white text-sm font-medium">{isDemoMode ? "Mode Demo" : statusBadge.text}</span>
            </div>
            <Button
              onClick={toggleDemoMode}
              size="sm"
              className={`${
                isDemoMode ? "bg-yellow-600 hover:bg-yellow-700" : "bg-gray-600 hover:bg-gray-700"
              } text-white`}
            >
              {isDemoMode ? "Demo Mode" : "Live Mode"}
            </Button>
          </div>

          {/* Facts Display */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="h-24 bg-white/10 rounded-lg border border-gray-600/30"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {displayFacts.slice(0, 3).map((fact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-gray-600/30 hover:bg-white/20 transition-all duration-300"
                >
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFavorite(fact, index)}
                    className="absolute top-2 right-2 text-white hover:bg-white/20 p-1 h-8 w-8"
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        favorites.includes(`axolotl-fact-${index}`)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-400 hover:text-red-400"
                      }`}
                    />
                  </Button>
                  <p className="text-gray-100 text-sm leading-relaxed pr-8">• {fact}</p>
                </motion.div>
              ))}
            </div>
          )}

          {/* API Source Info */}
          <div className="text-center space-y-2">
            <p className="text-gray-300 text-sm">
              {isDemoMode
                ? "Mencoba beberapa endpoint Axolotl API"
                : apiStatus === "success"
                  ? "Data berhasil dimuat dari API"
                  : "Menggunakan data fallback"}
            </p>
            <p className="text-gray-400 text-xs">
              Source: {isDemoMode ? "mock" : apiStatus === "success" ? "api" : "fallback"}
            </p>
          </div>

          {/* API Status Details */}
          {apiStatus === "error" && (
            <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-3">
              <p className="text-red-300 text-sm text-center">⚠️ API tidak tersedia - Menggunakan data fallback</p>
            </div>
          )}

          {apiStatus === "success" && (
            <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-3">
              <p className="text-green-300 text-sm text-center">✅ API berhasil terhubung - Data real-time tersedia</p>
            </div>
          )}

          {apiStatus === "demo" && (
            <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-3">
              <p className="text-yellow-300 text-sm text-center">🧪 Mode Demo - Menggunakan data simulasi</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
