"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function TopProgressbar() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [progress, setProgress] = useState(0);
	const [visible, setVisible] = useState(false);
	const timerRef = useRef(null);
	const resetTimerRef = useRef(null);

	// Start progress animation
	const startProgress = () => {
		if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
		if (timerRef.current) clearInterval(timerRef.current);

		setVisible(true);
		setProgress(25);

		// Gradually increment to 80% to give instant feedback
		timerRef.current = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 80) {
					if (timerRef.current) clearInterval(timerRef.current);
					return prev;
				}
				return prev + (80 - prev) * 0.2;
			});
		}, 100);
	};

	// Complete progress animation
	const completeProgress = () => {
		if (timerRef.current) clearInterval(timerRef.current);
		setProgress(100);

		resetTimerRef.current = setTimeout(() => {
			setVisible(false);
			setProgress(0);
		}, 200);
	};

	// Whenever pathname or searchParams change, complete the bar
	useEffect(() => {
		completeProgress();
		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
			if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
		};
	}, [pathname, searchParams]);

	// Intercept link clicks to trigger instant visual feedback without blocking
	useEffect(() => {
		const handleClick = (e) => {
			const target = e.target.closest("a");
			if (!target) return;

			const href = target.getAttribute("href");
			const isExternal =
				target.getAttribute("target") === "_blank" ||
				target.getAttribute("rel")?.includes("external") ||
				href?.startsWith("http") ||
				href?.startsWith("mailto:") ||
				href?.startsWith("tel:");

			if (isExternal || !href || href.startsWith("#")) return;

			// If it's a page change, start the progress bar immediately
			try {
				const url = new URL(href, window.location.href);
				if (
					url.origin === window.location.origin &&
					(url.pathname !== window.location.pathname ||
						url.search !== window.location.search)
				) {
					startProgress();
				}
			} catch {
				// Ignore parsing errors
			}
		};

		document.addEventListener("click", handleClick, { passive: true });
		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, []);

	if (!visible && progress === 0) return null;

	return (
		<div
			aria-hidden="true"
			className="fixed top-0 left-0 right-0 z-[99999] pointer-events-none h-[2.5px] bg-transparent"
		>
			<div
				className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_12px_rgba(6,182,212,0.8)] transition-all ease-out"
				style={{
					width: `${progress}%`,
					opacity: visible ? 1 : 0,
					transitionDuration: progress === 100 ? "150ms" : "200ms",
				}}
			/>
		</div>
	);
}
