import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, description, price, currency, image, category, cookId } = await request.json();
    if (!name || !description || !price || !currency || !image || !category || !cookId) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        currency,
        image,
        category,
        cookId,
        isAvailable: true,
        isApproved: false,
      },
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Add product error:", error);
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
  }
} 