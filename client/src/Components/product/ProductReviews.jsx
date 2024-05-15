import React, { useEffect, useState } from "react";
import AddProductReview from "./AddProductReview";
import AllReviews from "./AllReviews";

function ProductReviews({ id }) {
  const [showReviewBar, setShowReviewBar] = useState(false);
  const [showReviews, setShowReview] = useState(true);
  useEffect(() => {}, []);
  return (
    <div className="w-full">
      <h2 className="text-2xl underline-offset-4 underline text-lime-500">
        Reviews and Ratings
      </h2>

      <div className="w-full overflow-hidden">
        <button
          className="w-full flex justify-between items-center text-xl mt-6"
          onClick={() => setShowReviewBar((prev) => !prev)}
        >
          <span className="text-amber-500">Add Product Review</span>
          <span>
            {showReviewBar ? (
              <i className="fa-solid fa-caret-up"></i>
            ) : (
              <i className="fa-solid fa-caret-down"></i>
            )}
          </span>
        </button>
        <div
          className={`${showReviewBar ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"} overflow-hidden grid transition-all ease-linear duration-300`}
        >
          <div className={`overflow-hidden`}>
            <AddProductReview id={id} />
          </div>
        </div>
      </div>

      <div className="w-full overflow-hidden">
        <button
          className="w-full flex justify-between items-center text-xl mt-6"
          onClick={() => setShowReview((prev) => !prev)}
        >
          <span className="text-amber-500">Customers Reviews</span>
          <span>
            {showReviews ? (
              <i className="fa-solid fa-caret-up"></i>
            ) : (
              <i className="fa-solid fa-caret-down"></i>
            )}
          </span>
        </button>
        <div
          className={`${showReviews ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"} overflow-hidden grid transition-all ease-linear duration-300`}
        >
          <div className={`overflow-hidden`}>
            <AllReviews id={id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductReviews;
