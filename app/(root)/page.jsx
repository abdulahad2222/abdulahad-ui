// Copyright (C) 2025 Abdul Ahad
// Licensed under the GNU GPL v3.0. See LICENSE for details.

"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

// components
import Button from "@/components/Button";
import Me from "@/public/image/ahad_1.webp";
import MeAbout from "@/public/image/ahad_2.webp";
import Setup from "@/public/image/setup.jpg";
import ProjectAll from "@/public/image/projects.png";
import Hr from "@/components/Hr";
import { trackEvent } from "@/lib/analytics-client";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faGithub,
	faInstagram,
	faLinkedin,
	faDiscord,
} from "@fortawesome/free-brands-svg-icons";
import {
	faEnvelope,
	faDownload,
	faArrowRight,
	faCode,
	faLayerGroup,
	faLaptopCode,
	faSparkles,
	faCheck,
	faCopy,
	faExternalLinkAlt,
	faBrain,
	faRocket,
} from "@fortawesome/free-solid-svg-icons";

export default function HomePage() {
	const [copied, setCopied] = useState(false);

	const handleCopyEmail = (e) => {
		e.preventDefault();
		navigator.clipboard.writeText("abdulahadfarooqui73@gmail.com");
		setCopied(true);
		trackEvent("email_copy", { email: "abdulahadfarooqui73@gmail.com" }, { label: "Copied Email" });
		setTimeout(() => setCopied(false), 2500);
	};

	return (
		<main className="relative w-full bg-black text-white selection:bg-cyan-500 selection:text-black overflow-x-hidden">
			{/* ========================================================================= */}
			{/* SECTION 1: HERO */}
			{/* ========================================================================= */}
			<section
				id="home"
				className="section bg-black bg-gradient-to-b from-black via-[#060814] to-neutral-950 text-white pt-20 pb-8 sm:pt-24 sm:pb-12 lg:py-0 lg:h-screen flex items-center justify-center relative overflow-hidden">
				{/* Ambient Glows */}
				<div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none transform-gpu" />
				<div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none transform-gpu" />

				<div className="container mx-auto max-w-7xl px-4 sm:px-8 lg:pl-24 lg:pr-12 xl:pl-28 xl:pr-16 relative z-10 w-full">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-14 items-center">
						
						{/* Left Column: Hero Content */}
						<motion.div
							className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-start"
							initial={{ x: -30, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, ease: "easeOut" }}>
							
							{/* Live Status Badge */}
							<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs sm:text-sm font-medium mb-3 backdrop-blur-md shadow-sm shadow-cyan-500/10">
								<span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
								<span>Available for Freelance & Full-time Roles</span>
							</div>

							{/* Mobile Creative Avatar */}
							<div className="flex lg:hidden justify-center my-3 relative">
								<div className="relative group">
									<div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-full blur-md opacity-60 animate-pulse" />
									<div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-white/25 bg-gray-900 shadow-2xl">
										<Image
											src={Me}
											alt="Abdul Ahad"
											placeholder="blur"
											fill
											priority
											sizes="150px"
											className="object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500"
										/>
									</div>
									<div className="absolute -bottom-1 -right-1 px-2.5 py-0.5 rounded-full bg-gray-900/90 border border-cyan-500/40 text-[10px] font-bold text-cyan-300 shadow-lg">
										⚡ Front-End
									</div>
								</div>
							</div>

							{/* Subtitle */}
							<h3 className="uppercase text-xs sm:text-sm md:text-base font-semibold tracking-[0.3em] text-gray-400 mb-1">
								Abdul Ahad
							</h3>

							{/* Main Headline */}
							<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white mb-2.5 sm:mb-3 leading-[1.15]">
								Front-end{" "}
								<span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
									Developer
								</span>
							</h1>

							{/* Bio Paragraph */}
							<p className="title text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed max-w-xl mb-4">
								Hello! I&rsquo;m Abdul Ahad, a front-end developer passionate about crafting ultra-responsive web applications using{" "}
								<span className="text-cyan-400 font-medium">React</span>,{" "}
								<span className="text-blue-400 font-medium">Next.js</span>, and{" "}
								<span className="text-purple-400 font-medium">Tailwind CSS</span>, while exploring the frontier of artificial intelligence integration.
							</p>

							{/* Interactive Feature Chips */}
							<div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4 sm:mb-5 text-xs text-gray-300">
								<span className="px-3 py-1 rounded-lg bg-gray-900/80 border border-gray-800 backdrop-blur-sm flex items-center gap-1.5 shadow-sm hover:border-cyan-500/40 transition-colors">
									<FontAwesomeIcon icon={faLaptopCode} className="text-cyan-400 text-[11px]" />
									UI Architecture
								</span>
								<span className="px-3 py-1 rounded-lg bg-gray-900/80 border border-gray-800 backdrop-blur-sm flex items-center gap-1.5 shadow-sm hover:border-blue-500/40 transition-colors">
									<FontAwesomeIcon icon={faCode} className="text-blue-400 text-[11px]" />
									Clean Code
								</span>
								<span className="px-3 py-1 rounded-lg bg-gray-900/80 border border-gray-800 backdrop-blur-sm flex items-center gap-1.5 shadow-sm hover:border-purple-500/40 transition-colors">
									<FontAwesomeIcon icon={faBrain} className="text-purple-400 text-[11px]" />
									AI Integration
								</span>
							</div>

							{/* Buttons */}
							<div className="flex flex-row flex-wrap justify-center lg:justify-start items-center gap-3 w-full mb-4">
								<Button variation="primary" theme="blue">
									<Link
										href="/docs/cv.pdf"
										target="_blank"
										rel="noopener noreferrer"
										onClick={() => {
											trackEvent(
												"resume_download",
												{ source: "hero_section" },
												{ label: "Download CV" }
											);
										}}
										download
										className="flex items-center gap-2">
										<FontAwesomeIcon icon={faDownload} />
										<span>Download CV</span>
									</Link>
								</Button>

								<Button variation="secondary" theme="blue">
									<a
										href="#contact"
										onClick={() => {
											trackEvent(
												"contact_click",
												{ source: "hero_section" },
												{ label: "Contact Me" }
											);
										}}
										className="flex items-center gap-2">
										<span>Contact Me</span>
										<FontAwesomeIcon icon={faArrowRight} className="text-xs" />
									</a>
								</Button>
							</div>

							{/* Live Metric Badges Bar */}
							<div className="grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-lg mt-1 pt-3 border-t border-white/10">
								<div className="p-2 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-center">
									<p className="text-base sm:text-lg font-extrabold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">5+</p>
									<p className="text-[10px] sm:text-xs text-gray-400">Webapps</p>
								</div>
								<div className="p-2 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-center">
									<p className="text-base sm:text-lg font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">100%</p>
									<p className="text-[10px] sm:text-xs text-gray-400">Responsive</p>
								</div>
								<div className="p-2 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-center">
									<p className="text-base sm:text-lg font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">AI & ML</p>
									<p className="text-[10px] sm:text-xs text-gray-400">Exploration</p>
								</div>
							</div>
						</motion.div>

						{/* Desktop-Only Right Column: Elevated Portrait Frame */}
						<motion.div
							className="hidden lg:flex lg:col-span-5 justify-center items-center relative"
							initial={{ scale: 0.9, opacity: 0 }}
							whileInView={{ scale: 1, opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}>
							
							<div className="relative group">
								<div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-full blur-xl opacity-40 group-hover:opacity-75 transition duration-700 animate-pulse" />
								
								<div className="relative w-64 h-64 lg:w-72 lg:h-72 xl:w-88 xl:h-88 rounded-full overflow-hidden border-2 border-white/20 bg-gray-900 shadow-2xl">
									<Image
										src={Me}
										alt="Abdul Ahad"
										placeholder="blur"
										fill
										priority
										sizes="(max-width: 1200px) 320px, 380px"
										className="object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
									/>
								</div>

								{/* Floating Mini Badges */}
								<div className="absolute bottom-4 -left-4 px-3.5 py-2 rounded-xl bg-gray-900/95 border border-white/10 backdrop-blur-xl shadow-xl flex items-center gap-2 text-xs font-semibold text-white">
									<span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
									<span>Frontend Specialist</span>
								</div>

								<div className="absolute top-4 -right-4 px-3.5 py-2 rounded-xl bg-gray-900/95 border border-white/10 backdrop-blur-xl shadow-xl flex items-center gap-2 text-xs font-semibold text-white">
									<span className="text-purple-400">⚡</span>
									<span>5+ Production Apps</span>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* ========================================================================= */}
			{/* SECTION 2: ABOUT */}
			{/* ========================================================================= */}
			<section
				id="about"
				className="section bg-[#030712] bg-gradient-to-b from-neutral-950 via-[#070b14] to-black text-white py-8 sm:py-12 lg:py-0 lg:h-screen flex items-center justify-center relative overflow-hidden">
				{/* Background Glows */}
				<div className="absolute top-1/3 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none transform-gpu" />
				<div className="absolute bottom-1/4 left-1/3 w-64 sm:w-80 h-64 sm:h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none transform-gpu" />

				<div className="container mx-auto max-w-7xl px-4 sm:px-8 lg:pl-24 lg:pr-12 xl:pl-28 xl:pr-16 relative z-10 w-full">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-14 items-center">
						
						{/* Left Column: About Content & Bento Grid */}
						<motion.div
							className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-start"
							initial={{ x: -30, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5 }}>
							
							<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs sm:text-sm font-medium mb-2 backdrop-blur-md">
								<span>👤 Get To Know Me</span>
							</div>

							<h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-1">
								About <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Me</span>
							</h2>

							<Hr theme="purple" />

							{/* Mobile Creative Showcase Photo */}
							<div className="flex lg:hidden justify-center w-full my-3">
								<div className="relative group w-full max-w-[270px] sm:max-w-xs">
									<div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-md opacity-40" />
									<div className="relative h-52 sm:h-64 w-full rounded-2xl overflow-hidden border border-white/15 bg-gray-900 shadow-xl">
										<Image
											src={MeAbout}
											alt="Abdul Ahad About"
											placeholder="blur"
											fill
											sizes="(max-width: 768px) 270px, 350px"
											className="object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500"
										/>
										<div className="absolute bottom-2 left-2 right-2 p-2 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 text-center">
											<p className="text-[11px] text-gray-200 font-medium">Crafting UI & Intelligent Web Solutions</p>
										</div>
									</div>
								</div>
							</div>

							<p className="title text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed max-w-xl mt-2 mb-4">
								Discover my journey, skills, and passion for creating beautiful and functional web experiences. From crafting responsive user interfaces with Next.js and Tailwind to engineering AI-integrated applications, I turn complex problems into intuitive digital solutions.
							</p>

							{/* Creative 3-Card Skill Pillars Grid */}
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-xl mb-4 sm:mb-5 text-left">
								<div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md hover:border-purple-500/40 transition-all group">
									<h4 className="text-xs sm:text-sm font-semibold text-white flex items-center gap-1.5 mb-1 group-hover:text-purple-300 transition-colors">
										<span className="text-purple-400">🎨</span> UI/UX & Responsive Design
									</h4>
									<p className="text-[11px] sm:text-xs text-gray-400 leading-normal">
										Mobile-first layouts, modern typography, glassmorphism, and seamless responsive design.
									</p>
								</div>
								<div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md hover:border-pink-500/40 transition-all group">
									<h4 className="text-xs sm:text-sm font-semibold text-white flex items-center gap-1.5 mb-1 group-hover:text-pink-300 transition-colors">
										<span className="text-pink-400">⚡</span> React & Next.js Ecosystem
									</h4>
									<p className="text-[11px] sm:text-xs text-gray-400 leading-normal">
										Single page applications, clean component architecture, API routing, and performance optimization.
									</p>
								</div>
							</div>

							<Button variation="primary" theme="purple">
								<Link href="/about" prefetch={true} className="flex items-center gap-2">
									<span>Explore Detailed Bio</span>
									<FontAwesomeIcon icon={faArrowRight} className="text-xs" />
								</Link>
							</Button>
						</motion.div>

						{/* Desktop-Only Right Column: About Card */}
						<motion.div
							className="hidden lg:flex lg:col-span-5 justify-center items-center relative"
							initial={{ x: 30, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.1 }}>
							
							<div className="relative group w-full max-w-sm xl:max-w-md">
								<div className="absolute -inset-1.5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur-xl opacity-35 group-hover:opacity-65 transition duration-500" />
								
								<div className="relative h-[390px] xl:h-[440px] w-full rounded-2xl overflow-hidden border border-white/15 bg-gray-900 shadow-2xl">
									<Image
										src={MeAbout}
										alt="Abdul Ahad About"
										placeholder="blur"
										fill
										sizes="450px"
										className="object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
									<div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-black/75 border border-white/10 backdrop-blur-md">
										<p className="text-xs text-gray-200 italic font-medium">
											&ldquo;Turning complex problems into intuitive, high-performance web experiences.&rdquo;
										</p>
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* ========================================================================= */}
			{/* SECTION 3: PROJECTS */}
			{/* ========================================================================= */}
			<section
				id="projects"
				className="section bg-[#030712] bg-gradient-to-b from-black via-[#080d1a] to-neutral-950 text-white py-8 sm:py-12 lg:py-0 lg:h-screen flex items-center justify-center relative overflow-hidden">
				{/* Background Glows */}
				<div className="absolute top-1/4 left-1/3 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none transform-gpu" />
				<div className="absolute bottom-1/4 right-1/4 w-64 sm:w-80 h-64 sm:h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none transform-gpu" />

				<div className="container mx-auto max-w-7xl px-4 sm:px-8 lg:pl-24 lg:pr-12 xl:pl-28 xl:pr-16 relative z-10 w-full">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-14 items-center">
						
						{/* Left Column: Projects Content & Interactive Bento */}
						<motion.div
							className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-start"
							initial={{ x: -30, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5 }}>
							
							<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs sm:text-sm font-medium mb-2 backdrop-blur-md">
								<span>🚀 Portfolio & Highlights</span>
							</div>

							<h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-1">
								My <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Projects</span>
							</h2>

							<Hr theme="cyan" />

							{/* Mobile Project Image Card */}
							<div className="flex lg:hidden justify-center w-full my-3">
								<div className="relative group w-full max-w-[270px] sm:max-w-xs">
									<div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur-md opacity-40" />
									<div className="relative h-48 sm:h-56 w-full rounded-2xl overflow-hidden border border-white/15 bg-gray-900 shadow-xl">
										<Image
											src={ProjectAll}
											alt="Abdul Ahad Projects"
											placeholder="blur"
											fill
											sizes="(max-width: 768px) 270px, 350px"
											className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
										/>
									</div>
								</div>
							</div>

							<p className="title text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed max-w-xl mt-2 mb-4">
								Explore a curated selection of my web applications and AI tools. Each project showcases scalable architecture, clean component design, real-time data handling, and optimal performance across all devices.
							</p>

							{/* Interactive Project Pills */}
							<div className="grid grid-cols-2 gap-2 w-full max-w-xl mb-4 sm:mb-5 text-left">
								<Link
									href="/projects"
									prefetch={true}
									className="p-2.5 rounded-xl bg-cyan-950/30 border border-cyan-500/25 hover:border-cyan-400 transition-all flex items-center justify-between group">
									<span className="text-[11px] sm:text-xs font-semibold text-cyan-200 truncate">GamaNeo247 Platform</span>
									<FontAwesomeIcon icon={faExternalLinkAlt} className="text-[10px] text-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity" />
								</Link>
								<Link
									href="/projects"
									prefetch={true}
									className="p-2.5 rounded-xl bg-blue-950/30 border border-blue-500/25 hover:border-blue-400 transition-all flex items-center justify-between group">
									<span className="text-[11px] sm:text-xs font-semibold text-blue-200 truncate">DOD Medical Booking</span>
									<FontAwesomeIcon icon={faExternalLinkAlt} className="text-[10px] text-blue-400 opacity-60 group-hover:opacity-100 transition-opacity" />
								</Link>
								<Link
									href="/projects"
									prefetch={true}
									className="p-2.5 rounded-xl bg-purple-950/30 border border-purple-500/25 hover:border-purple-400 transition-all flex items-center justify-between group">
									<span className="text-[11px] sm:text-xs font-semibold text-purple-200 truncate">OneStoryPlanet</span>
									<FontAwesomeIcon icon={faExternalLinkAlt} className="text-[10px] text-purple-400 opacity-60 group-hover:opacity-100 transition-opacity" />
								</Link>
								<Link
									href="/projects"
									prefetch={true}
									className="p-2.5 rounded-xl bg-gray-900/60 border border-gray-800 hover:border-gray-700 transition-all flex items-center justify-between group">
									<span className="text-[11px] sm:text-xs font-semibold text-gray-300 truncate">AI Image Search</span>
									<FontAwesomeIcon icon={faExternalLinkAlt} className="text-[10px] text-gray-400 opacity-60 group-hover:opacity-100 transition-opacity" />
								</Link>
							</div>

							<Button variation="primary" theme="cyan">
								<Link href="/projects" prefetch={true} className="flex items-center gap-2">
									<span>View All Projects</span>
									<FontAwesomeIcon icon={faArrowRight} className="text-xs" />
								</Link>
							</Button>
						</motion.div>

						{/* Desktop-Only Right Column: Project Showcase Card */}
						<motion.div
							className="hidden lg:flex lg:col-span-5 justify-center items-center relative"
							initial={{ x: 30, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.1 }}>
							
							<div className="relative group w-full max-w-sm xl:max-w-md">
								<div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 rounded-2xl blur-xl opacity-35 group-hover:opacity-65 transition duration-500" />
								
								<div className="relative h-[360px] xl:h-[410px] w-full rounded-2xl overflow-hidden border border-white/15 bg-gray-900 shadow-2xl">
									<Image
										src={ProjectAll}
										alt="Abdul Ahad Projects"
										placeholder="blur"
										fill
										sizes="450px"
										className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />
									
									<div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3.5 rounded-xl bg-black/80 border border-white/10 backdrop-blur-md">
										<div>
											<p className="text-xs font-semibold text-white">Full-Stack & Web Apps</p>
											<p className="text-[11px] text-cyan-300">React, Next.js, APIs</p>
										</div>
										<Link
											href="/projects"
											prefetch={true}
											className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold transition-colors">
											Explore
										</Link>
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* ========================================================================= */}
			{/* SECTION 4: CONTACT */}
			{/* ========================================================================= */}
			<section
				id="contact"
				className="section bg-[#030712] bg-gradient-to-b from-neutral-950 via-gray-950 to-black text-white py-8 sm:py-12 lg:py-0 lg:h-screen flex items-center justify-center relative overflow-hidden">
				{/* Background Glows */}
				<div className="absolute top-1/3 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-pink-600/15 rounded-full blur-3xl pointer-events-none transform-gpu" />
				<div className="absolute bottom-1/4 right-1/3 w-64 sm:w-80 h-64 sm:h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none transform-gpu" />

				<div className="container mx-auto max-w-7xl px-4 sm:px-8 lg:pl-24 lg:pr-12 xl:pl-28 xl:pr-16 relative z-10 w-full">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-14 items-center">
						
						{/* Left Column: Contact Details */}
						<motion.div
							className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-start"
							initial={{ x: -30, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5 }}>
							
							<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/25 text-pink-300 text-xs sm:text-sm font-medium mb-2 backdrop-blur-md">
								<span>📬 Let&rsquo;s Connect</span>
							</div>

							<h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-1">
								Get In <span className="bg-gradient-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent">Touch</span>
							</h2>

							<Hr theme="pink" />

							{/* Mobile Workspace Image Card */}
							<div className="flex lg:hidden justify-center w-full my-3">
								<div className="relative group w-full max-w-[270px] sm:max-w-xs">
									<div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl blur-md opacity-40" />
									<div className="relative h-48 sm:h-56 w-full rounded-2xl overflow-hidden border border-white/15 bg-gray-900 shadow-xl">
										<Image
											src={Setup}
											alt="Abdul Ahad Workspace"
											placeholder="blur"
											fill
											sizes="(max-width: 768px) 270px, 350px"
											className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
										/>
									</div>
								</div>
							</div>

							<p className="title text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed max-w-xl mt-2 mb-4">
								I&rsquo;d love to hear from you! Whether you have a project in mind, want to collaborate on web/AI applications, or discuss potential opportunities, feel free to drop me a message.
							</p>

							{/* Interactive Email Copy / Send Box */}
							<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-md w-full mb-4 mx-auto lg:mx-0">
								<a
									href="mailto:abdulahadfarooqui73@gmail.com?subject=Hello%20Abdul%20Ahad&body=Hi%20Abdul%20Ahad,"
									onClick={() => {
										trackEvent(
											"email_click",
											{ email: "abdulahadfarooqui73@gmail.com" },
											{ label: "Email Contact Card" }
										);
									}}
									className="group p-3 sm:p-3.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-pink-500/50 backdrop-blur-md transition-all duration-300 flex items-center gap-3 flex-1 shadow-lg hover:shadow-pink-500/10 min-w-0">
									<div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-400 text-sm sm:text-base group-hover:scale-110 transition-transform flex-shrink-0">
										<FontAwesomeIcon icon={faEnvelope} />
									</div>
									<div className="text-left overflow-hidden min-w-0">
										<p className="text-[10px] sm:text-xs text-gray-400 font-medium">Direct Email</p>
										<p className="text-xs sm:text-sm font-semibold text-white group-hover:text-pink-300 transition-colors truncate">
											abdulahadfarooqui73@gmail.com
										</p>
									</div>
								</a>

								<button
									onClick={handleCopyEmail}
									aria-label="Copy Email Address"
									className={`px-3.5 py-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 ${
										copied
											? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
											: "bg-white/[0.05] border-white/10 hover:border-pink-500/50 text-gray-300 hover:text-white"
									}`}>
									<FontAwesomeIcon icon={copied ? faCheck : faCopy} />
									<span>{copied ? "Copied!" : "Copy"}</span>
								</button>
							</div>

							{/* Social Icons Strip with Brand Colors */}
							<div className="flex flex-wrap justify-center lg:justify-start items-center gap-2.5">
								<motion.a
									href="mailto:abdulahadfarooqui73@gmail.com?subject=Hello&body=Hello%20Abdul%20Ahad,"
									aria-label="Email"
									title="Email"
									className="flex justify-center items-center bg-gradient-to-r from-blue-500 to-blue-600 w-10 h-10 sm:w-11 sm:h-11 rounded-full text-white shadow-lg hover:shadow-blue-500/40 transition-all duration-300 hover:scale-110"
									onClick={() => {
										trackEvent("email_click", { email: "abdulahadfarooqui73@gmail.com" }, { label: "Email Contact Button" });
									}}>
									<FontAwesomeIcon icon={faEnvelope} className="text-base" />
								</motion.a>

								<motion.a
									href="https://github.com/abdulahad66"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="GitHub Profile"
									title="GitHub"
									className="flex justify-center items-center bg-gray-800 hover:bg-gray-700 border border-white/10 w-10 h-10 sm:w-11 sm:h-11 rounded-full text-white shadow-lg hover:shadow-gray-500/30 transition-all duration-300 hover:scale-110"
									onClick={() => {
										trackEvent("github_click", { url: "https://github.com/abdulahad66" }, { label: "GitHub Profile Link" });
									}}>
									<FontAwesomeIcon icon={faGithub} className="text-base" />
								</motion.a>

								<motion.a
									href="https://www.linkedin.com/in/abdulahad-dev/"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="LinkedIn Profile"
									title="LinkedIn"
									className="flex justify-center items-center bg-blue-700 hover:bg-blue-600 w-10 h-10 sm:w-11 sm:h-11 rounded-full text-white shadow-lg hover:shadow-blue-600/40 transition-all duration-300 hover:scale-110"
									onClick={() => {
										trackEvent("linkedin_click", { url: "https://www.linkedin.com/in/abdulahad-dev/" }, { label: "LinkedIn Profile Link" });
									}}>
									<FontAwesomeIcon icon={faLinkedin} className="text-base" />
								</motion.a>

								<motion.a
									href="https://instagram.com"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Instagram Profile"
									title="Instagram"
									className="flex justify-center items-center bg-gradient-to-r from-pink-500 to-rose-500 w-10 h-10 sm:w-11 sm:h-11 rounded-full text-white shadow-lg hover:shadow-pink-500/40 transition-all duration-300 hover:scale-110">
									<FontAwesomeIcon icon={faInstagram} className="text-base" />
								</motion.a>

								<motion.a
									href="https://discord.com"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Discord Profile"
									title="Discord"
									className="flex justify-center items-center bg-indigo-700 hover:bg-indigo-600 w-10 h-10 sm:w-11 sm:h-11 rounded-full text-white shadow-lg hover:shadow-indigo-600/40 transition-all duration-300 hover:scale-110">
									<FontAwesomeIcon icon={faDiscord} className="text-base" />
								</motion.a>
							</div>
						</motion.div>

						{/* Desktop-Only Right Column: Workspace Showcase */}
						<motion.div
							className="hidden lg:flex lg:col-span-5 justify-center items-center relative"
							initial={{ x: 30, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.1 }}>
							
							<div className="relative group w-full max-w-sm xl:max-w-md">
								<div className="absolute -inset-1.5 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 rounded-2xl blur-xl opacity-35 group-hover:opacity-65 transition duration-500" />
								
								<div className="relative h-[360px] xl:h-[400px] w-full rounded-2xl overflow-hidden border border-white/15 bg-gray-900 shadow-2xl">
									<Image
										src={Setup}
										alt="Abdul Ahad Workspace"
										placeholder="blur"
										fill
										sizes="450px"
										className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />
									
									<div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-black/80 border border-white/10 backdrop-blur-md">
										<p className="text-xs font-semibold text-white">Developer Workspace</p>
										<p className="text-[11px] text-pink-300">Open for new opportunities & collaborations</p>
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>
		</main>
	);
}
