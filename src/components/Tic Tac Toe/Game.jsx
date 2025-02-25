import React, { useState, useEffect, useCallback } from "react";
import Oponent from "./Oponent";
import StartPage from "./StartPage";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const Game = () => {
  const [winner, setWinner] = useLocalStorage("winner", null);
  const [board, setBoard] = useLocalStorage("board", Array(9).fill(null));
  const [user1, setUser1] = useLocalStorage("user1", {
    score: 0,
    login: "Player 1",
    avatarStyle: "ri-gamepad-fill bg-red-500 text-white",
    icon: "ri-close-fill",
  });
  const [user2, setUser2] = useLocalStorage("user2", {
    score: 0,
    login: "Player 2",
    avatarStyle: "ri-game-fill bg-purple-500 text-white",
    icon: "ri-circle-line",
  });
  const [startGame, setStartGame] = useLocalStorage("startGame", false);
  const [turn, setTurn] = useLocalStorage("turn", user1);
  const [highlighted, setHighlighted] = useLocalStorage("highlighted", null);
  const [isDraw, setIsDraw] = useLocalStorage("isDraw", false);
  const [showWinner, setShowWinner] = useState(false);

  const handleReset = useCallback(() => {
    setBoard(Array(9).fill(null));
    setTurn(user1);
    setWinner(null);
    setIsDraw(false);
    setHighlighted(null);
    setShowWinner(false);
  }, [
    setBoard,
    setTurn,
    setWinner,
    setIsDraw,
    setHighlighted,
    setShowWinner,
    user1,
  ]);

  const handleUserTurn = (index) => {
    if (board[index] || !turn || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn.icon;
    setBoard(newBoard);

    setTurn(turn === user1 ? user2 : user1);
  };

  const handleWinner = useCallback(
    (winnerUser) => {
      if (winnerUser === user2) {
        setUser2((prev) => ({ ...prev, score: prev.score + 1 }));
      } else if (winnerUser === user1) {
        setUser1((prev) => ({ ...prev, score: prev.score + 1 }));
      }
      setBoard(Array(9).fill(null));
      setTurn(winnerUser === user2 ? user1 : user2);
      setWinner(null);
      setIsDraw(false);
    },
    [setBoard, setTurn, setWinner, setIsDraw, setUser1, setUser2, user1, user2]
  );

  const checkWinner = useCallback(() => {
    for (let combination of winningPatterns) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        const winnerComb = [a, b, c];
        const winningIcon = board[a];
        const winnerUser = winningIcon === "ri-circle-line" ? user2 : user1;
        setWinner(winnerUser);
        setHighlighted(winnerComb);
        setShowWinner(true);
        setTimeout(() => {
          setHighlighted(null);
          setShowWinner(false);
          handleWinner(winnerUser);
        }, 3000);
        return;
      }
    }

    if (!board.includes(null)) {
      setWinner(null);
      setIsDraw(true);
      setTimeout(() => {
        setBoard(Array(9).fill(null));
        setTurn(user1);
        setIsDraw(false);
      }, 3000);
      return "draw";
    }

    return null;
  }, [
    board,
    setBoard,
    setTurn,
    setWinner,
    setIsDraw,
    setHighlighted,
    setShowWinner,
    handleWinner,
    user1,
    user2,
  ]);

  const handleRestart = useCallback(() => {
    setStartGame(false);
    handleReset();
    setUser1((prev) => ({ ...prev, score: 0 }));
    setUser2((prev) => ({ ...prev, score: 0 }));
  }, [setStartGame, handleReset, setUser1, setUser2]);

  useEffect(() => {
    try {
      checkWinner();
    } catch (error) {
      console.error("Error checking winner:", error);
    }
  }, [board, checkWinner]);

  const winningSquareStyle = "bg-green-400 shadow-lg border-4 border-green-500";
  const normalSquareStyle =
    "bg-white dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600";
  const crossClass = "ri-close-fill";
  const circleClass = "ri-circle-line";
  return (
    <div
      className={`relative flex flex-col items-center justify-center h-[calc(100vh-90px)] text-gray-900 dark:text-white rounded-lg transition-colors duration-300 ${
        startGame
          ? "bg-gray-100 dark:bg-slate-900"
          : "bg-gray-50 dark:bg-slate-800"
      }`}
    >
      {(isDraw || showWinner) && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 transition-opacity duration-500 ease-in-out animate-fade-in bg-transparent rounded-lg">
          <div className="p-8 rounded-lg flex flex-col items-center justify-center transition-colors duration-300 scale-100 animate-bounce-in shadow-xl bg-gray-100 dark:bg-slate-800">
            {isDraw ? (
              <>
                <h2 className="text-4xl font-extrabold text-gray-700 dark:text-gray-300 mb-4 animate-text-gradient">
                  Game Over!
                </h2>
                <p className="text-lg text-gray-500 dark:text-gray-400 text-center">
                  It's a Draw! Nobody wins this time.
                </p>
                <div className="flex justify-center items-center mt-4">
                  <span className="text-5xl animate-pulse text-gray-500 dark:text-gray-400">
                    🤝
                  </span>
                </div>
              </>
            ) : winner ? (
              <>
                <h2 className="text-4xl font-extrabold text-gray-700 dark:text-gray-300 mb-4 animate-text-gradient">
                  {`${winner.login} Wins!`}
                </h2>
                <p className="text-lg text-gray-500 dark:text-gray-400 text-center">
                  Congratulations, {winner.login}! You're the Tic Tac Toe
                  champion!
                </p>
                <div className="flex justify-center items-center mt-4">
                  <span className="text-5xl animate-bounce text-yellow-500">
                    🏆
                  </span>
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}
      <StartPage
        setUser1={setUser1}
        setUser2={setUser2}
        setStartGame={setStartGame}
        startGame={startGame}
      />
      <h1 className="text-3xl font-bold mb-8 transition-colors duration-300">
        Tic Tac Toe
      </h1>
      <div className="flex justify-around w-full mb-8 max-w-md md:max-w-2xl">
        <Oponent oponent={user1} />
        <Oponent oponent={user2} />
      </div>

      <div className="relative">
        <div
          className={`grid grid-cols-3 gap-4 relative z-10 ${
            showWinner || isDraw ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          {board.map((box, index) => {
            const isWinningSquare = highlighted?.includes(index);
            const squareStyle = isWinningSquare
              ? `${winningSquareStyle} animate-pulse`
              : normalSquareStyle;

            return (
              <div
                key={index}
                onClick={() => handleUserTurn(index)}
                className={`w-24 h-24 border-2 border-gray-300 dark:border-slate-500 flex items-center justify-center text-5xl font-bold cursor-pointer rounded-xl active:scale-95 transition-transform duration-200 ease-in-out ${squareStyle} text-gray-900 dark:text-white`}
              >
                {box ? (
                  <i
                    className={`${
                      box === "ri-circle-line" ? circleClass : crossClass
                    } text-6xl`}
                  ></i>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
      <div
        id="buttons"
        className="flex justify-center items-center w-full mt-8 space-x-4"
      >
        <button
          onClick={handleRestart}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300"
        >
          Re-Start Game
        </button>
        <button
          onClick={handleReset}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default Game;
