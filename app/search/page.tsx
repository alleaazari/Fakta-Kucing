"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { SearchIcon, Filter, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ProductCard from "@/components/product-card"
import { allProducts } from "@/lib/products"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  const [searchTerm, setSearchTerm] = useState(query)
  const [filters, setFilters] = useState({
    categories: [],
    materials: [],
    priceRange: [0, 100],
  })
  const [sort, setSort] = useState("relevance")
  const [activeFilters, setActiveFilters] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading state
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => {
    setSearchTerm(query)
  }, [query])

  const handleCategoryChange = (category) => {
    setFilters((prev) => {
      const newCategories = prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category]

      // Update active filters
      const newActiveFilters = activeFilters.filter((f) => f.type !== "category" || f.value !== category)
      if (!prev.categories.includes(category)) {
        setActiveFilters([...newActiveFilters, { type: "category", value: category }])
      } else {
        setActiveFilters(newActiveFilters)
      }

      return { ...prev, categories: newCategories }
    })
  }

  const handleMaterialChange = (material) => {
    setFilters((prev) => {
      const newMaterials = prev.materials.includes(material)
        ? prev.materials.filter((m) => m !== material)
        : [...prev.materials, material]

      // Update active filters
      const newActiveFilters = activeFilters.filter((f) => f.type !== "material" || f.value !== material)
      if (!prev.materials.includes(material)) {
        setActiveFilters([...newActiveFilters, { type: "material", value: material }])
      } else {
        setActiveFilters(newActiveFilters)
      }

      return { ...prev, materials: newMaterials }
    })
  }

  const handlePriceChange = (value) => {
    setFilters((prev) => ({ ...prev, priceRange: value }))

    // Update active filters
    const existingPriceFilter = activeFilters.find((f) => f.type === "price")
    const newActiveFilters = activeFilters.filter((f) => f.type !== "price")

    setActiveFilters([...newActiveFilters, { type: "price", value: `$${value[0]} - $${value[1]}` }])
  }

  const removeFilter = (filter) => {
    setActiveFilters(activeFilters.filter((f) => !(f.type === filter.type && f.value === filter.value)))

    if (filter.type === "category") {
      setFilters((prev) => ({
        ...prev,
        categories: prev.categories.filter((c) => c !== filter.value),
      }))
    } else if (filter.type === "material") {
      setFilters((prev) => ({
        ...prev,
        materials: prev.materials.filter((m) => m !== filter.value),
      }))
    } else if (filter.type === "price") {
      setFilters((prev) => ({
        ...prev,
        priceRange: [0, 100],
      }))
    }
  }

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      materials: [],
      priceRange: [0, 100],
    })
    setActiveFilters([])
  }

  // Filter products based on search term and selected filters
  const filteredProducts = allProducts.filter((product) => {
    // Search term filter
    if (
      searchTerm &&
      !product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !product.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !product.category.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    // Category filter
    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
      return false
    }

    // Material filter
    if (filters.materials.length > 0 && !filters.materials.includes(product.material)) {
      return false
    }

    // Price range filter
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false
    }

    return true
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sort) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt)
      case "relevance":
      default:
        // If there's a search term, prioritize products with the term in the name
        if (searchTerm) {
          const aNameMatch = a.name.toLowerCase().includes(searchTerm.toLowerCase())
          const bNameMatch = b.name.toLowerCase().includes(searchTerm.toLowerCase())

          if (aNameMatch && !bNameMatch) return -1
          if (!aNameMatch && bNameMatch) return 1
        }
        return b.featured ? 1 : -1
    }
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto mb-8">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 h-12 rounded-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          {searchTerm && (
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center"
              onClick={() => setSearchTerm("")}
            >
              <X className="h-3 w-3 text-gray-600" />
            </button>
          )}
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-2">{searchTerm ? `Search results for "${searchTerm}"` : "All Products"}</h1>
      <p className="text-gray-500 mb-8">{isLoading ? "Searching..." : `Found ${sortedProducts.length} products`}</p>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="bg-white rounded-lg border p-6 sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-lg">Filters</h2>
              {activeFilters.length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                  Clear All
                </Button>
              )}
            </div>

            <div className="space-y-6">
              {/* Categories */}
              <div>
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  {["Home Decor", "Kitchen", "Accessories", "Furniture", "Garden"].map((category) => (
                    <div key={category} className="flex items-center">
                      <Checkbox
                        id={`category-${category}`}
                        checked={filters.categories.includes(category)}
                        onCheckedChange={() => handleCategoryChange(category)}
                      />
                      <Label htmlFor={`category-${category}`} className="ml-2 text-sm font-normal cursor-pointer">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Materials */}
              <div>
                <h3 className="font-medium mb-3">Materials</h3>
                <div className="space-y-2">
                  {["Coconut Fiber", "Bamboo", "Husk", "Mixed"].map((material) => (
                    <div key={material} className="flex items-center">
                      <Checkbox
                        id={`material-${material}`}
                        checked={filters.materials.includes(material)}
                        onCheckedChange={() => handleMaterialChange(material)}
                      />
                      <Label htmlFor={`material-${material}`} className="ml-2 text-sm font-normal cursor-pointer">
                        {material}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Price Range</h3>
                  <span className="text-sm text-gray-500">
                    ${filters.priceRange[0]} - ${filters.priceRange[1]}
                  </span>
                </div>
                <Slider
                  defaultValue={[0, 100]}
                  max={100}
                  step={5}
                  value={filters.priceRange}
                  onValueChange={handlePriceChange}
                  className="my-4"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filters */}
        <div className="md:hidden flex items-center justify-between mb-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="py-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-semibold text-lg">Filters</h2>
                  {activeFilters.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                      Clear All
                    </Button>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Categories */}
                  <div>
                    <h3 className="font-medium mb-3">Categories</h3>
                    <div className="space-y-2">
                      {["Home Decor", "Kitchen", "Accessories", "Furniture", "Garden"].map((category) => (
                        <div key={category} className="flex items-center">
                          <Checkbox
                            id={`mobile-category-${category}`}
                            checked={filters.categories.includes(category)}
                            onCheckedChange={() => handleCategoryChange(category)}
                          />
                          <Label
                            htmlFor={`mobile-category-${category}`}
                            className="ml-2 text-sm font-normal cursor-pointer"
                          >
                            {category}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Materials */}
                  <div>
                    <h3 className="font-medium mb-3">Materials</h3>
                    <div className="space-y-2">
                      {["Coconut Fiber", "Bamboo", "Husk", "Mixed"].map((material) => (
                        <div key={material} className="flex items-center">
                          <Checkbox
                            id={`mobile-material-${material}`}
                            checked={filters.materials.includes(material)}
                            onCheckedChange={() => handleMaterialChange(material)}
                          />
                          <Label
                            htmlFor={`mobile-material-${material}`}
                            className="ml-2 text-sm font-normal cursor-pointer"
                          >
                            {material}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">Price Range</h3>
                      <span className="text-sm text-gray-500">
                        ${filters.priceRange[0]} - ${filters.priceRange[1]}
                      </span>
                    </div>
                    <Slider
                      defaultValue={[0, 100]}
                      max={100}
                      step={5}
                      value={filters.priceRange}
                      onValueChange={handlePriceChange}
                      className="my-4"
                    />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          {/* Sort - Desktop */}
          <div className="hidden md:flex items-center justify-between mb-6">
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter, index) => (
                <div key={index} className="flex items-center bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-sm">
                  <span className="mr-1 capitalize">{filter.type}:</span>
                  <span>{filter.value}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-5 w-5 p-0 ml-1 text-blue-700 hover:bg-blue-100"
                    onClick={() => removeFilter(filter)}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove filter</span>
                  </Button>
                </div>
              ))}

              {activeFilters.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm h-6 px-2 text-gray-500 hover:text-gray-700"
                  onClick={clearAllFilters}
                >
                  Clear All
                </Button>
              )}
            </div>

            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden border border-gray-100">
                  <div className="aspect-square bg-gray-200 animate-pulse" />
                  <div className="p-4 space-y-3">
                    <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-1/4 mt-2" />
                  </div>
                </div>
              ))}
            </div>
          ) : sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4">
                <SlidersHorizontal className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search term or filters to find what you're looking for.
              </p>
              <Button onClick={clearAllFilters}>Clear All Filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
