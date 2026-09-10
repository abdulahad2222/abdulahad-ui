"use client";
import Hr from "@/components/Hr";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBriefcase,
	faLaptopCode,
	faBuilding,
	faCalendarAlt,
	faMapMarkerAlt,
	faChevronDown,
	faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

const experiences = [
	{
		id: 1,
		startDate: "Feb 2022",
		endDate: "Apr 2023",
		company: "WebGanges Technologies Private Limited",
		position: "Front-End Developer / Web Designer",
		type: "Freelance",
		location: "Kanpur, Uttar Pradesh, India",
		description:
			"Created clean, semantic, and responsive user interfaces using HTML and CSS. Designed visually appealing web pages with a strong focus on usability and user experience. Ensured cross-device compatibility across desktop, tablet, and mobile screens while following modern UI/UX principles.",
		skills: [
			"HTML",
			"CSS",
			"Responsive Design",
			"UI Design",
			"UX Principles",
			"Cross-Browser Compatibility",
			"Mobile-First Design",
		],
	},
	{
		id: 2,
		startDate: "Apr 2022",
		endDate: "Jul 2024",
		company: "Vorrow Technology Solutions",
		position: "Front-End Developer",
		type: "Full-time",
		location: "Lucknow, Uttar Pradesh, India",
		description:
			"Developed clean, reusable, and scalable front-end components using HTML, CSS, JavaScript, and React. Worked on responsive websites, dashboards, and admin panels. Collaborated with designers to improve UX and ensured cross-browser compatibility across devices.",
		skills: [
			"HTML",
			"CSS",
			"JavaScript",
			"React",
			"Bootstrap",
			"Tailwind CSS",
			"WordPress",
			"Shopify",
			"SEO",
			"Cross-Browser Compatibility",
			"UI/UX Design",
		],
	},
	{
		id: 3,
		startDate: "Aug 2024",
		endDate: "Present",
		company: "Next Olive Technologies Pvt Ltd",
		position: "Front-End Developer (UI Developer)",
		type: "Full-time",
		location: "Lucknow, Uttar Pradesh, India",
		description:
			"Building responsive and scalable web applications using React and modern UI frameworks. Collaborate closely with UI/UX teams to convert wireframes and Figma designs into pixel-perfect interfaces. Focus on performance optimization, accessibility (WCAG), and mobile-first development.",
		skills: [
			"React",
			"Next.js",
			"JavaScript",
			"HTML",
			"CSS",
			"Tailwind CSS",
			"Bootstrap",
			"Material UI",
			"Ant Design",
			"ShadCN UI",
			"Framer Motion",
			"REST API",
			"Git",
			"Responsive Design",
			"Accessibility (WCAG)",
			"Adobe Illustrator",
		],
	},
];

export const getExperienceIcon = (type) => {
	switch (type) {
		case "Full-Time":
		case "Full-time":
			return faBuilding;
		case "Freelance":
			return faLaptopCode;
		default:
			return faBriefcase;
	}
};

const sortedExperiences = [...experiences].reverse();

function Title() {
	return (
		<div className="mt-12 flex flex-col justify-center items-center w-full px-4 sm:px-8 max-w-6xl mx-auto">
			<div className="flex justify-center items-center flex-col my-3 text-center">
				<Hr variant="long"></Hr>
				<motion.h2
					className="text-3xl sm:text-4xl font-bold mt-3 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.2, duration: 0.5 }}>
					Professional Experience
				</motion.h2>
			</div>
		</div>
	);
}

function TimelineBadge({ experience, index, isEven }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: -15 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ delay: index * 0.1, duration: 0.4 }}
			className={`flex mb-3 ${
				isEven
					? "md:justify-start md:ml-auto md:w-1/2 md:pl-8"
					: "md:justify-end md:mr-auto md:w-1/2 md:pr-8"
			} justify-start pl-6 md:pl-0`}>
			<div className="bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95 text-white px-3.5 sm:px-5 py-2 rounded-xl shadow-xl border border-white/10 backdrop-blur-md max-w-full">
				<div className="flex items-center gap-3 sm:gap-4 text-xs">
					<div className="text-center">
						<div className="font-bold text-cyan-400">{experience.startDate}</div>
						<div className="text-[10px] text-gray-400">Start</div>
					</div>
					<div className="w-px h-5 bg-white/15" />
					<div className="text-center">
						<div className="font-bold text-purple-400">{experience.endDate}</div>
						<div className="text-[10px] text-gray-400">End</div>
					</div>
					<div className="w-px h-5 bg-white/15" />
					<div className="text-center">
						<div className="font-medium text-gray-300 truncate max-w-[110px] sm:max-w-[140px]">
							{experience.location}
						</div>
						<div className="text-[10px] text-gray-400">Location</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
}

