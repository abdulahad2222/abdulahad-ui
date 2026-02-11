import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import "./nprogress.css";
import ClientLayout from "./ClientLayout";

export const metadata = {
    title: "Abdul Ahad | Portofolio",

    description:
		"My name is Abdul Ahad, I'm a Front-end developer and I'm passionate about it. I'm currently studying at ISBM University.",

    author: "Abdul Ahad",
    siteUrl: "https://www.alvalens.my.id",
    applicationName: "Alvalens",

    keywords: [
		"ahad",
		"abdul",
		"ahad abdul",
		"ahad abdul ahad",
		"abdul ahad",
		"abdul portfolio",
		"ahad porto",

	],

    openGraph: {
		type: "website",
		url: "#",
		title: "Abdul Ahad | Portofolio",
		site_name: "Ahad | Portofolio",
		description: "My name is Abdul Ahad, This is my portofolio website.",
		width: 1200,
		height: 630,
		images: [
			{
				url: "/og-image-rev.png",
				alt: "Ahad Portofolio",
			},
		],
		site_name: "Ahad | Portofolio",
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
