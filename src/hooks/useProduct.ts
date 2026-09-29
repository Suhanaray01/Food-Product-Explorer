import { useEffect, useState } from 'react'
import { ApiError, getProductById } from '../services/api'
import { featuredGroceries } from '../services/featuredGroceries'
import type { Product } from '../types/product'

interface ProductState {
  id: number
  product: Product | null
  loading: boolean
  error: string | null
  notFound: boolean
}

export function useProduct(id: number | null) {
  const [state, setState] = useState<ProductState | null>(null)

  useEffect(() => {
    if (id === null || featuredGroceries.some((product) => product.id === id)) return
    const controller = new AbortController()
    getProductById(id, controller.signal)
      .then((product) => setState({ id, product, loading: false, error: null, notFound: false }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        if (error instanceof ApiError && error.status === 404) {
          setState({ id, product: null, loading: false, error: null, notFound: true })
          return
        }
        setState({ id, product: null, loading: false, error: error instanceof Error ? error.message : 'Unable to load this product.', notFound: false })
      })
    return () => controller.abort()
  }, [id])

  if (id === null) return { product: null, loading: false, error: null, notFound: true }
  const featuredProduct = featuredGroceries.find((product) => product.id === id)
  if (featuredProduct) return { product: featuredProduct, loading: false, error: null, notFound: false }
  if (!state || state.id !== id) return { product: null, loading: true, error: null, notFound: false }
  return state
}