import { useEffect, useState } from 'react'
import { getProducts } from '../services/api'
import { featuredGroceries } from '../services/featuredGroceries'
import { GROCERY_CATEGORY, type Product } from '../types/product'

interface ProductsState {
  products: Product[]
  loading: boolean
  error: string | null
}

export function useProducts() {
  const [state, setState] = useState<ProductsState>({ products: [], loading: true, error: null })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    getProducts(controller.signal)
      .then((products) => {
        const apiGroceries = products.filter((product) => product.category === GROCERY_CATEGORY)
        const existingTitles = new Set(apiGroceries.map((product) => product.title.toLowerCase()))
        const additions = featuredGroceries.filter((product) => !existingTitles.has(product.title.toLowerCase()))
        setState({ products: [...apiGroceries, ...additions], loading: false, error: null })
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        const message = error instanceof Error ? error.message : 'Something went wrong while loading products.'
        setState({ products: [], loading: false, error: message })
      })
    return () => controller.abort()
  }, [attempt])

  function retry() {
    setState((current) => ({ ...current, loading: true, error: null }))
    setAttempt((current) => current + 1)
  }

  return { ...state, retry }
}