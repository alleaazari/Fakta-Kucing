"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Clock, ArrowRight, X } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { id } from "date-fns/locale"
import { toast } from "@/components/ui/use-toast"

export default function SavedCheckouts() {
  const router = useRouter()
  const [savedCheckout, setSavedCheckout] = useState(null)
  const [timeAgo, setTimeAgo] = useState("")

  useEffect(() => {
    // Periksa apakah ada checkout yang tersimpan
    const savedData = localStorage.getItem("savedCheckout")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        const savedTime = new Date(parsedData.timestamp)
        const currentTime = new Date()

        // Hanya tampilkan jika checkout disimpan dalam 24 jam terakhir
        if (currentTime.getTime() - savedTime.getTime() < 24 * 60 * 60 * 1000) {
          setSavedCheckout(parsedData)
          setTimeAgo(formatDistanceToNow(savedTime, { addSuffix: true, locale: id }))
        } else {
          // Hapus data yang sudah lebih dari 24 jam
          localStorage.removeItem("savedCheckout")
        }
      } catch (error) {
        console.error("Error checking saved checkout:", error)
      }
    }
  }, [])

  const continueSavedCheckout = () => {
    router.push("/checkout/process")
  }

  const clearSavedCheckout = () => {
    localStorage.removeItem("savedCheckout")
    setSavedCheckout(null)
    toast({
      title: "Checkout Dihapus",
      description: "Checkout yang tersimpan telah dihapus.",
    })
  }

  if (!savedCheckout) return null

  return (
    <Card className="mb-6 border-yellow-200 bg-yellow-50">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-yellow-800 flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5 text-yellow-600" />
            Checkout yang Belum Selesai
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={clearSavedCheckout} className="h-8 w-8 p-0 text-yellow-700">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription className="text-yellow-700 flex items-center mt-1">
          <Clock className="mr-1 h-4 w-4" />
          Disimpan {timeAgo}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-yellow-800 mb-3">
          <p>
            Anda memiliki proses checkout yang belum selesai pada langkah:{" "}
            <strong>
              {savedCheckout.activeStep === "shipping"
                ? "Pengiriman"
                : savedCheckout.activeStep === "payment"
                  ? "Pembayaran"
                  : savedCheckout.activeStep === "review"
                    ? "Ulasan"
                    : "Konfirmasi"}
            </strong>
          </p>
        </div>
        <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white" onClick={continueSavedCheckout}>
          Lanjutkan Checkout
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}
