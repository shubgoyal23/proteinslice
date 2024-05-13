import React from "react";
import { useDispatch } from "react-redux";
import { removeItem, addQty, decreaseQty } from "../../store/cartSlice";

function Items({ data }) {
  const dispatch = useDispatch();

  return (
    <div className="w-full flex justify-start mb-3">
      <div className="w-1/5 max-w-20 aspect-square rounded-md overflow-hidden m-3 mx-auto">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-4/5 md:ml-3 px-3 border-b-[1px] border-gray-500">
        <h1 className="text-xl text-lime-500">{data.name}</h1>

        <div className="flex gap-2 justify-between items-start w-full my-2 md:flex-row">
          <div>
            <button
              className="size-6 dark:bg-gray-500 bg-gray-300 rounded-full text-red-500"
              onClick={() => dispatch(decreaseQty(data))}
            >
              -
            </button>
            <span className="mx-3">{data.Qty}</span>
            <button
              className="size-6 dark:bg-gray-500 bg-gray-300 rounded-full text-lime-500"
              onClick={() => dispatch(addQty(data))}
            >
              +
            </button>
          </div>
          <button
            className="dark:text-gray-300 text-gray-500 underline"
            onClick={() => dispatch(removeItem(data))}
          >
            delete
          </button>
        </div>
        <div className="flex gap-2 justify-between items-center w-full md:w-auto mt-2">
          <span className="text-sm text-red-500">
            Discount {data.discount}%
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Price:{" "}
            <span className="text-red-500 line-through mr-1">
              {data?.currency}
              {data.price.toFixed(2)}
            </span>
            <span className="text-lime-500">
              {data?.currency}
              {((data.price * (100 - data.discount)) / 100).toFixed(2)}
            </span>
            <span className="dark:text-white text-gray-800"> x </span>
            <span className="text-lime-500">{data.Qty}</span>
            <span className="dark:text-white text-gray-800"> = </span>
            <span className="text-amber-500">
              {data?.currency || "$"}
              {(
                ((data.price * (100 - data.discount)) / 100) *
                data.Qty
              ).toFixed(2)}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Items;
