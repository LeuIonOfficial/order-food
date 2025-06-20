import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { items, address, phone, notes } = await request.json()

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Invalid items' }, { status: 400 })
    }

    if (!address || !phone) {
      return NextResponse.json({ error: 'Address and phone are required' }, { status: 400 })
    }

    // Calculate total and get cook ID from first item
    let total = 0
    let cookId = ''

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      })

      if (!product) {
        return NextResponse.json({ error: `Product ${item.productId} not found` }, { status: 404 })
      }

      if (!cookId) {
        cookId = product.cookId
      } else if (cookId !== product.cookId) {
        return NextResponse.json({ error: 'All items must be from the same cook' }, { status: 400 })
      }

      total += product.price * item.quantity
    }

    // Create order
    const order = await prisma.order.create({
      data: {
        customerId: session.user.id,
        cookId,
        status: 'PENDING',
        total,
        currency: 'MDL',
        address,
        phone,
        notes,
      },
    })

    // Create order items
    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      })

      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: product!.price,
        },
      })
    }

    return NextResponse.json({ order })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
} 