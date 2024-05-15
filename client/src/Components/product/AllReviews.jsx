import axios from "axios";
import React, { useEffect, useState } from "react";
import conf from "../../service/conf/conf";
import { StarRating } from "../index";
import convertDate from "../../service/date/convertDate";

function AllReviews({ id }) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [nextpage, setNextPage] = useState(false);
  const [prevpage, setPrevPage] = useState(false);
  const [reviewList, setReviewList] = useState([]);

  const searchReview = () => {
    axios
      .get(`${conf.URL}/api/v1/reviews/all?p=${id}&page=${page}&limit=${limit}`)
      .then(({ data }) => {
        if (data?.data) {
          setReviewList(data?.data?.docs || []);
          setNextPage(data?.data?.hasNextPage);
          setPrevPage(data?.data?.hasPrevPage);
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (id) {
      searchReview();
    }
  }, [id]);
  return (
    <div>
      <div className="my-6">
        {reviewList.length === 0 && (
          <span>
            No Reviews found for this product, Be first one to Review it.
          </span>
        )}
        {reviewList.map((item) => (
          <div key={item._id} className="p-3">
            <div className="flex justify-start items-start gap-3 h-6">
              <img
                src={item.avatar || "/avatar.svg"}
                alt="avatar"
                className="size-6 rounded-full"
              />
              <span className="text-xl font-cormorant">{item.userName}</span>
            </div>
            <div className="flex justify-start mt-2">
              <StarRating rating={item.rating} size={14} />
            </div>
            <div className="mt-2 flex flex-col gap-0">
              <span className="text-lg font-semibold">{item.title}</span>
              <span className="text-xs font-thin text-gray-500 dark:text-gray-300">
                Reviewed in {item.country} on{" "}
                {convertDate(item.updatedAt, true)}
              </span>
              <span className="text-lg mt-2 text-gray-900 dark:text-gray-50">
                {item.comment}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center gap-6">
        <button
          className={`${prevpage ? "" : "cursor-not-allowed"}`}
          onClick={() => {
            if (prevpage) {
              setPage((prev) => prev - 1);
              searchReview();
            }
          }}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>

        <button
          className={`${nextpage ? "" : "cursor-not-allowed"}`}
          onClick={() => {
            if (nextpage) {
              setPage((prev) => prev + 1);
              searchReview();
            }
          }}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}

export default AllReviews;
