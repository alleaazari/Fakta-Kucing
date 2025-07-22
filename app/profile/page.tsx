"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit3,
  Save,
  X,
  Camera,
  Heart,
  Star,
  Calendar,
  Award,
  Settings,
  History,
  Eye,
  EyeOff,
} from "lucide-react"

interface UserProfile {
  name: string
  email: string
  phone: string
  address: string
  avatar: string
  joinDate: string
  favoriteCount: number
  adoptionCount: number
  bio: string
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [showPhone, setShowPhone] = useState(false)
  const [showAddress, setShowAddress] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const [profile, setProfile] = useState<UserProfile>({
    name: "kipasku",
    email: "kipas1@gmail.com",
    phone: "+62 812-3456-7890",
    address: "Jakarta Selatan, Indonesia",
    avatar: "/placeholder.svg?height=120&width=120",
    joinDate: "Januari 2024",
    favoriteCount: 12,
    adoptionCount: 3,
    bio: "Pecinta kucing yang senang berbagi fakta menarik tentang hewan kesayangan. Sudah mengadopsi beberapa kucing dan aktif dalam komunitas pecinta hewan.",
  })

  const [editedProfile, setEditedProfile] = useState(profile)

  // Load real data from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Load favorites count
      const favorites = localStorage.getItem("animalFactFavorites")
      if (favorites) {
        try {
          const favoritesArray = JSON.parse(favorites)
          setProfile((prev) => ({ ...prev, favoriteCount: favoritesArray.length }))
        } catch (error) {
          console.error("Error loading favorites:", error)
        }
      }

