// API utility functions for handling Axolotl API data
export interface ApiResponse {
  facts: string[]
  images?: string[]
}

export interface ApiHook {
  data: ApiResponse | null
  loading: boolean
  error: string | null
  source: "api" | "fallback"
  refetch: () => void
}

// Axolotl API functions
export const fetchAxolotlData = async (): Promise<ApiResponse> => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 8000)

  try {
    const response = await fetch("https://theaxolotlapi.netlify.app/", {
      signal: controller.signal,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (data && (data.facts || data.images)) {
      return data
    } else {
      throw new Error("Invalid API response format")
    }
  } catch (error) {
    throw error
  }
}

// Fallback data when API is not available
export const fallbackAxolotlData: ApiResponse = {
  facts: [
    "Axolotl dapat meregenerasi anggota tubuh mereka dengan sempurna, termasuk jantung dan otak!",
    "Axolotl adalah salamander yang tetap dalam bentuk larva seumur hidup mereka.",
    "Axolotl memiliki kemampuan regenerasi yang luar biasa bahkan untuk organ internal seperti jantung.",
    "Axolotl hanya ditemukan secara alami di danau Xochimilco dan Chalco di Meksiko.",
    "Axolotl dapat hidup hingga 15 tahun dan tumbuh hingga 30 cm panjangnya.",
    "Axolotl memiliki kemampuan untuk meregenerasi bagian otak mereka yang rusak.",
    "Axolotl memiliki insang eksternal yang terlihat seperti cabang pohon kecil.",
    "Axolotl dapat mengubah warna kulitnya untuk menyesuaikan dengan lingkungan.",
  ],
  images: [],
}
