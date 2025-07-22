"use client"

import { useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Check, ShoppingBag, ArrowRight, MapPin, Truck, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function ConfirmationPage() {
  const router = useRouter()
  const orderNumber = `AC-${Math.floor(100000 + Math.random() * 900000)}`
  const orderDate = new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Format harga ke Rupiah
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Simulasi item yang dibeli
  const items = [
    {
      id: 1,
      name: "Set Keranjang Serat Kelapa",
      price: 299990,
      quantity: 1,
      image: "/images/product-1.webp",
    },
    {
      id: 2,
      name: "Set Peralatan Makan Bambu",
      price: 199990,
      quantity: 2,
      image: "/images/product-2.webp",
    },
  ]

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 59990
  const tax = subtotal * 0.11
  const total = subtotal + shipping + tax

  // Hapus data checkout yang tersimpan saat konfirmasi
  useEffect(() => {
    localStorage.removeItem("savedCheckout")
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-[#40E0D0]/5 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="bg-[#0a2e52] text-white p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <Check className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold mb-2">Pesanan Berhasil!</h1>
                <p className="text-blue-100 max-w-md mx-auto">
                  Terima kasih atas pembelian Anda. Pesanan Anda telah diterima dan sedang diproses.
                </p>
              </div>

              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#40E0D0]/10 flex items-center justify-center mr-3">
                        <ShoppingBag className="h-5 w-5 text-[#40E0D0]" />
                      </div>
                      <div>
                        <h2 className="font-bold text-lg">Informasi Pesanan</h2>
                        <p className="text-gray-500 text-sm">Detail pesanan Anda</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Nomor Pesanan</p>
                          <p className="font-medium">{orderNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Tanggal</p>
                          <p className="font-medium">{orderDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Total</p>
                          <p className="font-medium">{formatPrice(total)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Metode Pembayaran</p>
                          <p className="font-medium">Kartu Kredit</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#40E0D0]/10 flex items-center justify-center mr-3">
                        <MapPin className="h-5 w-5 text-[#40E0D0]" />
                      </div>
                      <div>
                        <h2 className="font-bold text-lg">Alamat Pengiriman</h2>
                        <p className="text-gray-500 text-sm">Lokasi pengiriman pesanan</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="font-medium">John Doe</p>
                      <p className="text-gray-600 mt-1">123 Eco Street</p>
                      <p className="text-gray-600">Green Valley, West Java 12345</p>
                      <p className="text-gray-600">Indonesia</p>
                      <p className="text-gray-600 mt-2">john.doe@example.com</p>
                      <p className="text-gray-600">+62 123 456 7890</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#40E0D0]/10 flex items-center justify-center mr-3">
                        <Truck className="h-5 w-5 text-[#40E0D0]" />
                      </div>
                      <div>
                        <h2 className="font-bold text-lg">Informasi Pengiriman</h2>
                        <p className="text-gray-500 text-sm">Detail pengiriman pesanan</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <Check className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">Pesanan Dikonfirmasi</p>
                            <p className="text-sm text-gray-500">{orderDate}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                            <Calendar className="h-4 w-4 text-gray-500" />
                          </div>
                          <div>
                            <p className="font-medium">Sedang Diproses</p>
                            <p className="text-sm text-gray-500">Estimasi: 1-2 hari</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                            <Truck className="h-4 w-4 text-gray-500" />
                          </div>
                          <div>
                            <p className="font-medium">Pengiriman</p>
                            <p className="text-sm text-gray-500">Estimasi: 3-5 hari kerja</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#40E0D0]/10 flex items-center justify-center mr-3">
                        <Clock className="h-5 w-5 text-[#40E0D0]" />
                      </div>
                      <div>
                        <h2 className="font-bold text-lg">Estimasi Pengiriman</h2>
                        <p className="text-gray-500 text-sm">Waktu pengiriman pesanan</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="font-medium">Pengiriman Standar</p>
                      <p className="text-gray-600 mt-1">3-5 hari kerja</p>
                      <p className="text-gray-600">Estimasi tiba: 25-27 Mei 2023</p>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="font-bold text-lg mb-4">Ringkasan Pesanan</h2>
                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="relative h-16 w-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-gray-500 text-sm">Jumlah: {item.quantity}</p>
                          <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Pengiriman</span>
                      <span>{formatPrice(shipping)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">PPN (11%)</span>
                      <span>{formatPrice(tax)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => router.push("/profile?tab=orders")}
                    variant="outline"
                    className="border-[#40E0D0] text-[#0a2e52] hover:bg-[#40E0D0]/10 rounded-full"
                  >
                    Lihat Pesanan Saya
                  </Button>
                  <Button
                    onClick={() => router.push("/")}
                    className="bg-[#0a2e52] hover:bg-blue-900 text-white rounded-full"
                  >
                    Lanjutkan Belanja
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
