"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Send, Pencil, Trash2, AlertCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

interface ContributionForm {
  animal: string
  category: string
  fact: string
  source: string
}

const categories = ["Mamalia", "Burung", "Ikan", "Serangga", "Amfibi", "Reptil", "Cephalopoda"]

export default function ContributePage() {
  const [form, setForm] = useState<ContributionForm>({
    animal: "",
    category: "",
    fact: "",
    source: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissions, setSubmissions] = useState<ContributionForm[]>([])
  const { toast } = useToast()

  // Modal edit
  const [isEditing, setIsEditing] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<ContributionForm>({
    animal: "",
    category: "",
    fact: "",
    source: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.animal || !form.category || !form.fact) {
      toast({
        title: "Form tidak lengkap",
        description: "Mohon isi semua field yang wajib diisi.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    await new Promise((res) => setTimeout(res, 1000))

    setSubmissions((prev) => [...prev, form])
    setForm({ animal: "", category: "", fact: "", source: "" })

    toast({
      title: "Fakta berhasil dikirim!",
      description: "Kontribusi Anda telah ditambahkan.",
    })

    setIsSubmitting(false)
  }

  const handleEditClick = (index: number) => {
    setEditForm(submissions[index])
    setEditIndex(index)
    setIsEditing(true)
  }

  const handleEditSave = () => {
    if (editIndex === null) return
    const updated = [...submissions]
    updated[editIndex] = editForm
    setSubmissions(updated)
    setIsEditing(false)

    toast({
      title: "Berhasil diperbarui",
      description: "Kontribusi telah diperbarui.",
    })
  }

  const handleDelete = (index: number) => {
    const confirmed = window.confirm("Yakin ingin menghapus kontribusi ini?")
    if (!confirmed) return
    const updated = [...submissions]
    updated.splice(index, 1)
    setSubmissions(updated)

    toast({
      title: "Dihapus",
      description: "Kontribusi telah dihapus.",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-white text-white">
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Kontribusi Fakta</h1>
          <p className="text-xl text-gray-200">
            Bagikan pengetahuanmu tentang hewan dan bantu kami memperkaya database fakta.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlusCircle className="h-6 w-6" />
                Tambah Fakta Baru
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  placeholder="Nama Hewan *"
                  value={form.animal}
                  onChange={(e) => setForm({ ...form, animal: e.target.value })}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
                <Select
                  value={form.category}
                  onValueChange={(val) => setForm({ ...form, category: val })}
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat} className="text-white">
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Textarea
                  placeholder="Tulis fakta menarik..."
                  value={form.fact}
                  onChange={(e) => setForm({ ...form, fact: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[100px]"
                  required
                />
                <Input
                  placeholder="Sumber (opsional)"
                  value={form.source}
                  onChange={(e) => setForm({ ...form, source: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
                <Button type="submit" disabled={isSubmitting} className="w-full bg-white text-black">
                  {isSubmitting ? "Mengirim..." : "Kirim Fakta"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {submissions.length > 0 && (
          <div className="mt-12 space-y-4">
            <h2 className="text-2xl font-bold">Kontribusi Anda</h2>
            {submissions.map((item, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur border-white/20">
                <CardContent className="p-4 flex justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{item.animal}</h3>
                    <Badge className="bg-gradient-to-r from-gray-600 to-white text-black">{item.category}</Badge>
                    <p className="mt-2 text-sm text-gray-200">{item.fact}</p>
                    {item.source && <p className="text-xs text-gray-400 mt-1">Sumber: {item.source}</p>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEditClick(index)} className="text-yellow-400">
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(index)} className="text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Modal Edit */}
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent className="bg-white/10 backdrop-blur border-white/20">
            <DialogHeader>
              <DialogTitle className="text-white">Edit Kontribusi</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                value={editForm.animal}
                onChange={(e) => setEditForm({ ...editForm, animal: e.target.value })}
                className="bg-white/10 border-white/20 text-white"
              />
              <Select value={editForm.category} onValueChange={(val) => setEditForm({ ...editForm, category: val })}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Kategori" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat} className="text-white">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Textarea
                value={editForm.fact}
                onChange={(e) => setEditForm({ ...editForm, fact: e.target.value })}
                className="bg-white/10 border-white/20 text-white"
              />
              <Input
                value={editForm.source}
                onChange={(e) => setEditForm({ ...editForm, source: e.target.value })}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <DialogFooter>
              <Button onClick={handleEditSave} className="bg-white text-black w-full">
                Simpan Perubahan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>
    </div>
  )
}
