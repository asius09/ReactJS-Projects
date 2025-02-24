import React, { useState } from "react";
import { useGithubFetch } from "../../Custom";
import SearchAutoComplete from "./SearchAutoComplete.jsx";

const GithubSearch = () => {
  const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("asius09");

  function handleChange(e) {
    setInput(e.target.value.trim(""));
  }

  function handleSearch() {
    setInput("");
    input !== "" ? setSearchTerm(input) : null;
  }

  const { user, loading, error } = useGithubFetch(searchTerm);

  return (
    <section
      id="github-search"
      className="w-full h-fit min-h-[calc(100vh-90px)] bg-gray-100 dark:bg-slate-900 rounded-lg shadow-md p-6 flex flex-col items-center transition-colors duration-300"
    >
      <h1 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        GitHub Profile Search
      </h1>
      <div
        id="search-box"
        className="w-full flex justify-center items-center gap-4 mb-6"
      >
        <div className="w-1/2">
          <input
            type="text"
            value={input}
            onChange={(e) => handleChange(e)}
            placeholder="Enter Username"
            className="px-4 py-2 outline-none rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-300 w-full border border-gray-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-purple-500 transition-colors duration-300 text-sm"
          />
          <SearchAutoComplete userInput={input} setInput={setInput} />
        </div>
        <button
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-md hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {loading && (
        <div className="text-center">
          <svg
            className="animate-spin h-5 w-5 mr-3 text-blue-500 dark:text-purple-500 inline-block"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p>Loading...</p>
        </div>
      )}
      {error && (
        <div className="text-center">
          <p className="text-red-500">Error: {error}</p>
        </div>
      )}

      {user && (
        <div className="flex flex-col items-center p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md w-full max-w-md transition-colors duration-300">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="rounded-full w-32 h-32 mb-4 border-4 border-blue-500 dark:border-purple-500 transition-colors duration-300"
          />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-300">
            {user.name || user.login}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-4 transition-colors duration-300">
            {user.bio || "No bio available"}
          </p>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline mt-2 transition-colors duration-300"
          >
            View on GitHub
          </a>
          <div className="mt-4 flex justify-around w-full">
            <div className="text-center">
              <p className="font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-300">
                {user.followers}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                Followers
              </p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-300">
                {user.following}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                Following
              </p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-300">
                {user.public_repos}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                Repos
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GithubSearch;
