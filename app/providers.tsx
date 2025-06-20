"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 1000 * 60 * 5, // 5 minutes
						gcTime: 1000 * 60 * 10, // 10 minutes
						retry: (failureCount, error: any) => {
							if (error?.status >= 400 && error?.status < 500) {
								return false;
							}
							return failureCount < 3;
						},
						refetchOnWindowFocus: false,
					},
					mutations: {
						retry: 1,
					},
				},
			})
	);

	return (
		<SessionProvider>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
					<Toaster position="top-right" richColors closeButton />
					<ReactQueryDevtools initialIsOpen={false} />
				</ThemeProvider>
			</QueryClientProvider>
		</SessionProvider>
	);
}
