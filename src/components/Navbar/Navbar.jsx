import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Set initial theme from localStorage
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.documentElement.setAttribute("data-theme", storedTheme);
  }, []);

  useEffect(() => {
    // Update localStorage and data-theme attribute when theme changes
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="bg-gray-50 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 py-4 px-6 flex items-center justify-between fixed top-0 left-0 w-full z-50">
      <nav>
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          My App
        </h1>
      </nav>
      <button
        onClick={handleThemeToggle}
        aria-label="Toggle Dark Theme"
        className="bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg transition-colors"
      >
        <i className="ri-contrast-2-line text-xl"></i>
      </button>
    </header>
  );
};

export default Navbar;
