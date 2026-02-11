"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const NavItems = ({ isNavOpen, setIsNavOpen }) => {
	const [isMobile, setIsMobile] = useState(false);

	const handleItemClick = () => {
		setIsNavOpen(false);
	};
	const navVariant = {
		open: {
			clipPath: `circle(1920px at calc(100% - 40px) 40px)`,
			transition: {
				type: "spring",
				stiffness: 400,
				damping: 40,
			},
		},
		closed: {
			clipPath: "circle(0px at calc(100% - 120px) 35px)",
			transition: {
				delay: 0.5,
				type: "spring",
				stiffness: 400,
				damping: 30,
			},
		},
	};
	useEffect(() => {
		const updateScreenWidth = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		// Initial check and event listener
		updateScreenWidth();
		window.addEventListener("resize", updateScreenWidth);

		// Clean up the event listener on unmount
		return () => {
			window.removeEventListener("resize", updateScreenWidth);
		};
	}, []);

	// Check screen width and adjust clipPath for smaller screens
	if (isMobile) {
		(navVariant.open = {
			clipPath: `circle(1920px at calc(100% - 40px) 40px)`,
			transition: {
				type: "tween",
			},
		}),
			(navVariant.closed = {
				clipPath: "circle(0px at calc(100% - 35px) 35px)",
				transition: {
					delay: 0.5,
					type: "spring",
					stiffness: 400,
					damping: 40,
				},
			});
	} else {
		(navVariant.open = {
			clipPath: `circle(2444px at calc(100% - 40px) 40px)`,
			transition: {
				type: "spring",
				stiffness: 400,
				damping: 40,
			},
		}),
			(navVariant.closed = {
				clipPath: "circle(0px at calc(100% - 120px) 35px)",
				transition: {
					delay: 0.5,
					type: "spring",
					stiffness: 400,
					damping: 40,
				},
			});
	}
	const itemVariants = {
		open: (custom) => ({
			opacity: 1,
			x: 0,
			rotate: 0,
			transition: {
				delay: custom,
				type: "spring",
				stiffness: 400,
				damping: 40,
			},
		}),
		closed: {
			opacity: 0,
			x: -80,
			rotate: 0,
			transition: {
				type: "spring",
				stiffness: 400,
				damping: 40,
			},
		},
	};

	return (
		<>
			<motion.div
				className={`fixed z-[45] w-full h-screen flex items-center justify-center backdrop-blur-sm transition-all ease duration-700 overflow-hidden`}
				variants={navVariant}
				animate={isNavOpen ? "open" : "closed"}
				initial={false}>
				<div className="relative backdrop-blur-sm opacity-95 flex flex-col items-center space-x-8 min-h-[100vh] bg-gray-700 min-w-[100vw] ">
					<div className="flex flex-col items-center space-y-8 my-auto mx-0 z-50">
						{/* title */}
						<motion.h1
							variants={itemVariants}
							animate={isNavOpen ? "open" : "closed"}
							className="text-6xl font-bold text-white ">
							Menu
						</motion.h1>
						<Link href="/#home">
							<div
								className="text-2xl font-bold text-white"
								onClick={handleItemClick}>
								<motion.h2
									className="text-white"
									variants={itemVariants}
									animate={isNavOpen ? "open" : "closed"}
									custom={0.1}>
									Home
								</motion.h2>
							</div>
						</Link>
						<Link href="/about">
							<div
								onClick={handleItemClick}
								className="text-2xl font-bold text-white">
								<motion.h2
									className="text-white"
									variants={itemVariants}
									animate={isNavOpen ? "open" : "closed"}
									custom={0.2}>
									About
								</motion.h2>
							</div>
						</Link>
						<Link href="/projects">
							<div
								onClick={handleItemClick}
								className="text-2xl font-bold text-white">
								<motion.h2
									className="text-white"
									variants={itemVariants}
									animate={isNavOpen ? "open" : "closed"}
									custom={0.3}>
									Projects
								</motion.h2>
							</div>
						</Link>
						<Link href="/#contact">
							<div
								onClick={handleItemClick}
								className="text-2xl font-bold text-white">
								<motion.h2
									className="text-white"
									variants={itemVariants}
									animate={isNavOpen ? "open" : "closed"}
									custom={0.4}>
									Contact
								</motion.h2>
							</div>
						</Link>
					</div>
				</div>
			</motion.div>
		</>
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
				className={`navbar px-5 md:px-24 w-screen fixed transition-all ease duration-500 ${
					isNavOpen
						? "backdrop-filter backdrop-blur-xl bg-gradient-to-r from-blue-600/80 to-purple-600/80 dark:from-blue-900/90 dark:to-purple-900/90 bg-opacity-50 dark:bg-opacity-80 shadow-lg"
						: "backdrop-filter backdrop-blur-md bg-gradient-to-r from-white/80 to-gray-100/80 dark:from-gray-950/80 dark:to-gray-900/80 bg-opacity-80 dark:bg-opacity-60 border-b border-blue-200 dark:border-blue-900/30"
				} inset-0 flex flex-row justify-between items-center h-16 z-50 `}>
				<div>
					<h1
						className={`text-2xl ml-2 md:ml-0 font-bold transition-colors ease duration-500 bg-gradient-to-r ${
							isNavOpen
								? "from-white to-blue-100 bg-clip-text text-transparent"
								: "from-blue-600 to-purple-600 dark:text-white bg-clip-text text-transparent"
						}`}>
						 Abdul Ahad 
					</h1>
				</div>
				<div className="flex flex-row items-center gap-4">
					{/* <ThemeToggle /> */}
					<button
						className="burger button flex flex-col justify-center items-center space-y-1.5 "
						onClick={toggleNav}>
						<div
							className={`w-10 h-1 rounded-full transition-all ease duration-300 ${
								isNavOpen
									? "rotate-45 bg-white translate-y-[2px]"
									: "bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
							}`}></div>
						<div
							className={`w-10 h-1 rounded-full transition-all ease duration-300 ${
								isNavOpen
									? "-rotate-45 -translate-y-2 bg-white"
									: "bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400"
							}`}></div>
					</button>
				</div>
			</nav>
			{/* items */}
			<NavItems isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
		</>
	);
};
export default Navbar;
