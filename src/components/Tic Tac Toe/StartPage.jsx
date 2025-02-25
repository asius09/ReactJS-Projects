import React, { useState, useEffect, useCallback } from "react";

const StartPage = ({ setStartGame, startGame, setUser1, setUser2 }) => {
  const [player1Name, setPlayer1Name] = useState("Player 1");
  const [player2Name, setPlayer2Name] = useState("Player 2");
  const [player1Symbol, setPlayer1Symbol] = useState("ri-close-line");
  const crossClass = "ri-close-line";
  const circleClass = "ri-circle-line";
  const [backgroundSymbols, setBackgroundSymbols] = useState([]);
  const [error, setError] = useState("");

  const generateRandomSymbol = useCallback(() => {
    const symbols = [
      "ri-close-line",
      "ri-circle-line",
      "ri-star-line",
      "ri-heart-line",
      "ri-gamepad-line",
      "ri-treasure-map-line",
    ];
    const colors = ["red", "blue", "green", "purple", "orange", "yellow"];

    return () => {
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.floor(Math.random() * 50) + 30;
      let x, y;
      do {
        x = Math.floor(Math.random() * 100);
        y = Math.floor(Math.random() * 100);
      } while (isOverlapping(x, y));

      return { symbol, color, size, x, y };
    };
  }, []);

  const isOverlapping = useCallback(
    (x, y) => {
      for (const symbol of backgroundSymbols) {
        const distance = Math.sqrt((x - symbol.x) ** 2 + (y - symbol.y) ** 2);
        if (distance < 15) {
          return true;
        }
      }
      return false;
    },
    [backgroundSymbols]
  );

  useEffect(() => {
    const newSymbols = Array.from({ length: 15 }, generateRandomSymbol());
    setBackgroundSymbols(newSymbols);
  }, [generateRandomSymbol]);

  const handlePlayer1SymbolChange = (symbol) => {
    setPlayer1Symbol(symbol);
  };

  const handleStartGame = () => {
    if (!player1Name || !player2Name) {
      setError("Please enter names for both players.");
      return;
    }

    if (player1Name.length > 10 || player2Name.length > 10) {
      setError("Player names must be 10 characters or less.");
      return;
    }

    setError("");

    setUser1((prev) => ({
      ...prev,
      login: player1Name,
      icon:
        player1Symbol === "ri-close-line" ? "ri-close-line" : "ri-circle-line",
    }));
    setUser2((prev) => ({
      ...prev,
      login: player2Name,
      icon:
        player1Symbol === "ri-close-line" ? "ri-circle-line" : "ri-close-line",
    }));
    setStartGame(true);
  };

  return (
    <div
      className={`absolute top-0 left-0 w-full h-full ${
        startGame ? "hidden" : "flex"
      } items-center justify-center bg-gray-500 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-50 z-50`}
    >
      <section className="relative flex flex-col items-center justify-center bg-gray-100 dark:bg-slate-900 text-gray-900 dark:text-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div
          className="absolute top-0 left-0 w-full h-full overflow-hidden"
          aria-hidden="true"
        >
          {backgroundSymbols.map((symbol, index) => (
            <i
              key={index}
              className={`absolute ${symbol.symbol}`}
              style={{
                top: `${symbol.y}%`,
                left: `${symbol.x}%`,
                fontSize: `${symbol.size}px`,
                color: symbol.color,
                opacity: 0.2,
                zIndex: 0,
                pointerEvents: "none",
              }}
            />
          ))}
        </div>
        <h1 className="text-3xl font-extrabold mb-6 text-center relative z-10">
          Tic Tac Toe
        </h1>
        {error && (
          <div className="bg-red-200 text-red-700 p-3 rounded mb-4 relative z-10">
            {error}
          </div>
        )}
        <div className="w-full relative z-10">
          <div className="mb-4 p-4 rounded-lg shadow-md dark:bg-slate-800">
            <label
              htmlFor="player1Name"
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            >
              Player 1 Name:
            </label>
            <input
              type="text"
              id="player1Name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-slate-700 dark:border-slate-500 dark:text-white"
              value={player1Name}
              onChange={(e) => setPlayer1Name(e.target.value)}
              placeholder="Enter Player 1 Name"
            />
          </div>
          <div className="mb-4 p-4 rounded-lg shadow-md dark:bg-slate-800">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              Player 1 Symbol:
            </label>
            <div className="flex items-center space-x-2">
              <button
                className={`flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  player1Symbol === "ri-close-line"
                    ? "opacity-100"
                    : "opacity-50"
                }`}
                type="button"
                onClick={() => handlePlayer1SymbolChange("ri-close-line")}
                aria-label="Set Player 1 Symbol to X"
              >
                <i className={crossClass}></i>
              </button>
              <button
                className={`flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  player1Symbol === "ri-circle-line"
                    ? "opacity-100"
                    : "opacity-50"
                }`}
                type="button"
                onClick={() => handlePlayer1SymbolChange("ri-circle-line")}
                aria-label="Set Player 1 Symbol to O"
              >
                <i className={circleClass}></i>
              </button>
            </div>
          </div>
          <div className="mb-6 p-4 rounded-lg shadow-md dark:bg-slate-800">
            <label
              htmlFor="player2Name"
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            >
              Player 2 Name:
            </label>
            <input
              type="text"
              id="player2Name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-slate-700 dark:border-slate-500 dark:text-white"
              value={player2Name}
              onChange={(e) => setPlayer2Name(e.target.value)}
              placeholder="Enter Player 2 Name"
            />
          </div>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline w-full"
            onClick={handleStartGame}
          >
            Start Game
          </button>
        </div>
      </section>
    </div>
  );
};

export default StartPage;
