"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Clock,
	CheckCircle,
	XCircle,
	ChefHat,
	Package,
	Truck,
	User,
	Phone,
	MapPin,
	Calendar,
	DollarSign,
	AlertCircle,
	Check,
	X,
} from "lucide-react";

// Force dynamic rendering
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface OrderItem {
	id: string;
	quantity: number;
	price: number;
	product: {
		id: string;
		name: string;
		price: number;
		image: string;
	};
}

interface Order {
	id: string;
	status: string;
	total: number;
	currency: string;
	address: string;
	phone: string;
	notes?: string;
	createdAt: string;
	updatedAt: string;
	customer: {
		id: string;
		name: string;
		email: string;
		phone: string;
	};
	cook: {
		id: string;
		name: string;
		email: string;
	};
	items: OrderItem[];
}

interface OrdersResponse {
	orders: Order[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		pages: number;
	};
}

const statusConfig = {
	PENDING: {
		label: "În așteptare",
		color: "bg-yellow-100 text-yellow-800 border-yellow-200",
		icon: Clock,
	},
	CONFIRMED: {
		label: "Confirmat",
		color: "bg-blue-100 text-blue-800 border-blue-200",
		icon: CheckCircle,
	},
	PREPARING: {
		label: "Se prepară",
		color: "bg-orange-100 text-orange-800 border-orange-200",
		icon: ChefHat,
	},
	READY: {
		label: "Gata",
		color: "bg-green-100 text-green-800 border-green-200",
		icon: Package,
	},
	DELIVERED: {
		label: "Livrat",
		color: "bg-purple-100 text-purple-800 border-purple-200",
		icon: Truck,
	},
	CANCELLED: {
		label: "Anulat",
		color: "bg-red-100 text-red-800 border-red-200",
		icon: XCircle,
	},
};

