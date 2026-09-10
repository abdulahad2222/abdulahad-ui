"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
	faGithub,
	faLinkedin,
	faInstagram,
	faDiscord,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
	return (
		<div className="w-full px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center justify-center overflow-hidden bg-black text-white">
			{/* Callout Card Container */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
				className="relative w-full max-w-4xl mx-auto rounded-3xl p-8 sm:p-12 md:p-16 bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col items-center justify-center text-center overflow-hidden group">
				{/* Background Glows */}
				<div className="absolute -top-24 -left-24 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/25 transition-all duration-700" />
				<div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-500/25 transition-all duration-700" />

				{/* Eyebrow badge */}
				<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs sm:text-sm font-semibold mb-4 backdrop-blur-md">
					<span>✨ Let&apos;s Build Together</span>
				</div>

				<h2 className="text-sm sm:text-base md:text-lg font-medium text-gray-300 mb-2">
					Have a project or opportunity in mind?
				</h2>

				{/* Primary Get In Touch Link Button */}
				<Link
					href="/#contact"
					prefetch={true}
					className="group/btn my-4 inline-flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 p-2 rounded-2xl transition-all duration-300">
					<span className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent group-hover/btn:brightness-125 transition-all">
						Get In Touch
					</span>
					<div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 flex items-center justify-center text-white text-lg sm:text-xl shadow-lg shadow-cyan-500/30 group-hover/btn:scale-110 group-hover/btn:rotate-[-45deg] transition-all duration-300">
						<FontAwesomeIcon icon={faArrowRight} />
					</div>
				</Link>

				<p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto mt-2 leading-relaxed">
					Open for freelance inquiries, engineering roles, and innovative web & AI product collaborations.
				</p>

				{/* Social Shortcuts Bar */}
				<div className="flex items-center justify-center gap-3 mt-6 pt-6 border-t border-white/10 w-full max-w-xs sm:max-w-sm">
					<a
						href="mailto:abdulahadfarooqui73@gmail.com"
						aria-label="Email"
						className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-all">
						<FontAwesomeIcon icon={faEnvelope} className="text-sm" />
					</a>
					<a
						href="https://github.com/abdulahad66"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="GitHub"
						className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-all">
						<FontAwesomeIcon icon={faGithub} className="text-sm" />
					</a>
					<a
						href="https://www.linkedin.com/in/abdulahad-dev/"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="LinkedIn"
						className="w-9 h-9 rounded-full bg-white/5 hover:bg-blue-600 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-all">
						<FontAwesomeIcon icon={faLinkedin} className="text-sm" />
					</a>
					<a
						href="https://instagram.com"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Instagram"
						className="w-9 h-9 rounded-full bg-white/5 hover:bg-pink-600 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-all">
						<FontAwesomeIcon icon={faInstagram} className="text-sm" />
					</a>
					<a
						href="https://discord.com"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Discord"
						className="w-9 h-9 rounded-full bg-white/5 hover:bg-indigo-600 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-all">
						<FontAwesomeIcon icon={faDiscord} className="text-sm" />
					</a>
				</div>
			</motion.div>

			{/* Bottom Copyright Strip */}
			<footer className="w-full max-w-4xl mx-auto mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs text-gray-400">
				<p>
					&copy; {new Date().getFullYear()}{" "}
					<span className="font-semibold text-white">Abdul Ahad</span> • Front-End Developer
				</p>
				<p>
					Crafted with <span className="text-pink-500">❤</span> using Next.js & Tailwind CSS
				</p>
			</footer>
		</div>
	);
}
