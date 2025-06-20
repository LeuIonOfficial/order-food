import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const { items, address, phone, notes, customerName, customerEmail } = await request.json()

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Invalid items' }, { status: 400 })
    }

    if (!address || !phone) {
      return NextResponse.json({ error: 'Address and phone are required' }, { status: 400 })
    }

    // Handle customer - use session user or create guest user
    let customerId: string

    if (session?.user) {
      // User is logged in, use their ID
      customerId = session.user.id
    } else {
      // Guest order - create a temporary guest user
      if (!customerName || !customerEmail) {
        return NextResponse.json({ 
          error: 'Name and email are required for guest orders' 
        }, { status: 400 })
      }

      // Check if guest user already exists with this email
      let guestUser = await prisma.user.findUnique({
        where: { email: customerEmail }
      })

      if (!guestUser) {
        // Create new guest user
        guestUser = await prisma.user.create({
          data: {
            email: customerEmail,
            name: customerName,
            phone,
            address,
            isVerified: false, // Guest users are not verified
          }
        })
      }

      customerId = guestUser.id
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
        customerId,
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

    return NextResponse.json({ 
      order,
      isGuestOrder: !session?.user,
      message: session?.user ? 'Order created successfully' : 'Guest order created successfully'
    })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
} 