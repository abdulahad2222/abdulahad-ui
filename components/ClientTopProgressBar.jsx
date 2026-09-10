"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

const TopProgressBar = dynamic(() => import("@/components/TopProgressbar"), {
	ssr: false,
});

export default function ClientTopProgressBar() {
	return (
		<Suspense fallback={null}>
			<TopProgressBar />
		</Suspense>
	);
}
