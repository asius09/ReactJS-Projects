import { useEffect, useState, useRef } from "react";

const DropDown = ({ selectedItem, onChange, options }) => {
  const [open, setOpen] = useState(false);
  const openOption = () => setOpen((prev) => !prev);
  const DropDownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (DropDownRef.current && !DropDownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div ref={DropDownRef} className="relative inline-block text-left">
      <button
        onClick={openOption}
        className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-slate-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-slate-700"
      >
        {selectedItem ? selectedItem.label : "Select an option"}
        <i className="ri-arrow-down-s-line ml-2"></i>
      </button>
      {open && (
        <ul className="absolute z-10 mt-1 w-full bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none">
          {options.map((option) => (
            <li
              key={option.id}
              className="text-gray-900 dark:text-gray-200 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white"
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
            >
              {option.label}
              {selectedItem && selectedItem.id === option.id && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <i className="ri-check-line"></i>
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
