import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Users, Clock, Shield } from "lucide-react";

export default function Home() {
	return (
		<div className="space-y-16">
			{/* Hero Section */}
			<section className="relative bg-gradient-to-br from-orange-50 to-orange-100 py-20 overflow-hidden">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in-up">
							Mâncare de casă
							<span className="block text-orange-500 animate-fade-in-up-delay">
								la un click distanță
							</span>
						</h1>
						<p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in-up-delay-2">
							Descoperă mâncare autentică gătită cu drag de
							bucătarii din Moldova. Comandă rapid, primește la
							ușă.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up-delay-3">
							<Button
								asChild
								size="lg"
								className="bg-orange-500 hover:bg-orange-600 text-lg px-8 py-3 shadow-md hover:shadow-lg transition-all duration-200"
							>
								<Link href="/explore">
									Explorează mâncarea
									<ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
								</Link>
							</Button>
							<Button
								asChild
								variant="outline"
								size="lg"
								className="text-lg px-8 py-3 border-2 hover:border-orange-300 hover:bg-orange-50 transition-all duration-200"
							>
								<Link href="/sell">Vinde mâncare</Link>
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in-up">
							De ce să alegi Gustul Casei?
						</h2>
						<p className="text-lg text-gray-600 animate-fade-in-up-delay">
							Conectăm bucătarii pasionați cu persoanele care
							doresc să savureze mâncare autentică
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="text-center p-6 group hover:bg-white hover:shadow-xl rounded-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up-delay-2">
							<div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 group-hover:scale-110 transition-all duration-300">
								<Star className="w-8 h-8 text-orange-500 group-hover:rotate-12 transition-transform duration-300" />
							</div>
							<h3 className="text-xl font-semibold mb-2 group-hover:text-orange-600 transition-colors duration-200">
								Mâncare autentică
							</h3>
							<p className="text-gray-600">
								Rețete tradiționale și preparate de casă, gătite
								local cu ingrediente proaspete
							</p>
						</div>

						<div className="text-center p-6 group hover:bg-white hover:shadow-xl rounded-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up-delay-3">
							<div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 group-hover:scale-110 transition-all duration-300">
								<Users className="w-8 h-8 text-orange-500 group-hover:rotate-12 transition-transform duration-300" />
							</div>
							<h3 className="text-xl font-semibold mb-2 group-hover:text-orange-600 transition-colors duration-200">
								Bucătari verificați
							</h3>
							<p className="text-gray-600">
								Toți bucătarii noștri sunt verificați și
								evaluați de comunitate
							</p>
						</div>

						<div className="text-center p-6 group hover:bg-white hover:shadow-xl rounded-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up-delay-4">
							<div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 group-hover:scale-110 transition-all duration-300">
								<Clock className="w-8 h-8 text-orange-500 group-hover:rotate-12 transition-transform duration-300" />
							</div>
							<h3 className="text-xl font-semibold mb-2 group-hover:text-orange-600 transition-colors duration-200">
								Livrare rapidă
							</h3>
							<p className="text-gray-600">
								Comandă și primește mâncarea în câteva ore,
								direct la ușa ta
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="bg-gradient-to-r from-orange-500 to-orange-600 py-16 relative overflow-hidden">
				<div className="absolute inset-0 bg-black/5"></div>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
					<h2 className="text-3xl font-bold text-white mb-4 animate-fade-in-up">
						Gata să începi?
					</h2>
					<p className="text-xl text-orange-100 mb-8 animate-fade-in-up-delay">
						Explorează mâncarea sau începe să vinzi propriile
						preparate
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up-delay-2">
						<Button
							asChild
							variant="secondary"
							size="lg"
							className="text-lg px-8 py-3 shadow-md hover:shadow-lg transition-all duration-200"
						>
							<Link href="/explore">Comandă mâncare</Link>
						</Button>
						<Button
							asChild
							variant="outline"
							size="lg"
							className="text-lg px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-orange-500 transition-all duration-200"
						>
							<Link href="/sell">Devino bucătar</Link>
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}
