"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const category = {
	"1": "Web Development",
	"2": "AI & Machine Learning",
	"9": "Other",
};

export default function Page() {
	const [activeCategory, setActiveCategory] = useState(1);
	const projects = Projects.Projects.filter((item) => item.show === true);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<>
			<main className="overflow-hidden">
				<FixedButton href="/#projects">
					<FontAwesomeIcon icon={faChevronLeft} className="text-black dark:text-white pr-10" />
				</FixedButton>
				<div className="relative h-screen w-screen  gap-4 p-10 flex justify-center items-center flex-col mb-10 overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-950">
					<div className="z-0 mb-48 md:mb-0  md:absolute top-1/4  md:right-[10%] md:-translate-y-16 ">
						<motion.div
							initial={{ scale: 1 }}
							animate={{ scale: 1.6 }}
							transition={{ duration: 1, ease: "circOut" }}
							className="bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800 rounded-sm h-[400px] md:h-[600px] w-[80vw] md:w-[30vw] grayscale hover:grayscale-0 shadow-2xl dark:shadow-2xl">
							<Image
								src={ProjectAll}
								alt="Abdul Ahad"
								layout="fill"
								objectFit="cover"
								placeholder="blur"
							/>
						</motion.div>
					</div>
					<div className="z-10 w-full absolute md:w-auto md:left-[10%] top-[60%] md:top-1/3 col-span-2 flex flex-col justify-center items-start md:items-start text-start px-10 pt-4 backdrop-filter backdrop-blur-sm md:backdrop-blur-none md:backdrop-filter-none bg-white/50 dark:bg-gray-900/40 md:bg-transparent md:pt-0 rounded-lg md:rounded-none">
						<h1 className="md:bg-white dark:md:bg-transparent bg-transparent lg:bg-transparent dark:lg:bg-transparent bg-opacity-50 dark:bg-opacity-50 md:px-0 text-black dark:text-white text-5xl md:text-8xl font-bold">
							My Projects
						</h1>
						<Hr theme="cyan" />
						<p className="title  text-xl mt-4 tracking-wider text-gray-900 dark:text-gray-300 leading-[1.7rem] mb-5">
							List of my projects that I have done and{" "}
							<span className="bg-transparent md:bg-gray-100 dark:md:bg-gray-900/40 bg-opacity-50 dark:bg-opacity-50 xl:bg-transparent">
								{" "}
								currently working on.
							</span>
						</p>
						<motion.div
							initial={{ opacity: 0, y: 100 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, ease: "circOut" }}
							onClick={() => {
								window.scrollTo({
									top: 1000,
									behavior: "smooth",
								});
							}}
							className="mb-3">
							<Button variation="primary" theme="blue">Scroll Down</Button>
						</motion.div>
					</div>
				</div>
				<div className="mt-10 flex flex-col justify-start items-center w-full pl-10 md:pl-32">
					<div className="flex justify-center items-center flex-col my-5 self-start ">
						<Hr variant="long" theme="cyan"></Hr>
						<h1 className="text-3xl font-bold mt-3 text-black dark:text-white">Hightlight</h1>
					</div>
				</div>
				<div className="relative w-screen mx-auto container gap-4 px-10 grid grid-cols-1 md:grid-cols-2 mb-10">
					<div className="flex justify-center items-start flex-col mb-5 ">
						<div className="images relative w-full  aspect-square">
							<div className="absolute top-28 left-10 h-[40%]  aspect-video grayscale hover:grayscale-0 transition-all ease duration-300 hover:scale-150 z-10">
								<motion.div
									initial={{ opacity: 0, scale: 0.5, x: 100 }}
									whileInView={{
										opacity: 1,
										scale: 1,
										x: 0,
									}}
									className="w-full h-full shadow-lg">
									<Image
										src={OneStoryPlanet}
										alt="OneStoryPlanet"
										layout="fill"
										objectFit="cover"
										placeholder="blur"
										className="rat"
									/>
								</motion.div>
							</div>
							<div className="absolute top-10 right-28 h-[30%]  aspect-video grayscale hover:grayscale-0 transition-all ease duration-300 hover:scale-150">
								<motion.div
									initial={{
										opacity: 0,
										scale: 0.5,
										x: -100,
									}}
									whileInView={{
										opacity: 1,
										scale: 1,
										x: 0,
									}}
									transition={{ delay: 0.3 }}
									className="w-full h-full shadow-lg ">
									<Image
										src={OneStoryPlanet3}
										alt="OneStoryPlanet"
										layout="fill"
										objectFit="cover"
										placeholder="blur"
										objectPosition="0% 0%"
									/>
								</motion.div>
							</div>
							<div className="absolute bottom-10 md:bottom-26 right-20 h-[35%]  aspect-video grayscale hover:grayscale-0 transition-all ease duration-300 hover:scale-150">
								<motion.div
									initial={{
										opacity: 0,
										scale: 0.5,
										x: -100,
									}}
									whileInView={{
										opacity: 1,
										scale: 1,
										x: 0,
									}}
									transition={{
										delay: 0.5,
									}}
									className="w-full h-full shadow-lg">
									<Image
										src={OneStoryPlanet2}
										alt="OneStoryPlanet2"
										layout="fill"
										objectFit="cover"
										placeholder="blur"
									/>
								</motion.div>
							</div>
						</div>
					</div>
					<motion.div
						className="flex justify-center items-start flex-col mb-5 md:px-10"
						initial={{
							opacity: 0,
							x: 200,
						}}
						whileInView={{
							opacity: 1,
							x: 0,
						}}
						transition={{
							delay: 0.5,
							type: "spring",
						}}>
						<h2 className="text-2xl font-bold tracking-wider mb-3">
							One Storyplanet
						</h2>
						<p className="text-gray-600 text-justify title text-lg">
							OneStoryPlanet is a story-first social platform that empowers users to share authentic life experiences through text, audio, and video. Built with a distraction-free, accessible interface, it focuses on meaningful human connection over validation, encouraging empathy, unity, and honest self-expression without algorithmic pressure. Designed using modern technologies like React and Next.js, the platform supports scalable, responsive, and user-centric storytelling.
						</p>{" "}
						<div className="mt-5 flex flex-col sm:flex-row gap-3">
							<Button variation="primary" theme="blue">
								<Link href="projects/one-storyplanet">More</Link>
							</Button>
							<Button

								className={`px-6 py-2 rounded-lg font-semibold text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:focus:ring-cyan-600
bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 text-white shadow-lg border-2 border-cyan-300 dark:border-cyan-700
								}`}
							>
								<Link href="https://onestoryplanet.com/">Preview Demo</Link>

							</Button>

						</div>
					</motion.div>
				</div>
				<div className="mt-16 flex flex-col justify-start items-center w-full pl-10 md:pl-32">
					<div className="flex justify-center items-center flex-col my-5 self-start">
						<Hr variant="long"></Hr>
						<motion.h1
							className="text-3xl font-bold mt-3 text-black dark:text-white"
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
							Other Note Worthy Projects
						</motion.h1>
					</div>
				</div>

				{/* choose category */}
				<motion.div
					initial={{
						opacity: 0,
						x: 200,
					}}
					whileInView={{
						opacity: 1,
						x: 0,
					}}
					transition={{
						type: "spring",
					}}
					className="flex flex-row justify-center items-start flex-wrap gap-3 md:gap-5 my-5 ">
					{Object.keys(category).map((key, index) => {
						let buttonClass = "px-2 md:px-4 py-2 rounded-lg cursor-pointer transition-all ease duration-300 focus:ring focus:ring-slate-500 ";
						if (index === 0) {
							// First button: gradient
							buttonClass += activeCategory == key
								? "bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 text-white shadow-lg border-2 border-cyan-300 dark:border-cyan-700 hover:from-blue-600 hover:to-violet-600"
								: "bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 text-black border-2 border-gray-300 hover:from-blue-500 hover:to-violet-500 hover:text-white";
						} else if (index === 1) {
							// Second button: outlined (no gradient)
							buttonClass += activeCategory == key
								? "border-2 border-blue-500 text-blue-700 dark:text-cyan-300 bg-white dark:bg-gray-900 hover:bg-blue-500 hover:text-white dark:hover:bg-cyan-700"
								: "border-2 border-gray-400 text-gray-700 dark:text-gray-300 bg-transparent hover:bg-gray-200 dark:hover:bg-gray-800";
						} else {
							// Third button: filled (no gradient)
							buttonClass += activeCategory == key
								? "bg-blue-500 text-white hover:bg-blue-700 dark:bg-cyan-600 dark:hover:bg-cyan-800"
								: "bg-gray-200 text-black hover:bg-gray-700 hover:text-white dark:bg-gray-700 dark:text-white dark:hover:bg-gray-300 dark:hover:text-black";
						}
						// Set Button variation by index
						let variation = "primary";
						if (index === 0) variation = "gradient";
						else if (index === 1) variation = "outline";
						else variation = "filled";
						return (
							<Button
								variation={variation}
								theme={index === 0 ? "blue" : undefined}
								key={index}
								className={buttonClass}
								onClick={() => setActiveCategory(key)}
							>
								{category[key]}
							</Button>
						);
					})}
				</motion.div>

				{/* projects */}
				<div className="w-screen mx-auto container gap-4 px-10 grid grid-cols-1 md:grid-cols-2 mb-10 cursor-pointer">
					{projects.map((project, index) => (
						<ProjectCard
							project={project}
							key={index}
							activeCategory={activeCategory}
						/>
					))}
				</div>

				{/* view in archive btn */}
				<motion.div
					initial={{
						opacity: 0,
					}}
					whileInView={{
						opacity: 1,
					}}
					className="flex justify-center items-center flex-col my-5 self-start ">
					<Button variation="primary" theme="blue">
						<Link href="projects/archive">View In Archive</Link>
					</Button>
				</motion.div>


			</main>
		</>
	);
}
