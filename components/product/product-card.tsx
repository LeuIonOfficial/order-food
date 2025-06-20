"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Clock } from "lucide-react";
import { Product } from "@/lib/services/product-service";
import { Badge } from "../ui/badge";

interface ProductCardProps {
	product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
	const averageRating =
		product.reviews.length > 0
			? product.reviews.reduce((acc, review) => acc + review.rating, 0) /
			  product.reviews.length
			: 0;

	return (
		<Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 bg-white">
			<div className="relative">
				<Image
					src={product.image}
					alt={product.name}
					width={400}
					height={250}
					className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
				/>
				<div className="absolute top-3 left-3">
					<Badge
						variant="secondary"
						className="bg-white/95 text-gray-800 shadow-sm font-medium"
					>
						{product.category}
					</Badge>
				</div>
				<div className="absolute top-3 right-3">
					<Badge
						variant="default"
						className="bg-orange-500 shadow-sm font-semibold"
					>
						{product.price} {product.currency}
					</Badge>
				</div>
			</div>

			<CardContent className="p-5">
				<div className="space-y-4">
					{/* Product Info */}
					<div>
						<h3 className="font-semibold text-lg text-gray-900 line-clamp-1 group-hover:text-gray-700 transition-colors duration-200">
							{product.name}
						</h3>
						<p className="text-sm text-gray-600 line-clamp-2 mt-2 leading-relaxed">
							{product.description}
						</p>
					</div>

					{/* Cook Info */}
					<div className="flex items-center space-x-3">
						<Image
							src={product.cook.avatar}
							alt={product.cook.name}
							width={28}
							height={28}
							className="w-7 h-7 rounded-full border-2 border-white shadow-sm"
						/>
						<div className="flex-1">
							<span className="text-sm font-medium text-gray-800">
								{product.cook.name}
							</span>
							<div className="flex items-center space-x-1 mt-0.5">
								<MapPin className="w-3 h-3 text-gray-400" />
								<span className="text-xs text-gray-500">
									{product.cook.city}
								</span>
							</div>
						</div>
					</div>

					{/* Rating */}
					<div className="flex items-center space-x-3">
						<div className="flex items-center space-x-1">
							<Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
							<span className="text-sm font-semibold text-gray-900">
								{averageRating.toFixed(1)}
							</span>
						</div>
						<span className="text-sm text-gray-500">
							({product.reviews.length} recenzii)
						</span>
					</div>

					{/* Actions */}
					<div className="flex space-x-3 pt-2">
						<Button
							asChild
							className="flex-1 bg-orange-500 hover:bg-orange-600 shadow-sm hover:shadow-md transition-all duration-200 font-medium"
						>
							<Link href={`/product/${product.id}`}>
								Vezi detalii
							</Link>
						</Button>
						<Button
							variant="outline"
							size="sm"
							className="px-4 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
						>
							<Clock className="w-4 h-4" />
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
