"use client";

import { useProductsWithFilters } from "@/lib/hooks/use-products";
import { ProductCard } from "@/components/product/product-card";
import { ProductCardSkeleton } from "@/components/product-card-skeleton";
import { useSearchParams } from "next/navigation";

export function ProductGrid() {
	const searchParams = useSearchParams();

	// Extract all filter parameters
	const filters = {
		search: searchParams.get("search") || undefined,
		category: searchParams.get("category") || undefined,
		sort: searchParams.get("sort") || undefined,
		priceRange: searchParams.get("priceRange") || undefined,
		delivery: searchParams.get("delivery") || undefined,
	};

	// Use the comprehensive filter hook
	const {
		data: products = [],
		isLoading,
		error,
	} = useProductsWithFilters(filters);

	if (isLoading) {
		return (
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{Array.from({ length: 8 }).map((_, i) => (
					<ProductCardSkeleton key={i} />
				))}
			</div>
		);
	}

	if (error) {
		return (
			<div className="text-center py-12">
				<p className="text-gray-500 text-lg">
					A apărut o eroare la încărcarea produselor. Încearcă din
					nou.
				</p>
			</div>
		);
	}

	if (products.length === 0) {
		const activeFilters = Object.entries(filters).filter(
			([_, value]) => value
		);

		return (
			<div className="text-center py-12">
				<p className="text-gray-500 text-lg">
					{activeFilters.length > 0
						? `Nu s-au găsit produse pentru filtrele selectate.`
						: "Nu s-au găsit produse momentan."}
				</p>
				{activeFilters.length > 0 && (
					<div className="mt-4">
						<p className="text-gray-400 text-sm">
							Filtre active:{" "}
							{activeFilters
								.map(([key, value]) => `${key}: ${value}`)
								.join(", ")}
						</p>
					</div>
				)}
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
			{products.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	);
}
