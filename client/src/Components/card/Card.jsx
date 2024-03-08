import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";

function Card({ images, name, description, price, _id, discount, currency }) {
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
         <section className="p-5 py-10 dark:bg-gray-900 bg-gray-50 rounded-lg text-center transform duration-500 hover:-translate-y-2 cursor-pointer">
            <img
               src={images[0]}
               alt={name}
               className="rounded-lg h-96 w-full object-cover"
            />
            <div className="space-x-1 flex justify-center mt-10">
               <svg
                  className="w-4 h-4 mx-px fill-current text-orange-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 14 14"
               >
                  <path d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z"></path>
               </svg>
               <svg
                  className="w-4 h-4 mx-px fill-current text-orange-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 14 14"
               >
                  <path d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z"></path>
               </svg>
               <svg
                  className="w-4 h-4 mx-px fill-current text-orange-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 14 14"
               >
                  <path d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z"></path>
               </svg>
               <svg
                  className="w-4 h-4 mx-px fill-current text-orange-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 14 14"
               >
                  <path d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z"></path>
               </svg>
               <svg
                  className="w-4 h-4 mx-px fill-current text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 14 14"
               >
                  <path d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z"></path>
               </svg>
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
