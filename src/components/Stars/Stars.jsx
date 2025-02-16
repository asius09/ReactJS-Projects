import React, { useState } from "react";

const Stars = () => {
  const [selected, setSelected] = useState(-1);
  const [rating, setRating] = useState(-1);
  return (
    <section
      id="stars-section"
      className="w-screen h-screen bg-slate-950 flex justify-center items-center flex-col"
    >
      <div id="stars" className="flex gap-2">
        {Array.from({ length: 10 }).map((_, i) =>
          i <= (selected !== -1 ? selected : rating) ? (
            <i
              key={i}
              className="ri-star-fill text-7xl text-yellow-400"
              onMouseEnter={() => setSelected(i)}
              onMouseLeave={() => setSelected(-1)}
              onClick={() => setRating(i)}
            ></i>
          ) : (
            <i
              key={i}
              className="ri-star-line text-slate-500 text-7xl hover:text-yellow-400"
              onMouseEnter={() => setSelected(i)}
              onMouseLeave={() => setSelected(-1)}
              onClick={() => setRating(i)}
            ></i>
          )
        )}
      </div>
      <p className="text-white text-2xl mt-4">Rating: {rating + 1}</p>
    </section>
  );
};

export default Stars;
