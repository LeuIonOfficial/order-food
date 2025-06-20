import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/layout/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Gustul Casei - Marketplace pentru Mâncare Casnică",
	description:
		"Conectăm bucătarii pasionați cu persoanele care caută mâncare casnică delicioasă în Moldova",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ro" suppressHydrationWarning>
			<body className={inter.className}>
				<Providers>
					<div className="min-h-screen bg-gray-50">
						<Navbar />
						<main>{children}</main>
					</div>
				</Providers>
			</body>
		</html>
	);
}
