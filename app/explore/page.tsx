import { ExploreFilters } from "@/components/explore/explore-filters";
import { ProductGridByCategory } from "@/components/explore/product-grid-by-category";

export default function ExplorePage() {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-2">
					Explorează mâncarea de casă
				</h1>
				<p className="text-gray-600">
					Descoperă mâncare autentică gătită cu drag de bucătarii din
					Moldova
				</p>
			</div>

			<ExploreFilters />
			<ProductGridByCategory />
		</div>
	);
}
