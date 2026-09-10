// Copyright (C) 2025 Abdul Ahad
// Licensed under the GNU GPL v3.0. See LICENSE for details.

"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/Button";
import Image from "next/image";

// images
import OneStoryPlanet from "@/public/image/projects/web/one-storyplanet/onestoryplanet-4.png";
import OneStoryPlanet2 from "@/public/image/projects/web/one-storyplanet/onestoryplanet-2.png";
import OneStoryPlanet3 from "@/public/image/projects/web/one-storyplanet/onestoryplanet-3.png";
import ProjectAll from "@/public/image/projects.png";

import Hr from "@/components/Hr";
import ProjectCard from "./components/ProjectCard";
import Projects from "@/json/data.json";
import FixedButton from "@/components/FixedButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronLeft,
	faArrowDown,
	faExternalLinkAlt,
	faLayerGroup,
	faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const categories = [
	{ id: 1, label: "Web Development" },
	{ id: 2, label: "AI & Machine Learning" },
	{ id: 9, label: "All Projects" },
];

export default function Page() {
	const [activeCategory, setActiveCategory] = useState(1);
	const allProjects = Projects.Projects.filter((item) => item.show === true);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const handleScrollDown = () => {
		window.scrollTo({
			top: window.innerHeight * 0.85,
			behavior: "smooth",
		});
	};

	const filteredProjects =
		activeCategory === 9
			? allProjects
			: allProjects.filter((item) => item.category.includes(activeCategory));

	return (
		<main className="w-full overflow-x-hidden bg-black text-white selection:bg-cyan-500 selection:text-black">
			<FixedButton href="/#projects">
				<FontAwesomeIcon icon={faChevronLeft} className="text-white pr-10" />
			</FixedButton>

			{/* ========================================================================= */}
			{/* HERO SECTION */}
			{/* ========================================================================= */}
			<section className="relative w-full min-h-[85vh] lg:min-h-screen pt-24 pb-12 px-4 sm:px-8 lg:px-16 flex items-center justify-center bg-gradient-to-b from-black via-[#060b14] to-neutral-950 overflow-hidden">
				{/* Background Glows */}
				<div className="absolute top-1/4 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />
				<div className="absolute bottom-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

				<div className="container mx-auto max-w-6xl relative z-10 w-full">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
						{/* Left Column: Intro */}
						<motion.div
							className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-start"
							initial={{ opacity: 0, x: -30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6, ease: "easeOut" }}>
							
							<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs sm:text-sm font-medium mb-3 backdrop-blur-md">
								<span>🚀 Portfolio Works</span>
							</div>

							<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-2">
								My{" "}
								<span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
									Projects
								</span>
							</h1>

							<Hr theme="cyan" />

							<p className="title text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed max-w-xl mt-3 mb-6">
								A curated catalog of production web applications, medical booking platforms, real-time gaming UIs, and AI integrations built with React and Next.js.
							</p>

							<div className="flex items-center gap-3">
								<Button variation="primary" theme="cyan" onClick={handleScrollDown}>
									<span className="flex items-center gap-2">
										<span>Explore Projects</span>
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
								<div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 rounded-3xl blur-xl opacity-40 group-hover:opacity-75 transition duration-500 animate-pulse" />
								
								<div className="relative h-72 sm:h-88 lg:h-[420px] w-full rounded-3xl overflow-hidden border-2 border-white/20 bg-gray-900 shadow-2xl">
									<Image
										src={ProjectAll}
										alt="Abdul Ahad Projects"
										placeholder="blur"
										fill
										priority
										sizes="(max-width: 768px) 300px, 450px"
										className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
									<div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/75 border border-white/10 backdrop-blur-md text-center">
										<p className="text-xs font-semibold text-white">Full-Stack & Web Architecture</p>
										<p className="text-[11px] text-cyan-300">Modern, performant web applications</p>
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* ========================================================================= */}
			{/* FEATURED HIGHLIGHT PROJECT */}
			{/* ========================================================================= */}
			<section className="w-full px-4 sm:px-8 py-10">
				<div className="container mx-auto max-w-6xl">
					<div className="flex flex-col items-center text-center mb-8">
						<Hr variant="long" theme="cyan" />
						<h2 className="text-3xl sm:text-4xl font-bold mt-2 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
							Featured Highlight
						</h2>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/15 backdrop-blur-2xl shadow-2xl">
						{/* Visual Left */}
						<div className="lg:col-span-6 relative w-full h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden border border-white/10 bg-gray-950 group">
							<Image
								src={OneStoryPlanet}
								alt="OneStoryPlanet"
								fill
								sizes="(max-width: 768px) 100vw, 50vw"
								className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
							<div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-bold backdrop-blur-md">
								⭐ Flagship Platform
							</div>
						</div>

						{/* Content Right */}
						<div className="lg:col-span-6 flex flex-col justify-center text-left">
							<span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">
								Social Story Platform
							</span>
							<h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
								OneStoryPlanet
							</h3>
							<p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed mb-4">
								OneStoryPlanet is a story-first social platform that empowers users to share authentic life experiences through text, audio, and video. Built with a distraction-free, accessible interface, it focuses on meaningful human connection without algorithmic pressure.
							</p>

							<div className="flex flex-wrap gap-2 mb-6">
								{["React", "Next.js", "Tailwind CSS", "Node.js", "AWS", "UI/UX"].map((tag, idx) => (
									<span
										key={idx}
										className="px-3 py-1 rounded-lg text-xs font-semibold bg-white/5 border border-white/10 text-cyan-200">
										{tag}
									</span>
								))}
							</div>

							<div className="flex flex-wrap gap-3">
								<Button variation="primary" theme="cyan">
									<Link href="/projects/one-storyplanet" prefetch={true} className="flex items-center gap-2">
										<span>Case Study</span>
										<FontAwesomeIcon icon={faArrowRight} className="text-xs" />
									</Link>
								</Button>

								<Button variation="secondary" theme="cyan">
									<a
										href="https://onestoryplanet.com/"
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-2">
										<span>Live Demo</span>
										<FontAwesomeIcon icon={faExternalLinkAlt} className="text-xs" />
									</a>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ========================================================================= */}
			{/* NOTABLE PROJECTS WITH INTERACTIVE FILTER */}
			{/* ========================================================================= */}
			<section className="w-full px-4 sm:px-8 py-10">
				<div className="container mx-auto max-w-6xl">
					<div className="flex flex-col items-center text-center mb-8">
						<Hr variant="long" theme="cyan" />
						<h2 className="text-3xl sm:text-4xl font-bold mt-2 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
							All Noteworthy Projects
						</h2>
					</div>

					{/* Creative Category Filter Tabs */}
					<div className="flex justify-center items-center flex-wrap gap-2.5 mb-10">
						{categories.map((cat) => {
							const isActive = activeCategory === cat.id;
							return (
								<button
									key={cat.id}
									onClick={() => setActiveCategory(cat.id)}
									className={`relative px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
										isActive
											? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 scale-105"
											: "bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10"
									}`}>
									{cat.label}
								</button>
							);
						})}
					</div>

					{/* Projects Grid with Smooth Animations */}
					<motion.div
						layout
						className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-12">
						<AnimatePresence mode="popLayout">
							{filteredProjects.map((project, index) => (
								<ProjectCard
									key={project.id || project.slug || index}
									project={project}
									index={index}
									activeCategory={activeCategory}
								/>
							))}
						</AnimatePresence>
					</motion.div>

					{/* Archive CTA */}
					<div className="flex justify-center items-center my-6">
						<Button variation="primary" theme="blue">
							<Link href="/projects/archive" prefetch={true} className="flex items-center gap-2">
								<FontAwesomeIcon icon={faLayerGroup} />
								<span>View Complete Project Archive</span>
							</Link>
						</Button>
					</div>
				</div>
			</section>
		</main>
	);
}
