import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import conf from "../../service/conf/conf";
import axios from "axios";
import toast from "react-hot-toast";

function AddProductReview({ id }) {
  const user = useSelector((state) => state.authentication.userData);
  const [userRatingStars, setUserRatingStars] = useState(1);
  const [alreadyreviewd, setAlreadyreviewd] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const deleteReviewHandler = () => {
    let ReviewDeleteRequest = axios.delete(
      `${conf.URL}/api/v1/reviews?product=${id}`,
      {
        withCredentials: true,
      }
    );

    toast.promise(ReviewDeleteRequest, {
      loading: "Deleting Review...",
      success: (data) => {
        if (data?.data?.success) {
          reset();
          setUserRatingStars(1);
          setAlreadyreviewd(false);
        }
        return `${data?.data?.message}`;
      },
      error: (error) => `${error.response?.data?.message || error.message}`,
    });
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`${conf.URL}/api/v1/reviews?p=${id}`, {
          withCredentials: true,
        })
        .then(({ data }) => {
          if (data?.data) {
            setAlreadyreviewd(true);
            setValue("title", data.data.title);
            setValue("comment", data.data.comment);
            setUserRatingStars(data.data.rating);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  const submitReview = (data) => {
    let ReviewSubmitRequest;

    if (alreadyreviewd) {
      ReviewSubmitRequest = axios.patch(
        `${conf.URL}/api/v1/reviews/`,
        { ...data, rating: userRatingStars, product: id },
        {
          withCredentials: true,
        }
      );
    } else {
      ReviewSubmitRequest = axios.post(
        `${conf.URL}/api/v1/reviews/`,
        { ...data, rating: userRatingStars, product: id },
        {
          withCredentials: true,
        }
      );
    }

    toast.promise(ReviewSubmitRequest, {
      loading: "Adding Review...",
      success: (data) => {
        if (data?.data?.data) {
          setAlreadyreviewd(true);
        }
        return `${data?.data?.message}`;
      },
      error: (error) => `${error.response?.data?.message || error.message}`,
    });
  };
  return (
    <div className="w-full">
      {user ? (
        <div>
          <form className="max-w-sm" onSubmit={handleSubmit(submitReview)}>
            <div>
              <h1 className="text-lg font-medium text-purple-700 mt-4 mb-4">
                {alreadyreviewd ? "Edit Your Review" : "Add a New Review"}
              </h1>
            </div>
            <div className="mb-3">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                How would you rate it?
              </label>
              {[1, 2, 3, 4, 5].map((item) => (
                <label key={item} htmlFor={`rating-${item}`}>
                  <i
                    className={`fa-solid fa-star ${
                      item <= userRatingStars
                        ? "text-orange-500"
                        : "text-gray-300"
                    } hover:text-orange-500 text-xl hover:scale-125 cursor-pointer mx-1`}
                  />
                  <input
                    type="radio"
                    name="rating"
                    value={item}
                    id={`rating-${item}`}
                    className="hidden"
                    onChange={() => setUserRatingStars(item)}
                  />
                </label>
              ))}
            </div>
            <div className="mb-5">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Title Your Review
              </label>
              <input
                type="text"
                id="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="What's most important to know?"
                {...register("title", {maxLength: 50})}
              />
              {errors.title && (
                <span className="text-xs text-red-600">
                  Maximum 50 char allowed
                </span>
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="comment"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Write your review
              </label>
              <textarea
                type="text"
                id="comment"
                placeholder="What did you like or dislike? What did you use this product for?"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("comment", {maxLength: 300})}
              />
              {errors.comment && (
                <span className="text-xs text-red-600">
                  Maximum 300 char allowed
                </span>
              )}
            </div>

            <button
              type="submit"
              className="text-white mb-3 bg-lime-500 hover:bg-amber-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {alreadyreviewd ? "Edit Your Review" : "Submit"}
            </button>
            {alreadyreviewd ? (
              <button
                type="button"
                className="text-white bg-lime-500 hover:bg-amber-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-500 dark:focus:ring-red-800"
                onClick={deleteReviewHandler}
              >
                Delete Your Review
              </button>
            ) : (
              ""
            )}
          </form>
        </div>
      ) : (
        <div>
          <h3>Login To Review this Product.</h3>
          <Link to={"/login"}>Click Here To Login</Link>
        </div>
      )}
    </div>
  );
}

export default AddProductReview;
