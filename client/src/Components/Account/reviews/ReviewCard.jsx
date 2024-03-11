import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
function ReviewCard({ data }) {
  const [star, setStar] = useState([]);

  useEffect(() => {
    for (let i = 1; i <= 5; i++) {
      if (i <= data?.rating) {
        setStar((prev) => [...prev, true]);
      } else {
        setStar((prev) => [...prev, false]);
      }
    }
  }, [data]);

  return (
    <div className="w-full flex border-2 border-gray-400 dark:border-gray-300 rounded-lg my-5 p-2">
      <div className="size-16 rounded-full overflow-hidden m-4 mr-0">
        <img
          src={data?.product?.images[0]}
          alt={data?.product?.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3 ml-2">
        <h1 className="text-2xl text-lime-400 mb-6">{data?.product?.name}</h1>
        <div className="space-x-1 flex justify-start items-center">
        <h1 className="text-xl mr-4">Ratings: </h1>
          {star.map((item) => {
            if (item) {
              return (
                <svg
                  key={uuid()}
                  className="w-4 h-4 mx-px fill-current text-orange-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 14 14"
                >
                  <path d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z"></path>
                </svg>
              );
            } else {
              return (
                <svg
                  key={uuid()}
                  className="w-4 h-4 mx-px fill-current text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 14 14"
                >
                  <path d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z"></path>
                </svg>
              );
            }
          })}
        </div>
        <h1 className="text-xl">Comment:  <span className="text-lg ml-2 dark:text-gray-300 text-gray-700">{data?.comment}</span></h1>
      </div>
    </div>
  );
}

export default ReviewCard;
