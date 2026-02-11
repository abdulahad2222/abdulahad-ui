"use client";
import Hr from "@/components/Hr";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBriefcase,
	faLaptopCode,
	faBuilding,
} from "@fortawesome/free-solid-svg-icons";
const experiences = [
	{
		id: 1,
		startDate: "Feb 2022",
		endDate: "Apr 2023",
		company: "WebGanges Technologies Private Limited",
		position: "PHP Laravel developer",
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
		position: "PHP Laravel developer",
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
		position: "PHP Laravel developer",
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
			return faBuilding;
		case "Freelance":
			return faLaptopCode;
		default:
			return faBriefcase;
	}
};


experiences.reverse();

function Title() {
	return (
		<div className="mt-16 flex flex-col justify-start items-center w-full pl-10 md:pl-32">
			<div className="flex justify-center items-center flex-col my-5 self-start">
				<Hr variant="long"></Hr>
				<motion.h1
					className="text-3xl font-bold mt-3"
					initial={{
						opacity: 0,
						x: -200,
					}}
					whileInView={{
						opacity: 1,
						x: 0,
					}}
					transition={{
						delay: 0.7,
						type: "spring",
					}}>
					Profesional Experience
				</motion.h1>
			</div>
		</div>
	);
}

function TimelineCard({ experience, index, isEven }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ delay: index * 0.15, duration: 0.5 }}
			className={`flex ps-10 md:ps-0 ${isEven
				? "md:justify-center md:translate-x-68"
				: "md:justify-center md:-translate-x-68"
				} justify-center mb-4`}>
			<div className="bg-gradient-to-r from-black to-gray-800 text-white px-12 py-3 rounded-xl shadow-lg border border-gray-600 min-w-max">

				<div className="flex items-center justify-start gap-6">

					<div className="text-center">
						<div className="text-sm font-bold">{experience.startDate}</div>
						<div className="text-xs text-gray-300">Start</div>
					</div>
					<div className="w-px h-8 bg-gray-500"></div>
					<div className="text-center">
						<div className="text-sm font-bold">{experience.endDate}</div>
						<div className="text-xs text-gray-300">End</div>
					</div>					<div className="w-px h-8 bg-gray-500"></div>
					<div className="text-center">
						<div className="text-sm font-medium text-gray-400">
							{experience.location}
						</div>
						<div className="text-xs text-gray-300">Location</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
}

function ExperienceCard({ experience, index, isEven }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ delay: index * 0.2, duration: 0.6 }}
			className={`relative group ${isEven ? "md:ml-auto md:pl-12" : "md:mr-auto md:pr-12"
				} md:w-1/2`}
		>
			{/* Card */}
			<div
				className="
          bg-white/20 dark:bg-black/40
          backdrop-blur-sm
          border border-gray-300/30 dark:border-white/20
          rounded-2xl p-6
          shadow-lg dark:shadow-[0_0_25px_rgba(255,255,255,0.04)]
          hover:shadow-xl
          hover:bg-white/30 dark:hover:bg-black/50
          transition-all duration-300
          ml-12 md:ml-0
        "
			>
				{/* Company & Position */}
				<div className="mb-4">
					<h3 className="font-bold text-xl text-black dark:text-white mb-1">
						{experience.company}
					</h3>

					<h4 className="font-medium text-lg text-gray-700 dark:text-gray-200">
						{experience.position}
						<span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
							• {experience.type}
						</span>
					</h4>
				</div>

				{/* Description */}
				<p className="text-gray-600 dark:text-gray-300 text-justify leading-relaxed mb-4">
					{experience.description}
				</p>

				{/* Skills */}
				<div className="flex flex-wrap gap-2">
					{experience.skills.map((skill, idx) => (
						<span
							key={idx}
							className="
                px-3 py-1 rounded-full text-sm font-medium
                backdrop-blur-sm border
                transition-all duration-300
                bg-gray-200/60 dark:bg-white/10
                hover:bg-gray-300/60 dark:hover:bg-white/20
                border-gray-400/40 dark:border-white/10
                text-black dark:text-white/90
                hover:scale-105
              "
						>
							{skill}
						</span>
					))}
				</div>
			</div>
		</motion.div>
	);
}

function Wrapper({ children }) {
	return (
		<div className="mx-auto container px-6 py-10">
			<div
				className="flex justify-center items-center flex-col">
				{children}
			</div>
		</div>
	);
}

export default function Experience() {
	const [showAll, setShowAll] = useState(false);
	const displayedExperiences = showAll ? experiences : experiences.slice(0, 3);

	return (
		<>
			<Title />
			<Wrapper>
				{" "}
				<div className="relative w-full max-w-6xl mx-auto">
					{" "}
					{/* Timeline line - hidden on mobile, visible on md+ */}
					<div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-black via-gray-400 to-transparent h-full"></div>
					{/* Mobile timeline line */}
					<div className="md:hidden absolute left-0 w-1 bg-gradient-to-b from-black via-gray-400 to-transparent h-full"></div>{" "}
					{/* Experience cards */}
					<div className="space-y-12 md:space-y-16 relative">
						<AnimatePresence>
							{displayedExperiences.map((experience, index) => (
								<div key={experience.id} className="relative">
									{/* Timeline period card - flows naturally above content */}
									<TimelineCard
										experience={experience}
										index={index}
										isEven={index % 2 === 1}
									/>

									{/* Timeline dot - positioned at the start of the experience card */}
									<div
										className={`absolute w-6 h-6 bg-black rounded-full border-4 border-white shadow-lg z-30
										md:left-1/2 md:-translate-x-1/2 md:top-4
										left-0 -translate-x-1/2 top-5`}
									/>

									{/* Experience content card */}
									<ExperienceCard
										experience={experience}
										index={index}
										isEven={index % 2 === 1}
									/>
								</div>
							))}
						</AnimatePresence>
					</div>
					{/* Expand/Collapse button */}
					{experiences.length > 3 && (
						<motion.div
							className="flex justify-center mt-12"
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							transition={{ delay: 0.5 }}>
							<button
								onClick={() => setShowAll(!showAll)}
								className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-full font-medium 
									transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2">
								{showAll ? (
									<>
										Show Less
										<svg
											className="w-4 h-4 transform rotate-180"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M19 9l-7 7-7-7"
											/>
										</svg>
									</>
								) : (
									<>
										View More Experience
										<svg
											className="w-4 h-4"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M19 9l-7 7-7-7"
											/>
										</svg>
									</>
								)}
							</button>
						</motion.div>
					)}{" "}
					{/* Gradient fade effect at bottom */}
					{!showAll && (
						<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-stale-300 to-transparent pointer-events-none"></div>
					)}
				</div>
			</Wrapper>
		</>
	);
}
