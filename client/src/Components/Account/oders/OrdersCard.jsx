import React from "react";
import convertDate from "../../../service/date/convertDate.js";
import { Link } from "react-router-dom";

function OrdersCard({ data }) {
  return (
    <div className="w-full flex border-2 border-gray-400 dark:border-gray-300 rounded-lg my-5 p-2">
      <div className="w-32 h-full pt-3">
        <img
          src={data?.coverImage}
          alt={data?.itemsName}
          className="w-full aspect-square object-cover rounded-full"
        />
      </div>
      <div className="p-3">
        <h1 className="text-2xl text-lime-400 mb-6 line-clamp-1">
          {data?.itemsName}
        </h1>
        <h1 className="text-lg">
          Total Payment:
          <span className="dark:text-gray-300 text-gray-700 ml-2">
            {(Number(data?.total) / 100).toFixed(2)}
          </span>
        </h1>
        <h1 className="text-lg">
          Date Ordered:
          <span className="dark:text-gray-300 text-gray-700 ml-2">
            {convertDate(data?.createdAt)}
          </span>
        </h1>
        <h1 className="text-lg">
          Current Status:
          <span className="dark:text-gray-300 text-gray-700 ml-2">
            {data?.status}
          </span>
        </h1>

        <Link
          to={`/account/order?id=${data?._id}`}
          className="mt-6 text-blue-600"
        >
          More Details
        </Link>
      </div>
    </div>
  );
}

export default OrdersCard;
