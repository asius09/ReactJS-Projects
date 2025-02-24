import React, { useState } from "react";
import QRCode from "react-qr-code";

const QrGenerator = () => {
  const [input, setInput] = useState("");
  const [qrCode, setQrCode] = useState("");

  function handleInput(e) {
    setInput(e.target.value);
  }

  function handleGenerate() {
    setQrCode(input);
    setInput("");
  }

  return (
    <section
      id="qr-generator"
      className="w-full h-screen bg-gray-100 dark:bg-slate-950 text-gray-900 dark:text-white flex flex-col justify-center items-center gap-8 transition-colors duration-300 rounded-lg"
    >
      <div className="flex gap-4 w-full justify-center">
        <input
          onChange={(e) => handleInput(e)}
          type="text"
          name="qr-code"
          placeholder="Enter to Generate QR Code"
          className="bg-white dark:bg-slate-800 w-[30%] py-2 px-4 rounded-lg text-gray-900 dark:text-white outline-none border border-slate-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-purple-500 transition-all"
          autoComplete="off"
          value={input}
        />
        <button
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleGenerate}
          disabled={!input || input.trim() === ""}
        >
          Generate
        </button>
      </div>
      {qrCode && (
        <div className="flex justify-center p-4 bg-white dark:bg-slate-800 rounded-lg transition-colors duration-300">
          <QRCode 
            id="qr-code-value" 
            value={qrCode} 
            size={300} 
            bgColor={window.matchMedia('(prefers-color-scheme: dark)').matches ? "#1e293b" : "#fff"}
            fgColor={window.matchMedia('(prefers-color-scheme: dark)').matches ? "#ffffff" : "#000000"}
          />
        </div>
      )}
    </section>
  );
};

export default QrGenerator;
