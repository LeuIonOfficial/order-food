import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const [totalUsers, totalProducts, totalOrders, pendingApprovals, totalRevenue, averageRating] = await Promise.all([
      prisma.user.count(),
      prisma.product.count(),
      prisma.order.count(),
      prisma.product.count({ where: { isApproved: false } }),
      prisma.order.aggregate({ _sum: { total: true } }),
      prisma.review.aggregate({ _avg: { rating: true } }),
    ]);

    return NextResponse.json({
      totalUsers,
      totalProducts,
      totalOrders,
      pendingApprovals,
      totalRevenue: totalRevenue._sum.total || 0,
      averageRating: averageRating._avg.rating || 0,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
} 