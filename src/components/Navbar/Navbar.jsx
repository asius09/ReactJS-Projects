import React, { useState, useEffect } from "react";
import { useLocalStorage } from "../../Custom";
import ScrollIndicator from "../ScrollIndicator/ScrollIndicator";

const Navbar = () => {
  const [theme, setTheme] = useLocalStorage("theme", "dark");
  const [iconRotate, setIconRotate] = useState(0);
  const [scrollIconRotate, setScrollIconRotate] = useState(0);

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
    setIconRotate(iconRotate === 0 ? 360 : 0);
  };

  const handleNavigation = () => {
    if (window.scrollY < document.body.scrollHeight - window.innerHeight) {
      window.scrollTo({
        top: document.body.scrollHeight - window.innerHeight,
        behavior: "smooth",
      });
      setScrollIconRotate(180);
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setScrollIconRotate(0);
    }
  };

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <header className="bg-gray-50 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 py-4 px-8 flex items-center justify-between fixed top-0 left-0 w-full z-[100] shadow-sm">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        <nav className="w-full flex justify-between items-center space-x-6">
          <a
            href="/"
            className="text-2xl font-bold text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            My React Projects
          </a>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleNavigation}
              className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600 dark:from-slate-700 dark:to-slate-800 dark:hover:from-slate-600 dark:hover:to-slate-700 text-white rounded-full transition-all motion-reduce:transition-none cursor-pointer shadow-lg hover:shadow-xl active:scale-95 transform-gpu flex items-center justify-center group relative"
            >
              <i
                className="ri-arrow-down-circle-fill text-2xl drop-shadow-md transition-transform duration-300 ease-in-out"
                style={{ transform: `rotate(${scrollIconRotate}deg)` }}
              ></i>
            </button>
            <button
              onClick={handleThemeToggle}
              className="w-12 h-12 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-900 dark:text-gray-100 rounded-full transition-all motion-reduce:transition-none cursor-pointer flex items-center justify-center relative overflow-hidden group"
            >
              <i
                className={`transition-transform duration-300 ease-in ri-${
                  theme === "dark" ? "sun-line" : "moon-line"
                } text-2xl`}
                style={{ transform: `rotate(${iconRotate}deg)` }}
              ></i>
            </button>
          </div>
        </nav>
      </div>
      <ScrollIndicator />
    </header>
  );
};

export default Navbar;
