"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHome,
	faUser,
	faFolderOpen,
	faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const navItems = [
	{ id: "home", label: "Home", icon: faHome },
	{ id: "about", label: "About", icon: faUser },
	{ id: "projects", label: "Projects", icon: faFolderOpen },
	{ id: "contact", label: "Contact", icon: faEnvelope },
];

const Sidebar = () => {
	const [activeSection, setActiveSection] = useState("home");

	useEffect(() => {
		const sections = navItems.map((item) => document.getElementById(item.id)).filter(Boolean);

		if (sections.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveSection(entry.target.id);
					}
				});
			},
			{
				root: null,
				rootMargin: "-20% 0px -40% 0px",
				threshold: 0.2,
			}
		);

		sections.forEach((section) => observer.observe(section));

		return () => {
			sections.forEach((section) => observer.unobserve(section));
		};
	}, []);

	const handleScrollTo = (id) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: "smooth", block: "start" });
			setActiveSection(id);
		}
	};

	return (
		<aside
			aria-label="Section Navigation"
			className="hidden lg:flex fixed z-40 bg-gradient-to-b from-blue-950/70 via-purple-950/70 to-slate-950/80 backdrop-blur-2xl border border-white/10 h-auto py-5 w-12 xl:w-14 flex-col justify-center items-center left-3 lg:left-4 xl:left-6 top-1/2 -translate-y-1/2 rounded-full shadow-2xl shadow-blue-500/20 transition-all duration-300">
			<ul id="sidebar" className="flex flex-col gap-5 xl:gap-6 items-center">
				{navItems.map((item) => {
					const isActive = activeSection === item.id;
					return (
						<li key={item.id} className="relative group">
							<button
								onClick={() => handleScrollTo(item.id)}
								aria-label={`Scroll to ${item.label}`}
								className={`relative flex items-center justify-center w-9 h-9 xl:w-10 xl:h-10 rounded-full transition-all duration-300 ${
									isActive
										? "bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/40 scale-110"
										: "text-gray-400 hover:text-white hover:bg-white/10 hover:scale-105"
								}`}>
								<FontAwesomeIcon icon={item.icon} className="text-sm xl:text-base" />
							</button>

							{/* Tooltip */}
							<span className="pointer-events-none absolute left-14 top-1/2 -translate-y-1/2 px-2.5 py-1 text-xs font-medium text-white bg-gray-900/95 border border-white/10 backdrop-blur-md rounded-md opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap shadow-xl z-50">
								{item.label}
							</span>
						</li>
					);
				})}
			</ul>
		</aside>
	);
};

export default Sidebar;
