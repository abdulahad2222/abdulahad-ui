"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import Image from "next/image";
import FixedButton from "@/components/FixedButton";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import Quote from "./components/quote/quote.jsx";
import Skills from "./components/skills/skills.jsx";
import Experience from "./components/experience.jsx";
import Education from "./components/education.jsx";

// images
import Hero from "@/public/image/ahad_2.webp";

import Hr from "@/components/Hr";
import About from "./components/about/about.jsx";

export default function Page() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const handleScrollDown = () => {
		window.scrollTo({
			top: window.innerHeight * 0.85,
			behavior: "smooth",
		});
	};

	return (
		<main className="w-full overflow-x-hidden bg-black text-white selection:bg-purple-500 selection:text-white">
			<FixedButton href="/#about">
				<FontAwesomeIcon icon={faChevronLeft} className="text-white pr-10" />
			</FixedButton>

			{/* ========================================================================= */}
			{/* HERO HEADER */}
			{/* ========================================================================= */}
			<section className="relative w-full min-h-[85vh] lg:min-h-screen pt-24 pb-12 px-4 sm:px-8 lg:px-16 flex items-center justify-center bg-gradient-to-b from-black via-[#0a0714] to-neutral-950 overflow-hidden">
				{/* Background Glows */}
				<div className="absolute top-1/4 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
				<div className="absolute bottom-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />

				<div className="container mx-auto max-w-6xl relative z-10 w-full">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
						{/* Left Column: Intro Text */}
						<motion.div
							className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-start"
							initial={{ opacity: 0, x: -30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6, ease: "easeOut" }}>
							
							<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs sm:text-sm font-medium mb-3 backdrop-blur-md">
								<span>👤 Personal Biography</span>
							</div>

							<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-2">
								About{" "}
								<span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
									Me
								</span>
							</h1>

							<Hr theme="purple" />

							<p className="title text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed max-w-xl mt-3 mb-6">
								A comprehensive overview of my journey, technical background, core philosophies, and educational milestones as a front-end developer.
							</p>

							<div className="flex items-center gap-3">
								<Button variation="primary" theme="purple" onClick={handleScrollDown}>
									<span className="flex items-center gap-2">
										<span>Explore Journey</span>
										<FontAwesomeIcon icon={faArrowDown} className="text-xs" />
									</span>
								</Button>
							</div>
						</motion.div>

						{/* Right Column: Hero Visual */}
						<motion.div
							className="lg:col-span-5 flex justify-center items-center relative"
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.6, delay: 0.1 }}>
							
							<div className="relative group w-full max-w-xs sm:max-w-sm lg:max-w-md">
								<div className="absolute -inset-1.5 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 rounded-3xl blur-xl opacity-40 group-hover:opacity-75 transition duration-500 animate-pulse" />
								
								<div className="relative h-72 sm:h-88 lg:h-[440px] w-full rounded-3xl overflow-hidden border-2 border-white/20 bg-gray-900 shadow-2xl">
									<Image
										src={Hero}
										alt="Abdul Ahad"
										placeholder="blur"
										fill
										priority
										sizes="(max-width: 768px) 300px, 450px"
										className="object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
									<div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/75 border border-white/10 backdrop-blur-md text-center">
										<p className="text-xs font-semibold text-white">Abdul Ahad</p>
										<p className="text-[11px] text-purple-300">Front-End Developer & UI Specialist</p>
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* ========================================================================= */}
			{/* SECTIONS */}
			{/* ========================================================================= */}
			<About />
			<Skills />
			<Experience />
			<Education />
			<Quote />
		</main>
	);
}
