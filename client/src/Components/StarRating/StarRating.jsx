import React from "react";

function StarRating({ rating = 0, size = 4, color= "orange-600" }) {
  return (
    <div className="space-x-1 flex justify-center mt-10">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <svg
            key={i}
            className={`size-${size} mx-px fill-current ${rating >= i ? `text-${color}` : "text-gray-300"} `}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 14"
          >
            <path d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z"></path>
          </svg>
        ))}
    </div>
  );
}

export default StarRating;
