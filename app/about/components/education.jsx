import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMedal,
	faGraduationCap,
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
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Me4 from "@/public/image/me4.jpeg";
import Me5 from "@/public/image/me5.jpg";
import Me6 from "@/public/image/me6.jpg";

function Wrapper({ children }) {
	return (
		<div className="mx-auto container gap-10 p-10 grid grid-cols-1 my-10">
			<motion.div
				className="flex justify-center items-start flex-col mb-5"
				initial={{
					opacity: 0,
					y: 50,
				}}
				whileInView={{
					opacity: 1,
					y: 0,
				}}
				transition={{
					delay: 0.3,
					duration: 0.8,
					type: "spring",
					stiffness: 100,
				}}>
				{children}
			</motion.div>
		</div>
	);
}

export default function Education() {
	const [isExpanded, setIsExpanded] = useState(false);

	const achievementsByYear = {
		2025: [
			{
				icon: faBriefcase,
				title: "Lead PHP Laravel developer",
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
				title: "Joined as PHP Laravel developer",
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
				title: "Key PHP Laravel Contributor",
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
				title: "Started Professional Career as PHP Laravel developer",
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




	// Flatten all achievements into a single array for easier limiting
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
		<Wrapper>
			<section className="grid gap-8 md:gap-12">
				{" "}
				{/* Header */}
				<motion.div
					className="text-center space-y-2"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}>
					<h1 className="text-3xl md:text-4xl font-bold tracking-tighter">
						Education
					</h1>
					<p className="text-muted-foreground max-w-[800px] mx-auto">
						Get to know more about my educational background.
					</p>
				</motion.div>
				{/* Main Content */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{/* Education Section - Left */}
					<motion.div
						className="px-5"
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}>
						<div className="font-medium text-lg mb-4">2024 - Present</div>
						<div>
							<h2 className="font-semibold text-xl">
								Indian School of Business Management and Administration (ISBM),
							</h2>
							<h3 className="text-md font-normal mb-3">
								Master of Computer Applications (MCA)
							</h3>
							<div className="gap-4 mb-4 flex items-stretch md:h-[300px] xl:h-[400px]">
								<div className="flex-[1] transition-all duration-300 ease-in-out hover:flex-[3] group">
									<Image
										src={Me5}
										width={400}
										height={225}
										alt="University"
										className="rounded-lg w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300 ease-in-out"
									/>
								</div>
								<div className="flex-[1] transition-all duration-300 ease-in-out hover:flex-[3] group">
									<Image
										src={Me4}
										width={400}
										height={225}
										alt="University"
										className="rounded-lg w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300 ease-in-out"
									/>
								</div>
								<div className="flex-[1] transition-all duration-300 ease-in-out hover:flex-[3] group">
									<Image
										src={Me6}
										width={400}
										height={225}
										alt="University"
										className="rounded-lg w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300 ease-in-out"
									/>
								</div>
							</div>
							<div className="flex items-center gap-2">
								<p className="text-gray-600 dark:text-gray-300 text-justify title text-lg">
									Aspiring to grow as a professional Software Engineer, I am currently
									pursuing my
									<span className="text-black dark:text-white font-medium">
										{" "}Master of Computer Applications (MCA)
									</span>{" "}
									from
									<span className="text-black font-medium dark:text-gray-400">
										{" "}Indian School of Business Management and Administration (ISBM),
										Chhattisgarh
									</span>
									, where I am strengthening my knowledge in software development,
									modern web technologies, and problem-solving practices.
									<br />
									<br />
									I have completed my
									<span className="text-black font-medium dark:text-gray-400">
										{" "}Bachelor of Computer Applications (BCA)
									</span>{" "}
									from
									<span className="text-black font-medium dark:text-gray-400">
										{" "}Chhatrapati Shahu Ji Maharaj University (CSJMU), Kanpur
									</span>
									, which provided me with a strong foundation in programming fundamentals,
									web development, databases, and software engineering principles.
									<br />
									<br />
									With a strong interest in
									<span className="text-black font-medium dark:text-gray-400">
										{" "}PHP Laravel development
									</span>{" "}
									and scalable UI systems, I continuously apply my academic learning to
									real-world projects, focusing on performance, accessibility, and
									user-centric design.
								</p>
							</div>

							<div className="flex flex-wrap gap-2 mt-4 text-sm">
								<div className="bg-gray-300 text-black px-3 py-1 rounded-2xl">
									MCA (Ongoing)
								</div>
								<div className="bg-gray-300 text-black px-3 py-1 rounded-2xl">
									BCA Graduate
								</div>
							</div>

							<div className="flex flex-wrap gap-2 mt-4 text-sm">
								<div className="bg-gray-300 text-black px-2 py-1 rounded-2xl">
									GPA: 3.9 out of 4
								</div>
							</div>
						</div>
					</motion.div>{" "}
					{/* Achievements Section - Right */}
					<motion.div
						className="flex flex-col justify-start px-5 md:px-0"
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}>
						<h2 className="font-semibold text-xl mt-7">Achievements</h2>
						<p className="text-md font-normal mb-3 md:mb-6">
							Some of my achievements during my study.
						</p>

						{/* Achievements Container with transparent bottom effect */}
						<div className="relative">
							<div className="space-y-4">
								{/* Show visible achievements */}
								<AnimatePresence>
									{visibleAchievements.map((achievement, index) => (
										<motion.div
											key={`${achievement.year}-${index}`}
											className="group"
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -20 }}
											transition={{ duration: 0.5, delay: index * 0.05 }}
										>
											{/* Year indicator */}
											{index === 0 ||
												visibleAchievements[index - 1]?.year !== achievement.year ? (
												<div className="flex items-center gap-3 mb-3 mt-2">
													<div className="
        w-12 h-12 rounded-full 
        bg-gray-200 dark:bg-white/10
        flex items-center justify-center
      ">
														<span className="text-xs font-bold text-gray-600 dark:text-gray-300">
															{achievement.year}
														</span>
													</div>
													<div className="
        flex-1 h-px 
        bg-gradient-to-r 
        from-gray-300 dark:from-white/20 
        to-transparent
      " />
												</div>
											) : null}

											{/* Achievement Card */}
											<div
												className="
      bg-white/20 dark:bg-black/40
      backdrop-blur-md
      border border-white/30 dark:border-white/10
      rounded-2xl p-4
      shadow-lg dark:shadow-[0_0_25px_rgba(255,255,255,0.04)]
      hover:bg-white/30 dark:hover:bg-black/50
      transition-all duration-300
      hover:shadow-xl
       hover:grayscale-0
    "
											>
												<div className="flex items-center gap-4">
													{/* Icon */}
													<div
														className={`
          aspect-square w-10 rounded-full
          bg-gradient-to-r ${achievement.color}
          flex items-center justify-center
          transition-all duration-300
        `}
													>
														<FontAwesomeIcon
															icon={achievement.icon}
															className="text-white h-5 w-5"
														/>
													</div>

													{/* Content */}
													<div>
														<h3 className="font-medium text-black dark:text-white">
															{achievement.title}
														</h3>

														<p className="text-sm text-gray-700 dark:text-gray-300">
															{achievement.subtitle}
														</p>

														<div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
															{achievement.date}
														</div>
													</div>
												</div>
											</div>
										</motion.div>

									))}
								</AnimatePresence>
							</div>

							{/* Transparent bottom overlay when not expanded */}
							{!isExpanded && hasMoreAchievements && (
								<div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-stale-300 via-stale/70 to-transparent pointer-events-none"></div>
							)}

							{/* Expand/Collapse Button */}
							{hasMoreAchievements && (
								<motion.div
									className="flex justify-center mt-6"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.5 }}>
									<button
										onClick={() => setIsExpanded(!isExpanded)}
										className="flex items-center gap-2 px-6 py-3 bg-white/30 backdrop-blur-md border border-white/40 rounded-full hover:bg-white/40 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl">
										<span>
											{isExpanded
												? `Show Less`
												: `Show ${allAchievements.length - 4} More`}
										</span>
										<FontAwesomeIcon
											icon={isExpanded ? faChevronUp : faChevronDown}
											className="h-3 w-3 transition-transform duration-300"
										/>
									</button>
								</motion.div>
							)}
						</div>
					</motion.div>
				</div>
			</section>
		</Wrapper>
	);
}
