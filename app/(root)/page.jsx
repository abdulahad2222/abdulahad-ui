// Copyright (C) 2025 Alvalen Bilyunazra
// This file is part of abdul ahad-porto-2-nextJs.
// Licensed under the GNU GPL v3.0. See LICENSE for details.

"use client";
import ReactFullpage from "@fullpage/react-fullpage";
import Image from "next/legacy/image";
// import "../globals.css";
import { motion } from "framer-motion";
import Link from "next/link";

// components
import Button from "@/components/Button";
import Me from "@/public/image/me.jpg";
import MeAbout from "@/public/image/me2.jpg";
import Setup from "@/public/image/setup.jpg";
import ProjectAll from "@/public/image/projects.png";
import Hr from "@/components/Hr";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const MyPage = () => {
	const fullpageOptions = {
		anchors: ["home", "about", "projects", "contact"],
		scrollingSpeed: 1000,
		licenseKey: "gplv3-license",
		menu: "#sidebar",
		lockAnchors: false,
	};

	return (
		<div>
			<ReactFullpage
				render={({ state, fullpageApi }) => (
					<ReactFullpage.Wrapper>
						<div className="section bg-gradient-to-b from-gray-50 to-white dark:bg-black dark:bg-gradient-to-b dark:from-black dark:to-gray-900">
							<div className="mx-auto container grid grid-cols-1 md:grid-cols-3 gap-4 p-10 overflow-hidden md:px-20 relative z-10">
								<motion.div
									className="col-span-2 flex flex-col justify-center items-center md:items-start text-center md:text-start"
									initial={{ x: -100, opacity: 0 }}
									whileInView={{ x: 0, opacity: 1 }}
									transition={{
										type: "spring",
									}}>
									<div className="block md:hidden col-span-1 mx-auto my-10">
										<div className="bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 rounded-full h-60 w-60 grayscale hover:grayscale-0 transition-all ease duration-300 shadow-lg dark:shadow-xl">
											<Image
												src={Me}
												width={500}
												height={500}
												className="rounded-full w-full h-full object-cover "
												alt="abdul ahad"
												placeholder="blur"
											/>
										</div>
									</div>
									<motion.h3
										className="uppercase text-xl mb-3 font-normal text tracking-[.5rem] text-gray-500 dark:text-gray-400"
										initial={{ x: -100, opacity: 0 }}
										whileInView={{ x: 0, opacity: 1 }}
										transition={{
											delay: 0.2,
											type: "spring",
										}}>
										Abdul Ahad
									</motion.h3>
									<motion.h1
										className="text-black dark:text-white text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl font-bold my-2 md:my-5"
										initial={{ x: -100, opacity: 0 }}
										whileInView={{ x: 0, opacity: 1 }}
										transition={{
											delay: 0.3,
											type: "spring",
										}}>
										Front-end Developer
									</motion.h1>
									<motion.p
										className="title text-md  2xl:text-xl mt-4 tracking-wider text-gray-600 dark:text-gray-300 leading-[1.7rem]"
										initial={{ x: -100, opacity: 0 }}
										whileInView={{ x: 0, opacity: 1 }}
										transition={{
											delay: 0.4,
											type: "spring",
										}}>
									Hello! I&rsquo;m Abdul Ahad, a passionate junior front-end developer with expertise in modern web technologies like React, 
									Next.js, and Tailwind CSS. I specialize in creating responsive, user-centric applications and love exploring the intersection of 
									web development and artificial intelligence. Currently, I&rsquo;m diving deep into machine learning and generative models to build 
									intelligent applications that make a real impact.
									</motion.p>
									<motion.div
										className="buttons flex  sm:flex-row justify-center md:justify-start items-center gap-4 mt-12 w-full"
										initial={{ x: -100, opacity: 0 }}
										whileInView={{ x: 0, opacity: 1 }}
										transition={{
											delay: 0.5,
											type: "spring",
										}}>
										<Button variation="primary" theme="blue">
											<Link
												href={"/docs/cv.pdf"}
												target="_blank"
												rel="noopener noreferrer"
												download>
												Download CV
											</Link>
										</Button>
										<Button variation="secondary" theme="blue">
											<a href="#contact">Contact Me</a>
										</Button>
									</motion.div>
								</motion.div>
								<motion.div
									className="hidden md:flex col-span-1 mx-auto justify-center items-center "
									initial={{ x: 100, opacity: 0 }}
									whileInView={{ x: 0, opacity: 1 }}
									transition={{
										delay: 0.7,
										type: "spring",
									}}>
									<div className="rounded-full h-auto w-auto  lg:px-12 grayscale hover:grayscale-0 transition-all ease duration-300">
										<Image
											src={Me}
											width={400}
											height={550}
											placeholder="blur"
											alt="abdul ahad"
											className="rounded-full w-full h-full object-cover"
										/>
									</div>
								</motion.div>
							</div>
						</div>
						<div className="section bg-gradient-to-b from-white to-gray-50 dark:bg-black dark:bg-gradient-to-b dark:from-black dark:to-gray-900">
							<div className="relative md:h-screen w-screen gap-4 flex justify-center items-center flex-col overflow-hidden dark:bg-black dark:bg-gradient-to-b dark:from-black dark:to-gray-900">
								<div className="z-0 mb-48 md:mb-0  md:absolute top-1/4  md:right-[10%] md:-translate-y-16 ">
									<motion.div
										className="bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800 rounded-sm h-[400px] md:h-[600px] w-[80vw] md:w-[30vw] grayscale hover:grayscale-0 shadow-2xl dark:shadow-2xl"
										initial={{
											x: 300,
											opacity: 0,
											z: -100,
										}}
										whileInView={{
											x: 0,
											opacity: 1,
											z: 0,
										}}
										transition={{
											delay: 0.5,
											type: "spring",
											stiffness: 100,
											damping: 20,
										}}>
										<Image
											src={MeAbout}
											layout="fill"
											className="object-cover"
											alt="abdul ahad"
											placeholder="blur"
										/>
									</motion.div>
								</div>
								<div className="z-10 w-full absolute md:w-auto  md:left-[10%] top-[60%] md:top-1/3 col-span-2 flex flex-col justify-center items-start md:items-start text-start px-10 py-5">
									<motion.h1
										className="bg-white/50 dark:bg-gray-900/40 lg:bg-transparent dark:lg:bg-transparent px-3 md:px-0 text-black dark:text-white text-5xl md:text-8xl font-bold"
										initial={{ x: -100, opacity: 0 }}
										whileInView={{ x: 0, opacity: 1 }}
										transition={{
											delay: 0.1,
											type: "spring",
										}}>
										About Me
									</motion.h1>
									<Hr theme="purple" />
									<div className="max-w-2xl">
									<motion.p
										className="title  text-xl mt-4 tracking-wider text-gray-700 dark:text-gray-300 leading-[1.7rem] mb-5 word-wrap"
										initial={{ x: -100, opacity: 0 }}
										whileInView={{ x: 0, opacity: 1 }}
										transition={{
											delay: 0.2,
											type: "spring",
										}}>
										Discover my journey, skills, and passion for creating beautiful and functional web experiences. From my background to my technical expertise and career aspirations.
									</motion.p>
									</div>

									<motion.div
										initial={{ y: 40, opacity: 0 }}
										whileInView={{ y: 0, opacity: 1 }}
										transition={{
											delay: 0.3,
											type: "spring",
										}}>
										<Button variation="primary" theme="purple">
											<Link href="/about">Learn More</Link>
										</Button>
									</motion.div>
								</div>
							</div>
						</div>
						<div className="section bg-gradient-to-b from-gray-50 to-white dark:bg-black dark:bg-gradient-to-b dark:from-black dark:to-gray-900">
							<div className="relative md:h-screen w-screen gap-4 p-10 flex justify-center items-center flex-col overflow-hidden">
								<div className="z-0 mb-48 md:mb-0  md:absolute top-1/4  md:right-[10%] md:-translate-y-16 ">
									<motion.div
										className="bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800 rounded-sm h-[400px] md:h-[600px] w-[80vw] md:w-[30vw] grayscale hover:grayscale-0 shadow-2xl dark:shadow-2xl"
										initial={{
											x: 300,
											opacity: 0,
											z: -100,
										}}
										whileInView={{
											x: 0,
											opacity: 1,
											z: 0,
										}}
										transition={{
											delay: 0.5,
											type: "spring",
											stiffness: 100,
											damping: 20,
										}}>
										<Image
											src={ProjectAll}
											layout="fill"
											className="object-cover"
											alt="abdul ahad Setup"
											placeholder="blur"
										/>
									</motion.div>
								</div>
								<div className="z-10 w-full absolute md:w-auto  md:left-[10%] top-[60%] md:top-1/3 col-span-2 flex flex-col justify-center items-start md:items-start text-start px-10 py-5">
									<motion.h1
										className="bg-white/50 dark:bg-gray-900/40 lg:bg-transparent dark:lg:bg-transparent px-3 md:px-0 text-black dark:text-white text-5xl md:text-8xl font-bold"
										initial={{ x: -100, opacity: 0 }}
										whileInView={{ x: 0, opacity: 1 }}
										transition={{
											delay: 0.1,
											type: "spring",
										}}>
										My Projects
									</motion.h1>
									<Hr theme="cyan" />
										<div className="max-w-2xl">
									<motion.p
										className="title  text-xl mt-4 tracking-wider text-gray-700 dark:text-gray-300 leading-[1.7rem] mb-5"
										initial={{ x: -100, opacity: 0 }}
										whileInView={{ x: 0, opacity: 1 }}
										transition={{
											delay: 0.2,
											type: "spring",
										}}>
										Explore a curated selection of my web development and AI projects. Each project showcases my commitment to building scalable, innovative solutions using cutting-edge technologies and best practices.
									</motion.p>
									</div>
									<motion.div
										initial={{ y: 40, opacity: 0 }}
										whileInView={{ y: 0, opacity: 1 }}
										transition={{
											delay: 0.3,
											type: "spring",
										}}>
										<Button variation="primary" theme="cyan">
											<Link href="/projects">Learn More</Link>
										</Button>
									</motion.div>
								</div>
							</div>
						</div>
						<div className="section bg-gradient-to-b from-white to-gray-50 dark:bg-black dark:bg-gradient-to-b dark:from-black dark:to-gray-900">
							<div className="relative md:h-screen w-screen  gap-4 p-10 flex justify-center items-center flex-col overflow-hidden">
								<div className="z-0 mb-48 md:mb-0  md:absolute top-1/4  md:right-[10%] md:-translate-y-16 ">
									<motion.div
										className="bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800 rounded-sm h-[400px] md:h-[600px] w-[80vw] md:w-[30vw] grayscale hover:grayscale-0 shadow-2xl dark:shadow-2xl"
										initial={{
											x: 300,
											opacity: 0,
											z: -100,
										}}
										whileInView={{
											x: 0,
											opacity: 1,
											z: 0,
										}}
										transition={{
											delay: 0.5,
											type: "spring",
											stiffness: 100,
											damping: 20,
										}}>
										<Image
											src={Setup}
											layout="fill"
											className="object-cover"
											alt="abdul ahad Setup"
											placeholder="blur"
										/>
									</motion.div>
								</div>
								<div className="z-10 w-full absolute md:w-auto  md:left-[10%] top-[60%] md:top-1/3 col-span-2 flex flex-col justify-center items-start md:items-start text-start px-10 overflow-hidden">
									<motion.h1
										className="bg-white/50 dark:bg-gray-900/40 lg:bg-transparent dark:lg:bg-transparent px-3 md:px-0 text-black dark:text-white text-5xl md:text-8xl font-bold mb-3"
										initial={{ x: -100, opacity: 0 }}
										whileInView={{ x: 0, opacity: 1 }}
										transition={{
											delay: 0.1,
											type: "spring",
										}}>
										Get In Touch
									</motion.h1>
									<Hr theme="pink" />
									<div className="max-w-2xl">
									<motion.p
										className="title text-xl mt-4 tracking-wider text-gray-700 dark:text-gray-300 leading-[1.7rem] md:mb-5"
										initial={{ x: -100, opacity: 0 }}
										whileInView={{ x: 0, opacity: 1 }}
										transition={{
											delay: 0.2,
											type: "spring",
										}}>
										I&rsquo;d love to hear from you! Whether you have a project in mind, want to collaborate, or just want to chat about web development and AI, feel free to reach out. I&rsquo;m always open to exciting opportunities and interesting conversations.
									</motion.p>
									</div>
									<motion.p
										className="title text-xl mt-4 tracking-wider text-gray-700 dark:text-gray-300 leading-[1.7rem] mb-5 font-semibold"
										initial={{ x: -100, opacity: 0 }}
										whileInView={{ x: 0, opacity: 1 }}
										transition={{
											delay: 0.3,
											type: "spring",
										}}>
										📧{" "}
										<a href="mailto:abdulahadfarooqui73@gmail.com?subject=Hello&body=Hello abdul ahad," className="text-blue-600 dark:text-blue-400 hover:underline">
											abdulahadfarooqui73@gmail.com
										</a>
									</motion.p>
									{/* icons */}
									<div className="flex justify-center items-center space-x-4">
										<motion.a
											href="mailto:abdulahadfarooqui73@gmail.com?subject=Hello&body=Hello abdul ahad,"
											className="flex justify-center items-center bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 w-14 h-14 rounded-full text-white hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 shadow-lg hover:shadow-xl transition-all ease-in-out duration-300 transform hover:scale-110"
											transition={{
												y: { delay: 0.1 },
												opacity: { delay: 0.2 },
											}}
											initial={{ opacity: 0, y: 40 }}
											whileInView={{ opacity: 1, y: 0 }}>
											<FontAwesomeIcon icon={faEnvelope} className="text-3xl" />
										</motion.a>

										<motion.a
											href="https://github.com/abdulahad66"
											target="_blank"
											rel="noopener noreferrer"
										className="flex justify-center items-center bg-gray-800 dark:bg-gray-700 w-14 h-14 rounded-full text-white hover:bg-gray-900 dark:hover:bg-gray-600 shadow-lg hover:shadow-xl transition-all ease-in-out duration-300 transform hover:scale-110"
											initial={{ opacity: 0, y: 40 }}
											whileInView={{ opacity: 1, y: 0 }}
											transition={{
												y: { delay: 0.2 },
												opacity: { delay: 0.3 },
											}}>
											<FontAwesomeIcon icon={faGithub} className="text-3xl" />
										</motion.a>
										<motion.a
											href="#"
											target="_blank"
											rel="noopener noreferrer"
										className="flex justify-center items-center bg-gradient-to-r from-pink-500 to-rose-500 dark:from-pink-600 dark:to-rose-600 w-14 h-14 rounded-full text-white hover:from-pink-600 hover:to-rose-600 dark:hover:from-pink-700 dark:hover:to-rose-700 shadow-lg hover:shadow-xl transition-all ease-in-out duration-300 transform hover:scale-110"
											initial={{ opacity: 0, y: 40 }}
											whileInView={{ opacity: 1, y: 0 }}
											transition={{
												y: { delay: 0.3 },
												opacity: { delay: 0.4 },
											}}>
											<FontAwesomeIcon
												icon={faInstagram}
												className="text-3xl"
											/>
										</motion.a>
										<motion.a
											href="https://www.linkedin.com/in/abdulahad-dev/"
											target="_blank"
											rel="noopener noreferrer"
										className="flex justify-center items-center bg-blue-700 dark:bg-blue-800 w-14 h-14 rounded-full text-white hover:bg-blue-800 dark:hover:bg-blue-900 shadow-lg hover:shadow-xl transition-all ease-in-out duration-300 transform hover:scale-110"
											initial={{ opacity: 0, y: 40 }}
											whileInView={{ opacity: 1, y: 0 }}
											transition={{
												y: { delay: 0.4 },
												opacity: { delay: 0.5 },
											}}>
											<FontAwesomeIcon icon={faLinkedin} className="text-3xl" />
										</motion.a>
										<motion.a
											href="#"
											target="_blank"
											rel="noopener noreferrer"
										className="flex justify-center items-center bg-indigo-700 dark:bg-indigo-800 w-14 h-14 rounded-full text-white hover:bg-indigo-800 dark:hover:bg-indigo-900 shadow-lg hover:shadow-xl transition-all ease-in-out duration-300 transform hover:scale-110"
											initial={{ opacity: 0, y: 40 }}
											whileInView={{ opacity: 1, y: 0 }}
											transition={{
												y: { delay: 0.5 },
												opacity: { delay: 0.6 },
											}}>
											<FontAwesomeIcon icon={faDiscord} className="text-3xl" />
										</motion.a>
									</div>
								</div>
							</div>
						</div>
					</ReactFullpage.Wrapper>
				)}
				{...fullpageOptions}
			/>
		</div>
	);
};

export default MyPage;
