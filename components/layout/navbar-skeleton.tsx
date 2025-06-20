import { Skeleton } from "@/components/ui/skeleton";

export function NavbarSkeleton() {
	return (
		<nav className="bg-background/90 backdrop-blur-md border-b sticky top-0 z-50 transition-all duration-300">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo */}
					<div className="flex items-center space-x-2">
						<Skeleton className="h-9 w-9 rounded-lg" />
						<Skeleton className="h-6 w-32" />
					</div>

					{/* Desktop Navigation */}
					<div className="hidden lg:flex items-center space-x-6">
						{/* Search */}
						<Skeleton className="h-10 w-64 rounded-md" />

						{/* Actions */}
						<div className="flex items-center gap-x-2">
							<Skeleton className="h-10 w-10 rounded-md" />
							<Skeleton className="h-10 w-10 rounded-md" />
							<Skeleton className="h-10 w-20 rounded-md" />
						</div>
					</div>

					{/* Mobile menu button */}
					<div className="lg:hidden">
						<Skeleton className="h-10 w-10 rounded-md" />
					</div>
				</div>
			</div>
		</nav>
	);
}
