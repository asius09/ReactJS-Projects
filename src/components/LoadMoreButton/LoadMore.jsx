import React, { useEffect, useState } from "react";

const LoadMore = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [disabledBtn, setDisableBtn] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      setLoading(true);
      const limit = 20;
      if (count >= 5) return setDisableBtn(true);

      try {
        const url = `https://dummyjson.com/products?limit=${limit}&skip=${
          count * limit
        }`;
        const response = await fetch(url, { signal: controller.signal });
        const result = await response.json();

        if (result?.products?.length) {
          setData((prev) => [...prev, ...result.products]);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          console.log("Error Message", err);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    return () => controller.abort();
  }, [count]);

  return (
    <section
      id="load-more-data"
      className="w-screen bg-slate-950 flex flex-col justify-center items-center gap-4 p-4"
    >
      <div
        id="product-container"
        className="w-full grid grid-cols-5 gap-2 text-white"
      >
        {data.map((item) => (
          <div
            key={item.id}
            className="border-2 border-white flex flex-col justify-between"
          >
            <img src={item.thumbnail} alt={item.title} />
            <p className="text-center font-medium text-md">{item.title}</p>
          </div>
        ))}
      </div>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-3xl font-bold hover:bg-blue-400 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 disabled:hover:bg-blue-600 transition-transform"
        onClick={() => setCount(count + 1)}
        disabled={disabledBtn}
      >
        {loading ? "Loading..." : "Load More"}
      </button>
      {
        disabledBtn ? <p className="text-xl font-semibold text-gray-400">You have reach the bottom</p>: null
      }
    </section>
  );
};

export default LoadMore;
