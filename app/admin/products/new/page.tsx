"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AdminAddProductPage() {
	const { data: session } = useSession();
	const router = useRouter();
	const [form, setForm] = useState({
		name: "",
		description: "",
		price: "",
		currency: "MDL",
		image: "",
		category: "",
		cookId: "",
	});
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState("");
	const [error, setError] = useState("");

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setSuccess("");
		setLoading(true);
		try {
			const res = await fetch("/api/admin/products", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			});
			const data = await res.json();
			if (!res.ok) {
				setError(data.error || "Failed to add product");
			} else {
				setSuccess("Product added successfully!");
				setForm({
					name: "",
					description: "",
					price: "",
					currency: "MDL",
					image: "",
					category: "",
					cookId: "",
				});
			}
		} catch (err) {
			setError("Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	if (!session?.user?.isAdmin) {
		return (
			<div className="p-8 text-center">
				You must be an admin to access this page.
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center py-8 px-4">
			<Card className="w-full max-w-lg shadow-2xl border-0 bg-white/95 backdrop-blur-sm animate-bounce-in">
				<CardHeader>
					<CardTitle>Add New Product</CardTitle>
				</CardHeader>
				<CardContent>
					{error && (
						<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
							{error}
						</div>
					)}
					{success && (
						<div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
							{success}
						</div>
					)}
					<form onSubmit={handleSubmit} className="space-y-4">
						<Input
							name="name"
							value={form.name}
							onChange={handleChange}
							placeholder="Product Name"
							required
						/>
						<Textarea
							name="description"
							value={form.description}
							onChange={handleChange}
							placeholder="Description"
							required
						/>
						<Input
							name="price"
							value={form.price}
							onChange={handleChange}
							placeholder="Price"
							type="number"
							min="0"
							step="0.01"
							required
						/>
						<Input
							name="currency"
							value={form.currency}
							onChange={handleChange}
							placeholder="Currency"
							required
						/>
						<Input
							name="image"
							value={form.image}
							onChange={handleChange}
							placeholder="Image URL"
							required
						/>
						<Input
							name="category"
							value={form.category}
							onChange={handleChange}
							placeholder="Category"
							required
						/>
						<Input
							name="cookId"
							value={form.cookId}
							onChange={handleChange}
							placeholder="Cook User ID"
							required
						/>
						<Button
							type="submit"
							disabled={loading}
							className="w-full bg-orange-500 hover:bg-orange-600"
						>
							{loading ? "Adding..." : "Add Product"}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
