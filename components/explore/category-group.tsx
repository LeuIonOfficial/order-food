"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { Product } from "@/lib/services/product-service";

interface CategoryGroupProps {
	category: string;
	products: Product[];
	icon?: string;
}

export function CategoryGroup({
	category,
	products,
	icon = "🍽️",
}: CategoryGroupProps) {
	const [isExpanded, setIsExpanded] = useState(true);

	if (products.length === 0) {
		return null;
	}

	const handleToggle = (e: React.MouseEvent) => {
		e.preventDefault();
		// Prevent scroll jump by maintaining scroll position
		const currentScrollY = window.scrollY;
		setIsExpanded(!isExpanded);
		// Restore scroll position after state update
		setTimeout(() => {
			window.scrollTo(0, currentScrollY);
		}, 0);
	};

	return (
		<div className="mb-8">
			<button
				onClick={handleToggle}
				className="group flex items-center space-x-4 w-full text-left p-6 bg-gradient-to-r from-white to-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-gray-200"
			>
				<div className="flex items-center justify-center w-12 h-12 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-300">
					<span className="text-2xl">{icon}</span>
				</div>
				<div className="flex-1">
					<h2 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-200">
						{category}
					</h2>
					<p className="text-sm text-gray-600 mt-1">
						{products.length} produs
						{products.length !== 1 ? "e" : ""}
					</p>
				</div>
				<div className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-sm group-hover:shadow-md transition-all duration-300">
					{isExpanded ? (
						<ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-all duration-200 transform group-hover:scale-110" />
					) : (
						<ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-all duration-200 transform group-hover:scale-110" />
					)}
				</div>
			</button>

			<div
				className={`overflow-hidden transition-all duration-500 ease-in-out ${
					isExpanded
						? "max-h-[2000px] opacity-100"
						: "max-h-0 opacity-0"
				}`}
			>
				<div className="mt-6 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{products.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
