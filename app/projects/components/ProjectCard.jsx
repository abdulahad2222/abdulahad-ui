import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import BlurImage from "@/public/image/placeholder/blur.jpg";

const colorThemes = {
	blue: {
		border: "border-blue-400/40 dark:border-blue-500/60",
		gradient:
			"from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-500",
		shadow:
			"shadow-lg dark:shadow-[0_0_30px_rgba(59,130,246,0.35)]",
		glow:
			"dark:shadow-[0_0_20px_rgba(59,130,246,0.6)]",
		techGradient:
			"from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700",
	},

	purple: {
		border: "border-purple-400/40 dark:border-purple-500/60",
		gradient:
			"from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-500",
		shadow:
			"shadow-lg dark:shadow-[0_0_30px_rgba(168,85,247,0.35)]",
		glow:
			"dark:shadow-[0_0_20px_rgba(168,85,247,0.6)]",
		techGradient:
			"from-purple-400 to-purple-600 dark:from-purple-500 dark:to-purple-700",
	},

	cyan: {
		border: "border-cyan-400/40 dark:border-cyan-500/60",
		gradient:
			"from-cyan-500 to-cyan-600 dark:from-cyan-600 dark:to-cyan-500",
		shadow:
			"shadow-lg dark:shadow-[0_0_30px_rgba(34,211,238,0.35)]",
		glow:
			"dark:shadow-[0_0_20px_rgba(34,211,238,0.6)]",
		techGradient:
			"from-cyan-400 to-cyan-600 dark:from-cyan-500 dark:to-cyan-700",
	},

	pink: {
		border: "border-pink-400/40 dark:border-pink-500/60",
		gradient:
			"from-pink-500 to-pink-600 dark:from-pink-600 dark:to-pink-500",
		shadow:
			"shadow-lg dark:shadow-[0_0_30px_rgba(236,72,153,0.35)]",
		glow:
			"dark:shadow-[0_0_20px_rgba(236,72,153,0.6)]",
		techGradient:
			"from-pink-400 to-pink-600 dark:from-pink-500 dark:to-pink-700",
	},

	emerald: {
		border: "border-emerald-400/40 dark:border-emerald-500/60",
		gradient:
			"from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-500",
		shadow:
			"shadow-lg dark:shadow-[0_0_30px_rgba(16,185,129,0.35)]",
		glow:
			"dark:shadow-[0_0_20px_rgba(16,185,129,0.6)]",
		techGradient:
			"from-emerald-400 to-emerald-600 dark:from-emerald-500 dark:to-emerald-700",
	},
	midnight: {
		border: "border-indigo-400/40 dark:border-indigo-500/60",
		gradient:
			"from-indigo-600 via-blue-600 to-indigo-500 dark:from-indigo-700 dark:via-blue-600 dark:to-indigo-500",
		shadow:
			"shadow-lg dark:shadow-[0_0_35px_rgba(99,102,241,0.35)]",
		glow:
			"dark:shadow-[0_0_22px_rgba(99,102,241,0.65)]",
		techGradient:
			"from-indigo-400 to-blue-500 dark:from-indigo-500 dark:to-blue-700",
	},

	lava: {
		border: "border-rose-400/40 dark:border-rose-500/60",
		gradient:
			"from-rose-600 via-orange-500 to-red-500 dark:from-rose-700 dark:via-orange-600 dark:to-red-600",
		shadow:
			"shadow-lg dark:shadow-[0_0_35px_rgba(244,63,94,0.35)]",
		glow:
			"dark:shadow-[0_0_22px_rgba(244,63,94,0.65)]",
		techGradient:
			"from-orange-400 to-rose-500 dark:from-orange-500 dark:to-rose-700",
	},
	cyber: {
		border: "border-teal-400/40 dark:border-teal-500/60",
		gradient:
			"from-teal-500 via-emerald-500 to-lime-400 dark:from-teal-600 dark:via-emerald-500 dark:to-lime-500",
		shadow:
			"shadow-lg dark:shadow-[0_0_35px_rgba(52,211,153,0.35)]",
		glow:
			"dark:shadow-[0_0_22px_rgba(52,211,153,0.65)]",
		techGradient:
			"from-emerald-400 to-teal-500 dark:from-emerald-500 dark:to-teal-700",
	},
	frost: {
		border:
			"border-white/40 dark:border-white/20",
		gradient:
			"from-white/80 via-gray-200 to-white/80 dark:from-white/20 dark:via-gray-300/30 dark:to-white/20",
		shadow:
			"shadow-lg dark:shadow-[0_0_30px_rgba(255,255,255,0.15)]",
		glow:
			"dark:shadow-[0_0_22px_rgba(255,255,255,0.35)]",
		techGradient:
			"from-gray-200 to-gray-100 dark:from-gray-300/60 dark:to-gray-100/40",
	},


};


export default function ProjectCard({ project, index, activeCategory, theme = "frost" }) {
	const colors = colorThemes[theme] || colorThemes.blue;

	return (
		<>
			{project.category.includes(parseInt(activeCategory)) && (
				<Link href={"projects/" + project.slug} key={index}>
					<motion.div
						className={`z-10 relative flex justify-center items-start flex-col mb-5 md:px-10 w-full h-auto bg-gradient-to-br from-gray-900 to-black group/card py-20 px-5 md:py-2 aspect-video rounded-2xl shadow-2xl hover:shadow-2xl ${colors.shadow} overflow-hidden border ${colors.border} transition-all duration-300`}
						initial={{
							opacity: 0,
							x: -200,
						}}
						whileInView={{
							opacity: 1,
							x: 0,
						}}
						transition={{
							type: "spring",
						}}>
						<Image
							src={project.thumbnail}
							alt={project.title}
							layout="fill"
							objectFit="cover"
							placeholder="blur"
							className="bg-slate-950 opacity-20 group-hover/card:opacity-100 transition-all ease duration-500"
							blurDataURL={BlurImage.src}
						/>
						<div className="absolute top-0 left-0 z-20">
	<div className="relative">
		{/* Soft glow */}
		<div className="absolute inset-0 rounded-2xl blur-md bg-white/25" />

		{/* Badge */}
		<div
			className="
				relative flex items-center justify-center
				w-22 h-8 m-2
				rounded-2xl
				bg-black/80
				backdrop-blur-xl
				border border-white/30
				ring-1 ring-white/40
				shadow-[0_0_25px_rgba(255,255,255,0.16)]
			"
		>
			<span className="text-white font-bold text-sm tracking-widest">
				{project.year}
			</span>
		</div>
	</div>
</div>

						<div className="transition-all ease duration-500 opacity-100 content text-center group-hover/card:opacity-0 z-10">
							<h1 className="text-3xl font-bold mb-3 text-white drop-shadow-lg">{project.title}</h1>
							<p className="text-gray-300 drop-shadow">
								{project.desc[0].length > 125
									? `${project.desc[0].slice(0, 125)}...`
									: project.desc[0]}
							</p>
							<div className="flex justify-center items-center flex-row mt-5 flex-wrap gap-2">
								{project.tech.map((t, index) => (
									<span
										key={index}
										className="px-3 py-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 text-white text-xs font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-200 border border-white/10 dark:border-gray-900/30 backdrop-blur-sm">
										{t}
									</span>
								))}
							</div>
						</div>
					</motion.div>
				</Link>
			)}
		</>
	);
}

ProjectCard.propTypes = {
	project: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
	activeCategory: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
		.isRequired,
	theme: PropTypes.oneOf(["blue", "purple", "cyan", "pink", "emerald"]),
};
