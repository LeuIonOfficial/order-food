"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Force dynamic rendering
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function PendingProductsPage() {
	const { data: session } = useSession();
	const [products, setProducts] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [success, setSuccess] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		if (session?.user?.isAdmin) {
			fetchPending();
		}
	}, [session]);

	const fetchPending = async () => {
		setLoading(true);
		setError("");
		try {
			const res = await fetch("/api/admin/products/pending");
			const data = await res.json();
			setProducts(data);
		} catch (err) {
			setError("Failed to fetch pending products");
		} finally {
			setLoading(false);
		}
	};

	const approveProduct = async (productId: string) => {
		setError("");
		setSuccess("");
		try {
			const res = await fetch("/api/admin/products/approve", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ productId }),
			});
			if (!res.ok) {
				setError("Failed to approve product");
			} else {
				setSuccess("Product approved!");
				setProducts(products.filter((p) => p.id !== productId));
			}
		} catch (err) {
			setError("Failed to approve product");
		}
	};

	if (!session?.user?.isAdmin) {
		return (
			<div className="p-8 text-center">
				You must be an admin to access this page.
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-8 px-4">
			<div className="max-w-3xl mx-auto">
				<Card className="mb-8">
					<CardHeader>
						<CardTitle>Pending Product Approvals</CardTitle>
					</CardHeader>
					<CardContent>
						{error && (
							<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
								{error}
							</div>
						)}
						{success && (
							<div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
								{success}
							</div>
						)}
						{loading ? (
							<div className="text-center py-8">Loading...</div>
						) : products.length === 0 ? (
							<div className="text-center py-8 text-gray-600">
								No pending products.
							</div>
						) : (
							<div className="space-y-6">
								{products.map((product) => (
									<Card
										key={product.id}
										className="shadow-md"
									>
										<CardContent className="flex flex-col md:flex-row gap-6 p-6">
											<img
												src={product.image}
												alt={product.name}
												className="w-32 h-32 object-cover rounded-lg border"
											/>
											<div className="flex-1">
												<h3 className="text-lg font-bold text-gray-900 mb-1">
													{product.name}
												</h3>
												<p className="text-gray-700 mb-2">
													{product.description}
												</p>
												<div className="text-sm text-gray-500 mb-2">
													Category: {product.category}
												</div>
												<div className="text-sm text-gray-500 mb-2">
													Cook:{" "}
													{product.cook?.name ||
														product.cookId}
												</div>
												<div className="text-sm text-gray-500 mb-2">
													Price: {product.price}{" "}
													{product.currency}
												</div>
												<Button
													onClick={() =>
														approveProduct(
															product.id
														)
													}
													className="bg-green-600 hover:bg-green-700 mt-2"
												>
													Approve
												</Button>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
