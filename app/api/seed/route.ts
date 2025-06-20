import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    // Check if we already have data to avoid duplicates
    const existingUsers = await prisma.user.count();
    if (existingUsers > 0) {
      return NextResponse.json(
        { message: "Database already seeded" },
        { status: 200 }
      );
    }

    // Create admin user
    const adminPassword = await hash("admin123", 12);
    const admin = await prisma.user.create({
      data: {
        email: "admin@gustulcasei.com",
        name: "Admin",
        role: "ADMIN",
        verified: true,
      },
    });

    // Create cook user
    const cookPassword = await hash("cook123", 12);
    const cook = await prisma.user.create({
      data: {
        email: "cook@gustulcasei.com",
        name: "Maria Popescu",
        role: "COOK",
        verified: true,
      },
    });

    // Create regular user
    const userPassword = await hash("user123", 12);
    const user = await prisma.user.create({
      data: {
        email: "user@gustulcasei.com",
        name: "Ion Vasilescu",
        role: "USER",
        verified: true,
      },
    });

    // Create products for the cook
    const products = await Promise.all([
      prisma.product.create({
        data: {
          name: "Sarmale cu Mamaliga",
          description: "Traditional Romanian cabbage rolls with polenta",
          price: 25.00,
          category: "MAIN_COURSE",
          cookId: cook.id,
          approved: true,
        },
      }),
      prisma.product.create({
        data: {
          name: "Ciorba de Burta",
          description: "Romanian tripe soup with sour cream",
          price: 18.00,
          category: "SOUP",
          cookId: cook.id,
          approved: true,
        },
      }),
      prisma.product.create({
        data: {
          name: "Papanasi cu Smantana",
          description: "Romanian cheese dumplings with sour cream and jam",
          price: 15.00,
          category: "DESSERT",
          cookId: cook.id,
          approved: true,
        },
      }),
      prisma.product.create({
        data: {
          name: "Mici cu Mustar",
          description: "Grilled minced meat rolls with mustard",
          price: 20.00,
          category: "MAIN_COURSE",
          cookId: cook.id,
          approved: true,
        },
      }),
      prisma.product.create({
        data: {
          name: "Cozonac Traditional",
          description: "Traditional Romanian sweet bread with walnuts",
          price: 30.00,
          category: "DESSERT",
          cookId: cook.id,
          approved: true,
        },
      }),
    ]);

    // Create some reviews
    await Promise.all([
      prisma.review.create({
        data: {
          productId: products[0].id,
          userId: user.id,
          rating: 5,
          comment: "Excelent! Sarmalele sunt delicioase!",
        },
      }),
      prisma.review.create({
        data: {
          productId: products[1].id,
          userId: user.id,
          rating: 4,
          comment: "Foarte gustoasa ciorba!",
        },
      }),
      prisma.review.create({
        data: {
          productId: products[2].id,
          userId: user.id,
          rating: 5,
          comment: "Papanasii sunt perfecti!",
        },
      }),
    ]);

    // Create some orders
    await Promise.all([
      prisma.order.create({
        data: {
          userId: user.id,
          productId: products[0].id,
          quantity: 2,
          status: "COMPLETED",
          totalAmount: 50.00,
        },
      }),
      prisma.order.create({
        data: {
          userId: user.id,
          productId: products[1].id,
          quantity: 1,
          status: "PENDING",
          totalAmount: 18.00,
        },
      }),
    ]);

    return NextResponse.json({
      message: "Database seeded successfully",
      data: {
        admin: { email: admin.email, password: "admin123" },
        cook: { email: cook.email, password: "cook123" },
        user: { email: user.email, password: "user123" },
        products: products.length,
        reviews: 3,
        orders: 2,
      },
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Failed to seed database" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const stats = {
      users: await prisma.user.count(),
      products: await prisma.product.count(),
      reviews: await prisma.review.count(),
      orders: await prisma.order.count(),
    };

    return NextResponse.json({
      message: "Database stats",
      data: stats,
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json(
      { error: "Failed to get database stats" },
      { status: 500 }
    );
  }
} 