import { motion } from "framer-motion";
import PropTypes from "prop-types";
export default function Hr({ variant, theme = "blue" }) {
	const themeGradients = {
		blue: {
			long1: "from-blue-500 via-blue-600 to-transparent dark:from-blue-700 dark:via-blue-600 dark:to-transparent",
			long2: "from-transparent via-blue-600 to-blue-500 dark:from-transparent dark:via-blue-600 dark:to-blue-700",
			short1: "from-blue-500 to-blue-600 dark:from-blue-700 dark:to-blue-600",
			short2: "from-blue-600 to-blue-500 dark:from-blue-600 dark:to-blue-700"
		},
		purple: {
			long1: "from-purple-500 via-purple-600 to-transparent dark:from-purple-700 dark:via-purple-600 dark:to-transparent",
			long2: "from-transparent via-purple-600 to-purple-500 dark:from-transparent dark:via-purple-600 dark:to-purple-700",
			short1: "from-purple-500 to-purple-600 dark:from-purple-700 dark:to-purple-600",
			short2: "from-purple-600 to-purple-500 dark:from-purple-600 dark:to-purple-700"
		},
		cyan: {
			long1: "from-cyan-500 via-cyan-600 to-transparent dark:from-cyan-700 dark:via-cyan-600 dark:to-transparent",
			long2: "from-transparent via-cyan-600 to-cyan-500 dark:from-transparent dark:via-cyan-600 dark:to-cyan-700",
			short1: "from-cyan-500 to-cyan-600 dark:from-cyan-700 dark:to-cyan-600",
			short2: "from-cyan-600 to-cyan-500 dark:from-cyan-600 dark:to-cyan-700"
		},
		pink: {
			long1: "from-pink-500 via-pink-600 to-transparent dark:from-pink-700 dark:via-pink-600 dark:to-transparent",
			long2: "from-transparent via-pink-600 to-pink-500 dark:from-transparent dark:via-pink-600 dark:to-pink-700",
			short1: "from-pink-500 to-pink-600 dark:from-pink-700 dark:to-pink-600",
			short2: "from-pink-600 to-pink-500 dark:from-pink-600 dark:to-pink-700"
		},
		emerald: {
			long1: "from-emerald-500 via-emerald-600 to-transparent dark:from-emerald-700 dark:via-emerald-600 dark:to-transparent",
			long2: "from-transparent via-emerald-600 to-emerald-500 dark:from-transparent dark:via-emerald-600 dark:to-emerald-700",
			short1: "from-emerald-500 to-emerald-600 dark:from-emerald-700 dark:to-emerald-600",
			short2: "from-emerald-600 to-emerald-500 dark:from-emerald-600 dark:to-emerald-700"
		}
	};

	const selectedTheme = themeGradients[theme] || themeGradients.blue;

	return (
		<>
			{variant === "long" ? (
				<>
					<motion.div
						className={`bg-gradient-to-r ${selectedTheme.long1} w-28 h-1.5 rounded-full mb-3 self-start shadow-lg`}
						initial={{
							opacity: 0,
							x: -100,
						}}
						whileInView={{
							opacity: 1,
							x: 0,
						}}
						transition={{
							delay: 0.3,
							type: "spring",
						}}></motion.div>
					<motion.div
						className={`bg-gradient-to-r ${selectedTheme.long2} w-28 h-1.5 rounded-full shadow-lg`}
						initial={{
							opacity: 0,
							x: 200,
						}}
						whileInView={{
							opacity: 1,
							x: -50,
						}}
						transition={{
							delay: 0.4,
							type: "spring",
						}}></motion.div>
				</>
			) : (
				<div className="flex justify-center items-center flex-col my-2.5 sm:my-3">
					<motion.div
						className={`bg-gradient-to-r ${selectedTheme.short1} w-20 h-1.5 rounded-full mb-1.5 shadow-lg`}
						initial={{
							opacity: 0,
							x: -45,
						}}
						whileInView={{
							opacity: 1,
							x: 0,
						}}
						transition={{
							delay: 0.2,
							type: "spring",
						}}></motion.div>
					<motion.div
						className={`bg-gradient-to-r ${selectedTheme.short2} w-20 h-1.5 rounded-full shadow-lg`}
						initial={{
							opacity: 0,
							x: 150,
						}}
						whileInView={{
							opacity: 1,
							x: 40,
						}}
						transition={{
							delay: 0.3,
							type: "spring",
						}}></motion.div>
				</div>
			)}
		</>
	);
}

Hr.propTypes = {
	variant: PropTypes.oneOf(["short", "long"]),
	theme: PropTypes.oneOf(["blue", "purple", "cyan", "pink", "emerald"])
};

Hr.defaultProps = {
	variant: "short",
	theme: "blue"
};
