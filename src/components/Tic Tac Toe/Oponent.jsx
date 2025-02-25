import React from "react";

const Oponent = ({ oponent, turn }) => {
  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="relative">
        <div
          className={`w-20 h-20 rounded-full object-cover shadow-md transition-shadow duration-300 hover:shadow-lg flex items-center justify-center ${oponent?.avatarStyle} text-4xl`}
        ></div>
        <div className="absolute top-2 right-4 transform translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center bg-blue-500 text-white text-sm font-bold border-2 border-white dark:border-gray-800">
          <i className={`${oponent?.icon}`}></i>
        </div>
      </div>
      <h3 className="mt-3 text-xl font-semibold">{oponent?.login}</h3>
      <p className="text-gray-500 dark:text-gray-400 text-base">
        Score: {oponent?.score}
      </p>
    </div>
  );
};

export default Oponent;
