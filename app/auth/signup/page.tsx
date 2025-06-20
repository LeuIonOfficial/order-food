"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import {
	Eye,
	EyeOff,
	Mail,
	Lock,
	User,
	Phone,
	MapPin,
	Building,
} from "lucide-react";

export default function SignUpPage() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		phone: "",
		address: "",
		city: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setSuccess("");

		// Validation
		if (formData.password !== formData.confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		if (formData.password.length < 6) {
			setError("Password must be at least 6 characters long");
			return;
		}

		setLoading(true);

		try {
			const response = await fetch("/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: formData.name,
					email: formData.email,
					password: formData.password,
					phone: formData.phone,
					address: formData.address,
					city: formData.city,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				setError(data.error || "Registration failed");
			} else {
				setSuccess(data.message);
				// Clear form
				setFormData({
					name: "",
					email: "",
					password: "",
					confirmPassword: "",
					phone: "",
					address: "",
					city: "",
				});
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
						<User className="w-8 h-8 text-white" />
					</div>
					<CardTitle className="text-2xl font-bold text-gray-900">
						Create Account
					</CardTitle>
					<CardDescription className="text-gray-600">
						Join Gustul Casei and discover amazing homemade food
					</CardDescription>
				</CardHeader>

				<CardContent className="space-y-4">
					{error && (
						<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg animate-fade-in-up">
							{error}
						</div>
					)}

					{success && (
						<div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg animate-fade-in-up">
							{success}
						</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-4">
						{/* Name */}
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-700 flex items-center gap-2">
								<User className="w-4 h-4 text-orange-500" />
								Full Name
							</label>
							<Input
								type="text"
								value={formData.name}
								onChange={(e) =>
									setFormData({
										...formData,
										name: e.target.value,
									})
								}
								placeholder="Enter your full name"
								className="focus:border-orange-300 focus:ring-orange-200"
								required
							/>
						</div>

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
									placeholder="Create a password"
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

						{/* Confirm Password */}
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-700 flex items-center gap-2">
								<Lock className="w-4 h-4 text-orange-500" />
								Confirm Password
							</label>
							<div className="relative">
								<Input
									type={
										showConfirmPassword
											? "text"
											: "password"
									}
									value={formData.confirmPassword}
									onChange={(e) =>
										setFormData({
											...formData,
											confirmPassword: e.target.value,
										})
									}
									placeholder="Confirm your password"
									className="focus:border-orange-300 focus:ring-orange-200 pr-10"
									required
								/>
								<button
									type="button"
									onClick={() =>
										setShowConfirmPassword(
											!showConfirmPassword
										)
									}
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
								>
									{showConfirmPassword ? (
										<EyeOff className="w-4 h-4" />
									) : (
										<Eye className="w-4 h-4" />
									)}
								</button>
							</div>
						</div>

						{/* Phone */}
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-700 flex items-center gap-2">
								<Phone className="w-4 h-4 text-orange-500" />
								Phone Number (Optional)
							</label>
							<Input
								type="tel"
								value={formData.phone}
								onChange={(e) =>
									setFormData({
										...formData,
										phone: e.target.value,
									})
								}
								placeholder="+373 60000000"
								className="focus:border-orange-300 focus:ring-orange-200"
							/>
						</div>

						{/* Address */}
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-700 flex items-center gap-2">
								<MapPin className="w-4 h-4 text-orange-500" />
								Address (Optional)
							</label>
							<Input
								type="text"
								value={formData.address}
								onChange={(e) =>
									setFormData({
										...formData,
										address: e.target.value,
									})
								}
								placeholder="Enter your address"
								className="focus:border-orange-300 focus:ring-orange-200"
							/>
						</div>

						{/* City */}
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-700 flex items-center gap-2">
								<Building className="w-4 h-4 text-orange-500" />
								City (Optional)
							</label>
							<Input
								type="text"
								value={formData.city}
								onChange={(e) =>
									setFormData({
										...formData,
										city: e.target.value,
									})
								}
								placeholder="Enter your city"
								className="focus:border-orange-300 focus:ring-orange-200"
							/>
						</div>

						<Button
							type="submit"
							disabled={loading}
							className="w-full bg-orange-500 hover:bg-orange-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
						>
							{loading ? (
								<div className="flex items-center gap-2">
									<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
									Creating Account...
								</div>
							) : (
								"Create Account"
							)}
						</Button>
					</form>

					<div className="text-center pt-4 border-t border-gray-200">
						<p className="text-sm text-gray-600">
							Already have an account?{" "}
							<Link
								href="/auth/signin"
								className="text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200"
							>
								Sign in here
							</Link>
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
