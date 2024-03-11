import React from "react";
import convertDate from "../../../service/date/convertDate.js";

function OrdersCard({ data }) {
  return (
    <div className="w-full flex border-2 border-gray-400 dark:border-gray-300 rounded-lg my-5 p-2">
      <div className="size-16 rounded-full overflow-hidden m-4 mr-0">
        <img
          src={data?.productslist[0]?.images[0]}
          alt={data?.productslist[0]?.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3 ml-2">
        <h1 className="text-2xl text-lime-400 mb-6 line-clamp-1">
          {data?.productslist?.map((item) => (
            <span key={item._id}>{item.name}, </span>
          ))}
        </h1>
        <h1 className="text-lg">
          Total Payment:{" "}
          <span className="dark:text-gray-300 text-gray-700 ml-2">
            {" "}
            {(Number(data?.total) / 100).toFixed(2)}
          </span>
        </h1>
        <h1 className="text-lg">
          Date Ordered:{" "}
          <span className="dark:text-gray-300 text-gray-700 ml-2">
            {convertDate(data?.createdAt)}
          </span>{" "}
        </h1>
        <h1 className="text-lg">
          Current Status:{" "}
          <span className="dark:text-gray-300 text-gray-700 ml-2">
            {data?.status}
          </span>{" "}
        </h1>

        <button className="mt-6 text-blue-600">More Details</button>
      </div>
    </div>
  );
}

export default OrdersCard;
