import Image from "next/image";
import Card from "./spotify/card";
import { motion } from "framer-motion";
import Me1 from "@/public/image/me1.jpg";
import Me2 from "@/public/image/me2.jpg";
import Me3 from "@/public/image/me3.jpg";
import Hr from "@/components/Hr";

function Title() {
	return (
		<div className="mt-10 flex flex-col justify-start items-center w-full pl-10 md:pl-32">
			<div className="flex justify-center items-center flex-col my-5 self-start ">
				<Hr variant="long"></Hr>
				<h1 className="text-3xl font-bold mt-3 bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 dark:from-blue-400 dark:via-cyan-500 dark:to-violet-400 bg-clip-text text-transparent">Who Am I?</h1>
			</div>
		</div>
	);
}

export default function About() {
	return (
		<>
			<Title />
			<div className="relative mx-auto container gap-4 px-10 grid grid-cols-1 md:grid-cols-2 mb-10">
				<div className="flex justify-center items-start flex-col mb-5 ">
					<div className="images relative w-full  aspect-square">
						<div className="absolute top-28 left-10 w-[50%]  aspect-square grayscale hover:grayscale-0 transition-all ease duration-300">
							<motion.div
								initial={{ opacity: 0, scale: 0.5, x: 100 }}
								whileInView={{
									opacity: 1,
									scale: 1,
									x: 0,
								}}
								className="w-full h-full">
								<Image
									src={Me1}
									alt="Shahid Ansari"
									layout="fill"
									objectFit="cover"
									placeholder="blur"
								/>
							</motion.div>
						</div>
						<div className="absolute top-16 right-28 w-[30%]  aspect-square grayscale hover:grayscale-0 transition-all ease duration-300">
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
								className="w-full h-full">
								<Image
									src={Me2}
									alt="Alvalens"
									layout="fill"
									objectFit="cover"
									placeholder="blur"
								/>
							</motion.div>
						</div>
						<div className="absolute bottom-16 right-20 w-[40%]  aspect-square grayscale hover:grayscale-0 transition-all ease duration-300">
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
								className="w-full h-full">
								<Image
									src={Me3}
									alt="Shahid Ansari"
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
						Shahid Ansari
					</h2>
					<p className="dark:text-gray-400 text-gray-600 text-justify title text-lg">
						Hey there, I’m Shahid Ansari, a
						<span className="dark:text-white text-black font-medium">
							{" "}passionate PHP Laravel developer
						</span>{" "}
						with around
						<span className="dark:text-white text-black font-medium">
							{" "}3+ years of professional experience
						</span>{" "}
						in building modern, responsive, and user-friendly web applications.
						Based in
						<span className="dark:text-white text-black font-medium">
							{" "}Lucknow, India,
						</span>{" "}
						I currently work at
						<span className="dark:text-white text-black font-medium">
							{" "}Next Olive Technologies Pvt Ltd,
						</span>{" "}
						where I focus on creating scalable UI solutions using
						<span className="dark:text-white text-black font-medium">
							{" "}React, Next.js, Tailwind CSS, Bootstrap, Material UI, Ant Design,
							ShadCN UI, and Framer Motion
						</span>{" "}
						alongside modern front-end and ecosystem tools.
						<br /><br />
						My technical expertise also includes working with
						<span className="dark:text-white text-black font-medium">
							{" "}Headless CMS platforms
						</span>{" "}
						such as
						<span className="dark:text-white text-black font-medium">
							{" "}Strapi, Sanity, and Contentful,
						</span>{" "}
						as well as state management and data-handling solutions like
						<span className="dark:text-white text-black font-medium">
							{" "}Redux Toolkit, Zustand, React Query,
						</span>{" "}
						and API integrations using
						<span className="dark:text-white text-black font-medium">
							{" "}REST APIs, Axios, and Fetch.
						</span>{" "}
						<br /><br />
						I have hands-on experience in developing dashboards, gaming and betting UIs,
						responsive websites, admin panels, and highly interactive components with a
						strong emphasis on performance, scalability, and UX. Alongside front-end
						development, I have a growing interest in
						<span className="dark:text-white text-black font-medium">
							{" "}AI-powered web experiences
						</span>{" "}
						and continuously explore emerging technologies, design systems, and web
						performance optimization techniques.
						In today’s fast-evolving digital world, I strongly believe being a
						<span className="dark:text-white text-black font-medium"> lifelong learner</span> is key to
						growth. Let’s build something impactful together!
					</p>


					<Card />
				</motion.div>
			</div>
		</>
	);
}
