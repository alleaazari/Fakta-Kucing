"use client"

import { useState, useEffect, useCallback } from "react"
import { fetchAxolotlData, fallbackAxolotlData, type ApiHook, type ApiResponse } from "@/lib/api"

// Custom hook for Axolotl API
export const useAxolotlApi = (): ApiHook => {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [source, setSource] = useState<"api" | "fallback">("fallback")

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await fetchAxolotlData()
      setData(result)
      setSource("api")
    } catch (err) {
      console.warn("Axolotl API failed, using fallback:", err)
      setData(fallbackAxolotlData)
      setSource("fallback")
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    data,
    loading,
    error,
    source,
    refetch: fetchData,
  }
}
