import React, { useState } from "react";
import sidebarData from "./sidebarData.js";
import MenuList from "./MenuList";

const Sidebar = ({ setIsSidebarExpanded }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggle = () => {
    setIsCollapsed((prev) => !prev);
    setIsSidebarExpanded((prev) => !prev);
  };

  return (
    <nav
      aria-label="Main navigation"
      className={`h-[88%] bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-gray-300 flex flex-col fixed top-20 left-2 rounded-xl ${
        !isCollapsed ? "py-4 px-2 rounded-2xl" : "px-4 py-8 rounded-full"
      } transition-all ${!isCollapsed ? "w-[18%]" : "w-[4%]"} z-50`}
    >
      <div
        className={`mb-2 ${
          isCollapsed ? "flex justify-center" : "flex justify-end"
        }`}
      >
        <button
          aria-label={isCollapsed ? "Collapse sidebar" : "Expand sidebar"}
          onClick={handleToggle}
          className="hover:text-gray-500 dark:hover:text-gray-400 transition-colors"
        >
          <i
            className={`ri-${
              isCollapsed ? "arrow-right" : "arrow-left"
            }-double-fill text-3xl`}
          ></i>
        </button>
      </div>
      <ul>
        {sidebarData?.length > 0 &&
          sidebarData.map((data) => (
            <MenuList
              key={data.id}
              id={data.id}
              title={data.title}
              icon={data.icon}
              path={data.path}
              children={data.children}
              isNavCollapsed={isCollapsed}
            />
          ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
