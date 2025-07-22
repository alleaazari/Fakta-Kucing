"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, CreditCard, Truck, Check, ShoppingBag, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"

export default function CheckoutPage() {
  const router = useRouter()
  const [step, setStep] = useState<"shipping" | "payment" | "review">("shipping")
  const [isProcessing, setIsProcessing] = useState(false)

  // Informasi pengiriman
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

  // Metode pengiriman dan pembayaran
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [paymentMethod, setPaymentMethod] = useState("credit-card")

  // Item keranjang
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

  // Hitung total
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = shippingMethod === "express" ? 129990 : 59990
  const tax = subtotal * 0.11 // PPN 11%
  const total = subtotal + shipping + tax

  // Handler untuk input
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setShippingInfo((prev) => ({ ...prev, [name]: value }))
  }

  // Handler untuk submit
  const handleShippingSubmit = (e) => {
    e.preventDefault()
    setStep("payment")
    window.scrollTo(0, 0)
  }

  const handlePaymentSubmit = (e) => {
    e.preventDefault()
    setStep("review")
    window.scrollTo(0, 0)
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulasi proses pembayaran
    setTimeout(() => {
      setIsProcessing(false)
      toast({
        title: "Pesanan Berhasil!",
        description: "Pesanan Anda telah berhasil diproses.",
      })
      router.push("/")
    }, 2000)
  }

  // Format harga ke Rupiah
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-[#40E0D0]/5 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center mb-8">
            <Link href="/cart" className="text-blue-600 hover:text-blue-800 flex items-center">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Kembali ke Keranjang
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Checkout</h1>
            <div className="flex justify-center items-center gap-2 md:gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === "shipping" || step === "payment" || step === "review"
                      ? "bg-[#40E0D0] text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step === "shipping" || step === "payment" || step === "review" ? (
                    step === "shipping" ? (
                      "1"
                    ) : (
                      <Check className="h-4 w-4" />
                    )
                  ) : (
                    "1"
                  )}
                </div>
                <span className="text-sm mt-1">Pengiriman</span>
              </div>
              <div className="w-16 h-0.5 bg-gray-200">
                <div
                  className={`h-full bg-[#40E0D0] transition-all ${
                    step === "payment" || step === "review" ? "w-full" : "w-0"
                  }`}
                />
              </div>
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === "payment" || step === "review" ? "bg-[#40E0D0] text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step === "payment" || step === "review" ? (
                    step === "payment" ? (
                      "2"
                    ) : (
                      <Check className="h-4 w-4" />
                    )
                  ) : (
                    "2"
                  )}
                </div>
                <span className="text-sm mt-1">Pembayaran</span>
              </div>
              <div className="w-16 h-0.5 bg-gray-200">
                <div className={`h-full bg-[#40E0D0] transition-all ${step === "review" ? "w-full" : "w-0"}`} />
              </div>
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === "review" ? "bg-[#40E0D0] text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  3
                </div>
                <span className="text-sm mt-1">Ulasan</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {step === "shipping" && (
                <Card className="border-0 shadow-lg">
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
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}

              {step === "payment" && (
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="mr-2 h-5 w-5 text-[#40E0D0]" />
                      Metode Pembayaran
                    </CardTitle>
                    <CardDescription>Pilih metode pembayaran yang Anda inginkan</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePaymentSubmit} className="space-y-6">
                      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                        <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-[#40E0D0] transition-colors">
                          <RadioGroupItem value="credit-card" id="credit-card" />
                          <Label htmlFor="credit-card" className="flex-1 cursor-pointer">
                            <div className="font-medium">Kartu Kredit / Debit</div>
                            <div className="text-sm text-gray-500">Bayar dengan kartu Anda</div>
                          </Label>
                          <div className="flex gap-2">
                            <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
                              <span className="text-xs font-bold">VISA</span>
                            </div>
                            <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
                              <span className="text-xs font-bold">MC</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-[#40E0D0] transition-colors">
                          <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                          <Label htmlFor="bank-transfer" className="flex-1 cursor-pointer">
                            <div className="font-medium">Transfer Bank</div>
                            <div className="text-sm text-gray-500">BCA, Mandiri, BNI, BRI</div>
                          </Label>
                          <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
                            <span className="text-xs font-bold">BANK</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-[#40E0D0] transition-colors">
                          <RadioGroupItem value="e-wallet" id="e-wallet" />
                          <Label htmlFor="e-wallet" className="flex-1 cursor-pointer">
                            <div className="font-medium">E-Wallet</div>
                            <div className="text-sm text-gray-500">GoPay, OVO, DANA, LinkAja</div>
                          </Label>
                          <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
                            <span className="text-xs font-bold">EWLT</span>
                          </div>
                        </div>
                      </RadioGroup>

                      {paymentMethod === "credit-card" && (
                        <div className="space-y-4 mt-6 p-4 border rounded-lg bg-gray-50">
                          <div className="space-y-2">
                            <Label htmlFor="cardName">Nama pada Kartu</Label>
                            <Input id="cardName" placeholder="John Doe" required />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">Nomor Kartu</Label>
                            <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiry">Tanggal Kadaluarsa</Label>
                              <Input id="expiry" placeholder="MM/YY" required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvc">CVC</Label>
                              <Input id="cvc" placeholder="123" required />
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                        <Shield className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                        <p className="text-sm text-blue-700">
                          Informasi pembayaran Anda aman. Kami menggunakan enkripsi standar industri untuk melindungi
                          data Anda.
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-1 border-gray-300 rounded-full"
                          onClick={() => setStep("shipping")}
                        >
                          Kembali ke Pengiriman
                        </Button>
                        <Button type="submit" className="flex-1 bg-[#0a2e52] hover:bg-blue-900 text-white rounded-full">
                          Lanjut ke Ulasan
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              {step === "review" && (
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <ShoppingBag className="mr-2 h-5 w-5 text-[#40E0D0]" />
                      Ulasan Pesanan
                    </CardTitle>
                    <CardDescription>Periksa pesanan Anda sebelum menyelesaikan pembayaran</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePlaceOrder} className="space-y-6">
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

                      <Separator />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-medium mb-2">Informasi Pengiriman</h3>
                          <p className="text-gray-600">
                            {shippingInfo.firstName || "John"} {shippingInfo.lastName || "Doe"}
                            <br />
                            {shippingInfo.address || "123 Eco Street"}
                            <br />
                            {shippingInfo.city || "Green Valley"}, {shippingInfo.state || "West Java"}{" "}
                            {shippingInfo.zipCode || "12345"}
                            <br />
                            {shippingInfo.country}
                          </p>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">Metode Pembayaran</h3>
                          <p className="text-gray-600">
                            {paymentMethod === "credit-card"
                              ? "Kartu Kredit / Debit"
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

                      <Separator />

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

                      <Separator />

                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>{formatPrice(total)}</span>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-1 border-gray-300 rounded-full"
                          onClick={() => setStep("payment")}
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
                            "Selesaikan Pembayaran"
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="md:col-span-1">
              <Card className="border-0 shadow-lg sticky top-24">
                <CardHeader className="bg-[#0a2e52] text-white">
                  <CardTitle className="flex items-center">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Ringkasan Pesanan
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
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
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
