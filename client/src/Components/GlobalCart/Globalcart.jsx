import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Items from "./Items";
import { useNavigate } from "react-router-dom";

function GlobalCart() {
  const cartSlice = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const total = cart.reduce((accumulator, currentValue) => {
    let value =
      (currentValue.price * currentValue.Qty * (100 - currentValue.discount)) /
      100;
    return accumulator + value;
  }, 0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    (async () => {
      
      const data = await currencyConvert(userCurrency, currency, price);
      if (data) {
        setDisplayPrice(data);
      }
    })();
  }, [cartSlice]);

  return (
    <div className="lg:p-6 p-3 flex flex-col lg:flex-row">
      <div className="min-h-72 min-w-60 flex-1 mt-4 lg:m-4 bg-gray-200 dark:bg-gray-600 rounded-lg lg:p-6 p-3 pt-10 pb-16 flex justify-start flex-col items-center">
        <div className="border-b-2 border-gray-700 dark:border-gray-300 w-full pb-2 mb-4">
          <h1 className="text-2xl">Cart</h1>
        </div>

        {cart.length === 0 ? <h1>Your cart is Empty</h1> : ""}

        {cart?.map((item) => (
          <Items data={item} key={item.id} />
        ))}

        <div className="border-t-2 border-gray-700 dark:border-gray-300 w-full pt-2 mt-4">
          <h1 className="text-2xl text-end">
            Subtotal ({cart.length} items): {cart[0]?.currency || "$"}
            {total?.toFixed(2)}
          </h1>
        </div>

        <button
          className="mt-10 h-12 w-4/5 px-6 rounded-full bg-amber-400 text-white"
          onClick={() => navigate("/checkout")}
        >
          Proceed to CheckOut
        </button>
      </div>
    </div>
  );
}

export default GlobalCart;
