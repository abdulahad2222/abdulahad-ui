"use client";
import Image from "next/image";
import Card from "./spotify/card";
import { motion } from "framer-motion";
import AhadPhoto1 from "@/public/image/ahad_1.webp";
import AhadPhoto2 from "@/public/image/ahad_2.webp";
import AhadPhoto3 from "@/public/image/ahad_3.webp";
import Hr from "@/components/Hr";

function Title() {
	return (
		<div className="mt-8 mb-4 flex flex-col justify-center items-center w-full px-4 sm:px-8 max-w-6xl mx-auto text-center">
			<div className="flex justify-center items-center flex-col my-2">
				<Hr variant="long" />
				<h2 className="text-3xl sm:text-4xl font-bold mt-2 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
					Who Am I?
				</h2>
			</div>
		</div>
	);
}

export default function About() {
	return (
		<div className="w-full relative px-4 sm:px-8 py-6">
			<Title />
			<div className="relative mx-auto container max-w-6xl gap-8 lg:gap-12 grid grid-cols-1 lg:grid-cols-12 items-center mb-8">
				{/* Left Column: Creative Photo Collage */}
				<div className="lg:col-span-5 flex justify-center items-center">
					<div className="relative w-full max-w-sm sm:max-w-md aspect-square rounded-3xl p-3 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
						<div className="grid grid-cols-2 grid-rows-2 gap-3 w-full h-full">
							{/* Large Image Top */}
							<motion.div
								className="col-span-2 row-span-1 relative rounded-2xl overflow-hidden border border-white/10 shadow-lg group"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5 }}>
								<Image
									src={AhadPhoto1}
									alt="Abdul Ahad"
									fill
									sizes="(max-width: 768px) 300px, 400px"
									className="object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
								/>
								<div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-lg bg-black/70 border border-white/10 backdrop-blur-sm text-center">
									<p className="text-[11px] font-semibold text-cyan-300">Front-End Engineer</p>
								</div>
							</motion.div>

							{/* Image Bottom Left */}
							<motion.div
								className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden border border-white/10 shadow-lg group"
								initial={{ opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: 0.1 }}>
								<Image
									src={AhadPhoto2}
									alt="Abdul Ahad"
									fill
									sizes="200px"
									className="object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
								/>
							</motion.div>

							{/* Image Bottom Right */}
							<motion.div
								className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden border border-white/10 shadow-lg group"
								initial={{ opacity: 0, x: 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: 0.2 }}>
								<Image
									src={AhadPhoto3}
									alt="Abdul Ahad"
									fill
									sizes="200px"
									className="object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
								/>
							</motion.div>
						</div>
					</div>
				</div>

				{/* Right Column: Bio Narrative & Spotify */}
				<motion.div
					className="lg:col-span-7 flex flex-col justify-center items-start text-left"
					initial={{ opacity: 0, x: 30 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}>
					<div className="flex flex-wrap items-center gap-2 mb-3">
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-semibold">
							<span>⚡ 3+ Years Experience</span>
						</div>
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-semibold">
							<span>🏛️ MCA @ ISBM University</span>
						</div>
					</div>

					<h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3 text-white">
						Abdul Ahad
					</h3>

					<p className="text-gray-300 title text-xs sm:text-sm md:text-base leading-relaxed mb-4">
						Hey there! I&rsquo;m Abdul Ahad, a{" "}
						<span className="text-white font-semibold">passionate Front-End Developer</span> based in Lucknow, India, currently pursuing my{" "}
						<span className="text-cyan-400 font-semibold">Master of Computer Applications (MCA)</span> at{" "}
						<span className="text-purple-300 font-semibold">ISBM University</span>. I work at{" "}
						<span className="text-cyan-400 font-semibold">Next Olive Technologies Pvt Ltd</span>, creating scalable UI solutions with{" "}
						<span className="text-purple-400 font-semibold">React, Next.js, Tailwind CSS, Bootstrap, Material UI, Ant Design, ShadCN UI, and Framer Motion</span>.
					</p>

					<p className="text-gray-300 title text-xs sm:text-sm md:text-base leading-relaxed mb-4">
						My expertise spans developing interactive dashboards, real-time gaming & betting platforms, responsive web portals, and CMS integrations (Strapi, Contentful). I have a growing focus on{" "}
						<span className="text-blue-400 font-semibold">AI-powered web experiences</span> and performance optimization.
					</p>

					<div className="w-full mt-2">
						<Card />
					</div>
				</motion.div>
			</div>
		</div>
	);
}
