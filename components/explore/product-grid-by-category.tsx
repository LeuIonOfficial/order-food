"use client";

import { useProductsWithFilters } from "@/lib/hooks/use-products";
import { ProductCardSkeleton } from "@/components/product-card-skeleton";
import { CategoryGroup } from "./category-group";
import { useSearchParams } from "next/navigation";

const categoryIcons: Record<string, string> = {
	"Fel principal": "🍖",
	Gustare: "🥨",
	Desert: "🍰",
	Băuturi: "🥤",
};

export function ProductGridByCategory() {
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
			<div className="space-y-8">
				{Array.from({ length: 3 }).map((_, i) => (
					<div key={i} className="mb-8">
						<div className="h-16 bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
							{Array.from({ length: 4 }).map((_, j) => (
								<ProductCardSkeleton key={j} />
							))}
						</div>
					</div>
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

	// Group products by category
	const productsByCategory = products.reduce((acc, product) => {
		const category = product.category;
		if (!acc[category]) {
			acc[category] = [];
		}
		acc[category].push(product);
		return acc;
	}, {} as Record<string, typeof products>);

	// If a specific category is selected, show only that category
	if (filters.category && filters.category !== "all") {
		const categoryProducts = productsByCategory[filters.category] || [];
		return (
			<div className="space-y-8">
				<CategoryGroup
					category={filters.category}
					products={categoryProducts}
					icon={categoryIcons[filters.category] || "🍽️"}
				/>
			</div>
		);
	}

	// Show all categories grouped
	return (
		<div className="space-y-8">
			{Object.entries(productsByCategory).map(
				([category, categoryProducts]) => (
					<CategoryGroup
						key={category}
						category={category}
						products={categoryProducts}
						icon={categoryIcons[category] || "🍽️"}
					/>
				)
			)}
		</div>
	);
}
