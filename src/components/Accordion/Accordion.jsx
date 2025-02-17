import React, { useState } from "react";
import data from "./data.js";

const Accordion = () => {
  const [selected, setSelected] = useState(null);
  const [multiSelected, setMultiSelected] = useState([]);
  const [multiSelection, setMultiSelection] = useState(false);
  const handleSingleSelection = (id) => {
    setSelected(id === selected ? null : id);
  };
  const handleMultiSelection = (id) => {
    if (multiSelection) {
      if (multiSelected.includes(id)) {
        const newSelected = multiSelected.filter((item) => item !== id);
        setMultiSelected(newSelected);
        console.log(newSelected);
      } else {
        const newSelected = [...multiSelected, id];
        setMultiSelected(newSelected);
        console.log(newSelected);
      }
    }
  };

  return (
    <div className="w-screen min-h-screen bg-slate-950 text-white grid place-items-center">
      <div className="w-1/2 px-4 py-6 flex flex-col gap-4">
        <div className="flex justify-between items-center w-full p-4 pr-8 rounded-lg bg-white text-black">
          <button
            className="bg-slate-900 rounded-2xl text-white px-4 py-2 hover:bg-slate-800 cursor-pointer hover:scale-[1.02]"
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
                className="w-full p-4 rounded-lg bg-white text-black"
                key={item.id}
              >
                {" "}
                <div className="w-full grid grid-cols-[1fr_8%] justify-between items-center">
                  <h3>{item.question}</h3>
                  <span className="cursor-default">+</span>
                </div>
                {selected === item.id ? (
                  <div className="w-full p-4 rounded-b-lg bg-white text-black border-t-2 border-slate-200">
                    {item.answer}
                  </div>
                ) : null}
                {multiSelection ? (
                  multiSelected.includes(item.id) ? (
                    <div className="w-full p-4 rounded-b-lg bg-white text-black border-t-2 border-slate-200">
                      {item.answer}
                    </div>
                  ) : null
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
};

export default Accordion;
