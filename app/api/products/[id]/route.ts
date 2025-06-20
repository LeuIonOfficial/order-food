import { NextResponse } from 'next/server'
import { ProductService } from '@/lib/services/product-service'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productService = new ProductService()
    const product = await productService.getProductById(params.id)
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    
    return NextResponse.json(product)
  } catch (error) {
    console.error('Error in product API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 