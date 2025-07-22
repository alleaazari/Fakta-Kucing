"use client"

import type { Product } from "@/lib/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface CartStore {
  items: (Product & { quantity: number })[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  totalPrice: number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalPrice: 0,
      addItem: (product) => {
        const currentItems = get().items
        const existingItem = currentItems.find((item) => item.id === product.id)

        if (existingItem) {
          // If item already exists, increase quantity
          return set({
            items: currentItems.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
            ),
            totalPrice: get().totalPrice + product.price,
          })
        }

        // Otherwise, add new item with quantity 1
        set({
          items: [...currentItems, { ...product, quantity: 1 }],
          totalPrice: get().totalPrice + product.price,
        })
      },
      removeItem: (productId) => {
        const currentItems = get().items
        const itemToRemove = currentItems.find((item) => item.id === productId)

        if (itemToRemove) {
          set({
            items: currentItems.filter((item) => item.id !== productId),
            totalPrice: get().totalPrice - itemToRemove.price * itemToRemove.quantity,
          })
        }
      },
      updateQuantity: (productId, quantity) => {
        const currentItems = get().items
        const itemToUpdate = currentItems.find((item) => item.id === productId)

        if (itemToUpdate) {
          const priceDifference = (quantity - itemToUpdate.quantity) * itemToUpdate.price

          set({
            items: currentItems.map((item) => (item.id === productId ? { ...item, quantity } : item)),
            totalPrice: get().totalPrice + priceDifference,
          })
        }
      },
      clearCart: () => set({ items: [], totalPrice: 0 }),
    }),
    {
      name: "cart-storage",
    },
  ),
)
