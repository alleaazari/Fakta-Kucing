export interface Product {
  id: number
  name: string
  description: string
  price: number
  originalPrice?: number
  discount: number
  image: string
  category: string
  material: string
  isNew: boolean
  featured: boolean
  createdAt: string
}

export interface Village {
  id: number
  name: string
  description: string
  coordinates: {
    x: number
    y: number
  }
  craftType: string
  artisans: number
  products: string[]
}
