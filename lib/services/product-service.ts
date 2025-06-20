import { prisma } from '@/lib/prisma'

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
  createdAt: string
  updatedAt: string
  cook: {
    id: string
    name: string
    avatar: string
    city: string
  }
  reviews: Array<{
    id: string
    rating: number
    comment: string
    customer?: {
      name: string
    }
  }>
}

export class ProductService {
  async getAllProducts(): Promise<Product[]> {
    try {
      const products = await prisma.product.findMany({
        include: {
          cook: {
            select: {
              id: true,
              name: true,
              avatar: true,
              city: true,
            }
          },
          reviews: {
            include: {
              customer: {
                select: {
                  name: true,
                }
              }
            },
            take: 3, // Limit reviews for performance
          },
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
      
      // Transform Prisma results to match Product interface
      return products.map(product => ({
        ...product,
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
        reviews: product.reviews.map(review => ({
          ...review,
          createdAt: review.createdAt.toISOString()
        }))
      })) as Product[]
    } catch (error) {
      console.error('Error fetching products:', error)
      return []
    }
  }

  async getProductById(id: string): Promise<Product | null> {
    try {
      const product = await prisma.product.findUnique({
        where: { id },
        include: {
          cook: {
            select: {
              id: true,
              name: true,
              avatar: true,
              city: true,
            }
          },
          reviews: {
            include: {
              customer: {
                select: {
                  name: true,
                }
              }
            },
          },
        },
      })
      
      if (!product) return null
      
      // Transform Prisma result to match Product interface
      return {
        ...product,
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
        reviews: product.reviews.map(review => ({
          ...review,
          createdAt: review.createdAt.toISOString()
        }))
      } as Product
    } catch (error) {
      console.error('Error fetching product:', error)
      return null
    }
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const products = await prisma.product.findMany({
        where: { category },
        include: {
          cook: {
            select: {
              id: true,
              name: true,
              avatar: true,
              city: true,
            }
          },
          reviews: {
            include: {
              customer: {
                select: {
                  name: true,
                }
              }
            },
            take: 3,
          },
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
      
      // Transform Prisma results to match Product interface
      return products.map(product => ({
        ...product,
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
        reviews: product.reviews.map(review => ({
          ...review,
          createdAt: review.createdAt.toISOString()
        }))
      })) as Product[]
    } catch (error) {
      console.error('Error fetching products by category:', error)
      return []
    }
  }

  async searchProducts(query: string): Promise<Product[]> {
    try {
      const products = await prisma.product.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { category: { contains: query, mode: 'insensitive' } },
          ],
        },
        include: {
          cook: {
            select: {
              id: true,
              name: true,
              avatar: true,
              city: true,
            }
          },
          reviews: {
            include: {
              customer: {
                select: {
                  name: true,
                }
              }
            },
            take: 3,
          },
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
      
      // Transform Prisma results to match Product interface
      return products.map(product => ({
        ...product,
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
        reviews: product.reviews.map(review => ({
          ...review,
          createdAt: review.createdAt.toISOString()
        }))
      })) as Product[]
    } catch (error) {
      console.error('Error searching products:', error)
      return []
    }
  }

  async getProductsWithFilters(filters: {
    search?: string
    category?: string
    sort?: string
    priceRange?: string
    delivery?: string
  }): Promise<Product[]> {
    try {
      let where: any = {};
      let orderBy: any = {};

      // Search Filter
      if (filters.search) {
        where.OR = [
          { name: { contains: filters.search, mode: 'insensitive' } },
          { description: { contains: filters.search, mode: 'insensitive' } },
          { category: { contains: filters.search, mode: 'insensitive' } },
        ];
      }

      // Category Filter
      if (filters.category) {
        where.category = filters.category;
      }

      // Price Range Filter
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-');
        if (min) where.price = { ...where.price, gte: Number(min) };
        if (max) where.price = { ...where.price, lte: Number(max) };
      }

      // Sorting
      switch (filters.sort) {
        case 'price-asc':
          orderBy = { price: 'asc' };
          break;
        case 'price-desc':
          orderBy = { price: 'desc' };
          break;
        case 'newest':
          orderBy = { createdAt: 'desc' };
          break;
        case 'rating':
          orderBy = { reviews: { _count: 'desc' } }; // This requires a relation count
          break;
        default:
          orderBy = { createdAt: 'desc' };
      }
      
      const products = await prisma.product.findMany({
        where,
        include: {
          cook: {
            select: {
              id: true,
              name: true,
              avatar: true,
              city: true,
            }
          },
          reviews: {
            include: {
              customer: {
                select: {
                  name: true,
                }
              }
            },
            take: 3,
          },
        },
        orderBy
      })
      
      // Transform Prisma results to match Product interface
      return products.map(product => ({
        ...product,
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
        reviews: product.reviews.map(review => ({
          ...review,
          createdAt: review.createdAt.toISOString()
        }))
      })) as Product[]
    } catch (error) {
      console.error('Error fetching products with filters:', error)
      return []
    }
  }
} 