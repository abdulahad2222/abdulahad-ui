"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faGraduationCap,
	faBuildingColumns,
	faLocationDot,
	faCalendarDays,
	faMedal,
	faTrophy,
	faAward,
	faBriefcase,
	faCode,
	faLaptopCode,
	faPaintBrush,
	faChartLine,
	faBuilding,
	faMobileAlt,
	faGlobe,
	faPalette,
	faChevronDown,
	faChevronUp,
	faUserDoctor,
	faBookOpen,
	faCheckCircle,
	faStar,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import IsbmUniversityImg from "@/public/image/isbmuniversity.webp";
import AhadPhoto1 from "@/public/image/ahad_1.webp";
import AhadPhoto3 from "@/public/image/ahad_3.webp";
import Hr from "@/components/Hr";

function Title() {
	return (
		<div className="mt-8 mb-6 flex flex-col justify-center items-center w-full px-4 sm:px-8 max-w-6xl mx-auto text-center">
			<div className="flex justify-center items-center flex-col my-2">
				<Hr variant="long" />
				<h2 className="text-3xl sm:text-4xl font-bold mt-2 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
					Education & Campus
				</h2>
				<p className="text-gray-400 text-xs sm:text-sm md:text-base max-w-2xl mt-2">
					Academic foundation, ongoing Master&apos;s studies at ISBM University, and professional milestones.
				</p>
			</div>
		</div>
	);
}

