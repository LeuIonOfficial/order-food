import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// API base URL
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

// Types
export interface Product {
  id: string
  name: string
  description: string
  price: number
  currency: string
  image: string
  category: string
  isAvailable: boolean
  cookId: string
  cook: {
    id: string
    name: string
    avatar?: string
    rating: number
  }
  reviews: Array<{
    id: string
    rating: number
    comment?: string
    customer: {
      name: string
    }
  }>
}

export interface Order {
  id: string
  customerId: string
  cookId: string
  status: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED'
  total: number
  currency: string
  address: string
  phone: string
  notes?: string
  createdAt: string
  items: Array<{
    id: string
    productId: string
    quantity: number
    price: number
    product: Product
  }>
}

// API functions
const api = {
  // Products
  getProducts: async (): Promise<Product[]> => {
    const response = await fetch(`${API_BASE}/products`)
    if (!response.ok) throw new Error('Failed to fetch products')
    return response.json()
  },

  getProduct: async (id: string): Promise<Product> => {
    const response = await fetch(`${API_BASE}/products/${id}`)
    if (!response.ok) throw new Error('Failed to fetch product')
    return response.json()
  },

  // Orders
  createOrder: async (orderData: {
    productId: string
    cookId: string
    quantity: number
    address: string
    phone: string
    notes?: string
    total: number
  }): Promise<Order> => {
    const response = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    })
    if (!response.ok) throw new Error('Failed to create order')
    return response.json()
  },

  // Reviews
  createReview: async (reviewData: {
    rating: number
    comment?: string
    cookId: string
    productId?: string
  }): Promise<any> => {
    const response = await fetch(`${API_BASE}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData),
    })
    if (!response.ok) throw new Error('Failed to create review')
    return response.json()
  },
}

// React Query hooks
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: api.getProducts,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => api.getProduct(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

export const useCreateOrder = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: api.createOrder,
    onSuccess: () => {
      // Invalidate and refetch products to update availability
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

export const useCreateReview = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: api.createReview,
    onSuccess: (_, variables) => {
      // Invalidate product data to refresh reviews
      if (variables.productId) {
        queryClient.invalidateQueries({ queryKey: ['product', variables.productId] })
      }
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

export { api } 