      // Load saved profile data
      const savedProfile = localStorage.getItem("userProfile")
      if (savedProfile) {
        try {
          const profileData = JSON.parse(savedProfile)
          setProfile((prev) => ({ ...prev, ...profileData }))
        } catch (error) {
          console.error("Error loading profile:", error)
        }
      }
    }
  }, [])

  const handleEdit = () => {
    setIsEditing(true)
    setEditedProfile(profile)
  }

  const handleSave = () => {
    setProfile(editedProfile)
    setIsEditing(false)

    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("userProfile", JSON.stringify(editedProfile))
    }

    toast({
      title: "Profil Berhasil Diperbarui",
      description: "Perubahan profil Anda telah disimpan.",
    })
  }

  const handleCancel = () => {
    setEditedProfile(profile)
    setIsEditing(false)
  }

  const handleAvatarUpload = () => {
    // Simulate file upload
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result as string
          setProfile((prev) => ({ ...prev, avatar: result }))
          if (typeof window !== "undefined") {
            localStorage.setItem("userProfile", JSON.stringify({ ...profile, avatar: result }))
          }
          toast({
            title: "Foto Profil Diperbarui",
            description: "Foto profil Anda berhasil diubah.",
          })
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }

  const handleViewFavorites = () => {
    toast({
      title: "Menuju Halaman Favorit",
      description: "Mengalihkan ke daftar kucing favorit Anda...",
    })
    // Navigate to favorites page
    router.push("/favorites")
  }

  const handleViewAdoptions = () => {
    toast({
      title: "Menuju Riwayat Adopsi",
      description: "Mengalihkan ke riwayat adopsi Anda...",
    })
    // Navigate to adoption history
    router.push("/adoption-history")
  }

  const handleSettings = () => {
    toast({
      title: "Pengaturan",
      description: "Membuka pengaturan akun...",
    })
    router.push("/settings")
  }

  const stats = [
    {
      icon: Heart,
      label: "Favorit",
      value: profile.favoriteCount,
      color: "text-red-400",
      onClick: handleViewFavorites,
      description: "kucing favorit",
    },
    {
      icon: Award,
      label: "Adopsi",
      value: profile.adoptionCount,
      color: "text-green-400",
      onClick: handleViewAdoptions,
      description: "adopsi berhasil",
    },
    {
      icon: Calendar,
      label: "Bergabung",
      value: profile.joinDate,
      color: "text-blue-400",
      onClick: () => {
        toast({
          title: "Selamat Datang!",
          description: `Anda bergabung pada ${profile.joinDate}. Terima kasih telah menjadi bagian dari komunitas kami!`,
        })
      },
      description: "member sejak",
    },
  ]

  const achievements = [
    {
      id: "cat-lover",
      title: "Cat Lover",
      description: `${profile.favoriteCount}+ favorit`,
      icon: Heart,
      color: "from-yellow-600/20 to-orange-600/20",
      borderColor: "border-yellow-500/30",
      bgColor: "bg-yellow-500",
      unlocked: profile.favoriteCount >= 10,
      requirement: 10,
    },
    {
      id: "adopter",
      title: "Adopter",
      description: `${profile.adoptionCount} adopsi berhasil`,
      icon: Award,
      color: "from-green-600/20 to-emerald-600/20",
      borderColor: "border-green-500/30",
      bgColor: "bg-green-500",
      unlocked: profile.adoptionCount >= 1,
      requirement: 1,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Profil Saya</h1>
            <p className="text-gray-300 text-lg">Kelola informasi dan preferensi akun Anda</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 overflow-hidden">
                <CardHeader className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
                  <div className="relative flex flex-col sm:flex-row items-center gap-6 p-6">
                    {/* Avatar */}
                    <div className="relative group">
                      <Avatar className="w-24 h-24 border-4 border-white/20">
                        <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl font-bold">
                          {profile.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleAvatarUpload}
                        className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20"
                      >
                        <Camera className="w-4 h-4 text-white" />
                      </Button>
                    </div>

                    {/* Basic Info */}
                    <div className="flex-1 text-center sm:text-left">
                      <h2 className="text-2xl font-bold text-white mb-2">{profile.name}</h2>
                      <p className="text-gray-300 mb-4">{profile.email}</p>
                      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                        <Badge className="bg-blue-600/20 text-blue-300 border-blue-500/30">Anggota Aktif</Badge>
                        <Badge className="bg-green-600/20 text-green-300 border-green-500/30">Pecinta Kucing</Badge>
                      </div>
                    </div>

                    {/* Edit Button */}
                    <div className="flex gap-2">
                      {!isEditing ? (
                        <Button
                          onClick={handleEdit}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          <Edit3 className="w-4 h-4 mr-2" />
                          Edit Profil
                        </Button>
                      ) : (
                        <>
                          <Button
                            onClick={handleSave}
                            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                          >
                            <Save className="w-4 h-4 mr-2" />
                            Simpan
                          </Button>
                          <Button
                            onClick={handleCancel}
                            variant="outline"
                            className="border-gray-600 text-white hover:bg-gray-700 bg-transparent"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Batal
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  {/* Bio Section */}
                  <div className="mb-8">
                    <Label className="text-white font-semibold mb-3 block">Bio</Label>
                    {isEditing ? (
                      <textarea
                        value={editedProfile.bio}
                        onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-gray-400 backdrop-blur-sm resize-none"
                        rows={3}
                        placeholder="Ceritakan tentang diri Anda..."
                      />
                    ) : (
                      <p className="text-gray-300 leading-relaxed bg-white/5 p-4 rounded-lg border border-white/10">
                        {profile.bio}
                      </p>
                    )}
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <Label className="text-white font-semibold mb-2 flex items-center">
                        <User className="w-4 h-4 mr-2 text-blue-400" />
                        Nama Lengkap
                      </Label>
                      {isEditing ? (
                        <Input
                          value={editedProfile.name}
                          onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 backdrop-blur-sm"
                          placeholder="Masukkan nama lengkap"
                        />
                      ) : (
                        <p className="text-gray-300 bg-white/5 p-3 rounded-lg border border-white/10">{profile.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <Label className="text-white font-semibold mb-2 flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-green-400" />
                        Email
                      </Label>
                      {isEditing ? (
                        <Input
                          type="email"
                          value={editedProfile.email}
                          onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 backdrop-blur-sm"
                          placeholder="Masukkan email"
                        />
                      ) : (
                        <p className="text-gray-300 bg-white/5 p-3 rounded-lg border border-white/10">
                          {profile.email}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <Label className="text-white font-semibold mb-2 flex items-center justify-between">
                        <span className="flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-yellow-400" />
                          Nomor Telepon
                        </span>
                        {!isEditing && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setShowPhone(!showPhone)}
                            className="text-gray-400 hover:text-white"
                          >
                            {showPhone ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        )}
                      </Label>
                      {isEditing ? (
                        <Input
                          value={editedProfile.phone}
                          onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 backdrop-blur-sm"
                          placeholder="Masukkan nomor telepon"
                        />
                      ) : (
                        <p className="text-gray-300 bg-white/5 p-3 rounded-lg border border-white/10">
                          {showPhone ? profile.phone : "••••••••••••"}
                        </p>
                      )}
                    </div>

                    {/* Address */}
                    <div>
                      <Label className="text-white font-semibold mb-2 flex items-center justify-between">
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-red-400" />
                          Alamat
                        </span>
                        {!isEditing && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setShowAddress(!showAddress)}
                            className="text-gray-400 hover:text-white"
                          >
                            {showAddress ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        )}
                      </Label>
                      {isEditing ? (
                        <Input
                          value={editedProfile.address}
                          onChange={(e) => setEditedProfile({ ...editedProfile, address: e.target.value })}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 backdrop-blur-sm"
                          placeholder="Masukkan alamat"
                        />
                      ) : (
                        <p className="text-gray-300 bg-white/5 p-3 rounded-lg border border-white/10">
                          {showAddress ? profile.address : "••••••••••••••••••"}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats & Activity Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              {/* Stats Card */}
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-400" />
                    Statistik
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  {stats.map((stat, index) => (
                    <motion.button
                      key={stat.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      onClick={stat.onClick}
                      className="w-full flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-200 group"
                    >
                      <div className="flex items-center">
                        <stat.icon
                          className={`w-5 h-5 mr-3 ${stat.color} group-hover:scale-110 transition-transform`}
                        />
                        <span className="text-gray-300 group-hover:text-white transition-colors">{stat.label}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-white font-semibold block">{stat.value}</span>
                        <span className="text-gray-400 text-xs">{stat.description}</span>
                      </div>
                    </motion.button>
                  ))}
                </CardContent>
              </Card>

              {/* Achievement Card */}
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <Award className="w-5 h-5 mr-2 text-purple-400" />
                    Pencapaian
                  </h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className={`flex items-center p-3 bg-gradient-to-r ${achievement.color} rounded-lg border ${achievement.borderColor} ${
                        achievement.unlocked ? "opacity-100" : "opacity-50"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 ${achievement.bgColor} rounded-full flex items-center justify-center mr-3`}
                      >
                        <achievement.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-semibold">{achievement.title}</p>
                        <p className="text-gray-300 text-sm">{achievement.description}</p>
                      </div>
                      {!achievement.unlocked && (
                        <div className="text-right">
                          <p className="text-gray-400 text-xs">
                            {achievement.requirement -
                              (achievement.id === "cat-lover" ? profile.favoriteCount : profile.adoptionCount)}{" "}
                            lagi
                          </p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <h3 className="text-xl font-bold text-white">Aksi Cepat</h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={handleViewFavorites}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Lihat Favorit ({profile.favoriteCount})
                  </Button>
                  <Button
                    onClick={handleViewAdoptions}
                    variant="outline"
                    className="w-full border-gray-600 text-white hover:bg-gray-700 bg-transparent"
                  >
                    <History className="w-4 h-4 mr-2" />
                    Riwayat Adopsi
                  </Button>
                  <Button
                    onClick={handleSettings}
                    variant="outline"
                    className="w-full border-gray-600 text-white hover:bg-gray-700 bg-transparent"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Pengaturan
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
