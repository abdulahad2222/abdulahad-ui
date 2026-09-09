"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import ClientTopProgressBar from "@/components/ClientTopProgressBar";
import Navbar from "@/components/Navbar";
import Chat from "@/components/Chat";
import VisitorTracker from "@/components/VisitorTracker";
import { ThemeProvider } from "@/context/ThemeContext";
import { Analytics } from "@vercel/analytics/react";

export default function ClientLayout({ children }) {
	const pathname = usePathname();
	const isDashboard = pathname?.startsWith("/dashboard");

	return (
		<ThemeProvider>
			<ClientTopProgressBar />
			{!isDashboard && <Navbar />}
			<Suspense fallback={null}>
				<VisitorTracker />
			</Suspense>
			{children}
			{!isDashboard && <Chat />}
			<Analytics />
		</ThemeProvider>
	);
}

