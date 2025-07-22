"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ChevronLeft, CreditCard, Truck, Check, ShoppingBag, Shield, ArrowRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CheckoutProcessPage() {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState<"shipping" | "payment" | "review" | "confirmation">("shipping")
  const [isProcessing, setIsProcessing] = useState(false)
  const [hasSavedCheckout, setHasSavedCheckout] = useState(false)

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Indonesia",
  })

  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [shippingMethod, setShippingMethod] = useState("standard")

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvc: "",
  })

  // Fungsi untuk menyimpan data checkout ke localStorage
  const saveCheckoutData = useCallback(() => {
    const checkoutData = {
      activeStep,
      shippingInfo,
      paymentMethod,
      shippingMethod,
      cardDetails,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem("savedCheckout", JSON.stringify(checkoutData))
    toast({
      title: "Checkout Disimpan",
      description: "Anda dapat melanjutkan checkout ini nanti.",
    })
  }, [activeStep, shippingInfo, paymentMethod, shippingMethod, cardDetails])

  // Fungsi untuk memuat data checkout dari localStorage
  const loadCheckoutData = useCallback(() => {
    const savedData = localStorage.getItem("savedCheckout")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setActiveStep(parsedData.activeStep)
        setShippingInfo(parsedData.shippingInfo)
        setPaymentMethod(parsedData.paymentMethod)
        setShippingMethod(parsedData.shippingMethod)
        setCardDetails(parsedData.cardDetails)
        setHasSavedCheckout(false)

        toast({
          title: "Checkout Dilanjutkan",
          description: "Anda melanjutkan proses checkout yang tersimpan.",
        })

        // Hapus data tersimpan setelah dimuat
        localStorage.removeItem("savedCheckout")
      } catch (error) {
        console.error("Error loading saved checkout:", error)
      }
    }
  }, [])

  // Fungsi untuk menghapus data checkout tersimpan
  const clearSavedCheckout = useCallback(() => {
    localStorage.removeItem("savedCheckout")
    setHasSavedCheckout(false)
  }, [])

  useEffect(() => {
    // Periksa apakah ada checkout yang tersimpan
    const savedData = localStorage.getItem("savedCheckout")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        const savedTime = new Date(parsedData.timestamp)
        const currentTime = new Date()

        // Hanya tampilkan banner jika checkout disimpan dalam 24 jam terakhir
        if (currentTime.getTime() - savedTime.getTime() < 24 * 60 * 60 * 1000) {
          setHasSavedCheckout(true)
        } else {
          // Hapus data yang sudah lebih dari 24 jam
          localStorage.removeItem("savedCheckout")
        }
      } catch (error) {
        console.error("Error checking saved checkout:", error)
      }
    }
  }, [])

  // Sample cart items
  const cartItems = [
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

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = shippingMethod === "express" ? 129990 : 59990
  const tax = subtotal * 0.11 // PPN 11%
  const total = subtotal + shipping + tax

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setShippingInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleCardInputChange = (e) => {
    const { name, value } = e.target
    setCardDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleShippingSubmit = (e) => {
    e.preventDefault()
    setActiveStep("payment")
    window.scrollTo(0, 0)
  }

  const handlePaymentSubmit = (e) => {
    e.preventDefault()
    setActiveStep("review")
    window.scrollTo(0, 0)
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setActiveStep("confirmation")
      window.scrollTo(0, 0)

      toast({
        title: "Pesanan Berhasil!",
        description: "Pesanan Anda telah berhasil diproses.",
      })
    }, 2000)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-[#40E0D0]/5 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {hasSavedCheckout && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <CreditCard className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-blue-900">Anda memiliki checkout yang belum selesai</h3>
                <p className="text-blue-700 text-sm">
                  Lanjutkan proses checkout Anda dari langkah terakhir yang disimpan.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-blue-300 text-blue-700 hover:bg-blue-100"
                onClick={loadCheckoutData}
              >
                Lanjutkan
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-700 hover:bg-blue-100"
                onClick={clearSavedCheckout}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-8">
            <Link href="/cart" className="text-blue-600 hover:text-blue-800 flex items-center">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Kembali ke Keranjang
            </Link>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Checkout</h1>
            <div className="flex justify-center items-center gap-2 md:gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activeStep === "shipping" ||
                    activeStep === "payment" ||
                    activeStep === "review" ||
                    activeStep === "confirmation"
                      ? "bg-[#40E0D0] text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {activeStep === "shipping" ? "1" : <Check className="h-4 w-4" />}
                </div>
                <span className="text-sm mt-1">Pengiriman</span>
              </div>
              <div className="w-16 h-0.5 bg-gray-200">
                <div
                  className={`h-full bg-[#40E0D0] transition-all ${
                    activeStep === "payment" || activeStep === "review" || activeStep === "confirmation"
                      ? "w-full"
                      : "w-0"
                  }`}
                />
              </div>
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activeStep === "payment" || activeStep === "review" || activeStep === "confirmation"
                      ? "bg-[#40E0D0] text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {activeStep === "payment" ? "2" : activeStep === "shipping" ? "2" : <Check className="h-4 w-4" />}
                </div>
                <span className="text-sm mt-1">Pembayaran</span>
              </div>
              <div className="w-16 h-0.5 bg-gray-200">
                <div
                  className={`h-full bg-[#40E0D0] transition-all ${
                    activeStep === "review" || activeStep === "confirmation" ? "w-full" : "w-0"
                  }`}
                />
              </div>
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activeStep === "review" || activeStep === "confirmation"
                      ? "bg-[#40E0D0] text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {activeStep === "review" ? "3" : activeStep === "confirmation" ? <Check className="h-4 w-4" /> : "3"}
                </div>
                <span className="text-sm mt-1">Ulasan</span>
              </div>
              <div className="w-16 h-0.5 bg-gray-200">
                <div
                  className={`h-full bg-[#40E0D0] transition-all ${activeStep === "confirmation" ? "w-full" : "w-0"}`}
                />
              </div>
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activeStep === "confirmation" ? "bg-[#40E0D0] text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  4
                </div>
                <span className="text-sm mt-1">Konfirmasi</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {activeStep === "shipping" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Truck className="mr-2 h-5 w-5 text-[#40E0D0]" />
                        Informasi Pengiriman
                      </CardTitle>
                      <CardDescription>Masukkan detail pengiriman Anda</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleShippingSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">Nama Depan</Label>
                            <Input
                              id="firstName"
                              name="firstName"
                              value={shippingInfo.firstName}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Nama Belakang</Label>
                            <Input
                              id="lastName"
                              name="lastName"
                              value={shippingInfo.lastName}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Alamat Email</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={shippingInfo.email}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Nomor Telepon</Label>
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={shippingInfo.phone}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="address">Alamat Lengkap</Label>
                          <Input
                            id="address"
                            name="address"
                            value={shippingInfo.address}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="space-y-2 col-span-2">
                            <Label htmlFor="city">Kota</Label>
                            <Input
                              id="city"
                              name="city"
                              value={shippingInfo.city}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">Provinsi</Label>
                            <Input
                              id="state"
                              name="state"
                              value={shippingInfo.state}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="zipCode">Kode Pos</Label>
                            <Input
                              id="zipCode"
                              name="zipCode"
                              value={shippingInfo.zipCode}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="country">Negara</Label>
                          <Input
                            id="country"
                            name="country"
                            value={shippingInfo.country}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <div className="space-y-3">
                          <Label>Metode Pengiriman</Label>
                          <RadioGroup
                            value={shippingMethod}
                            onValueChange={setShippingMethod}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                          >
                            <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-[#40E0D0] transition-colors">
                              <RadioGroupItem value="standard" id="standard" />
                              <Label htmlFor="standard" className="flex-1 cursor-pointer">
                                <div className="font-medium">Pengiriman Standar</div>
                                <div className="text-sm text-gray-500">3-5 hari kerja</div>
                                <div className="font-medium mt-1">{formatPrice(59990)}</div>
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-[#40E0D0] transition-colors">
                              <RadioGroupItem value="express" id="express" />
                              <Label htmlFor="express" className="flex-1 cursor-pointer">
                                <div className="font-medium">Pengiriman Ekspres</div>
                                <div className="text-sm text-gray-500">1-2 hari kerja</div>
                                <div className="font-medium mt-1">{formatPrice(129990)}</div>
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-[#0a2e52] hover:bg-blue-900 text-white rounded-full h-12"
                        >
                          Lanjut ke Pembayaran
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <div className="flex justify-center mt-4">
                          <Button
                            type="button"
                            variant="ghost"
                            className="text-gray-500 hover:text-gray-700"
                            onClick={saveCheckoutData}
                          >
                            Simpan & Lanjutkan Nanti
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {activeStep === "payment" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <CreditCard className="mr-2 h-5 w-5 text-[#40E0D0]" />
                        Metode Pembayaran
                      </CardTitle>
                      <CardDescription>Pilih metode pembayaran yang Anda inginkan</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handlePaymentSubmit} className="space-y-6">
                        <Tabs defaultValue="credit-card" onValueChange={setPaymentMethod}>
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="credit-card">Kartu Kredit</TabsTrigger>
                            <TabsTrigger value="bank-transfer">Transfer Bank</TabsTrigger>
                            <TabsTrigger value="e-wallet">E-Wallet</TabsTrigger>
                          </TabsList>

                          <TabsContent value="credit-card" className="space-y-4 mt-4">
                            <div className="space-y-2">
                              <Label htmlFor="cardName">Nama pada Kartu</Label>
                              <Input
                                id="cardName"
                                name="cardName"
                                value={cardDetails.cardName}
                                onChange={handleCardInputChange}
                                placeholder="John Doe"
                                required
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="cardNumber">Nomor Kartu</Label>
                              <Input
                                id="cardNumber"
                                name="cardNumber"
                                value={cardDetails.cardNumber}
                                onChange={handleCardInputChange}
                                placeholder="1234 5678 9012 3456"
                                required
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="expiry">Tanggal Kadaluarsa</Label>
                                <Input
                                  id="expiry"
                                  name="expiry"
                                  value={cardDetails.expiry}
                                  onChange={handleCardInputChange}
                                  placeholder="MM/YY"
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="cvc">CVC</Label>
                                <Input
                                  id="cvc"
                                  name="cvc"
                                  value={cardDetails.cvc}
                                  onChange={handleCardInputChange}
                                  placeholder="123"
                                  required
                                />
                              </div>
                            </div>

                            <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                              <Shield className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                              <p className="text-sm text-blue-700">
                                Informasi pembayaran Anda aman. Kami menggunakan enkripsi standar industri untuk
                                melindungi data Anda.
                              </p>
                            </div>
                          </TabsContent>

                          <TabsContent value="bank-transfer" className="space-y-4 mt-4">
                            <div className="space-y-4">
                              <RadioGroup defaultValue="bca">
                                <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-[#40E0D0] transition-colors">
                                  <RadioGroupItem value="bca" id="bca" />
                                  <Label htmlFor="bca" className="flex-1 cursor-pointer">
                                    <div className="font-medium">Bank BCA</div>
                                    <div className="text-sm text-gray-500">Transfer ke rekening BCA</div>
                                  </Label>
                                  <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
                                    <span className="text-xs font-bold">BCA</span>
                                  </div>
                                </div>

                                <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-[#40E0D0] transition-colors mt-2">
                                  <RadioGroupItem value="mandiri" id="mandiri" />
                                  <Label htmlFor="mandiri" className="flex-1 cursor-pointer">
                                    <div className="font-medium">Bank Mandiri</div>
                                    <div className="text-sm text-gray-500">Transfer ke rekening Mandiri</div>
                                  </Label>
                                  <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
                                    <span className="text-xs font-bold">MDR</span>
                                  </div>
                                </div>

                                <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-[#40E0D0] transition-colors mt-2">
                                  <RadioGroupItem value="bni" id="bni" />
                                  <Label htmlFor="bni" className="flex-1 cursor-pointer">
                                    <div className="font-medium">Bank BNI</div>
                                    <div className="text-sm text-gray-500">Transfer ke rekening BNI</div>
                                  </Label>
                                  <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
                                    <span className="text-xs font-bold">BNI</span>
                                  </div>
                                </div>
                              </RadioGroup>

                              <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-600 mb-2">
                                  Instruksi pembayaran akan dikirimkan ke email Anda setelah pesanan dikonfirmasi.
                                </p>
                                <p className="text-sm text-gray-600">
                                  Harap selesaikan pembayaran dalam waktu 24 jam untuk menghindari pembatalan otomatis.
                                </p>
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="e-wallet" className="space-y-4 mt-4">
                            <RadioGroup defaultValue="gopay">
                              <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-[#40E0D0] transition-colors">
                                <RadioGroupItem value="gopay" id="gopay" />
                                <Label htmlFor="gopay" className="flex-1 cursor-pointer">
                                  <div className="font-medium">GoPay</div>
                                  <div className="text-sm text-gray-500">Bayar dengan GoPay</div>
                                </Label>
                                <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
                                  <span className="text-xs font-bold">GP</span>
                                </div>
                              </div>

                              <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-[#40E0D0] transition-colors mt-2">
                                <RadioGroupItem value="ovo" id="ovo" />
                                <Label htmlFor="ovo" className="flex-1 cursor-pointer">
                                  <div className="font-medium">OVO</div>
                                  <div className="text-sm text-gray-500">Bayar dengan OVO</div>
                                </Label>
                                <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
                                  <span className="text-xs font-bold">OVO</span>
                                </div>
                              </div>

                              <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-[#40E0D0] transition-colors mt-2">
                                <RadioGroupItem value="dana" id="dana" />
                                <Label htmlFor="dana" className="flex-1 cursor-pointer">
                                  <div className="font-medium">DANA</div>
                                  <div className="text-sm text-gray-500">Bayar dengan DANA</div>
                                </Label>
                                <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
                                  <span className="text-xs font-bold">DANA</span>
                                </div>
                              </div>
                            </RadioGroup>

                            <div className="p-4 bg-gray-50 rounded-lg">
                              <p className="text-sm text-gray-600">
                                Anda akan diarahkan ke aplikasi e-wallet untuk menyelesaikan pembayaran setelah
                                mengkonfirmasi pesanan.
                              </p>
                            </div>
                          </TabsContent>
                        </Tabs>

                        <div className="flex flex-col sm:flex-row gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            className="flex-1 border-gray-300 rounded-full"
                            onClick={() => setActiveStep("shipping")}
                          >
                            Kembali ke Pengiriman
                          </Button>
                          <Button
                            type="submit"
                            className="flex-1 bg-[#0a2e52] hover:bg-blue-900 text-white rounded-full"
                          >
                            Lanjut ke Ulasan
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex justify-center mt-4">
                          <Button
                            type="button"
                            variant="ghost"
                            className="text-gray-500 hover:text-gray-700"
                            onClick={saveCheckoutData}
                          >
                            Simpan & Lanjutkan Nanti
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {activeStep === "review" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Ulasan Pesanan</CardTitle>
                      <CardDescription>
                        Periksa kembali detail pesanan Anda sebelum menyelesaikan pembayaran
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleReviewSubmit} className="space-y-6">
                        <div className="space-y-6">
                          <div>
                            <h3 className="font-medium text-lg mb-3">Produk</h3>
                            <div className="space-y-4">
                              {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                  <div className="relative h-16 w-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                                    <Image
                                      src={item.image || "/placeholder.svg"}
                                      alt={item.name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-medium text-sm">{item.name}</h4>
                                    <p className="text-gray-500 text-sm">Jumlah: {item.quantity}</p>
                                    <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <Separator />

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h3 className="font-medium text-lg mb-3">Informasi Pengiriman</h3>
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="font-medium">
                                  {shippingInfo.firstName} {shippingInfo.lastName}
                                </p>
                                <p className="text-gray-600 mt-1">{shippingInfo.address}</p>
                                <p className="text-gray-600">
                                  {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                                </p>
                                <p className="text-gray-600">{shippingInfo.country}</p>
                                <p className="text-gray-600 mt-2">{shippingInfo.email}</p>
                                <p className="text-gray-600">{shippingInfo.phone}</p>
                              </div>
                            </div>

                            <div>
                              <h3 className="font-medium text-lg mb-3">Metode Pengiriman</h3>
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="font-medium">
                                  {shippingMethod === "standard" ? "Pengiriman Standar" : "Pengiriman Ekspres"}
                                </p>
                                <p className="text-gray-600 mt-1">
                                  {shippingMethod === "standard" ? "3-5 hari kerja" : "1-2 hari kerja"}
                                </p>
                                <p className="font-medium mt-2">
                                  {formatPrice(shippingMethod === "standard" ? 59990 : 129990)}
                                </p>
                              </div>

                              <h3 className="font-medium text-lg mb-3 mt-4">Metode Pembayaran</h3>
                              <div className="bg-gray-50 p-4 rounded-lg">
                                {paymentMethod === "credit-card" && (
                                  <>
                                    <p className="font-medium">Kartu Kredit</p>
                                    <p className="text-gray-600 mt-1">
                                      **** **** **** {cardDetails.cardNumber.slice(-4) || "1234"}
                                    </p>
                                    <p className="text-gray-600">{cardDetails.cardName || "John Doe"}</p>
                                  </>
                                )}

                                {paymentMethod === "bank-transfer" && (
                                  <>
                                    <p className="font-medium">Transfer Bank</p>
                                    <p className="text-gray-600 mt-1">
                                      Instruksi pembayaran akan dikirim melalui email
                                    </p>
                                  </>
                                )}

                                {paymentMethod === "e-wallet" && (
                                  <>
                                    <p className="font-medium">E-Wallet</p>
                                    <p className="text-gray-600 mt-1">Pembayaran melalui aplikasi e-wallet</p>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          <Separator />

                          <div>
                            <h3 className="font-medium text-lg mb-3">Ringkasan Pembayaran</h3>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal</span>
                                <span>{formatPrice(subtotal)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Pengiriman</span>
                                <span>{formatPrice(shipping)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">PPN (11%)</span>
                                <span>{formatPrice(tax)}</span>
                              </div>
                              <Separator className="my-2" />
                              <div className="flex justify-between font-medium text-lg">
                                <span>Total</span>
                                <span>{formatPrice(total)}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            className="flex-1 border-gray-300 rounded-full"
                            onClick={() => setActiveStep("payment")}
                          >
                            Kembali ke Pembayaran
                          </Button>
                          <Button
                            type="submit"
                            className="flex-1 bg-[#0a2e52] hover:bg-blue-900 text-white rounded-full"
                            disabled={isProcessing}
                          >
                            {isProcessing ? (
                              <>
                                <svg
                                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Memproses...
                              </>
                            ) : (
                              <>
                                Selesaikan Pembayaran
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </>
                            )}
                          </Button>
                        </div>
                        <div className="flex justify-center mt-4">
                          <Button
                            type="button"
                            variant="ghost"
                            className="text-gray-500 hover:text-gray-700"
                            onClick={saveCheckoutData}
                          >
                            Simpan & Lanjutkan Nanti
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {activeStep === "confirmation" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="text-center">
                    <CardContent className="pt-10 pb-10">
                      <div className="mx-auto w-16 h-16 bg-[#40E0D0]/20 rounded-full flex items-center justify-center mb-6">
                        <Check className="h-8 w-8 text-[#40E0D0]" />
                      </div>
                      <h2 className="text-2xl font-bold mb-2">Pesanan Dikonfirmasi!</h2>
                      <p className="text-gray-600 mb-6">
                        Terima kasih atas pembelian Anda. Pesanan Anda telah diterima dan sedang diproses.
                      </p>
                      <div className="bg-gray-50 rounded-lg p-4 mb-6 inline-block">
                        <p className="text-sm text-gray-500">Nomor Pesanan</p>
                        <p className="font-medium">#AC-{Math.floor(100000 + Math.random() * 900000)}</p>
                      </div>
                      <div className="space-y-4 text-left mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="font-medium mb-2">Informasi Pengiriman</h3>
                            <p className="text-gray-600">
                              {shippingInfo.firstName} {shippingInfo.lastName}
                              <br />
                              {shippingInfo.address}
                              <br />
                              {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                              <br />
                              {shippingInfo.country}
                            </p>
                          </div>
                          <div>
                            <h3 className="font-medium mb-2">Metode Pembayaran</h3>
                            <p className="text-gray-600">
                              {paymentMethod === "credit-card"
                                ? "Kartu Kredit"
                                : paymentMethod === "bank-transfer"
                                  ? "Transfer Bank"
                                  : "E-Wallet"}
                            </p>
                            <h3 className="font-medium mt-4 mb-2">Metode Pengiriman</h3>
                            <p className="text-gray-600">
                              {shippingMethod === "standard"
                                ? "Pengiriman Standar (3-5 hari)"
                                : "Pengiriman Ekspres (1-2 hari)"}
                            </p>
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
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>

            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ShoppingBag className="mr-2 h-5 w-5 text-[#40E0D0]" />
                    Ringkasan Pesanan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cartItems.map((item) => (
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

                  <Separator className="my-6" />

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
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Punya kode promo?</h4>
                    <div className="flex gap-2">
                      <Input placeholder="Masukkan kode" className="flex-1" />
                      <Button variant="outline">Terapkan</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Truck className="h-4 w-4 text-[#40E0D0]" />
                  <span>Gratis pengiriman untuk pesanan di atas {formatPrice(750000)}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield className="h-4 w-4 text-[#40E0D0]" />
                  <span>Pemrosesan pembayaran aman</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
