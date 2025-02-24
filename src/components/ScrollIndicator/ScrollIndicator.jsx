import React, { useEffect, useState } from "react";

const ScrollIndicator = () => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollHeight = document.documentElement.scrollHeight;
      const currentScroll = window.scrollY + window.innerHeight;
      const scrollInParcentage = Math.floor(
        (currentScroll === window.innerHeight
          ? 0
          : currentScroll / scrollHeight) * 100
      );
      setScroll(scrollInParcentage);
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="absolute bottom-0 left-0 w-full bg-gray-200 dark:bg-slate-700 h-2 z-50">
      <div
        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 transition-all duration-200"
        id="scroll-indicator"
        style={{ width: `${scroll}%` }}
        role="scroll-indicator"
      ></div>
    </div>
  );
};

export default ScrollIndicator;
