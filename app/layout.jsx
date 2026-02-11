import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import "./nprogress.css";
import ClientLayout from "./ClientLayout";

export const metadata = {
	title: "Shahid Ansari | Portofolio",

	description:
		"My name is Shahid Ansari, I'm a PHP Laravel developer and I'm passionate about it. I'm currently studying at ISBM University.",

	author: "Shahid Ansari",
	siteUrl: "https://www.alvalens.my.id",
	applicationName: "Alvalens",

	keywords: [

		"Shahid Ansari",
		"Shahid Ansari",
		"Shahid portfolio",
		"portfolio Shahid",

	],

	openGraph: {
		type: "website",
		url: "#",
		title: "Shahid Ansari | Portofolio",
		site_name: "Shahid Ansari | Portofolio",
		description: "My name is Shahid Ansari, This is my portofolio website.",
		width: 1200,
		height: 630,
		images: [
			{
				url: "/og-image-rev.png",
				alt: "Shahid Ansari Portofolio",
			},
		],
		site_name: "Shahid Ansari | Portofolio",
	}
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className="scroll-smooth">
			<body className="bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
				<ClientLayout>{children}</ClientLayout>
			</body>
		</html>
	);
}
