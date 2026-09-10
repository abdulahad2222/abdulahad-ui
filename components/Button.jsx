const Button = ({ children, variation, theme = "blue", ...props }) => {
	// Primary button gradients - Bold and vibrant
	const primaryGradients = {
		blue: "bg-gradient-to-r from-teal-500 via-cyan-500 to-violet-600 dark:from-teal-400 dark:via-cyan-400 dark:to-violet-700 hover:from-cyan-600 hover:to-violet-700 dark:hover:from-cyan-500 dark:hover:to-violet-800",
		purple: "bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-500 dark:to-indigo-500 hover:from-violet-700 hover:to-indigo-700 dark:hover:from-violet-600 dark:hover:to-indigo-600",
		cyan: "bg-gradient-to-r from-cyan-500 to-teal-500 dark:from-cyan-400 dark:to-teal-400 hover:from-cyan-600 hover:to-teal-600 dark:hover:from-cyan-500 dark:hover:to-teal-500",
		pink: "bg-gradient-to-r from-pink-500 to-cyan-400 dark:from-pink-400 dark:to-cyan-500 hover:from-pink-600 hover:to-cyan-500 dark:hover:from-pink-500 dark:hover:to-cyan-600",
		emerald: "bg-gradient-to-r from-emerald-500 to-teal-400 dark:from-emerald-400 dark:to-teal-400 hover:from-emerald-600 hover:to-teal-500 dark:hover:from-emerald-500 dark:hover:to-teal-600"
	};

	// Secondary button styling - Outlined with hover fill
	const secondaryVariants = {
		blue: "border-2 border-teal-400 dark:border-cyan-400 text-teal-700 dark:text-cyan-200 bg-transparent dark:bg-transparent hover:bg-cyan-50 dark:hover:bg-cyan-950/40 hover:border-cyan-500 dark:hover:border-cyan-300",
		purple: "border-2 border-violet-500 dark:border-violet-400 text-violet-700 dark:text-violet-300 bg-transparent dark:bg-transparent hover:bg-violet-50 dark:hover:bg-violet-950/40 hover:border-violet-700 dark:hover:border-violet-300",
		cyan: "border-2 border-cyan-500 dark:border-cyan-400 text-cyan-700 dark:text-cyan-300 bg-transparent dark:bg-transparent hover:bg-cyan-50 dark:hover:bg-cyan-950/40 hover:border-cyan-700 dark:hover:border-cyan-300",
		pink: "border-2 border-pink-400 dark:border-pink-400 text-pink-700 dark:text-pink-300 bg-transparent dark:bg-transparent hover:bg-pink-50 dark:hover:bg-pink-950/40 hover:border-pink-700 dark:hover:border-pink-300",
		emerald: "border-2 border-emerald-400 dark:border-emerald-400 text-emerald-700 dark:text-emerald-300 bg-transparent dark:bg-transparent hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:border-emerald-700 dark:hover:border-emerald-300"
	};

	const selectedPrimary = primaryGradients[theme] || primaryGradients.blue;
	const selectedSecondary = secondaryVariants[theme] || secondaryVariants.blue;

	return (
		<button
			{...props}
			className={`
				font-bold text-sm sm:text-base tracking-wide rounded-xl px-5 sm:px-7 py-2.5 sm:py-3.5
				transition-all duration-300 ease-out
				transform hover:scale-[1.03] active:scale-95
				focus:outline-none focus:ring-2 focus:ring-offset-2
				shadow-lg hover:shadow-xl inline-flex items-center justify-center
				${variation === "primary" 
					? `${selectedPrimary} text-white shadow-blue-500/30 dark:shadow-blue-600/40 hover:shadow-blue-600/50 dark:hover:shadow-blue-700/50 focus:ring-blue-400 dark:focus:ring-blue-600` 
					: `${selectedSecondary} shadow-slate-400/30 dark:shadow-slate-700/40 hover:shadow-slate-500/40 dark:hover:shadow-slate-600/50 focus:ring-blue-400 dark:focus:ring-blue-600`
				}
			`}>
			{children}
		</button>
	);
};

export default Button;