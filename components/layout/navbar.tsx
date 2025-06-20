"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart, User, Menu, X, ChefHat } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { NavbarSkeleton } from "./navbar-skeleton";

export function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [isScrolled, setIsScrolled] = useState(false);

	const pathname = usePathname();
	const searchParams = useSearchParams();
	const router = useRouter();
	const { data: session, status } = useSession();
	const isAdmin = session?.user?.isAdmin;

	useEffect(() => {
		const search = searchParams.get("search");
		if (search) {
			setSearchQuery(search);
		} else {
			setSearchQuery("");
		}
	}, [searchParams]);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

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

	// Show skeleton while loading
	if (status === "loading") {
		return <NavbarSkeleton />;
	}

	return (
		<nav
			className={`bg-background/90 backdrop-blur-md border-b sticky top-0 z-50 transition-all duration-300 ${
				isScrolled ? "shadow-lg bg-background/95" : ""
			}`}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Main Navigation */}
				<div className="flex justify-between items-center h-16">
					{/* Logo */}
					<Link
						href="/"
						className="flex items-center space-x-2 group hover:scale-105 transition-transform duration-200"
					>
						<div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
							<span className="text-white font-bold text-lg group-hover:scale-110 transition-transform duration-200">
								G
							</span>
						</div>
						<span className="font-bold text-xl text-foreground group-hover:text-orange-600 transition-colors duration-200">
							Gustul Casei
						</span>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden lg:flex items-center space-x-6">
						{/* Search */}
						<form
							onSubmit={handleSearch}
							className="flex items-center"
						>
							<div className="relative group">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-orange-500 transition-colors duration-200" />
								<Input
									type="text"
									placeholder="Caută sarmale, plăcinte..."
									value={searchQuery}
									onChange={(e) =>
										setSearchQuery(e.target.value)
									}
									className="pl-10 w-64 focus:border-orange-300 focus:ring-orange-200 transition-all duration-200 hover:shadow-md"
								/>
							</div>
						</form>

						{/* Actions */}
						<div className="flex items-center gap-x-2">
							<Button
								variant="ghost"
								size="icon"
								className="text-muted-foreground hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 group"
							>
								<ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
							</Button>
							<Button
								variant="ghost"
								size="icon"
								onClick={() => {
									if (session) {
										router.push("/account");
									} else {
										router.push("/auth/signin");
									}
								}}
								className="text-muted-foreground hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 group"
							>
								<User className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
							</Button>
							{isAdmin && (
								<Button
									variant="ghost"
									size="icon"
									onClick={() => router.push("/admin")}
									className="text-muted-foreground hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 group"
								>
									<span className="font-semibold">Admin</span>
								</Button>
							)}
							{!session && (
								<Button className="bg-orange-500 hover:bg-orange-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group">
									<ChefHat className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-200" />
									Devino bucătar
								</Button>
							)}
							{session && (
								<Button
									variant="outline"
									size="sm"
									onClick={() =>
										signOut({ callbackUrl: "/" })
									}
								>
									Logout
								</Button>
							)}
						</div>
					</div>

					{/* Mobile menu button */}
					<div className="lg:hidden">
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="hover:bg-orange-50 hover:text-orange-600 transition-all duration-200"
						>
							{isMenuOpen ? (
								<X className="w-5 h-5" />
							) : (
								<Menu className="w-5 h-5" />
							)}
						</Button>
					</div>
				</div>
			</div>

			{/* Mobile Navigation */}
			<div
				className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
					isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
				}`}
			>
				<div className="bg-background/95 backdrop-blur-sm border-t">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
						{/* Mobile Search */}
						<form
							onSubmit={handleSearch}
							className="animate-fade-in-up"
						>
							<div className="relative group">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-orange-500 transition-colors duration-200" />
								<Input
									type="text"
									placeholder="Caută mâncare..."
									value={searchQuery}
									onChange={(e) =>
										setSearchQuery(e.target.value)
									}
									className="pl-10 w-full focus:border-orange-300 focus:ring-orange-200 transition-all duration-200"
								/>
							</div>
						</form>

						{/* Mobile Actions */}
						<div className="border-t pt-4 flex flex-col gap-2">
							<Button
								variant="ghost"
								className="w-full justify-start text-muted-foreground hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 group animate-fade-in-up-delay"
							>
								<ShoppingCart className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
								Coșul meu
							</Button>
							<Button
								variant="ghost"
								className="w-full justify-start text-muted-foreground hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 group animate-fade-in-up-delay-2"
								onClick={() => {
									if (session) {
										router.push("/account");
									} else {
										router.push("/auth/signin");
									}
								}}
							>
								<User className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
								Contul meu
							</Button>
							{isAdmin && (
								<Button
									variant="ghost"
									className="w-full justify-start text-muted-foreground hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 group animate-fade-in-up-delay-3"
									onClick={() => router.push("/admin")}
								>
									<span className="font-semibold">
										Admin Panel
									</span>
								</Button>
							)}
							{!session && (
								<Button className="w-full bg-orange-500 hover:bg-orange-600 shadow-md hover:shadow-lg transition-all duration-200 group animate-fade-in-up-delay-3">
									<ChefHat className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-200" />
									Devino bucătar
								</Button>
							)}
							{session && (
								<Button
									variant="outline"
									className="w-full"
									onClick={() =>
										signOut({ callbackUrl: "/" })
									}
								>
									Logout
								</Button>
							)}
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}
