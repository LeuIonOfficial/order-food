"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Force dynamic rendering
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function AdminUsersPage() {
	const { data: session } = useSession();
	const [users, setUsers] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		if (session?.user?.isAdmin) {
			fetchUsers();
		}
	}, [session]);

	const fetchUsers = async () => {
		setLoading(true);
		setError("");
		try {
			const res = await fetch("/api/admin/users");
			const data = await res.json();
			setUsers(data);
		} catch (err) {
			setError("Failed to fetch users");
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
		<div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-8 px-4">
			<div className="max-w-4xl mx-auto">
				<Card>
					<CardHeader>
						<CardTitle>All Users</CardTitle>
					</CardHeader>
					<CardContent>
						{error && (
							<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
								{error}
							</div>
						)}
						{loading ? (
							<div className="text-center py-8">Loading...</div>
						) : users.length === 0 ? (
							<div className="text-center py-8 text-gray-600">
								No users found.
							</div>
						) : (
							<div className="overflow-x-auto">
								<table className="min-w-full text-sm">
									<thead>
										<tr className="bg-orange-100">
											<th className="px-4 py-2 text-left">
												Name
											</th>
											<th className="px-4 py-2 text-left">
												Email
											</th>
											<th className="px-4 py-2 text-left">
												Roles
											</th>
											<th className="px-4 py-2 text-left">
												Verified
											</th>
											<th className="px-4 py-2 text-left">
												Created
											</th>
										</tr>
									</thead>
									<tbody>
										{users.map((user) => (
											<tr
												key={user.id}
												className="border-b"
											>
												<td className="px-4 py-2 font-medium text-gray-900">
													{user.name}
												</td>
												<td className="px-4 py-2 text-gray-700">
													{user.email}
												</td>
												<td className="px-4 py-2 text-gray-700">
													{user.isAdmin && (
														<span className="bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">
															Admin
														</span>
													)}
													{user.isCook && (
														<span className="bg-green-100 text-green-700 px-2 py-1 rounded">
															Cook
														</span>
													)}
													{!user.isAdmin &&
														!user.isCook && (
															<span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
																User
															</span>
														)}
												</td>
												<td className="px-4 py-2">
													{user.isVerified ? (
														<span className="bg-green-100 text-green-700 px-2 py-1 rounded">
															Yes
														</span>
													) : (
														<span className="bg-red-100 text-red-700 px-2 py-1 rounded">
															No
														</span>
													)}
												</td>
												<td className="px-4 py-2 text-gray-500">
													{new Date(
														user.createdAt
													).toLocaleDateString()}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