export default function OrdersPage() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [orders, setOrders] = useState<Order[]>([]);
	const [loading, setLoading] = useState(true);
	const [activeTab, setActiveTab] = useState("PENDING");
	const [updatingOrder, setUpdatingOrder] = useState<string | null>(null);

	useEffect(() => {
		if (status === "loading") return;

		if (!session?.user?.isAdmin) {
			router.push("/auth/signin");
			return;
		}

		fetchOrders();
	}, [session, status, router, activeTab]);

	const fetchOrders = async () => {
		try {
			setLoading(true);
			const response = await fetch(
				`/api/admin/orders?status=${activeTab}`
			);
			if (response.ok) {
				const data: OrdersResponse = await response.json();
				setOrders(data.orders);
			}
		} catch (error) {
			console.error("Error fetching orders:", error);
		} finally {
			setLoading(false);
		}
	};

	const updateOrderStatus = async (orderId: string, newStatus: string) => {
		try {
			setUpdatingOrder(orderId);
			const response = await fetch(`/api/admin/orders/${orderId}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ status: newStatus }),
			});

			if (response.ok) {
				// Refresh orders
				await fetchOrders();
			}
		} catch (error) {
			console.error("Error updating order:", error);
		} finally {
			setUpdatingOrder(null);
		}
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleString("ro-RO", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const getStatusIcon = (status: string) => {
		const config = statusConfig[status as keyof typeof statusConfig];
		return config ? config.icon : Clock;
	};

	const getStatusColor = (status: string) => {
		const config = statusConfig[status as keyof typeof statusConfig];
		return config
			? config.color
			: "bg-gray-100 text-gray-800 border-gray-200";
	};

	const getStatusLabel = (status: string) => {
		const config = statusConfig[status as keyof typeof statusConfig];
		return config ? config.label : status;
	};

	const getNextStatus = (currentStatus: string) => {
		const statusFlow = {
			PENDING: "CONFIRMED",
			CONFIRMED: "PREPARING",
			PREPARING: "READY",
			READY: "DELIVERED",
		};
		return statusFlow[currentStatus as keyof typeof statusFlow];
	};

	if (status === "loading") {
		return (
			<div className="container mx-auto px-4 py-4 sm:py-8">
				<div className="animate-pulse">
					<div className="h-6 sm:h-8 bg-gray-200 rounded w-3/4 sm:w-1/4 mb-4 sm:mb-6"></div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
						{[...Array(6)].map((_, i) => (
							<div
								key={i}
								className="h-48 sm:h-64 bg-gray-200 rounded"
							></div>
						))}
					</div>
				</div>
			</div>
		);
	}

	if (!session?.user?.isAdmin) {
		return null;
	}

	return (
		<div className="container mx-auto px-4 py-4 sm:py-8">
			<div className="mb-6 sm:mb-8">
				<h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
					Gestionare Comenzi
				</h1>
				<p className="text-sm sm:text-base text-gray-600">
					Gestionează comenzile și actualizează statusul lor
				</p>
			</div>

			<Tabs
				value={activeTab}
				onValueChange={setActiveTab}
				className="w-full"
			>
				<TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 mb-6 sm:mb-8 h-auto">
					{Object.keys(statusConfig).map((status) => (
						<TabsTrigger
							key={status}
							value={status}
							className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-1.5 text-xs sm:text-sm"
						>
							{React.createElement(getStatusIcon(status), {
								className: "w-3 h-3 sm:w-4 sm:h-4",
							})}
							<span className="hidden sm:inline">
								{getStatusLabel(status)}
							</span>
							<span className="sm:hidden">
								{getStatusLabel(status).split(" ")[0]}
							</span>
						</TabsTrigger>
					))}
				</TabsList>

				<TabsContent
					value={activeTab}
					className="space-y-4 sm:space-y-6"
				>
					{loading ? (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
							{[...Array(6)].map((_, i) => (
								<Card key={i} className="animate-pulse">
									<CardHeader className="pb-3">
										<div className="h-4 bg-gray-200 rounded w-3/4"></div>
									</CardHeader>
									<CardContent className="space-y-3">
										<div className="h-3 bg-gray-200 rounded"></div>
										<div className="h-3 bg-gray-200 rounded w-2/3"></div>
										<div className="h-3 bg-gray-200 rounded w-1/2"></div>
									</CardContent>
								</Card>
							))}
						</div>
					) : orders.length === 0 ? (
						<Card>
							<CardContent className="flex flex-col items-center justify-center py-8 sm:py-12">
								<AlertCircle className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mb-3 sm:mb-4" />
								<h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2 text-center">
									Nicio comandă{" "}
									{getStatusLabel(activeTab).toLowerCase()}
								</h3>
								<p className="text-sm sm:text-base text-gray-500 text-center px-4">
									Nu există comenzi cu statusul "
									{getStatusLabel(activeTab)}"
								</p>
							</CardContent>
						</Card>
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
							{orders.map((order) => (
								<Card
									key={order.id}
									className="hover:shadow-lg transition-shadow duration-200"
								>
									<CardHeader className="pb-3">
										<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
											<CardTitle className="text-base sm:text-lg">
												Comanda #{order.id.slice(-8)}
											</CardTitle>
											<Badge
												className={`${getStatusColor(
													order.status
												)} text-xs sm:text-sm`}
											>
												{getStatusLabel(order.status)}
											</Badge>
										</div>
									</CardHeader>
									<CardContent className="space-y-3 sm:space-y-4">
										{/* Customer Info */}
										<div className="space-y-1.5 sm:space-y-2">
											<div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
												<User className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
												<span className="font-medium truncate">
													{order.customer.name}
												</span>
											</div>
											<div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
												<Phone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
												<span className="truncate">
													{order.customer.phone}
												</span>
											</div>
											<div className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
												<MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5" />
												<span className="line-clamp-2">
													{order.address}
												</span>
											</div>
										</div>

										{/* Order Items */}
										<div className="space-y-1.5 sm:space-y-2">
											<h4 className="font-medium text-xs sm:text-sm">
												Produse:
											</h4>
											<div className="space-y-1">
												{order.items.map((item) => (
													<div
														key={item.id}
														className="flex items-center justify-between text-xs sm:text-sm"
													>
														<span className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
															<span className="w-5 h-5 sm:w-6 sm:h-6 bg-orange-100 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">
																{item.quantity}
															</span>
															<span className="truncate">
																{
																	item.product
																		.name
																}
															</span>
														</span>
														<span className="font-medium flex-shrink-0 ml-2">
															{item.price *
																item.quantity}{" "}
															{order.currency}
														</span>
													</div>
												))}
											</div>
										</div>

										{/* Order Details */}
										<div className="space-y-1.5 sm:space-y-2 pt-2 border-t">
											<div className="flex items-center justify-between text-xs sm:text-sm">
												<span className="flex items-center gap-1.5 sm:gap-2 text-gray-600">
													<DollarSign className="w-3 h-3 sm:w-4 sm:h-4" />
													Total:
												</span>
												<span className="font-bold text-base sm:text-lg">
													{order.total}{" "}
													{order.currency}
												</span>
											</div>
											<div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600">
												<Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
												<span>
													{formatDate(
														order.createdAt
													)}
												</span>
											</div>
											{order.notes && (
												<div className="text-xs sm:text-sm text-gray-600 bg-gray-50 p-2 rounded">
													<span className="font-medium">
														Note:
													</span>{" "}
													{order.notes}
												</div>
											)}
										</div>

										{/* Action Buttons */}
										<div className="flex flex-col sm:flex-row gap-2 pt-3 sm:pt-4 border-t">
											{activeTab === "PENDING" && (
												<>
													<Button
														size="sm"
														className="flex-1 bg-green-600 hover:bg-green-700 text-xs sm:text-sm"
														onClick={() =>
															updateOrderStatus(
																order.id,
																"CONFIRMED"
															)
														}
														disabled={
															updatingOrder ===
															order.id
														}
													>
														<Check className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
														Confirmă
													</Button>
													<Button
														size="sm"
														variant="outline"
														className="flex-1 border-red-300 text-red-600 hover:bg-red-50 text-xs sm:text-sm"
														onClick={() =>
															updateOrderStatus(
																order.id,
																"CANCELLED"
															)
														}
														disabled={
															updatingOrder ===
															order.id
														}
													>
														<X className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
														Respinge
													</Button>
												</>
											)}

											{activeTab === "CONFIRMED" && (
												<Button
													size="sm"
													className="flex-1 bg-orange-600 hover:bg-orange-700 text-xs sm:text-sm"
													onClick={() =>
														updateOrderStatus(
															order.id,
															"PREPARING"
														)
													}
													disabled={
														updatingOrder ===
														order.id
													}
												>
													<ChefHat className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
													Începe prepararea
												</Button>
											)}

											{activeTab === "PREPARING" && (
												<Button
													size="sm"
													className="flex-1 bg-green-600 hover:bg-green-700 text-xs sm:text-sm"
													onClick={() =>
														updateOrderStatus(
															order.id,
															"READY"
														)
													}
													disabled={
														updatingOrder ===
														order.id
													}
												>
													<Package className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
													Gata pentru livrare
												</Button>
											)}

											{activeTab === "READY" && (
												<Button
													size="sm"
													className="flex-1 bg-purple-600 hover:bg-purple-700 text-xs sm:text-sm"
													onClick={() =>
														updateOrderStatus(
															order.id,
															"DELIVERED"
														)
													}
													disabled={
														updatingOrder ===
														order.id
													}
												>
													<Truck className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
													Marchează ca livrat
												</Button>
											)}

											{updatingOrder === order.id && (
												<div className="flex-1 flex items-center justify-center">
													<div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
												</div>
											)}
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					)}
				</TabsContent>
			</Tabs>
		</div>
	);
}
