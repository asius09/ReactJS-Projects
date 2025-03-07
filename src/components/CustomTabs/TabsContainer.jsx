import React, { useCallback, useState, forwardRef } from "react";
import Tabs from "./Tabs";

const TabsContainer = forwardRef((props, ref) => {
  const [activeTab, setActiveTab] = useState(1);

  const tabsData = [
    { id: 1, label: "Tab 1", content: "Content for Tab 1" },
    { id: 2, label: "Tab 2", content: "Content for Tab 2" },
    { id: 3, label: "Tab 3", content: "Content for Tab 3" },
  ];

  const handleTabClick = useCallback(
    (id) => {
      setActiveTab(id);
    },
    [activeTab]
  );

  return (
    <section
      ref={ref}
      id="tab-container"
      className="w-full h-[calc(100vh-90px)] bg-gray-50 dark:bg-slate-800 rounded-lg shadow-md p-4 flex flex-col"
    >
      <div className="w-full border-b border-gray-300 dark:border-gray-700 flex justify-start gap-4 text-lg font-medium">
        {tabsData.map((data) => (
          <button
            key={data.id}
            onClick={() => handleTabClick(data.id)}
            className={`px-4 py-2 focus:outline-none ${
              activeTab === data.id
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
            } transition-colors duration-200`}
          >
            {data.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tabsData.map((data) =>
          data.id === activeTab ? (
            <Tabs key={data.id} id={data.id} content={data.content} />
          ) : null
        )}
      </div>
    </section>
  );
});

export default TabsContainer;
