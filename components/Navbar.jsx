"use client";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHome,
	faUser,
	faFolderOpen,
	faEnvelope,
	faTimes,
	faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import {
	faGithub,
	faLinkedin,
	faInstagram,
	faDiscord,
} from "@fortawesome/free-brands-svg-icons";

const navLinks = [
	{
		id: "home",
		href: "/#home",
		num: "01",
		title: "Home",
		subtitle: "Main landing & hero introduction",
		icon: faHome,
		color: "from-cyan-500 to-blue-500",
		glow: "hover:border-cyan-500/50 hover:shadow-cyan-500/20",
	},
	{
		id: "about",
		href: "/about",
		num: "02",
		title: "About",
		subtitle: "Biography, skills & career journey",
		icon: faUser,
		color: "from-purple-500 to-pink-500",
		glow: "hover:border-purple-500/50 hover:shadow-purple-500/20",
	},
	{
		id: "projects",
		href: "/projects",
		num: "03",
		title: "Projects",
		subtitle: "Production apps, UI & AI solutions",
		icon: faFolderOpen,
		color: "from-blue-500 to-cyan-400",
		glow: "hover:border-blue-500/50 hover:shadow-blue-500/20",
	},
	{
		id: "contact",
		href: "/#contact",
		num: "04",
		title: "Contact",
		subtitle: "Inquiries, collaborations & socials",
		icon: faEnvelope,
		color: "from-pink-500 to-rose-400",
		glow: "hover:border-pink-500/50 hover:shadow-pink-500/20",
	},
];

const NavItems = ({ isNavOpen, setIsNavOpen }) => {
	const handleItemClick = () => {
		setIsNavOpen(false);
	};

	return (
		<AnimatePresence>
			{isNavOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
					className="fixed inset-0 z-[60] w-full h-screen bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 lg:p-16 overflow-y-auto">
					{/* Ambient Lights */}
					<div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
					<div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

					{/* Top Header Bar */}
					<div className="relative z-10 flex items-center justify-between w-full max-w-5xl mx-auto pb-4 border-b border-white/10">
						<span className="text-xs sm:text-sm font-semibold tracking-widest text-gray-400 uppercase">
							Navigation Menu
						</span>
						<button
							onClick={handleItemClick}
							aria-label="Close Menu"
							className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white hover:rotate-90 transition-all duration-300">
							<FontAwesomeIcon icon={faTimes} className="text-lg" />
						</button>
					</div>

					{/* Main Nav Cards Grid */}
					<div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-5xl mx-auto my-auto py-6">
						{navLinks.map((item, index) => (
							<motion.div
								key={item.id}
								initial={{ opacity: 0, y: 25 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.08, duration: 0.4 }}>
								<Link
									href={item.href}
									prefetch={true}
									onClick={handleItemClick}
									className={`group block p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 ${item.glow} backdrop-blur-xl shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/[0.06]`}>
									<div className="flex items-center justify-between mb-2">
										<span className="text-xs font-mono font-bold text-gray-400">
											{item.num}
										</span>
										<div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center text-white text-xs shadow-md group-hover:scale-110 transition-transform`}>
											<FontAwesomeIcon icon={item.icon} />
										</div>
									</div>

									<h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-300 transition-colors mb-1">
										{item.title}
									</h3>
									<p className="text-xs text-gray-400 leading-normal">
										{item.subtitle}
									</p>
								</Link>
							</motion.div>
						))}
					</div>

					{/* Bottom Social Strip */}
					<div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-5xl mx-auto pt-4 border-t border-white/10 text-xs text-gray-400">
						<p>© 2025 Abdul Ahad • Frontend Developer</p>
						<div className="flex items-center gap-3">
							<a
								href="https://github.com/abdulahad66"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="GitHub"
								className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/15 transition-all">
								<FontAwesomeIcon icon={faGithub} />
							</a>
							<a
								href="https://www.linkedin.com/in/abdulahad-dev/"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="LinkedIn"
								className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-blue-600 transition-all">
								<FontAwesomeIcon icon={faLinkedin} />
							</a>
							<a
								href="https://instagram.com"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Instagram"
								className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-pink-600 transition-all">
								<FontAwesomeIcon icon={faInstagram} />
							</a>
							<a
								href="https://discord.com"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Discord"
								className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-indigo-600 transition-all">
								<FontAwesomeIcon icon={faDiscord} />
							</a>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

const Navbar = () => {
	const navRef = useRef(null);
	const [isNavOpen, setIsNavOpen] = useState(false);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const toggleNav = () => {
		setIsNavOpen(!isNavOpen);
	};

	if (!isMounted) {
		return null;
	}

	return (
		<>
			<nav
				ref={navRef}
				className={`navbar px-5 md:px-20 w-full max-w-full fixed transition-all ease duration-500 ${
					isNavOpen
						? "backdrop-filter backdrop-blur-xl bg-gradient-to-r from-blue-950/90 to-purple-950/90 shadow-2xl"
						: "backdrop-filter backdrop-blur-md bg-gray-950/85 border-b border-gray-800/80 shadow-lg"
				} inset-x-0 top-0 flex flex-row justify-between items-center h-16 z-50`}>
				<div>
					<Link href="/#home" prefetch={true}>
						<h1 className="text-xl sm:text-2xl font-extrabold transition-colors ease duration-500 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent cursor-pointer">
							Abdul Ahad
						</h1>
					</Link>
				</div>
				<div className="flex flex-row items-center gap-4">
					<button
						aria-label="Toggle Navigation Menu"
						className="burger button flex flex-col justify-center items-center space-y-1.5 p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
						onClick={toggleNav}>
						<div
							className={`w-6 h-0.5 rounded-full transition-all ease duration-300 ${
								isNavOpen
									? "rotate-45 bg-white translate-y-[4px]"
									: "bg-gradient-to-r from-cyan-400 to-blue-500"
							}`}
						/>
						<div
							className={`w-6 h-0.5 rounded-full transition-all ease duration-300 ${
								isNavOpen
									? "-rotate-45 -translate-y-1 bg-white"
									: "bg-gradient-to-r from-purple-500 to-pink-500"
							}`}
						/>
					</button>
				</div>
			</nav>

			{/* Fullscreen Creative Menu Overlay */}
			<NavItems isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
		</>
	);
};

export default Navbar;
