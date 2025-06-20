"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { CheckCircle, XCircle, Mail, Loader2 } from "lucide-react";

export default function VerifyPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const [status, setStatus] = useState<"loading" | "success" | "error">(
		"loading"
	);
	const [message, setMessage] = useState("");

	useEffect(() => {
		if (!token) {
			setStatus("error");
			setMessage("No verification token provided");
			return;
		}

		verifyEmail(token);
	}, [token]);

	const verifyEmail = async (token: string) => {
		try {
			const response = await fetch("/api/auth/verify", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ token }),
			});

			const data = await response.json();

			if (response.ok) {
				setStatus("success");
				setMessage(data.message);
			} else {
				setStatus("error");
				setMessage(data.error || "Verification failed");
			}
		} catch (error) {
			setStatus("error");
			setMessage("Something went wrong. Please try again.");
		}
	};

	const renderContent = () => {
		switch (status) {
			case "loading":
				return (
					<div className="text-center space-y-4">
						<div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
							<Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
						</div>
						<h3 className="text-lg font-semibold text-gray-900">
							Verifying your email...
						</h3>
						<p className="text-gray-600">
							Please wait while we verify your email address.
						</p>
					</div>
				);

			case "success":
				return (
					<div className="text-center space-y-4">
						<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
							<CheckCircle className="w-8 h-8 text-green-600" />
						</div>
						<h3 className="text-lg font-semibold text-gray-900">
							Email Verified!
						</h3>
						<p className="text-gray-600">{message}</p>
						<div className="pt-4">
							<Link href="/auth/signin">
								<Button className="bg-orange-500 hover:bg-orange-600">
									Continue to Sign In
								</Button>
							</Link>
						</div>
					</div>
				);

			case "error":
				return (
					<div className="text-center space-y-4">
						<div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
							<XCircle className="w-8 h-8 text-red-600" />
						</div>
						<h3 className="text-lg font-semibold text-gray-900">
							Verification Failed
						</h3>
						<p className="text-gray-600">{message}</p>
						<div className="pt-4 space-y-2">
							<Link href="/auth/signup">
								<Button variant="outline" className="w-full">
									Register Again
								</Button>
							</Link>
							<Link href="/auth/signin">
								<Button className="w-full bg-orange-500 hover:bg-orange-600">
									Go to Sign In
								</Button>
							</Link>
						</div>
					</div>
				);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center py-8 px-4">
			<Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm animate-bounce-in">
				<CardHeader className="text-center pb-6">
					<div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
						<Mail className="w-8 h-8 text-white" />
					</div>
					<CardTitle className="text-2xl font-bold text-gray-900">
						Email Verification
					</CardTitle>
					<CardDescription className="text-gray-600">
						Verifying your email address
					</CardDescription>
				</CardHeader>

				<CardContent>{renderContent()}</CardContent>
			</Card>
		</div>
	);
}
