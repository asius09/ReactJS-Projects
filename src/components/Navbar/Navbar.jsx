import React, { useState, useEffect } from "react";
import { useLocalStorage } from "../../Custom";
import ScrollIndicator from "../ScrollIndicator/ScrollIndicator";

const Navbar = () => {
  const [theme, setTheme] = useLocalStorage("theme", "dark");
  const [iconRotate, setIconRotate] = useState(0);

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
    setIconRotate(iconRotate === 0 ? 180 : 0);
  };

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <header className="bg-gray-50 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 py-4 px-6 flex items-center justify-between fixed top-0 left-0 w-full z-100">
      <div className="flex items-center justify-between w-full">
        <nav>
          <a
            href="/"
            className="text-xl font-bold text-gray-900 dark:text-gray-100"
          >
            My React Projects
          </a>
        </nav>
        <button
          onClick={handleThemeToggle}
          aria-label="Toggle Dark Theme"
          className="ml-4 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg transition-all motion-reduce:transition-none"
        >
          <i
            className={`transition-transform duration-300 ease-in ri-${
              theme === "dark" ? "sun-line" : "moon-line"
            } text-xl`}
            style={{ transform: `rotate(${iconRotate}deg)` }}
          ></i>
        </button>
      </div>
      <ScrollIndicator />
    </header>
  );
};

export default Navbar;
