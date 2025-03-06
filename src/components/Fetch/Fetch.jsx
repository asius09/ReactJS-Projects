import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";

const Fetch = () => {
  const [url, setUrl] = useState("");
  const [showData, setShowData] = useState(false);
  const { data, loading, error } = useFetch(url);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowData(true);
  };

  return (
    <section className="w-full min-h-[calc(100vh-5rem)] bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-slate-900 p-8">
      <div className="max-w-2xl mx-auto bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-purple-100 dark:border-purple-900">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent text-center">
          Fetch Data
        </h2>
        <form
          onSubmit={handleSubmit}
          className="mb-6 flex items-center space-x-2"
        >
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter API URL"
            className="flex-grow p-3 border rounded-lg text-gray-900 dark:text-gray-100 bg-white dark:bg-slate-700 border-purple-200 dark:border-purple-800 focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 transition-all focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 active:scale-95 shadow-md hover:shadow-lg"
          >
            Fetch
          </button>
        </form>
        {loading && (
          <p className="text-lg text-center text-blue-500 dark:text-blue-400 animate-pulse">
            Loading...
          </p>
        )}
        {error && (
          <p className="text-lg text-center text-red-500 dark:text-red-400">
            Error: {error}
          </p>
        )}
        {showData && data && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-700/50 dark:to-slate-800/50 p-6 rounded-lg shadow-inner border border-purple-100/50 dark:border-purple-900/30">
            <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap overflow-x-auto font-mono">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </section>
  );
};

export default Fetch;