function ExperienceCard({ experience, index, isEven }) {
	const icon = getExperienceIcon(experience.type);

	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ delay: index * 0.15, duration: 0.5 }}
			className={`relative group w-full ${
				isEven ? "md:ml-auto md:pl-8" : "md:mr-auto md:pr-8"
			} md:w-1/2 pl-6 md:pl-0`}>
			<div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl hover:border-cyan-500/40 transition-all duration-300 group-hover:bg-black/75">
				{/* Company & Position */}
				<div className="mb-3">
					<div className="flex items-center justify-between gap-2 mb-1">
						<h3 className="font-bold text-lg sm:text-xl text-white group-hover:text-cyan-300 transition-colors">
							{experience.company}
						</h3>
						<span className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-cyan-400 text-xs">
							<FontAwesomeIcon icon={icon} />
						</span>
					</div>

					<h4 className="font-medium text-sm sm:text-base text-gray-200 flex flex-wrap items-center gap-2">
						<span>{experience.position}</span>
						<span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
							{experience.type}
						</span>
					</h4>
				</div>

				{/* Description */}
				<p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4">
					{experience.description}
				</p>

				{/* Skills */}
				<div className="flex flex-wrap gap-1.5">
					{experience.skills.map((skill, idx) => (
						<span
							key={idx}
							className="px-2.5 py-0.5 rounded-md text-[11px] font-medium backdrop-blur-sm bg-white/5 border border-white/10 text-gray-300 hover:border-cyan-400/40 hover:text-white transition-colors">
							{skill}
						</span>
					))}
				</div>
			</div>
		</motion.div>
	);
}

export default function Experience() {
	const [showAll, setShowAll] = useState(false);
	const displayedExperiences = showAll ? sortedExperiences : sortedExperiences.slice(0, 3);

	return (
		<div className="w-full relative px-4 sm:px-8 py-8">
			<Title />
			<div className="mx-auto container max-w-5xl py-6">
				<div className="relative w-full">
					{/* Desktop Timeline Line */}
					<div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-transparent h-full opacity-40" />
					
					{/* Mobile Timeline Line */}
					<div className="md:hidden absolute left-2 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-transparent h-full opacity-40" />

					{/* Experience List */}
					<div className="space-y-8 sm:space-y-12 relative">
						<AnimatePresence>
							{displayedExperiences.map((experience, index) => {
								const isEven = index % 2 === 1;
								return (
									<div key={experience.id} className="relative">
										{/* Period Timeline Badge */}
										<TimelineBadge
											experience={experience}
											index={index}
											isEven={isEven}
										/>

										{/* Dot */}
										<div
											className={`absolute w-4 h-4 bg-gray-950 rounded-full border-2 border-cyan-400 shadow-lg shadow-cyan-500/50 z-20 ${
												isEven
													? "md:left-1/2 md:-translate-x-1/2 md:top-10 left-2 -translate-x-1/2 top-10"
													: "md:left-1/2 md:-translate-x-1/2 md:top-10 left-2 -translate-x-1/2 top-10"
											}`}
										/>

										{/* Content Card */}
										<ExperienceCard
											experience={experience}
											index={index}
											isEven={isEven}
										/>
									</div>
								);
							})}
						</AnimatePresence>
					</div>

					{/* View More Button */}
					{sortedExperiences.length > 3 && (
						<div className="flex justify-center mt-10">
							<button
								onClick={() => setShowAll(!showAll)}
								className="bg-white/10 hover:bg-white/20 border border-white/15 text-white px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2 backdrop-blur-md shadow-lg">
								<span>{showAll ? "Show Less" : "View More Experience"}</span>
								<FontAwesomeIcon
									icon={showAll ? faChevronUp : faChevronDown}
									className="text-xs"
								/>
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
