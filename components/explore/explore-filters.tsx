"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";

const categories = [
	{ name: "Toate Categoriile", value: "all" },
	{ name: "Fel principal", value: "Fel principal" },
	{ name: "Gustare", value: "Gustare" },
	{ name: "Desert", value: "Desert" },
	{ name: "Băuturi", value: "Băuturi" },
];

const sortOptions = [
	{ name: "Relevanță", value: "all" },
	{ name: "Cele mai populare", value: "popular" },
	{ name: "Preț crescător", value: "price-asc" },
	{ name: "Preț descrescător", value: "price-desc" },
	{ name: "Cele mai noi", value: "newest" },
	{ name: "Rating", value: "rating" },
];

const priceRanges = [
	{ name: "Toate prețurile", value: "all" },
	{ name: "Sub 50 lei", value: "0-50" },
	{ name: "50-100 lei", value: "50-100" },
	{ name: "100-200 lei", value: "100-200" },
	{ name: "Peste 200 lei", value: "200+" },
];

const deliveryOptions = [
	{ name: "Toate", value: "all" },
	{ name: "Livrare", value: "delivery" },
	{ name: "Ridicare", value: "pickup" },
];

export function ExploreFilters() {
	const [searchQuery, setSearchQuery] = useState("");
	const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
	const searchParams = useSearchParams();
	const router = useRouter();

	// Initialize search query from URL params
	React.useEffect(() => {
		const search = searchParams.get("search");
		if (search) {
			setSearchQuery(search);
		}
	}, [searchParams]);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		const params = new URLSearchParams(searchParams.toString());
		if (searchQuery.trim()) {
			params.set("search", searchQuery.trim());
		} else {
			params.delete("search");
		}
		router.push(`/explore?${params.toString()}`);
	};

	const handleFilterChange = (filterType: string, value: string) => {
		const params = new URLSearchParams(searchParams.toString());

		if (value && value !== "all") {
			params.set(filterType, value);
		} else {
			params.delete(filterType);
		}

		router.push(`/explore?${params.toString()}`);
	};

	const clearAllFilters = () => {
		setSearchQuery("");
		router.push("/explore");
	};

	const getActiveFiltersCount = () => {
		let count = 0;
		searchParams.forEach((value, key) => {
			if (value && value !== "all") count++;
		});
		return count;
	};

	const activeFiltersCount = getActiveFiltersCount();

	return (
		<div className="bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
			{/* Search Bar */}
			<form onSubmit={handleSearch} className="mb-6">
				<div className="relative">
					<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
					<Input
						type="text"
						placeholder="Caută sarmale, plăcinte, ciorbe..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="pl-12 h-12 text-lg border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
					/>
				</div>
			</form>

			{/* Filter Toggle */}
			<div className="flex items-center justify-between">
				<Button
					variant="outline"
					size="lg"
					onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
					className="flex items-center space-x-3 bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all duration-200"
				>
					<Filter className="w-5 h-5" />
					<span className="font-medium">Filtre</span>
					{activeFiltersCount > 0 && (
						<span className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-sm font-medium shadow-sm">
							{activeFiltersCount}
						</span>
					)}
				</Button>

				{activeFiltersCount > 0 && (
					<Button
						variant="ghost"
						size="lg"
						onClick={clearAllFilters}
						className="text-muted-foreground hover:text-foreground hover:bg-gray-100 transition-all duration-200"
					>
						<X className="w-5 h-5 mr-2" />
						Șterge filtrele
					</Button>
				)}
			</div>

			{/* Expanded Filters */}
			<div
				className={`overflow-hidden transition-all duration-500 ease-in-out ${
					isFiltersExpanded
						? "max-h-[500px] opacity-100 mt-6"
						: "max-h-0 opacity-0"
				}`}
			>
				<div className="pt-6 border-t border-gray-200">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{/* Category Filter */}
						<div className="space-y-2">
							<label className="text-sm font-semibold text-gray-700">
								Categorie
							</label>
							<Select
								value={searchParams.get("category") || "all"}
								onValueChange={(value) =>
									handleFilterChange("category", value)
								}
							>
								<SelectTrigger className="bg-white border-gray-200 hover:border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200">
									<SelectValue placeholder="Selectează categoria" />
								</SelectTrigger>
								<SelectContent>
									{categories.map((category) => (
										<SelectItem
											key={category.name}
											value={category.value}
										>
											{category.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						{/* Sort Filter */}
						<div className="space-y-2">
							<label className="text-sm font-semibold text-gray-700">
								Sortează după
							</label>
							<Select
								value={searchParams.get("sort") || "all"}
								onValueChange={(value) =>
									handleFilterChange("sort", value)
								}
							>
								<SelectTrigger className="bg-white border-gray-200 hover:border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200">
									<SelectValue placeholder="Selectează sortarea" />
								</SelectTrigger>
								<SelectContent>
									{sortOptions.map((option) => (
										<SelectItem
											key={option.name}
											value={option.value}
										>
											{option.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						{/* Price Range Filter */}
						<div className="space-y-2">
							<label className="text-sm font-semibold text-gray-700">
								Interval de preț
							</label>
							<Select
								value={searchParams.get("priceRange") || "all"}
								onValueChange={(value) =>
									handleFilterChange("priceRange", value)
								}
							>
								<SelectTrigger className="bg-white border-gray-200 hover:border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200">
									<SelectValue placeholder="Selectează prețul" />
								</SelectTrigger>
								<SelectContent>
									{priceRanges.map((range) => (
										<SelectItem
											key={range.name}
											value={range.value}
										>
											{range.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						{/* Delivery Options Filter */}
						<div className="space-y-2">
							<label className="text-sm font-semibold text-gray-700">
								Opțiuni livrare
							</label>
							<Select
								value={searchParams.get("delivery") || "all"}
								onValueChange={(value) =>
									handleFilterChange("delivery", value)
								}
							>
								<SelectTrigger className="bg-white border-gray-200 hover:border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200">
									<SelectValue placeholder="Selectează livrarea" />
								</SelectTrigger>
								<SelectContent>
									{deliveryOptions.map((option) => (
										<SelectItem
											key={option.name}
											value={option.value}
										>
											{option.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
