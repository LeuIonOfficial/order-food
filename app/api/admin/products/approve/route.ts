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
    const { productId } = await request.json();
    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }
    const product = await prisma.product.update({
      where: { id: productId },
      data: { isApproved: true },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.error("Approve product error:", error);
    return NextResponse.json({ error: "Failed to approve product" }, { status: 500 });
  }
} 