import React, { useState } from "react";

const BgChanger = () => {
  const [bgColor, setBgColor] = useState("#020617");
  const [display, setDisplay] = useState(false);
  const [hexCode, setHexCode] = useState("");
  const [colorText, setColorText] = useState("");
  const colorOptions = [
    { id: 1, color: "#DC2626", text: "RED" }, // Deeper red (tailwind red-600)
    { id: 2, color: "#16A34A", text: "GREEN" }, // Richer green (tailwind green-600)
    { id: 3, color: "#2563EB", text: "BLUE" }, // Deeper blue (tailwind blue-600)
    { id: 4, color: "#CA8A04", text: "YELLOW" }, // Warmer yellow (tailwind yellow-600)
    { id: 5, color: "#000000", text: "HEXCODE" }, // Pure black for hex input
    { id: 6, color: "#DB2777", text: "RANDOM HEX" }, // Vibrant pink (tailwind pink-600)
    { id: 7, color: "#0D9488", text: "RANDOM RGB" }, // Sophisticated teal (tailwind teal-600)
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
      className={`relative w-screen h-screen text-white`}
      style={{ backgroundColor: bgColor }}
    >
      {/* input box for hexcode */}
      <div
        id="input-box"
        className={`bg-slate-500 p-6 w-96 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
          display ? "block" : "hidden"
        }`}
      >
        <form autoComplete="off">
          <input
            type="text"
            className="bg-white px-4 py-2 text-black outline-none rounded-xl w-full"
            placeholder="Enter HexCode"
            id="color-input"
            value={hexCode}
            onChange={(e) => handleChange(e.target.value)}
            maxLength={7}
            autoComplete=""
          />
          <button
            className="w-full py-2 bg-blue-500 text-white font-bold uppercase rounded-xl mt-4 hover:bg-blue-400"
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
      <div className="absolute top-1/2 -translate-y-1/2 left-5 bg-white px-2 py-4 rounded-lg flex flex-col gap-4">
        {colorOptions.map((item) => (
          <button
            className="rounded-xl p-2 font-bold"
            style={{ backgroundColor: item.color }}
            key={item.id}
            onClick={() => {
              if (item.text === "HEXCODE") {
                setDisplay((prev) => !prev);
                setColorText("");
              } else if (item.text === "RANDOM HEX") {
                randomHexCodeGenerator();
              } else if (item.text === "RANDOM RGB") {
                randomRGB();
              } else {
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
};

export default BgChanger;
