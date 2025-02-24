import React, { useEffect, useState, useRef, useCallback } from "react";

const LoadMore = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const preloadRef = useRef(null);
  const initialLoad = useRef(true);

  // Function to Fetch Data
  const fetchData = useCallback(
    async (isPreload = false) => {
      if (disabledBtn || count >= 5) return setDisabledBtn(true);
      if (!isPreload) setLoading(true);

      try {
        const limit = 20;
        const url = `https://dummyjson.com/products?limit=${limit}&skip=${
          count === 0 ? 0 : count * limit
        }`;
        const response = await fetch(url);
        const result = await response.json();

        if (result?.products?.length) {
          setData((prev) => [...prev, ...result.products]);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    },
    [count, disabledBtn]
  );

  // Fetch data on count change
  useEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false;
      return;
    }
    fetchData();
  }, [fetchData]);

  // Preload next batch when hovering over the "Load More" button
  const handlePreload = () => {
    if (preloadRef.current || disabledBtn) return;
    preloadRef.current = setTimeout(() => fetchData(true), 500);
  };

  // Cancel preload on mouse leave
  const cancelPreload = () => {
    clearTimeout(preloadRef.current);
    preloadRef.current = null;
  };

  return (
    <section
      id="load-more-data"
      className="w-full h-auto bg-gray-100 dark:bg-slate-950 text-gray-900 dark:text-gray-300 rounded-lg"
    >
      <div id="product-container" className="grid grid-cols-5 gap-2 py-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="border-2 border-gray-300 dark:border-slate-700 p-2 text-center rounded-lg"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              loading="lazy"
              className="w-full h-32 object-cover"
            />
            <p>{item.title}</p>
          </div>
        ))}
      </div>
      <div
        id="load-more-btn"
        className="w-full flex justify-center items-center"
      >
        <button
          onClick={() => setCount((prev) => prev + 1)}
          onMouseEnter={handlePreload}
          onMouseLeave={cancelPreload}
          disabled={disabledBtn || loading}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
        >
          {loading ? "Loading..." : "Load More"}
        </button>

        {disabledBtn && (
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            You have reached the bottom
          </p>
        )}
      </div>
    </section>
  );
};

export default LoadMore;
