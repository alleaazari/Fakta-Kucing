"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { formatPrice } from "@/lib/utils"
import type { Product } from "@/lib/types"

interface CartItemProps {
  item: Product & { quantity: number }
}

export function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQuantity } = useCart()

  const handleRemove = () => {
    removeItem(item.id)
  }

  const handleIncreaseQuantity = () => {
    updateQuantity(item.id, item.quantity + 1)
  }

  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1)
    } else {
      removeItem(item.id)
    }
  }

  return (
    <div className="flex items-start gap-4 py-4">
      <div className="relative h-16 w-16 overflow-hidden rounded-md border">
        <Image
          src={item.image || "/placeholder.svg?height=64&width=64"}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex justify-between">
          <h3 className="font-medium">{item.name}</h3>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={handleRemove}>
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Hapus</span>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          {formatPrice(item.price)} x {item.quantity}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <Button variant="outline" size="icon" className="h-7 w-7" onClick={handleDecreaseQuantity}>
            <Minus className="h-3 w-3" />
            <span className="sr-only">Kurangi jumlah</span>
          </Button>
          <span className="w-8 text-center text-sm">{item.quantity}</span>
          <Button variant="outline" size="icon" className="h-7 w-7" onClick={handleIncreaseQuantity}>
            <Plus className="h-3 w-3" />
            <span className="sr-only">Tambah jumlah</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
