"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
	ArrowLeft,
	ShoppingCart,
	MapPin,
	Phone,
	FileText,
	Calculator,
	User,
	Mail,
} from "lucide-react";
import Link from "next/link";

interface Product {
	id: string;
	name: string;
	price: number;
	currency: string;
	image: string;
	cook: {
		id: string;
		name: string;
	};
}

export default function OrderPage({ params }: { params: { id: string } }) {
	const router = useRouter();
	const { data: session, status } = useSession();
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);
	const [formData, setFormData] = useState({
		quantity: 1,
		address: "",
		phone: "",
		notes: "",
		customerName: "",
		customerEmail: "",
	});

	// Fetch product data
	useEffect(() => {
		fetch(`/api/products/${params.id}`)
			.then((res) => res.json())
			.then((data) => {
				setProduct(data);
				setLoading(false);
			})
			.catch(() => setLoading(false));
	}, [params.id]);

	// Pre-fill form data if user is logged in
	useEffect(() => {
		if (session?.user) {
			setFormData((prev) => ({
				...prev,
				customerName: session.user.name || "",
				customerEmail: session.user.email || "",
				address: (session.user as any).address || "",
				phone: (session.user as any).phone || "",
			}));
		}
	}, [session]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!product) return;

		// Validate guest order fields
		if (
			!session?.user &&
			(!formData.customerName || !formData.customerEmail)
		) {
			alert(
				"Numele și email-ul sunt obligatorii pentru comenzi fără cont"
			);
			return;
		}

		setSubmitting(true);
		try {
			const orderData: any = {
				items: [
					{
						productId: product.id,
						quantity: formData.quantity,
					},
				],
				address: formData.address,
				phone: formData.phone,
				notes: formData.notes,
			};

			// Add customer info for guest orders
			if (!session?.user) {
				orderData.customerName = formData.customerName;
				orderData.customerEmail = formData.customerEmail;
			}

			const response = await fetch("/api/orders", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(orderData),
			});

			if (response.ok) {
				router.push("/order-success");
			} else {
				const errorData = await response.json();
				console.error("Order failed:", errorData);
				alert(errorData.error || "Eroare la plasarea comenzii");
			}
		} catch (error) {
			console.error("Order failed:", error);
			alert("Eroare la plasarea comenzii");
		} finally {
			setSubmitting(false);
		}
	};

	if (loading || status === "loading") {
		return (
			<main className="max-w-2xl mx-auto py-8 px-4 animate-fade-in-up">
				<Card className="shadow-lg">
					<CardHeader>
						<Skeleton className="h-8 w-3/4" />
					</CardHeader>
					<CardContent className="space-y-6">
						<Skeleton className="h-48 w-full rounded-lg" />
						<div className="space-y-4">
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-2/3" />
							<Skeleton className="h-4 w-1/2" />
						</div>
					</CardContent>
				</Card>
			</main>
		);
	}

	if (!product) {
		return (
			<main className="max-w-2xl mx-auto py-8 px-4 animate-fade-in-up">
				<Card className="text-center shadow-lg">
					<CardContent className="py-12">
						<div className="text-gray-400 mb-4">
							<ShoppingCart className="w-16 h-16 mx-auto" />
						</div>
						<h2 className="text-xl font-semibold text-gray-900 mb-2">
							Produsul nu a fost găsit
						</h2>
						<p className="text-gray-600 mb-6">
							Produsul pe care îl cauți nu mai este disponibil.
						</p>
						<Button
							asChild
							className="bg-orange-500 hover:bg-orange-600"
						>
							<Link href="/explore">Explorează alte produse</Link>
						</Button>
					</CardContent>
				</Card>
			</main>
		);
	}

	const total = product.price * formData.quantity;
	const isGuestOrder = !session?.user;

	return (
		<main className="max-w-2xl mx-auto py-8 px-4 animate-fade-in-up">
			{/* Back Button */}
			<div className="mb-6 animate-fade-in-up-delay">
				<Button
					asChild
					variant="ghost"
					className="group hover:bg-orange-50 transition-all duration-200"
				>
					<Link
						href={`/product/${product.id}`}
						className="flex items-center gap-2"
					>
						<ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
						Înapoi la produs
					</Link>
				</Button>
			</div>

			<Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm animate-fade-in-up-delay-2">
				<CardHeader className="pb-6">
					<CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
						<ShoppingCart className="w-6 h-6 text-orange-500" />
						Comandă: {product.name}
					</CardTitle>
					{isGuestOrder && (
						<p className="text-sm text-gray-600 mt-2">
							Comandă fără cont - vei primi un email de confirmare
						</p>
					)}
				</CardHeader>
				<CardContent className="space-y-6">
					{/* Product Summary */}
					<div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
						<div className="flex items-center gap-4">
							<div className="relative group overflow-hidden rounded-lg shadow-md">
								<img
									src={product.image}
									alt={product.name}
									className="w-20 h-20 object-cover group-hover:scale-105 transition-transform duration-300"
								/>
							</div>
							<div className="flex-1">
								<h3 className="font-semibold text-gray-900">
									{product.name}
								</h3>
								<p className="text-sm text-gray-600">
									de la {product.cook.name}
								</p>
								<p className="text-lg font-bold text-orange-600">
									{product.price} {product.currency}
								</p>
							</div>
						</div>
					</div>

					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Customer Info for Guest Orders */}
						{isGuestOrder && (
							<>
								<div className="space-y-2">
									<label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
										<User className="w-4 h-4 text-orange-500" />
										Numele tău
									</label>
									<Input
										value={formData.customerName}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												customerName: e.target.value,
											}))
										}
										placeholder="Numele tău complet"
										className="focus:border-orange-300 focus:ring-orange-200"
										required={isGuestOrder}
									/>
								</div>

								<div className="space-y-2">
									<label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
										<Mail className="w-4 h-4 text-orange-500" />
										Email
									</label>
									<Input
										type="email"
										value={formData.customerEmail}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												customerEmail: e.target.value,
											}))
										}
										placeholder="email@example.com"
										className="focus:border-orange-300 focus:ring-orange-200"
										required={isGuestOrder}
									/>
								</div>
							</>
						)}

						{/* Quantity */}
						<div className="space-y-2">
							<label className="block text-sm font-semibold text-gray-700 mb-2">
								Cantitate
							</label>
							<div className="flex items-center gap-3">
								<Button
									type="button"
									variant="outline"
									size="sm"
									onClick={() =>
										setFormData((prev) => ({
											...prev,
											quantity: Math.max(
												1,
												prev.quantity - 1
											),
										}))
									}
									className="w-10 h-10 p-0 hover:bg-orange-50 hover:border-orange-300"
								>
									-
								</Button>
								<Input
									type="number"
									min="1"
									value={formData.quantity}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											quantity: Math.max(
												1,
												parseInt(e.target.value) || 1
											),
										}))
									}
									className="text-center w-20"
									required
								/>
								<Button
									type="button"
									variant="outline"
									size="sm"
									onClick={() =>
										setFormData((prev) => ({
											...prev,
											quantity: prev.quantity + 1,
										}))
									}
									className="w-10 h-10 p-0 hover:bg-orange-50 hover:border-orange-300"
								>
									+
								</Button>
							</div>
						</div>

						{/* Address */}
						<div className="space-y-2">
							<label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
								<MapPin className="w-4 h-4 text-orange-500" />
								Adresa de livrare
							</label>
							<Input
								value={formData.address}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										address: e.target.value,
									}))
								}
								placeholder="Strada, numărul, orașul"
								className="focus:border-orange-300 focus:ring-orange-200"
								required
							/>
						</div>

						{/* Phone */}
						<div className="space-y-2">
							<label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
								<Phone className="w-4 h-4 text-orange-500" />
								Telefon
							</label>
							<Input
								type="tel"
								value={formData.phone}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										phone: e.target.value,
									}))
								}
								placeholder="+373 60000000"
								className="focus:border-orange-300 focus:ring-orange-200"
								required
							/>
						</div>

						{/* Notes */}
						<div className="space-y-2">
							<label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
								<FileText className="w-4 h-4 text-orange-500" />
								Note (opțional)
							</label>
							<Input
								value={formData.notes}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										notes: e.target.value,
									}))
								}
								placeholder="Instrucțiuni speciale pentru livrare"
								className="focus:border-orange-300 focus:ring-orange-200"
							/>
						</div>

						{/* Total */}
						<div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<Calculator className="w-5 h-5 text-green-600" />
									<span className="font-semibold text-gray-900">
										Total:
									</span>
								</div>
								<p className="text-2xl font-bold text-green-600">
									{total} {product.currency}
								</p>
							</div>
						</div>
					</form>
				</CardContent>
				<CardFooter className="pt-6">
					<Button
						onClick={handleSubmit}
						disabled={submitting}
						className="w-full bg-orange-500 hover:bg-orange-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
					>
						{submitting ? (
							<div className="flex items-center gap-2">
								<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
								Se procesează...
							</div>
						) : (
							<div className="flex items-center gap-2">
								<ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
								{isGuestOrder
									? "Plasează comanda fără cont"
									: "Plasează comanda"}
							</div>
						)}
					</Button>
				</CardFooter>
			</Card>
		</main>
	);
}
