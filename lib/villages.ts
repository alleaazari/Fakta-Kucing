import type { Village } from "./types"

export const villages: Village[] = [
  {
    id: 1,
    name: "Desa Kebun Kelapa",
    description:
      "Komunitas pesisir yang mengkhususkan diri dalam kerajinan serat kelapa dengan tradisi yang telah berlangsung selama beberapa generasi.",
    coordinates: {
      x: 25,
      y: 40,
    },
    craftType: "Serat Kelapa",
    artisans: 35,
    products: ["Keranjang", "Keset", "Barang Dekoratif"],
  },
  {
    id: 2,
    name: "Lembah Bambu",
    description: "Terletak di lembah yang subur, desa ini telah menyempurnakan seni kerajinan bambu.",
    coordinates: {
      x: 45,
      y: 30,
    },
    craftType: "Bambu",
    artisans: 28,
    products: ["Furnitur", "Peralatan", "Barang Dekoratif"],
  },
  {
    id: 3,
    name: "Kampung Sabut",
    description: "Komunitas pedalaman ini mengubah sabut kelapa menjadi produk yang indah dan fungsional.",
    coordinates: {
      x: 65,
      y: 45,
    },
    craftType: "Sabut Kelapa",
    artisans: 22,
    products: ["Pot Tanaman", "Barang Taman", "Hiasan"],
  },
  {
    id: 4,
    name: "Persimpangan Pengrajin",
    description:
      "Komunitas beragam di mana berbagai tradisi kerajinan bertemu, menciptakan produk unik dari berbagai bahan.",
    coordinates: {
      x: 75,
      y: 25,
    },
    craftType: "Bahan Campuran",
    artisans: 40,
    products: ["Dekorasi Rumah", "Aksesori", "Furnitur"],
  },
  {
    id: 5,
    name: "Padang Hijau",
    description: "Dikenal karena pendekatan inovatif mereka dalam daur ulang limbah pertanian dan desain modern.",
    coordinates: {
      x: 35,
      y: 60,
    },
    craftType: "Bahan Campuran",
    artisans: 18,
    products: ["Dekorasi Modern", "Aksesori", "Hadiah Ramah Lingkungan"],
  },
]
