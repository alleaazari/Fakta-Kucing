"use client"
import { useState } from "react"
import type React from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  UserPlus,
  Github,
  Chrome,
  Facebook,
  Cat,
  Sparkles,
  Heart,
  Shield,
} from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Tidak Cocok",
        description: "Pastikan password dan konfirmasi password sama.",
        variant: "destructive",
      })
      return
    }

    if (!acceptTerms) {
      toast({
        title: "Syarat dan Ketentuan",
        description: "Harap setujui syarat dan ketentuan untuk melanjutkan.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Registrasi Berhasil!",
        description: "Akun Anda telah dibuat. Selamat datang di Fakta Kucing!",
      })
      router.push("/profile")
    }, 2000)
  }

  const handleSocialRegister = (provider: string) => {
    toast({
      title: `Daftar dengan ${provider}`,
      description: "Fitur ini akan segera tersedia!",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center p-4">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 right-10 w-16 h-16 bg-pink-500/10 rounded-full blur-xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl overflow-hidden">
          <CardHeader className="relative">
            {/* Header Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 via-blue-600/20 to-purple-600/20"></div>

            {/* Floating Icons */}
            <div className="absolute top-4 left-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Cat className="w-6 h-6 text-green-400/60" />
              </motion.div>
            </div>
            <div className="absolute top-4 right-4">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Heart className="w-5 h-5 text-pink-400/60" />
              </motion.div>
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <motion.div animate={{ y: [-2, 2, -2] }} transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}>
                <Sparkles className="w-4 h-4 text-yellow-400/60" />
              </motion.div>
            </div>

            {/* Header Content */}
            <div className="relative text-center py-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
              >
                <UserPlus className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className="text-3xl font-bold text-white mb-2">Bergabung Sekarang</h1>
              <p className="text-gray-300">Buat akun baru di Fakta Kucing</p>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={handleRegister} className="space-y-6">
              {/* Name Field */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <Label htmlFor="name" className="text-white font-medium mb-2 flex items-center">
                  <User className="w-4 h-4 mr-2 text-green-400" />
                  Nama Lengkap
                </Label>
                <div className="relative">
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 backdrop-blur-sm pl-10 h-12 focus:border-green-400 focus:ring-green-400/20"
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </motion.div>

              {/* Email Field */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <Label htmlFor="email" className="text-white font-medium mb-2 flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-blue-400" />
                  Email
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 backdrop-blur-sm pl-10 h-12 focus:border-blue-400 focus:ring-blue-400/20"
                    placeholder="Masukkan email Anda"
                    required
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </motion.div>

              {/* Password Field */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                <Label htmlFor="password" className="text-white font-medium mb-2 flex items-center">
                  <Lock className="w-4 h-4 mr-2 text-purple-400" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 backdrop-blur-sm pl-10 pr-10 h-12 focus:border-purple-400 focus:ring-purple-400/20"
                    placeholder="Buat password"
                    required
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </motion.div>

              {/* Confirm Password Field */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
                <Label htmlFor="confirmPassword" className="text-white font-medium mb-2 flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-orange-400" />
                  Konfirmasi Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 backdrop-blur-sm pl-10 pr-10 h-12 focus:border-orange-400 focus:ring-orange-400/20"
                    placeholder="Ulangi password"
                    required
                  />
                  <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </motion.div>

              {/* Terms & Conditions */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex items-start space-x-2"
              >
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-1 rounded border-gray-600 bg-white/10"
                />
                <label htmlFor="terms" className="text-sm text-gray-300 leading-relaxed">
                  Saya setuju dengan{" "}
                  <Link href="/terms" className="text-blue-400 hover:text-blue-300">
                    Syarat dan Ketentuan
                  </Link>{" "}
                  serta{" "}
                  <Link href="/privacy" className="text-blue-400 hover:text-blue-300">
                    Kebijakan Privasi
                  </Link>
                </label>
              </motion.div>

              {/* Register Button */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white h-12 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Daftar Sekarang
                    </>
                  )}
                </Button>
              </motion.div>
            </form>

            {/* Divider */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="my-8">
              <div className="relative">
                <Separator className="bg-white/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-gray-900 px-4 text-gray-400 text-sm">atau daftar dengan</span>
                </div>
              </div>
            </motion.div>

            {/* Social Register */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="grid grid-cols-3 gap-3"
            >
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialRegister("Google")}
                className="bg-white/5 border-white/20 text-white hover:bg-white/10 h-12"
              >
                <Chrome className="w-5 h-5" />
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialRegister("GitHub")}
                className="bg-white/5 border-white/20 text-white hover:bg-white/10 h-12"
              >
                <Github className="w-5 h-5" />
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialRegister("Facebook")}
                className="bg-white/5 border-white/20 text-white hover:bg-white/10 h-12"
              >
                <Facebook className="w-5 h-5" />
              </Button>
            </motion.div>

            {/* Login Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="text-center mt-8"
            >
              <p className="text-gray-300">
                Sudah punya akun?{" "}
                <Link href="/login" className="text-green-400 hover:text-green-300 font-semibold transition-colors">
                  Masuk di sini
                </Link>
              </p>
            </motion.div>

            {/* Fun Facts */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-8 p-4 bg-gradient-to-r from-green-600/10 to-blue-600/10 rounded-lg border border-white/10"
            >
              <div className="flex items-center mb-2">
                <Cat className="w-4 h-4 text-green-400 mr-2" />
                <span className="text-green-300 font-semibold text-sm">Selamat Datang!</span>
              </div>
              <p className="text-gray-300 text-xs leading-relaxed">
                Bergabunglah dengan ribuan pecinta kucing lainnya dan temukan fakta-fakta menakjubkan!
              </p>
            </motion.div>
          </CardContent>
        </Card>

        {/* Bottom Decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, type: "spring" }}
          className="text-center mt-6"
        >
          <div className="inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
            <Heart className="w-4 h-4 text-red-400 mr-2" />
            <span className="text-gray-300 text-sm">Bergabunglah dengan komunitas pecinta kucing</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
