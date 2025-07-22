"use client"

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CartItem } from "@/components/cart-item"
import { ArrowRight } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { formatPrice } from "@/lib/utils"
import { useRouter } from "next/navigation"

export default function CartDrawer() {
  const { items, totalPrice, clearCart } = useCart()
  const router = useRouter()

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Keranjang Belanja ({items.length})</Button>
      </DrawerTrigger>
      <DrawerContent className="text-foreground">
        <DrawerHeader>
          <DrawerTitle>Keranjang Belanja</DrawerTitle>
          <DrawerDescription>Periksa kembali barang yang ingin anda pesan.</DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-[400px] md:h-[500px] p-4">
          {items.length > 0 ? (
            items.map((item) => <CartItem key={item.id} item={item} />)
          ) : (
            <div className="flex h-full items-center justify-center text-sm">Keranjang belanja anda kosong.</div>
          )}
        </ScrollArea>
        <Separator />
        <DrawerFooter>
          <div className="flex w-full items-center justify-between gap-2">
            <div className="flex flex-col space-y-1 text-sm">
              <p className="font-medium">Total</p>
              <p className="text-muted-foreground">Termasuk pajak dan biaya pengiriman</p>
            </div>
            <p className="text-xl font-bold">{formatPrice(totalPrice)}</p>
          </div>
        </DrawerFooter>
        <DrawerFooter>
          <Button
            className="w-full bg-[#0a2e52] hover:bg-blue-900 text-white flex items-center justify-center gap-2"
            onClick={() => {
              onClose()
              router.push("/checkout")
            }}
          >
            Lanjut ke Pembayaran
            <ArrowRight className="h-4 w-4" />
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function onClose() {
  const element = document.querySelector("[data-radix-popper-content-wrapper]") as HTMLElement
  if (element) {
    element.style.display = "none"
  }
}
