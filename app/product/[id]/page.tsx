import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, ArrowLeft, ShoppingCart, MessageSquare } from "lucide-react";

async function getProduct(id: string) {
	try {
		// For server-side rendering, we need to construct the URL properly
		// In development, use localhost, in production use the request headers
		const protocol =
			process.env.NODE_ENV === "production" ? "https" : "http";
		const host = process.env.VERCEL_URL || "localhost:3000";
		const baseUrl = `${protocol}://${host}`;

		console.log(
			"Fetching product with URL:",
			`${baseUrl}/api/products/${id}`
		);

		const res = await fetch(`${baseUrl}/api/products/${id}`, {
			cache: "no-store",
		});

		console.log("Response status:", res.status);

		if (!res.ok) {
			console.error(
				"Failed to fetch product:",
				res.status,
				res.statusText
			);
			return null;
		}

		const data = await res.json();
		console.log("Product data received:", !!data);
		return data;
	} catch (error) {
		console.error("Error fetching product:", error);
		return null;
	}
}

export default async function ProductPage({
	params,
}: {
	params: { id: string };
}) {
	console.log("ProductPage called with params:", params);

	const product = await getProduct(params.id);
	console.log("Product result:", !!product);

	if (!product) return notFound();

	const averageRating =
		product.reviews.length > 0
			? (
					product.reviews.reduce(
						(acc: number, r: any) => acc + r.rating,
						0
					) / product.reviews.length
			  ).toFixed(1)
			: 0;

	return (
		<main className="max-w-4xl mx-auto py-8 px-4 animate-fade-in-up">
			{/* Back Button */}
			<div className="mb-6 animate-fade-in-up-delay">
				<Button
					asChild
					variant="ghost"
					className="group hover:bg-orange-50 transition-all duration-200"
				>
					<Link href="/explore" className="flex items-center gap-2">
						<ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
						Înapoi la explorare
					</Link>
				</Button>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Product Image */}
				<div className="animate-fade-in-up-delay-2">
					<div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500">
						<Image
							src={product.image}
							alt={product.name}
							width={600}
							height={400}
							className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
					</div>
				</div>

				{/* Product Details */}
				<div className="space-y-6 animate-fade-in-up-delay-3">
					<div>
						<h1 className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-200">
							{product.name}
						</h1>
						<div className="flex items-center gap-3 mb-4">
							<span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium hover:bg-orange-200 transition-colors duration-200">
								{product.category}
							</span>
							<div className="flex items-center gap-1">
								<Star className="w-4 h-4 text-yellow-500 fill-current" />
								<span className="text-sm font-medium text-gray-700">
									{averageRating} ({product.reviews.length}{" "}
									recenzii)
								</span>
							</div>
						</div>
						<p className="text-lg text-gray-600 leading-relaxed">
							{product.description}
						</p>
					</div>

					{/* Price and Cook Info */}
					<div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200 hover:shadow-lg transition-all duration-300">
						<div className="flex items-center justify-between mb-4">
							<div>
								<span className="text-3xl font-bold text-orange-600">
									{product.price} {product.currency}
								</span>
								<p className="text-sm text-gray-600 mt-1">
									Preparat de{" "}
									<span className="font-semibold text-orange-700">
										{product.cook.name}
									</span>
								</p>
							</div>
						</div>

						<div className="flex flex-col sm:flex-row gap-3">
							<Button
								asChild
								className="flex-1 bg-orange-500 hover:bg-orange-600 shadow-md hover:shadow-lg transition-all duration-200 group"
							>
								<Link
									href={`/order/${product.id}`}
									className="flex items-center justify-center gap-2"
								>
									<ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
									Comandă acum
								</Link>
							</Button>
							<Button
								asChild
								variant="outline"
								className="flex-1 border-2 hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 group"
							>
								<Link
									href={`/review/${product.id}`}
									className="flex items-center justify-center gap-2"
								>
									<MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
									Adaugă recenzie
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>

			{/* Reviews Section */}
			<section className="mt-12 animate-fade-in-up-delay-4">
				<div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
					<h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
						<Star className="w-6 h-6 text-yellow-500 fill-current" />
						Recenzii ({product.reviews.length})
					</h2>

					{product.reviews.length === 0 ? (
						<div className="text-center py-8">
							<Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
							<p className="text-gray-500 text-lg">
								Nu există recenzii încă.
							</p>
							<p className="text-gray-400 text-sm">
								Fii primul care lasă o recenzie!
							</p>
						</div>
					) : (
						<div className="space-y-4">
							{product.reviews.map(
								(review: any, index: number) => (
									<div
										key={review.id}
										className="border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-orange-200 transition-all duration-300 animate-fade-in-up"
										style={{
											animationDelay: `${index * 0.1}s`,
										}}
									>
										<div className="flex items-center justify-between mb-3">
											<div className="flex items-center gap-3">
												<div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
													<span className="text-orange-600 font-semibold text-sm">
														{(review.customer
															?.name ||
															"A")[0].toUpperCase()}
													</span>
												</div>
												<div>
													<span className="font-semibold text-gray-900">
														{review.customer
															?.name || "Anonim"}
													</span>
													<div className="flex items-center gap-1 mt-1">
														{Array.from(
															{ length: 5 },
															(_, i) => (
																<Star
																	key={i}
																	className={`w-4 h-4 ${
																		i <
																		review.rating
																			? "text-yellow-500 fill-current"
																			: "text-gray-300"
																	}`}
																/>
															)
														)}
													</div>
												</div>
											</div>
										</div>
										<p className="text-gray-700 leading-relaxed">
											{review.comment}
										</p>
									</div>
								)
							)}
						</div>
					)}
				</div>
			</section>
		</main>
	);
}
