import React from "react";

const Tabs = ({ id, content }) => {
  return (
    <section
      id={`tab-${id}`}
      className="w-full py-4 text-gray-900 dark:text-gray-300"
    >
      {content}
    </section>
  );
};

export default Tabs;
