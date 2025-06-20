import { useQuery } from '@tanstack/react-query'
import { Product } from '@/lib/services/product-service'

// Client-side data fetching functions
async function fetchProducts(): Promise<Product[]> {
  const res = await fetch('/api/products')
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

async function fetchProduct(id: string): Promise<Product> {
  const res = await fetch(`/api/products/${id}`)
  if (!res.ok) throw new Error('Failed to fetch product')
  return res.json()
}

async function fetchProductsByCategory(category: string): Promise<Product[]> {
  const res = await fetch(`/api/products?category=${encodeURIComponent(category)}`)
  if (!res.ok) throw new Error('Failed to fetch products by category')
  return res.json()
}

async function searchProducts(query: string): Promise<Product[]> {
  const res = await fetch(`/api/products?search=${encodeURIComponent(query)}`)
  if (!res.ok) throw new Error('Failed to search products')
  return res.json()
}

async function fetchProductsWithFilters(filters: {
  search?: string
  category?: string
  sort?: string
  priceRange?: string
  delivery?: string
}): Promise<Product[]> {
  const params = new URLSearchParams()
  
  if (filters.search) params.set('search', filters.search)
  if (filters.category) params.set('category', filters.category)
  if (filters.sort) params.set('sort', filters.sort)
  if (filters.priceRange) params.set('priceRange', filters.priceRange)
  if (filters.delivery) params.set('delivery', filters.delivery)
  
  const queryString = params.toString()
  const url = queryString ? `/api/products?${queryString}` : '/api/products'
  
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch products with filters')
  return res.json()
}

// React Query hooks
export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useProductsByCategory(category: string) {
  return useQuery({
    queryKey: ['products', 'category', category],
    queryFn: () => fetchProductsByCategory(category),
    enabled: !!category,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useSearchProducts(query: string) {
  return useQuery({
    queryKey: ['products', 'search', query],
    queryFn: () => searchProducts(query),
    enabled: !!query && query.length > 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export function useProductsWithFilters(filters: {
  search?: string
  category?: string
  sort?: string
  priceRange?: string
  delivery?: string
}) {
  return useQuery({
    queryKey: ['products', 'filters', filters],
    queryFn: () => fetchProductsWithFilters(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
} 