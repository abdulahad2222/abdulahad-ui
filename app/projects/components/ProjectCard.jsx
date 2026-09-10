"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import BlurImage from "@/public/image/placeholder/blur.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

export default function ProjectCard({ project, index, activeCategory }) {
	const isVisible = project.category.includes(parseInt(activeCategory));

	if (!isVisible) return null;

	return (
		<motion.div
			layout
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
			className="w-full">
			<Link href={"/projects/" + project.slug} prefetch={true} className="block group h-full">
				<div className="h-full rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 hover:border-cyan-500/50 backdrop-blur-xl shadow-xl hover:shadow-cyan-500/10 transition-all duration-400 overflow-hidden flex flex-col justify-between">
					{/* Top: Image Preview Frame */}
					<div className="relative w-full h-48 sm:h-56 overflow-hidden bg-gray-950">
						<Image
							src={project.thumbnail}
							alt={project.title}
							fill
							sizes="(max-width: 768px) 100vw, 50vw"
							placeholder="blur"
							blurDataURL={BlurImage.src}
							className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

						{/* Year Badge */}
						<div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/75 border border-white/20 backdrop-blur-md shadow-md text-xs font-bold text-white">
							{project.year}
						</div>
					</div>

					{/* Bottom: Content Info */}
					<div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
						<div>
							<h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
								{project.title}
							</h3>
							<p className="text-xs sm:text-sm text-gray-300 line-clamp-3 leading-relaxed mb-4">
								{project.desc[0]}
							</p>
						</div>

						<div>
							{/* Tech Pills */}
							<div className="flex flex-wrap gap-1.5 mb-4">
								{project.tech.map((t, idx) => (
									<span
										key={idx}
										className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-white/5 border border-white/10 text-cyan-200">
										{t}
									</span>
								))}
							</div>

							{/* Bottom Action */}
							<div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:text-cyan-300">
								<span>Explore Case Study</span>
								<FontAwesomeIcon icon={faArrowRight} className="transform group-hover:translate-x-1.5 transition-transform duration-300" />
							</div>
						</div>
					</div>
				</div>
			</Link>
		</motion.div>
	);
}

ProjectCard.propTypes = {
	project: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
	activeCategory: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
