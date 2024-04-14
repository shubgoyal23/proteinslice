import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";
import { StarRating } from "../index";

function Card({
  images,
  name,
  description,
  price,
  _id,
  discount,
  currency,
  rating,
}) {
  const [cardAdded, setCardAdded] = useState(false);
  const dispatch = useDispatch();
  const globalCart = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  useEffect(() => {
    globalCart.some((item) => item._id === _id) ? setCardAdded(true) : "";
  }, []);

  function addtoCartHandler() {
    if (!cardAdded) {
      dispatch(
        addItem({
          image: images[0],
          name,
          description,
          price,
          _id,
          discount,
          Qty: 1,
        })
      );
      setCardAdded(true);
    } else {
      navigate("/checkout");
    }
  }

  return (
    <>
      <section className="p-5 py-10 dark:bg-gray-900 bg-gray-50 rounded-lg text-center transform duration-500 hover:-translate-y-2 cursor-pointer shadow-xl dark:shadow-gray-900 shadow-gray-300">
        <img
          src={images[0]}
          alt={name}
          className="rounded-lg h-96 w-full object-cover"
        />
        <div className="space-x-1 flex justify-center mt-10">
          <StarRating rating={rating} />
        </div>
        <h1 className="text-3xl my-5 line-clamp-2">{name}</h1>
        <p className="mb-5 line-clamp-3">{description}</p>
        <h2 className="font-semibold mb-5 text-lime-500">
          <span className="line-through text-red-600 mr-3">
            {currency === "USD" ? "$" : "₹"} {price}
          </span>
          <span className="text-lime-500">
            {currency === "USD" ? "$" : "₹"}{" "}
            {((price * (100 - discount)) / 100).toFixed(2)}
          </span>
        </h2>

        <button
          className="p-2 px-6 bg-purple-700 text-white rounded-md hover:bg-purple-600"
          onClick={addtoCartHandler}
        >
          {cardAdded ? "Proceed to Checkout" : "Add To Cart"}
        </button>
      </section>
    </>
  );
}

export default Card;
