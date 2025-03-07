import React, { forwardRef, useState, useRef } from "react";
import data from "./data.js";
import Sidebar from "../Sidebar/Sidebar.jsx";

const Accordion = forwardRef((props, ref) => {
  const [selected, setSelected] = useState(null);
  const [multiSelected, setMultiSelected] = useState([]);
  const [multiSelection, setMultiSelection] = useState(false);

  const handleSingleSelection = (id) => {
    setSelected(id === selected ? null : id);
  };

  const handleMultiSelection = (id) => {
    if (multiSelection) {
      if (multiSelected.includes(id)) {
        setMultiSelected((prev) => prev.filter((item) => item !== id));
      } else {
        setMultiSelected((prev) => [...prev, id]);
      }
    }
  };

  return (
    <div
      ref={ref}
      className="w-full min-h-screen bg-gray-100 dark:bg-slate-950 text-gray-900 dark:text-gray-300 grid place-items-center rounded-lg"
    >
      <div className="w-1/2 px-4 py-6 flex flex-col gap-4">
        <div className="flex justify-between items-center w-full p-4 pr-8 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100">
          <button
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setMultiSelection((prev) => !prev)}
          >
            Multi Selection
          </button>
          <span className="font-bold cursor-default">
            {multiSelection ? "Enable" : "Disable"}
          </span>
        </div>
        {data && data.length > 0 ? (
          data.map((item) => {
            return (
              <div
                onClick={() =>
                  multiSelection
                    ? handleMultiSelection(item.id)
                    : handleSingleSelection(item.id)
                }
                className="w-full p-4 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
                key={item.id}
              >
                {" "}
                <div className="w-full grid grid-cols-[1fr_8%] justify-between items-center">
                  <h3>{item.question}</h3>
                  <span className="cursor-default">+</span>
                </div>
                {selected === item.id ? (
                  <div className="w-full p-4 rounded-b-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 border-t-2 border-gray-200 dark:border-slate-600">
                    {item.answer}
                  </div>
                ) : null}
                {multiSelection && multiSelected.includes(item.id) ? (
                  <div className="w-full p-4 rounded-b-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 border-t-2 border-gray-200 dark:border-slate-600">
                    {item.answer}
                  </div>
                ) : null}
              </div>
            );
          })
        ) : (
          <div className="bg-red-300">No Data Found</div>
        )}
      </div>
    </div>
  );
});

export default Accordion;
