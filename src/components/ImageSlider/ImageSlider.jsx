import React, { useState, useEffect } from "react";

const ImageSlider = () => {
  const [active, setActive] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const number = 10;
        const url = `https://picsum.photos/v2/list?page=2&limit=${number}`;
        const response = await fetch(url);
        const fetchedData = await response.json();
        setData(fetchedData);
      } catch (error) {
        console.error(`Fetch error: ${error}`);
      }
    }
    fetchData();
  }, []);

  const leftClick = () => {
    const dataLength = data.length || null;
    if (dataLength || active)
      active === dataLength - dataLength
        ? setActive(dataLength - 1)
        : setActive(active - 1);
  };

  const rightClick = () => {
    const dataLength = data.length || null;
    if (dataLength || active)
      active === dataLength - 1 ? setActive(0) : setActive(active + 1);
  };

  return (
    <section
      id="image-slider"
      className="w-full h-screen object-cover overflow-x-hidden relative bg-gray-100 dark:bg-slate-950"
    >
      <div
        className="w-[40px] h-[40px] bg-white dark:bg-slate-800 absolute z-100 rounded-full left-10 top-1/2 -translate-y-1/2 transition-all duration-200 hover:bg-gray-300 dark:hover:bg-slate-700 cursor-pointer grid place-items-center"
        onClick={() => leftClick()}
      >
        <i className="ri-arrow-left-line text-slate-800 dark:text-gray-300 hover:text-slate-900 dark:hover:text-gray-400 text-2xl"></i>
      </div>
      <div
        className="w-[40px] h-[40px] bg-white dark:bg-slate-800 absolute z-100 rounded-full right-10 top-1/2 -translate-y-1/2 transition-all duration-200 hover:bg-gray-300 dark:hover:bg-slate-700 cursor-pointer grid place-items-center"
        onClick={() => rightClick()}
      >
        <i className="ri-arrow-right-line text-slate-800 dark:text-gray-300 hover:text-slate-900 dark:hover:text-gray-400 text-2xl"></i>
      </div>

      {data.map((item, index) => (
        <React.Fragment key={item.id}>
          <img
            src={item.download_url}
            alt={item.author}
            className={`w-full h-full object-cover absolute left-0 top-0 ${
              index === active ? "opacity-100" : "opacity-0"
            } transition-all duration-200 ease-in`}
          />
          <div className="z-100 absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {data.map((_, i) => (
              <div
                key={i}
                className="h-[15px] w-[15px] rounded-full bg-gray-400 dark:bg-gray-600 p-0.5 cursor-pointer shadow-md hover:shadow-lg transition-all duration-200"
                onClick={() => setActive(i)}
              >
                <div
                  className={`w-full h-full rounded-full transition-colors ${
                    i === active ? "bg-gray-700 dark:bg-gray-400 shadow-inner" : "bg-transparent"
                  }`}
                />
              </div>
            ))}
          </div>
        </React.Fragment>
      ))}
    </section>
  );
};

export default ImageSlider;
