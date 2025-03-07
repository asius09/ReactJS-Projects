import React, { useState, forwardRef } from "react";

const BgChanger = forwardRef((props, ref) => {
  const [bgColor, setBgColor] = useState("#f3f4f6"); // Default light mode background (tailwind gray-100)
  const [display, setDisplay] = useState(false);
  const [hexCode, setHexCode] = useState("");
  const [colorText, setColorText] = useState("");
  const colorOptions = [
    { id: 1, color: "#ef4444", text: "RED", textColor: "text-white" }, // Tailwind red-500
    { id: 2, color: "#22c55e", text: "GREEN", textColor: "text-white" }, // Tailwind green-500
    { id: 3, color: "#3b82f6", text: "BLUE", textColor: "text-white" }, // Tailwind blue-500
    { id: 4, color: "#f59e0b", text: "YELLOW", textColor: "text-black" }, // Tailwind yellow-500
    { id: 5, color: "#000000", text: "HEXCODE", textColor: "text-white" },
    { id: 6, color: "#e879f9", text: "RANDOM HEX", textColor: "text-white" }, // Tailwind pink-400
    { id: 7, color: "#6ee7b7", text: "RANDOM RGB", textColor: "text-black" }, // Tailwind teal-300
    { id: 8, color: "#475569", text: "DARK GREY", textColor: "text-white" }, // Tailwind slate-700
    { id: 9, color: "#f3f4f6", text: "LIGHT GREY", textColor: "text-black" }, // Tailwind slate-100
  ];

  const randomRGB = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const rgb = `rgb(${r},${g},${b})`;
    setBgColor(rgb);
    setColorText(rgb);
    setDisplay(false);
  };

  const randomHexCodeGenerator = () => {
    const randomHex = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setBgColor(randomHex);
    setDisplay(false);
    setColorText(randomHex);
  };

  const handleChange = (change) => {
    const formattedInput = change.startsWith("#") ? change : `#${change}`;
    setHexCode(formattedInput);
  };

  return (
    <div
      className={`relative w-full h-screen text-gray-900 dark:text-white rounded-xl transition-colors duration-300`}
      style={{ backgroundColor: bgColor }}
      ref={ref}
    >
      {/* input box for hexcode */}
      <div
        id="input-box"
        className={`bg-gray-100 dark:bg-slate-800 p-6 w-96 rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
          display ? "block" : "hidden"
        } transition-colors duration-300`}
      >
        <form autoComplete="off">
          <input
            type="text"
            className="bg-white dark:bg-slate-700 px-4 py-2 text-gray-900 dark:text-white outline-none rounded-xl w-full transition-colors duration-300"
            placeholder="Enter HexCode"
            id="color-input"
            value={hexCode}
            onChange={(e) => handleChange(e.target.value)}
            maxLength={7}
            autoComplete=""
          />
          <button
            className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold uppercase rounded-xl mt-4 hover:from-blue-600 hover:to-purple-700 transition-colors duration-300"
            onClick={(e) => {
              e.preventDefault();
              setDisplay(false);
              setBgColor(`${hexCode}`);
              setHexCode("");
            }}
          >
            Enter
          </button>
        </form>
      </div>

      {colorText ? (
        <h1 className="text-white text-4xl font-bold uppercase absolute left-1/2 top-1/2 -translate-x-1/2 -transalte-y-1/2">
          {colorText}
        </h1>
      ) : null}
      {/* Sidebar for buttons*/}
      <div className="absolute top-1/2 -translate-y-1/2 left-5 bg-white dark:bg-slate-800 px-2 py-4 rounded-xl flex flex-col gap-4 transition-colors duration-300">
        {colorOptions.map((item) => (
          <button
            className={`rounded-xl p-2 font-bold ${item.textColor} transition-colors duration-300`}
            style={{ backgroundColor: item.color, color: item.textColor === 'text-black' ? 'black' : 'white' }}
            key={item.id}
            onClick={() => {
              if (item.text === "HEXCODE") {
                setDisplay((prev) => !prev);
                setColorText("");
              } else if (item.text === "RANDOM HEX") {
                randomHexCodeGenerator();
              } else if (item.text === "RANDOM RGB") {
                randomRGB();
              } else if (item.text === "DARK GREY") {
                setBgColor("#475569"); // Dark grey for dark mode (tailwind slate-700)
                setColorText("");
              } else if (item.text === "LIGHT GREY") {
                setBgColor("#f3f4f6"); // Light grey for light mode (tailwind gray-100)
                setColorText("");
              }
              else {
                setBgColor(item.color);
                setColorText("");
              }
            }}
          >
            {item.text}
          </button>
        ))}
      </div>
    </div>
  );
});

export default BgChanger;
