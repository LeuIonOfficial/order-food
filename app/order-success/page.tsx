import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle, Home, ShoppingBag, PartyPopper } from "lucide-react";

export default function OrderSuccessPage() {
	return (
		<main className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 flex items-center justify-center py-8 px-4">
			<div className="max-w-md w-full animate-bounce-in">
				<Card className="text-center shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
					<CardHeader className="pb-6">
						<div className="flex justify-center mb-6">
							<div className="relative">
								<div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
								<div className="relative bg-green-500 rounded-full p-4 shadow-lg">
									<CheckCircle className="h-12 w-12 text-white animate-scale-in" />
								</div>
							</div>
						</div>
						<CardTitle className="text-3xl font-bold text-gray-900 mb-2 animate-fade-in-up-delay">
							Comandă plasată cu succes!
						</CardTitle>
						<div className="flex items-center justify-center gap-2 text-green-600 animate-fade-in-up-delay-2">
							<PartyPopper className="w-5 h-5" />
							<span className="text-sm font-medium">
								Felicitări!
							</span>
							<PartyPopper className="w-5 h-5" />
						</div>
					</CardHeader>
					<CardContent className="space-y-6 animate-fade-in-up-delay-3">
						<div className="bg-gradient-to-r from-green-50 to-orange-50 p-4 rounded-lg border border-green-200">
							<p className="text-gray-700 leading-relaxed">
								Bucătarul va confirma comanda în curând și va
								contacta pentru livrare. Vei primi notificări pe
								email.
							</p>
						</div>

						<div className="space-y-3">
							<Button
								asChild
								className="w-full bg-orange-500 hover:bg-orange-600 shadow-md hover:shadow-lg transition-all duration-200 group"
							>
								<Link
									href="/explore"
									className="flex items-center justify-center gap-2"
								>
									<ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
									Explorează mai multă mâncare
								</Link>
							</Button>
							<Button
								asChild
								variant="outline"
								className="w-full border-2 hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 group"
							>
								<Link
									href="/"
									className="flex items-center justify-center gap-2"
								>
									<Home className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
									Înapoi la pagina principală
								</Link>
							</Button>
						</div>

						<div className="pt-4 border-t border-gray-200">
							<p className="text-xs text-gray-500">
								Mulțumim că ai ales Gustul Casei! 🍽️
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</main>
	);
}
