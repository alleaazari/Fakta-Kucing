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
import { Mail, Lock, Eye, EyeOff, LogIn, Github, Chrome, Facebook, Cat, Sparkles, Heart } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("kipas1@gmail.com")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Login Berhasil!",
        description: "Selamat datang kembali di Fakta Kucing",
      })
      router.push("/profile")
    }, 1500)
  }

  const handleSocialLogin = (provider: string) => {
    toast({
      title: `Login dengan ${provider}`,
      description: "Fitur ini akan segera tersedia!",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center p-4">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-pink-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 right-10 w-16 h-16 bg-yellow-500/10 rounded-full blur-xl"></div>
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
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>

            {/* Floating Icons */}
            <div className="absolute top-4 left-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Cat className="w-6 h-6 text-blue-400/60" />
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
                className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
              >
                <Cat className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className="text-3xl font-bold text-white mb-2">Selamat Datang</h1>
              <p className="text-gray-300">Masuk ke akun Fakta Kucing Anda</p>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <Label htmlFor="email" className="text-white font-medium mb-2 flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-blue-400" />
                  Email
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 backdrop-blur-sm pl-10 h-12 focus:border-blue-400 focus:ring-blue-400/20"
                    placeholder="Masukkan email Anda"
                    required
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </motion.div>

              {/* Password Field */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <Label htmlFor="password" className="text-white font-medium mb-2 flex items-center">
                  <Lock className="w-4 h-4 mr-2 text-purple-400" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 backdrop-blur-sm pl-10 pr-10 h-12 focus:border-purple-400 focus:ring-purple-400/20"
                    placeholder="Masukkan password Anda"
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

              {/* Remember Me & Forgot Password */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-between text-sm"
              >
                <label className="flex items-center text-gray-300 cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded border-gray-600 bg-white/10" />
                  Ingat saya
                </label>
                <Link href="/forgot-password" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Lupa password?
                </Link>
              </motion.div>

              {/* Login Button */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-12 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <LogIn className="w-4 h-4 mr-2" />
                      Masuk
                    </>
                  )}
                </Button>
              </motion.div>
            </form>

            {/* Divider */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="my-8">
              <div className="relative">
                <Separator className="bg-white/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-gray-900 px-4 text-gray-400 text-sm">atau masuk dengan</span>
                </div>
              </div>
            </motion.div>

            {/* Social Login */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-3 gap-3"
            >
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialLogin("Google")}
                className="bg-white/5 border-white/20 text-white hover:bg-white/10 h-12"
              >
                <Chrome className="w-5 h-5" />
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialLogin("GitHub")}
                className="bg-white/5 border-white/20 text-white hover:bg-white/10 h-12"
              >
                <Github className="w-5 h-5" />
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialLogin("Facebook")}
                className="bg-white/5 border-white/20 text-white hover:bg-white/10 h-12"
              >
                <Facebook className="w-5 h-5" />
              </Button>
            </motion.div>

            {/* Register Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-center mt-8"
            >
              <p className="text-gray-300">
                Belum punya akun?{" "}
                <Link href="/register" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                  Daftar sekarang
                </Link>
              </p>
            </motion.div>

            {/* Fun Facts */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 p-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-lg border border-white/10"
            >
              <div className="flex items-center mb-2">
                <Cat className="w-4 h-4 text-blue-400 mr-2" />
                <span className="text-blue-300 font-semibold text-sm">Fakta Kucing Hari Ini</span>
              </div>
              <p className="text-gray-300 text-xs leading-relaxed">
                Kucing dapat tidur hingga 16 jam sehari! Mereka menghabiskan 70% hidup mereka untuk tidur.
              </p>
            </motion.div>
          </CardContent>
        </Card>

        {/* Bottom Decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, type: "spring" }}
          className="text-center mt-6"
        >
          <div className="inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
            <Heart className="w-4 h-4 text-red-400 mr-2" />
            <span className="text-gray-300 text-sm">Dibuat dengan cinta untuk pecinta kucing</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
