"use client";
import { motion } from "framer-motion";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";

export default function Footer() {
	return (
		<div className="flex justify-center items-center flex-col mt-5 overflow-hidden">
				<div className="flex justify-center items-center flex-col mt-5 self-center min-h-[50vh]   border-1 border-gray-300 dark:border-gray-700 p-5
				 min-w-[80vw] rounded-lg shadow-lg ">
				<Link href="/#contact">
					<motion.h2
						className="text-xl font-semibold mt-3 text-center text-gray-500 dark:text-gray-400 hover:underline whitespace-nowrap leading-none md:tracking-[0.5rem]"
						initial={{
							opacity: 0,
							x: -100,
						}}
						whileInView={{
							opacity: 1,
							x: 0,
						}}
						transition={{
							delay: 0.2,
						}}>
						Want something like this?
					</motion.h2>
					<motion.h1
						className="text-5xl md:text-7xl font-bold mt-3 bg-gradient-to-r from-teal-500 via-cyan-500 to-violet-500 dark:from-teal-400 dark:via-cyan-400 dark:to-violet-400 bg-clip-text text-transparent hover:underline whitespace-nowrap leading-none"
						initial={{
							opacity: 0,
							x: 100,
						}}
						whileInView={{
							opacity: 1,
							x: 0,
						}}
						transition={{
							delay: 0.5,
						}}>
						Get In Touch{" "}
						<FontAwesomeIcon
							icon={faArrowAltCircleRight}
							className="text-5xl ml-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent"
						/>
					</motion.h1>
				</Link>
			</div>
			<footer className="flex justify-center items-center flex-col my-8 self-start w-full">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="text-center">
					<p className="text-gray-700 dark:text-gray-300 text-sm font-medium">
						&copy;{new Date().getFullYear()} -{" "}
						<span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent font-bold">
							Shahid Ansari
						</span>
					</p>
					<p className="text-gray-600 dark:text-gray-400 text-xs mt-2">
						Crafted with <span className="text-red-500">❤</span> using Next.js & React
					</p>
				</motion.div>
			</footer>
		</div>
	);
}
