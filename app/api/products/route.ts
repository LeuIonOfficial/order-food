import { NextRequest, NextResponse } from 'next/server'
import { ProductService } from '@/lib/services/product-service'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const sort = searchParams.get('sort')
    const priceRange = searchParams.get('priceRange')
    const delivery = searchParams.get('delivery')
    
    const productService = new ProductService()
    
    // Build filter object
    const filters: any = {}
    if (category) filters.category = category
    if (search) filters.search = search
    if (sort) filters.sort = sort
    if (priceRange) filters.priceRange = priceRange
    if (delivery) filters.delivery = delivery
    
    let products
    if (Object.keys(filters).length > 0) {
      products = await productService.getProductsWithFilters(filters)
    } else {
      products = await productService.getAllProducts()
    }
    
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error in products API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 