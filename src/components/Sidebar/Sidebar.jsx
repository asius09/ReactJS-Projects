import React, { useState } from "react";
import sidebarData from "./sidebarData.js";
import MenuList from "./MenuList";
const Sidebar = () => {
  return (
    <aside className="w-[18%] h-[90%] bg-blue-500 text-white flex flex-col fixed top-4 bottom-4 left-4 rounded-2xl px-4 py-8">
      <ul>
        {sidebarData && sidebarData.length
          ? sidebarData.map((data) => {
              return (
                <MenuList
                  key={data.id}
                  id={data.id}
                  title={data.title}
                  icon={data.icon}
                  path={data.path}
                  children={data.children}
                />
              );
            })
          : null}
      </ul>
    </aside>
  );
};

export default Sidebar;
