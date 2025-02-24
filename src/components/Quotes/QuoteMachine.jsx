import { useState, useEffect } from "react";

const QuoteMachine = () => {
  const [quoteData, setQuoteData] = useState({ id: "", quote: "", author: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const apiURL = "https://dummyjson.com/quotes/random";
      const response = await fetch(apiURL);
      if (!response.ok) throw new Error("Failed to fetch quote");
      const data = await response.json();
      setQuoteData({ id: data.id, quote: data.quote, author: data.author });
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <section
      id="quote-machine"
      className="w-full h-screen bg-gray-100 dark:bg-slate-950 flex flex-col justify-center items-center rounded-lg text-center"
    >
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 max-w-lg w-full border border-gray-200 dark:border-slate-700">
        <header className="mb-4">
          <h1 className="text-3xl font-extrabold text-center text-gray-900 dark:text-gray-100">
            Random Quote Machine
          </h1>
        </header>

        {loading ? (
          <div className="text-lg text-gray-700 dark:text-gray-300 font-semibold text-center">
            Loading...
          </div>
        ) : error ? (
          <div className="text-red-600 text-lg text-center">Error: {error}</div>
        ) : (
          <article className="mb-6">
            <blockquote className="text-2xl italic font-semibold mb-2 text-gray-900 dark:text-gray-100">
              "{quoteData.quote}"
            </blockquote>
            <cite className="text-lg font-medium text-gray-700 dark:text-gray-300">
              - {quoteData.author}
            </cite>
          </article>
        )}

        <footer className="flex flex-col items-stretch gap-4">
          <button
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={fetchQuote}
            disabled={loading}
            aria-label="Get new quote"
          >
            {loading ? "Loading..." : "Get New Quote"}
          </button>

          <a
            className="bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition text-center"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              `"${quoteData.quote}" - ${quoteData.author}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share quote on X.com"
          >
            <i className="ri-twitter-x-line align-middle mr-1"></i> Tweet Quote
          </a>
        </footer>
      </div>
    </section>
  );
};

export default QuoteMachine;
