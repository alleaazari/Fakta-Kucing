"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const { toast } = useToast()

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toast({
      title: "Ditambahkan ke keranjang",
      description: `${product.name} telah ditambahkan ke keranjang Anda.`,
    })
  }

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
    toast({
      title: isFavorite ? "Dihapus dari favorit" : "Ditambahkan ke favorit",
      description: `${product.name} telah ${isFavorite ? "dihapus dari" : "ditambahkan ke"} favorit Anda.`,
    })
  }

  return (
    <motion.div
      className="group relative bg-white rounded-xl overflow-hidden border border-gray-100 transition-all hover:shadow-lg"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      <div className="aspect-square relative overflow-hidden">
        <Link href={`/products/${product.id}`} className="absolute inset-0 z-10">
          <span className="sr-only">Lihat {product.name}</span>
        </Link>
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute top-2 right-2 z-20">
          <Button
            size="icon"
            variant="ghost"
            className={`h-8 w-8 rounded-full ${isFavorite ? "bg-red-100 text-red-500" : "bg-white/80 text-gray-600 hover:text-red-500"}`}
            onClick={toggleFavorite}
          >
            <Heart className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} />
            <span className="sr-only">Tambahkan ke favorit</span>
          </Button>
        </div>

        {product.isNew && (
          <Badge className="absolute top-2 left-2 bg-[#40E0D0] text-[#0a2e52] hover:bg-[#3acfc0]">Baru</Badge>
        )}

        {product.discount > 0 && (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">-{product.discount}%</Badge>
        )}

        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
        >
          <Button onClick={addToCart} className="bg-white text-[#0a2e52] hover:bg-[#40E0D0] rounded-full">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Tambahkan ke Keranjang
          </Button>
        </motion.div>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2 line-clamp-1">{product.category}</p>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900">Rp{product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">Rp{product.originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
