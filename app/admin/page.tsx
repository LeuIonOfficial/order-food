"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	Users,
	Package,
	ShoppingCart,
	Star,
	TrendingUp,
	AlertTriangle,
	Plus,
	Settings,
	BarChart3,
	ClipboardList,
} from "lucide-react";
import Link from "next/link";

// Force dynamic rendering
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface DashboardStats {
	totalUsers: number;
	totalProducts: number;
	totalOrders: number;
	pendingApprovals: number;
	totalRevenue: number;
	averageRating: number;
}

export default function AdminDashboard() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [stats, setStats] = useState<DashboardStats>({
		totalUsers: 0,
		totalProducts: 0,
		totalOrders: 0,
		pendingApprovals: 0,
		totalRevenue: 0,
		averageRating: 0,
	});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (status === "loading") return;

		if (!session?.user?.isAdmin) {
			router.push("/auth/signin?callbackUrl=/admin");
			return;
		}

		fetchStats();
	}, [session, status, router]);

	const fetchStats = async () => {
		try {
			const response = await fetch("/api/admin/stats");
			if (response.ok) {
				const data = await response.json();
				setStats(data);
			}
		} catch (error) {
			console.error("Error fetching stats:", error);
		} finally {
			setLoading(false);
		}
	};

	if (status === "loading" || loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
				<div className="text-center">
					<div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
					<p className="text-gray-600">Loading admin dashboard...</p>
				</div>
			</div>
		);
	}

	if (!session?.user?.isAdmin) {
		return null;
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
			{/* Header */}
			<div className="bg-white shadow-sm border-b">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center py-6">
						<div>
							<h1 className="text-3xl font-bold text-gray-900">
								Admin Dashboard
							</h1>
							<p className="text-gray-600">
								Welcome back, {session.user.name}
							</p>
						</div>
						<div className="flex items-center gap-4">
							<Link href="/">
								<Button variant="outline">Back to Site</Button>
							</Link>
							<Link href="/admin/settings">
								<Button variant="outline" size="sm">
									<Settings className="w-4 h-4 mr-2" />
									Settings
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Quick Actions */}
				<div className="mb-8">
					<h2 className="text-xl font-semibold text-gray-900 mb-4">
						Quick Actions
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						<Link href="/admin/orders">
							<Card className="hover:shadow-lg transition-shadow cursor-pointer group">
								<CardContent className="p-6">
									<div className="flex items-center gap-3">
										<div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
											<ClipboardList className="w-6 h-6 text-purple-600" />
										</div>
										<div>
											<h3 className="font-semibold text-gray-900">
												Orders Management
											</h3>
											<p className="text-sm text-gray-600">
												Manage incoming orders
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</Link>

						<Link href="/admin/products/new">
							<Card className="hover:shadow-lg transition-shadow cursor-pointer group">
								<CardContent className="p-6">
									<div className="flex items-center gap-3">
										<div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
											<Plus className="w-6 h-6 text-orange-600" />
										</div>
										<div>
											<h3 className="font-semibold text-gray-900">
												Add Product
											</h3>
											<p className="text-sm text-gray-600">
												Create new food item
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</Link>

						<Link href="/admin/products/pending">
							<Card className="hover:shadow-lg transition-shadow cursor-pointer group">
								<CardContent className="p-6">
									<div className="flex items-center gap-3">
										<div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
											<AlertTriangle className="w-6 h-6 text-yellow-600" />
										</div>
										<div>
											<h3 className="font-semibold text-gray-900">
												Pending Approvals
											</h3>
											<p className="text-sm text-gray-600">
												{stats.pendingApprovals} items
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</Link>

						<Link href="/admin/users">
							<Card className="hover:shadow-lg transition-shadow cursor-pointer group">
								<CardContent className="p-6">
									<div className="flex items-center gap-3">
										<div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
											<Users className="w-6 h-6 text-blue-600" />
										</div>
										<div>
											<h3 className="font-semibold text-gray-900">
												Manage Users
											</h3>
											<p className="text-sm text-gray-600">
												View all users
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</Link>

						<Link href="/admin/analytics">
							<Card className="hover:shadow-lg transition-shadow cursor-pointer group">
								<CardContent className="p-6">
									<div className="flex items-center gap-3">
										<div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
											<BarChart3 className="w-6 h-6 text-green-600" />
										</div>
										<div>
											<h3 className="font-semibold text-gray-900">
												Analytics
											</h3>
											<p className="text-sm text-gray-600">
												View reports
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</Link>
					</div>
				</div>

				{/* Statistics */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
					<Card className="animate-fade-in-up">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Users
							</CardTitle>
							<Users className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{stats.totalUsers}
							</div>
							<p className="text-xs text-muted-foreground">
								Registered users
							</p>
						</CardContent>
					</Card>

					<Card
						className="animate-fade-in-up"
						style={{ animationDelay: "0.1s" }}
					>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Products
							</CardTitle>
							<Package className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{stats.totalProducts}
							</div>
							<p className="text-xs text-muted-foreground">
								Available products
							</p>
						</CardContent>
					</Card>

					<Card
						className="animate-fade-in-up"
						style={{ animationDelay: "0.2s" }}
					>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Orders
							</CardTitle>
							<ShoppingCart className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{stats.totalOrders}
							</div>
							<p className="text-xs text-muted-foreground">
								Completed orders
							</p>
						</CardContent>
					</Card>

					<Card
						className="animate-fade-in-up"
						style={{ animationDelay: "0.3s" }}
					>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Revenue
							</CardTitle>
							<TrendingUp className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{stats.totalRevenue.toFixed(2)} MDL
							</div>
							<p className="text-xs text-muted-foreground">
								Platform revenue
							</p>
						</CardContent>
					</Card>

					<Card
						className="animate-fade-in-up"
						style={{ animationDelay: "0.4s" }}
					>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Average Rating
							</CardTitle>
							<Star className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{stats.averageRating.toFixed(1)}
							</div>
							<p className="text-xs text-muted-foreground">
								Platform rating
							</p>
						</CardContent>
					</Card>

					<Card
						className="animate-fade-in-up"
						style={{ animationDelay: "0.5s" }}
					>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Pending Approvals
							</CardTitle>
							<AlertTriangle className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{stats.pendingApprovals}
							</div>
							<p className="text-xs text-muted-foreground">
								Products awaiting approval
							</p>
						</CardContent>
					</Card>
				</div>

				{/* Recent Activity */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<Card>
						<CardHeader>
							<CardTitle>Recent Orders</CardTitle>
							<CardDescription>
								Latest orders from customers
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
									<div>
										<p className="font-medium">
											Order #1234
										</p>
										<p className="text-sm text-gray-600">
											Maria's Kitchen
										</p>
									</div>
									<div className="text-right">
										<p className="font-medium">150 MDL</p>
										<p className="text-sm text-green-600">
											Completed
										</p>
									</div>
								</div>
								<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
									<div>
										<p className="font-medium">
											Order #1233
										</p>
										<p className="text-sm text-gray-600">
											Bunica's Delights
										</p>
									</div>
									<div className="text-right">
										<p className="font-medium">89 MDL</p>
										<p className="text-sm text-blue-600">
											Preparing
										</p>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Recent Products</CardTitle>
							<CardDescription>
								Newly added products
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
									<div className="w-12 h-12 bg-orange-200 rounded-lg flex items-center justify-center">
										<Package className="w-6 h-6 text-orange-600" />
									</div>
									<div className="flex-1">
										<p className="font-medium">
											Homemade Sarmale
										</p>
										<p className="text-sm text-gray-600">
											Traditional Romanian dish
										</p>
									</div>
									<div className="text-right">
										<p className="font-medium">45 MDL</p>
										<p className="text-sm text-green-600">
											Approved
										</p>
									</div>
								</div>
								<div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
									<div className="w-12 h-12 bg-orange-200 rounded-lg flex items-center justify-center">
										<Package className="w-6 h-6 text-orange-600" />
									</div>
									<div className="flex-1">
										<p className="font-medium">
											Fresh Pastries
										</p>
										<p className="text-sm text-gray-600">
											Morning bakery items
										</p>
									</div>
									<div className="text-right">
										<p className="font-medium">25 MDL</p>
										<p className="text-sm text-yellow-600">
											Pending
										</p>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
