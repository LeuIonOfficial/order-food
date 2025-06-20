"use client";

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
import { useState } from "react";

interface ProductCardProps {
	product: {
		id: string;
		name: string;
		description: string;
		price: number;
		currency: string;
		image: string;
		category: string;
		cook: {
			name: string;
		};
		reviews: Array<{
			rating: number;
		}>;
	};
}

export function ProductCard({ product }: ProductCardProps) {
	const [imageLoading, setImageLoading] = useState(true);

	const averageRating =
		product.reviews.length > 0
			? (
					product.reviews.reduce((acc, r) => acc + r.rating, 0) /
					product.reviews.length
			  ).toFixed(1)
			: null;

	return (
		<Card className="flex flex-col hover:shadow-lg transition-shadow">
			<CardHeader>
				<CardTitle className="line-clamp-1">{product.name}</CardTitle>
				<CardDescription>{product.category}</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="relative">
					<Image
						src={product.image}
						alt={product.name}
						width={400}
						height={250}
						className={`rounded-md object-cover w-full h-40 transition-opacity ${
							imageLoading ? "opacity-0" : "opacity-100"
						}`}
						onLoad={() => setImageLoading(false)}
						priority={false}
					/>
					{imageLoading && (
						<div className="absolute inset-0 bg-muted animate-pulse rounded-md" />
					)}
				</div>
				<p className="mt-2 text-sm text-muted-foreground line-clamp-2">
					{product.description}
				</p>
				<div className="mt-2 flex items-center gap-2">
					<span className="font-semibold">
						{product.price} {product.currency}
					</span>
					<span className="text-xs text-gray-500">
						de la {product.cook.name}
					</span>
				</div>
				<div className="mt-1 text-xs text-yellow-600">
					{averageRating
						? `★ ${averageRating} (${product.reviews.length} recenzii)`
						: "Fără recenzii"}
				</div>
			</CardContent>
			<CardFooter>
				<Button asChild className="w-full">
					<Link href={`/product/${product.id}`}>Vezi detalii</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}
