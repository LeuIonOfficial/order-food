"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";

export default function SignInPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl") || "/";

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			const result = await signIn("credentials", {
				email: formData.email,
				password: formData.password,
				redirect: false,
			});

			if (result?.error) {
				setError(result.error);
			} else {
				router.push(callbackUrl);
				router.refresh();
			}
		} catch (error) {
			setError("Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center py-8 px-4">
			<Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm animate-bounce-in">
				<CardHeader className="text-center pb-6">
					<div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
						<LogIn className="w-8 h-8 text-white" />
					</div>
					<CardTitle className="text-2xl font-bold text-gray-900">
						Welcome Back
					</CardTitle>
					<CardDescription className="text-gray-600">
						Sign in to your Gustul Casei account
					</CardDescription>
				</CardHeader>

				<CardContent className="space-y-4">
					{error && (
						<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg animate-fade-in-up">
							{error}
						</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-4">
						{/* Email */}
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-700 flex items-center gap-2">
								<Mail className="w-4 h-4 text-orange-500" />
								Email Address
							</label>
							<Input
								type="email"
								value={formData.email}
								onChange={(e) =>
									setFormData({
										...formData,
										email: e.target.value,
									})
								}
								placeholder="Enter your email"
								className="focus:border-orange-300 focus:ring-orange-200"
								required
							/>
						</div>

						{/* Password */}
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-700 flex items-center gap-2">
								<Lock className="w-4 h-4 text-orange-500" />
								Password
							</label>
							<div className="relative">
								<Input
									type={showPassword ? "text" : "password"}
									value={formData.password}
									onChange={(e) =>
										setFormData({
											...formData,
											password: e.target.value,
										})
									}
									placeholder="Enter your password"
									className="focus:border-orange-300 focus:ring-orange-200 pr-10"
									required
								/>
								<button
									type="button"
									onClick={() =>
										setShowPassword(!showPassword)
									}
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
								>
									{showPassword ? (
										<EyeOff className="w-4 h-4" />
									) : (
										<Eye className="w-4 h-4" />
									)}
								</button>
							</div>
						</div>

						<Button
							type="submit"
							disabled={loading}
							className="w-full bg-orange-500 hover:bg-orange-600 shadow-md hover:shadow-lg transition-all duration-200"
						>
							{loading ? (
								<div className="flex items-center gap-2">
									<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
									Signing In...
								</div>
							) : (
								"Sign In"
							)}
						</Button>
					</form>

					<div className="text-center pt-4 border-t border-gray-200 space-y-3">
						<p className="text-sm text-gray-600">
							Don't have an account?{" "}
							<Link
								href="/auth/signup"
								className="text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200"
							>
								Sign up here
							</Link>
						</p>
						<p className="text-sm text-gray-600">
							<Link
								href="/auth/forgot-password"
								className="text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200"
							>
								Forgot your password?
							</Link>
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
