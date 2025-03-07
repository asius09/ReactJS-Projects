import React, { useState, useRef, useEffect } from "react";

const ScrollToSection = ({ sections }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const scrollToSection = (sectionRef) => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-0 right-0 mb-4 mr-4 z-50" ref={ref}>
      <button
        className="w-full p-2 bg-gradient-to-br from-blue-400 to-indigo-500 dark:from-slate-700 dark:to-slate-800 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-600"
        onClick={handleToggle}
      >
        <i className="ri-arrow-up-s-line mr-1"></i>
        Go to Section
      </button>
      {isOpen && (
        <div className="absolute bg-white dark:bg-slate-800 p-2 rounded-md shadow-md right-0 mt-2 top-auto bottom-14 max-h-64 overflow-y-auto">
          <ul className="flex flex-col space-y-1 w-full">
            {sections?.length > 0
              ? sections.map((section) => (
                  <li className="w-full rounded-xl" key={section.name}>
                    <button
                      onClick={() => scrollToSection(section.ref)}
                      className="w-full text-left rounded-xl block py-2 px-4 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-gray-400 text-ellipsis overflow-hidden whitespace-nowrap transition-colors duration-300"
                    >
                      <i className="ri-arrow-right-s-line mr-1"></i>
                      {section.name}
                    </button>
                  </li>
                ))
              : null}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ScrollToSection;
