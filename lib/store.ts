import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  isCook: boolean
  avatar?: string
}

interface CartItem {
  productId: string
  name: string
  price: number
  quantity: number
  image: string
  cookName: string
}

interface AppState {
  // User state
  user: User | null
  setUser: (user: User | null) => void
  
  // Cart state
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  
  // UI state
  theme: 'light' | 'dark' | 'system'
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  language: 'ro' | 'ru' | 'en'
  setLanguage: (language: 'ro' | 'ru' | 'en') => void
  
  // Loading states
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // User state
      user: null,
      setUser: (user) => set({ user }),
      
      // Cart state
      cart: [],
      addToCart: (item) => {
        const { cart } = get()
        const existingItem = cart.find(cartItem => cartItem.productId === item.productId)
        
        if (existingItem) {
          set({
            cart: cart.map(cartItem =>
              cartItem.productId === item.productId
                ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                : cartItem
            )
          })
        } else {
          set({ cart: [...cart, item] })
        }
      },
      removeFromCart: (productId) => {
        const { cart } = get()
        set({ cart: cart.filter(item => item.productId !== productId) })
      },
      updateQuantity: (productId, quantity) => {
        const { cart } = get()
        set({
          cart: cart.map(item =>
            item.productId === productId ? { ...item, quantity } : item
          )
        })
      },
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => {
        const { cart } = get()
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
      },
      
      // UI state
      theme: 'system',
      setTheme: (theme) => set({ theme }),
      language: 'ro',
      setLanguage: (language) => set({ language }),
      
      // Loading states
      isLoading: false,
      setIsLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'homemade-marketplace-storage',
      partialize: (state) => ({
        user: state.user,
        cart: state.cart,
        theme: state.theme,
        language: state.language,
      }),
    }
  )
) 