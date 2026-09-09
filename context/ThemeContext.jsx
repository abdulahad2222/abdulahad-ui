"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [isDark, setIsDark] = useState(true);
	const [isMounted, setIsMounted] = useState(false);

	// Ensure dark mode is active
	useEffect(() => {
		setIsDark(true);
		updateTheme(true);
		setIsMounted(true);
	}, []);

	const updateTheme = (dark) => {
		const html = document.documentElement;
		if (dark) {
			html.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			html.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	};

	const toggleTheme = () => {
		const newTheme = !isDark;
		setIsDark(newTheme);
		updateTheme(newTheme);
	};

	if (!isMounted) {
		return <>{children}</>;
	}

	return (
		<ThemeContext.Provider value={{ isDark, toggleTheme, isMounted }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within ThemeProvider");
	}
	return context;
};
