import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Items from "./Items";
import { Link } from "react-router-dom";

function Checkout() {
  const cart = useSelector((state) => state.cart.items);

  const total = cart.reduce((accumulator, currentValue) => {
    let value =
      (currentValue.price * currentValue.Qty * (100 - currentValue.discount)) /
      100;
    return accumulator + value;
  }, 0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="lg:p-6 p-3 flex flex-col lg:flex-row">
      <div className="min-h-72 min-w-60 flex-1 mt-4 lg:m-4 bg-gray-200 dark:bg-gray-600 rounded-lg lg:p-6 p-3 pt-10 pb-16 flex justify-start flex-col items-center">
        <div className="border-b-2 border-gray-700 dark:border-gray-300 w-full pb-2 mb-4">
          <h1 className="text-2xl">CheckOut</h1>
        </div>

        {cart.length === 0 ? <h1>Your cart is Empty</h1> : ""}

        {cart?.map((item) => (
          <Items data={item} key={item.id} />
        ))}

        <div className="border-t-2 border-gray-700 dark:border-gray-300 w-full pt-2 mt-4">
          <h1 className="text-2xl text-end">
            Subtotal ({cart.length} items): {cart[0]?.currency || "$"}{total?.toFixed(2)}
          </h1>
        </div>
      </div>

      <div className="lg:size-72 text-center w-full bg-gray-200 dark:bg-gray-600 mt-4 py-6 rounded-lg">
        <h1 className="text-2xl mt-6">
          Total : {cart[0]?.currency || "$"}
          {total?.toFixed(2)}
        </h1>

        <div className="dark:bg-gray-500 bg-gray-300 rounded-full h-8 mx-auto w-4/5 pl-3 mt-4 flex justify-center items-center">
          <input
            type="text"
            placeholder="Apply Promo Code"
            className="outline-none dark:bg-gray-500 bg-gray-300 w-4/5"
          />
          <button className="w-1/5">
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>

        <Link to={"/payment"}>
          <button className="my-4 h-12 w-4/5 px-6 rounded-full bg-amber-400 text-white">
            Proceed to Buy
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Checkout;
