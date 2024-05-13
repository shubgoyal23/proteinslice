import React from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { removeItem, changeQty } from "../../store/cartSlice";

function Items({ data }) {
   const dispatch = useDispatch();

   function changeQtyHandler(e) {
      dispatch(changeQty({ ...data, Qty: e.target.value }));
   }

   return (
      <div className="w-full flex justify-start flex-col md:flex-row mb-6">
         <div className="w-2/5 md:w-1/5 aspect-square rounded-md overflow-hidden m-3 mx-auto">
            <img
               src={data.image}
               alt={data.name}
               className="w-full h-full object-cover"
            />
         </div>
         <div className="w-full md:w-4/5 md:ml-3 px-3 border-b-[1px] border-gray-500">
            <h1 className="text-xl text-lime-500">{data.name}</h1>
            <h1 className="text-sm dark:text-gray-300 text-gray-700">
               {data.description}
            </h1>
            <p className="mt-6 text-xs">In stock </p>
            <p className="text-xs mb-6">Eligible for FREE Shipping</p>
            <div className="flex gap-2 justify-between items-start w-full mb-3 md:flex-row">
               <select
                  name="quantity"
                  id=""
                  className="w-20 text-center h-8 cursor-pointer dark:bg-gray-500 bg-gray-300 mr-3 outline-none rounded-full"
                  value={data.Qty}
                  onChange={changeQtyHandler}
               >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
                     return (
                        <option value={i} key={uuid()}>
                           {i}
                        </option>
                     );
                  })}
               </select>
               <button
                  className="dark:text-gray-300 text-gray-500 underline"
                  onClick={() => dispatch(removeItem(data))}
               >
                  delete
               </button>
               <button className="dark:text-gray-300 text-gray-500 underline">
                  <i className="fa-regular fa-heart"></i>
               </button>

               <span className="text-end text-lime-400">
                  Per Unit : {data.currency}{(data.price).toFixed(2)}
               </span>
            </div>
            <div className="flex gap-2 justify-between items-center w-full md:w-auto mt-6">
               <span className="text-sm text-red-500">
                  Discount {data.discount}%
               </span>
               <span className="text-sm text-gray-600 dark:text-gray-300">
                  Price After Discount{" "} {data.currency}
                  {((data.price * (100 - data.discount)) / 100).toFixed(2)}
               </span>
               <span className="text-end text-amber-400">
                  Total :{" "} {data.currency}
                  {(
                     (data.price * data.Qty * (100 - data.discount)) /
                     100
                  ).toFixed(2)}
               </span>
            </div>
         </div>
      </div>
   );
}

export default Items;