export default function Education() {
	const [isExpanded, setIsExpanded] = useState(false);

	const achievementsByYear = {
		2025: [
			{
				icon: faBriefcase,
				title: "Lead Front-End UI Development",
				subtitle: "GamaNeo247 – Online Betting Platform",
				date: "Feb 2025",
				color: "from-green-500 to-emerald-600",
			},
			{
				icon: faCode,
				title: "Delivered High-Performance Gaming UI",
				subtitle: "React-based Real-Time Betting & Casino Platform",
				date: "Jan 2025",
				color: "from-indigo-500 to-purple-600",
			},
		],

		2024: [
			{
				icon: faLaptopCode,
				title: "Joined as Front-End Developer (UI Developer)",
				subtitle: "Next Olive Technologies Pvt Ltd",
				date: "Aug 2024",
				color: "from-blue-500 to-cyan-600",
			},
			{
				icon: faPaintBrush,
				title: "Built Pixel-Perfect UI from Figma Designs",
				subtitle: "React, Tailwind CSS, ShadCN UI",
				date: "Oct 2024",
				color: "from-pink-500 to-rose-600",
			},
			{
				icon: faChartLine,
				title: "Improved Website Performance & Accessibility",
				subtitle: "WCAG Compliance & SEO Optimization",
				date: "Nov 2024",
				color: "from-teal-500 to-green-600",
			},
			{
				icon: faUserDoctor,
				title: "Developed Doctor Appointment Booking Platform",
				subtitle: "DOD (Doctors on Duty)",
				date: "Sep 2024",
				color: "from-red-500 to-rose-600",
			},
			{
				icon: faBookOpen,
				title: "Built Storytelling-Based Social Network",
				subtitle: "OneStoryPlanet.com (Global Story Sharing Platform)",
				date: "Dec 2024 - 2025",
				color: "from-violet-500 to-purple-600",
			},
		],

		2023: [
			{
				icon: faBuilding,
				title: "Key Front-End Contributor",
				subtitle: "Vorrow Technology Solutions",
				date: "Jun 2023",
				color: "from-slate-500 to-gray-600",
			},
			{
				icon: faMobileAlt,
				title: "Delivered Multiple Responsive Web Projects",
				subtitle: "Dashboards, Admin Panels & CMS Websites",
				date: "Dec 2023",
				color: "from-orange-500 to-amber-600",
			},
		],

		2022: [
			{
				icon: faGlobe,
				title: "Started Professional Career as Front-End Developer",
				subtitle: "WebGanges Technologies Pvt. Ltd.",
				date: "Feb 2022",
				color: "from-purple-500 to-indigo-600",
			},
			{
				icon: faPalette,
				title: "Designed & Developed Responsive Websites",
				subtitle: "HTML, CSS, UX/UI Best Practices",
				date: "Apr 2022",
				color: "from-fuchsia-500 to-pink-600",
			},
		],
	};

	const allAchievements = Object.entries(achievementsByYear)
		.sort(([a], [b]) => parseInt(b) - parseInt(a))
		.flatMap(([year, achievements]) =>
			achievements.map((achievement) => ({ ...achievement, year }))
		);

	const visibleAchievements = isExpanded
		? allAchievements
		: allAchievements.slice(0, 6);
	const hasMoreAchievements = allAchievements.length > 6;

	return (
		<div className="w-full relative px-4 sm:px-8 py-6">
			<Title />

			<div className="mx-auto container max-w-6xl space-y-10">
				{/* ========================================================================= */}
				{/* FEATURED: ISBM UNIVERSITY CAMPUS & POSTGRADUATE SHOWCASE */}
				{/* ========================================================================= */}
				<motion.div
					className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-950/90 border border-white/15 shadow-2xl backdrop-blur-xl"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}>
					
					{/* Ambient Glows */}
					<div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
					<div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

					<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-5 sm:p-7 md:p-8 relative z-10 items-center">
						
						{/* Left / Top: High-Resolution ISBM Campus Photograph */}
						<div className="lg:col-span-6 flex flex-col justify-center">
							<div className="relative group rounded-2xl overflow-hidden border border-white/20 bg-gray-900 shadow-2xl aspect-[4/3] sm:aspect-[16/10] w-full">
								<Image
									src={IsbmUniversityImg}
									alt="ISBM University Campus"
									fill
									priority
									sizes="(max-width: 768px) 100vw, 600px"
									className="object-cover object-center group-hover:scale-105 transition-all duration-700 ease-out"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

								{/* Top Floating Badge */}
								<div className="absolute top-3 left-3 px-3 py-1.5 rounded-xl bg-black/80 border border-white/20 backdrop-blur-md flex items-center gap-2 shadow-lg">
									<FontAwesomeIcon icon={faBuildingColumns} className="text-cyan-400 text-xs" />
									<span className="text-xs font-bold text-white tracking-wide">ISBM University Campus</span>
								</div>

								{/* Top Right Location Badge */}
								<div className="absolute top-3 right-3 px-2.5 py-1.5 rounded-xl bg-black/80 border border-white/20 backdrop-blur-md flex items-center gap-1.5 shadow-lg">
									<FontAwesomeIcon icon={faLocationDot} className="text-pink-400 text-xs" />
									<span className="text-[11px] font-semibold text-gray-200">Chhattisgarh, India</span>
								</div>

								{/* Bottom Overlay Info Banner */}
								<div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/85 border border-white/15 backdrop-blur-md flex items-center justify-between">
									<div>
										<p className="text-xs font-bold text-white flex items-center gap-1.5">
											<span>🏛️ Main Academic Campus</span>
										</p>
										<p className="text-[11px] text-cyan-300">Indian School of Business Management & Administration</p>
									</div>
									<span className="px-2.5 py-1 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-[10px] font-bold">
										Active Scholar
									</span>
								</div>
							</div>
						</div>

						{/* Right: Academic Program Details */}
						<div className="lg:col-span-6 flex flex-col justify-center space-y-4">
							<div className="flex flex-wrap items-center gap-2">
								<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
									<FontAwesomeIcon icon={faGraduationCap} className="text-xs" />
									<span>Master&apos;s Degree Program</span>
								</span>
								<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
									<FontAwesomeIcon icon={faCalendarDays} className="text-xs" />
									<span>2024 – Present (Ongoing)</span>
								</span>
							</div>

							<div>
								<h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight mb-1">
									Indian School of Business Management and Administration (ISBM University)
								</h3>
								<h4 className="text-base sm:text-lg font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
									Master of Computer Applications (MCA)
								</h4>
							</div>

							<p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed text-justify">
								Currently pursuing my Master of Computer Applications (MCA) at <span className="text-white font-semibold">ISBM University, Chhattisgarh</span>. The curriculum encompasses advanced software design patterns, scalable web architectures, full-stack computing, database management, and cloud integrations.
							</p>

							<p className="text-gray-300 text-xs sm:text-sm leading-relaxed text-justify">
								I actively synthesize academic principles with real-world industry experience to build responsive, accessible, and high-performance digital platforms.
							</p>

							{/* Academic Specialization Pills */}
							<div className="flex flex-wrap gap-2 pt-2">
								<span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-200 font-medium flex items-center gap-1.5">
									<FontAwesomeIcon icon={faCode} className="text-cyan-400 text-[10px]" />
									Full-Stack Architecture
								</span>
								<span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-200 font-medium flex items-center gap-1.5">
									<FontAwesomeIcon icon={faLaptopCode} className="text-purple-400 text-[10px]" />
									UI Engineering
								</span>
								<span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-200 font-medium flex items-center gap-1.5">
									<FontAwesomeIcon icon={faChartLine} className="text-blue-400 text-[10px]" />
									Algorithms & Systems
								</span>
								<span className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-300 font-bold flex items-center gap-1.5">
									<FontAwesomeIcon icon={faStar} className="text-yellow-400 text-[10px]" />
									GPA: 3.9 / 4.0
								</span>
							</div>
						</div>
					</div>
				</motion.div>

				{/* ========================================================================= */}
				{/* 2-COLUMN SECTION: UNDERGRADUATE & STUDENT SCHOLAR SHOWCASE */}
				{/* ========================================================================= */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
					
					{/* Left: Undergraduate Degree (CSJMU Kanpur) */}
					<motion.div
						className="lg:col-span-6 rounded-3xl bg-gradient-to-br from-gray-900/80 via-black/60 to-gray-950/80 border border-white/10 p-6 sm:p-7 shadow-xl backdrop-blur-md flex flex-col justify-between"
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.1 }}>
						
						<div className="space-y-4">
							<div className="flex flex-wrap items-center justify-between gap-2">
								<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold">
									<FontAwesomeIcon icon={faGraduationCap} className="text-xs" />
									<span>Undergraduate Degree</span>
								</span>
								<span className="px-2.5 py-0.5 rounded-full bg-white/10 text-gray-300 text-xs font-semibold">
									Completed Graduate
								</span>
							</div>

							<div>
								<h3 className="text-lg sm:text-xl font-bold text-white">
									Chhatrapati Shahu Ji Maharaj University (CSJMU)
								</h3>
								<h4 className="text-sm sm:text-base font-semibold text-purple-300 flex items-center gap-2 mt-0.5">
									<span>Bachelor of Computer Applications (BCA)</span>
									<span className="text-xs text-gray-400">• Kanpur, UP</span>
								</h4>
							</div>

							<p className="text-gray-300 text-xs sm:text-sm leading-relaxed text-justify">
								Graduated with a comprehensive Bachelor of Computer Applications degree from CSJMU Kanpur. Built solid fundamentals in object-oriented programming, software lifecycle, data structures, relational database management systems (RDBMS), and web technologies.
							</p>
						</div>

						<div className="flex flex-wrap gap-2 pt-4 border-t border-white/10 mt-4">
							<span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-gray-300">
								BCA Graduate
							</span>
							<span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-gray-300">
								CS Fundamentals
							</span>
							<span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-gray-300">
								Database & Web Systems
							</span>
						</div>
					</motion.div>

					{/* Right: Scholar Portraits & Dedication */}
					<motion.div
						className="lg:col-span-6 rounded-3xl bg-gradient-to-br from-gray-900/80 via-black/60 to-gray-950/80 border border-white/10 p-6 sm:p-7 shadow-xl backdrop-blur-md flex flex-col justify-between"
						initial={{ opacity: 0, x: 30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.2 }}>
						
						<div>
							<div className="flex items-center gap-2 mb-3">
								<span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-bold">
									🎓 Student & Professional Journey
								</span>
							</div>

							<div className="grid grid-cols-2 gap-3 mb-4">
								<div className="relative h-44 sm:h-52 rounded-2xl overflow-hidden border border-white/15 bg-gray-900 shadow-lg group">
									<Image
										src={AhadPhoto1}
										alt="Abdul Ahad Academic Journey"
										fill
										sizes="(max-width: 768px) 150px, 250px"
										className="object-cover object-top group-hover:scale-105 transition-all duration-500"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
									<div className="absolute bottom-2 left-2 right-2 p-1.5 rounded-lg bg-black/80 border border-white/10 text-center">
										<p className="text-[10px] font-bold text-cyan-300">Abdul Ahad</p>
										<p className="text-[9px] text-gray-300">MCA Scholar</p>
									</div>
								</div>

								<div className="relative h-44 sm:h-52 rounded-2xl overflow-hidden border border-white/15 bg-gray-900 shadow-lg group">
									<Image
										src={AhadPhoto3}
										alt="Abdul Ahad ISBM University"
										fill
										sizes="(max-width: 768px) 150px, 250px"
										className="object-cover object-top group-hover:scale-105 transition-all duration-500"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
									<div className="absolute bottom-2 left-2 right-2 p-1.5 rounded-lg bg-black/80 border border-white/10 text-center">
										<p className="text-[10px] font-bold text-purple-300">Continuous Growth</p>
										<p className="text-[9px] text-gray-300">UI & Tech Specialist</p>
									</div>
								</div>
							</div>

							<p className="text-gray-300 text-xs sm:text-sm leading-relaxed text-justify">
								Balancing active software engineering at Next Olive Technologies with advanced postgraduate MCA studies at ISBM University.
							</p>
						</div>
					</motion.div>
				</div>

				{/* ========================================================================= */}
				{/* ACHIEVEMENTS & MILESTONES TIMELINE */}
				{/* ========================================================================= */}
				<motion.div
					className="rounded-3xl bg-gradient-to-br from-gray-900/60 via-black/60 to-gray-950/60 border border-white/10 p-6 sm:p-8 shadow-2xl backdrop-blur-xl"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}>
					
					<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
						<div>
							<h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
								<FontAwesomeIcon icon={faTrophy} className="text-yellow-400 text-lg" />
								<span>Achievements & Milestones</span>
							</h3>
							<p className="text-xs sm:text-sm text-gray-400 mt-0.5">
								Key career and academic highlights through the years.
							</p>
						</div>
						<span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 self-start sm:self-auto">
							{allAchievements.length} Total Milestones
						</span>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<AnimatePresence>
							{visibleAchievements.map((achievement, index) => (
								<motion.div
									key={`${achievement.year}-${index}`}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
									transition={{ duration: 0.4, delay: index * 0.05 }}
									className="group bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 hover:border-cyan-500/40 transition-all duration-300 hover:bg-black/80 shadow-lg">
									
									<div className="flex items-center gap-3.5">
										<div className={`aspect-square w-11 h-11 rounded-xl bg-gradient-to-r ${achievement.color} flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform`}>
											<FontAwesomeIcon icon={achievement.icon} className="text-white text-base" />
										</div>

										<div className="min-w-0 flex-1">
											<div className="flex items-center justify-between gap-2">
												<h4 className="font-semibold text-sm sm:text-base text-white truncate group-hover:text-cyan-300 transition-colors">
													{achievement.title}
												</h4>
												<span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-gray-300 flex-shrink-0">
													{achievement.year}
												</span>
											</div>
											<p className="text-xs text-gray-300 truncate mt-0.5">
												{achievement.subtitle}
											</p>
											<span className="text-[10px] text-cyan-400 font-medium mt-1 inline-block">
												{achievement.date}
											</span>
										</div>
									</div>
								</motion.div>
							))}
						</AnimatePresence>
					</div>

					{/* Expand / Collapse Button */}
					{hasMoreAchievements && (
						<div className="flex justify-center mt-6">
							<button
								onClick={() => setIsExpanded(!isExpanded)}
								className="flex items-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/15 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-md shadow-lg text-white">
								<span>{isExpanded ? "Show Less" : `Show ${allAchievements.length - 6} More Achievements`}</span>
								<FontAwesomeIcon
									icon={isExpanded ? faChevronUp : faChevronDown}
									className="h-3 w-3"
								/>
							</button>
						</div>
					)}
				</motion.div>
			</div>
		</div>
	);
}
