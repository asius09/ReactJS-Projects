import { useState, useEffect } from "react";

const QuoteMachine = () => {
  const [quoteData, setQuoteData] = useState({ id: "", quote: "", author: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

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
  }, [refreshTrigger]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-blue-950 p-4">
      <section className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full text-center border-4 border-black">
        <header>
          <h1 className="text-2xl font-bold mb-4">Random Quote Machine</h1>
        </header>

        {loading ? (
          <div role="status" className="text-lg text-gray-700 font-semibold">
            Loading...
          </div>
        ) : error ? (
          <div role="alert" className="text-red-600 text-lg">
            Error: {error}!
          </div>
        ) : (
          <article>
            <blockquote className="text-xl font-semibold mb-2">
              "{quoteData.quote}"
            </blockquote>
            <cite className="text-lg font-medium text-gray-700">
              - {quoteData.author}
            </cite>
          </article>
        )}

        <footer className="mt-6 flex flex-col gap-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            onClick={() => {
              setRefreshTrigger((prev) => !prev);
            }}
            aria-label="Get new quote"
          >
            {loading ? "Loading..." : "Get New Quote"}
          </button>

          <nav>
            <a
              className="inline-block text-blue-500 hover:text-blue-700 text-lg font-semibold"
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                `"${quoteData.quote}" - ${quoteData.author}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share quote on X.com"
            >
              {loading
                ? "Loading..."
                : <><i className="ri-twitter-x-line"></i> Quote</>}
            </a>
          </nav>
        </footer>
      </section>
    </main>
  );
};

export default QuoteMachine;
