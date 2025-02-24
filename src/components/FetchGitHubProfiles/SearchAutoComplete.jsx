import React, { useState, useEffect } from "react";
import githubUsernames from "./githubUsernames";

const SearchAutoComplete = ({ userInput, setInput }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!userInput) {
      setSuggestions([]);
      return;
    }

    const filteredSuggestions = githubUsernames.filter((username) =>
      username.toLowerCase().startsWith(userInput.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  }, [userInput]);

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="relative w-full">
      <ul
        className={`absolute z-10 mt-1 w-full bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-md shadow-lg ${
          suggestions.length > 0 || userInput ? "block" : "hidden"
        }`}
      >
        {suggestions.length > 0 ? (
          suggestions.map((suggestion, idx) => (
            <li
              key={idx}
              className="px-4 py-2 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-slate-700 cursor-pointer transition-colors duration-200 rounded-md last:mb-0 text-sm"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))
        ) : userInput ? (
          <li className="px-4 py-2 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-md last:mb-0 text-sm">
            {`No results for "${userInput}"`}
          </li>
        ) : null}
      </ul>
    </div>
  );
};

export default SearchAutoComplete;
