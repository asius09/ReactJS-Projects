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
      style={{
        width: "100%",
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#1E293B",
        color: "white",
      }}
    >
      <div
        id="product-container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "10px",
        }}
      >
        {data.map((item) => (
          <div
            key={item.id}
            style={{
              border: "2px solid white",
              padding: "10px",
              textAlign: "center",
            }}
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              loading="lazy"
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />
            <p>{item.title}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => setCount((prev) => prev + 1)}
        onMouseEnter={handlePreload}
        onMouseLeave={cancelPreload}
        disabled={disabledBtn || loading}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: disabledBtn ? "#555" : "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: disabledBtn ? "not-allowed" : "pointer",
          transition: "0.3s",
        }}
      >
        {loading ? "Loading..." : "Load More"}
      </button>

      {disabledBtn && (
        <p style={{ marginTop: "10px", color: "#AAA" }}>
          You have reached the bottom
        </p>
      )}
    </section>
  );
};

export default LoadMore;
