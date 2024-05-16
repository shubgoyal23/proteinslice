import React from "react";

function StarRating({ rating = 1, size = 16, color = "#d97706" }) {
  return (
    <>
      <div className="space-x-1 flex justify-center">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <i
              key={i}
              className={`fa-solid fa-star mx-px fill-current`}
              style={{
                fontSize: size,
                color: rating >= i + 1 ? color : "#d1d5db",
              }}
            ></i>
          ))}
      </div>
    </>
  );
}

export default StarRating;
