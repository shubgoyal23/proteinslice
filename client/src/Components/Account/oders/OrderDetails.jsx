import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import conf from "../../../service/conf/conf";
import convertDate from "../../../service/date/convertDate";

function OrderDetails() {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [ordersDetails, setOrdersDetails] = useState([]);

  useEffect(() => {
    if (!id) return;
    axios
      .get(`${conf.URL}/api/v1/orders/${id}`, { withCredentials: true })
      .then(({ data }) => {
        setOrdersDetails(data?.data[0]);
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <div className="w-full h-full">
      <h1 className="text-xl font-semibold underline mb-3">Order Details</h1>
      <div className="w-full border-2 border-gray-400 dark:border-gray-300 rounded-lg my-5 p-2">
        <div className="p-3">
          <h1 className="text-2xl text-lime-400 mb-6 line-clamp-1">
            {ordersDetails?.itemsName}
          </h1>
          <h1 className="text-lg">
            Order Id:
            <span className="dark:text-gray-300 text-gray-700 ml-2">
              {ordersDetails?._id}
            </span>
          </h1>
          <h1 className="text-lg">
            Total Payment:
            <span className="dark:text-gray-300 text-gray-700 ml-2">
              {(Number(ordersDetails?.total) / 100).toFixed(2)}
            </span>
          </h1>
          <h1 className="text-lg">
            Date Ordered:
            <span className="dark:text-gray-300 text-gray-700 ml-2">
              {convertDate(ordersDetails?.createdAt)}
            </span>
          </h1>
          <h1 className="text-lg">
            Current Status:
            <span className="dark:text-gray-300 text-gray-700 ml-2">
              {ordersDetails?.status}
            </span>
          </h1>
        </div>
        <div className="p-3">
          <h1 className="text-xl underline mb-2">Items Details</h1>
          <div>
            {ordersDetails?.items?.map((item, i) => (
              <div
                key={i}
                className="w-full flex border border-gray-400/10 dark:border-gray-300/10 rounded-lg mb-5 p-2"
              >
                <div className="w-32 h-full pt-3">
                  <img
                    src={item?.product[0]?.images[0]}
                    alt={item?.product[0]?.name}
                    className="w-full aspect-square object-cover rounded-full"
                  />
                </div>
                <div className="p-3">
                  <Link to={`/`} className="text-xl text-amber-500 line-clamp-1">
                    {item?.product[0]?.name}
                  </Link >
                  <h1 className="text-base dark:text-gray-300 text-gray-700 mb-2 line-clamp-1">
                    {item?.product[0]?.description}
                  </h1>
                  <h1 className="text-base">
                    Original Price
                    <span className="dark:text-gray-300 text-gray-700 ml-2">
                      {item?.product[0]?.price}
                    </span>
                  </h1>
                  <h1 className="text-base">
                    Offer Price
                    <span className="dark:text-gray-300 text-gray-700 ml-2">
                      {(Number(item?.price) / 100).toFixed(2)}
                    </span>
                  </h1>
                  <h1 className="text-base">
                    Quanatity Ordered:
                    <span className="dark:text-gray-300 text-gray-700 ml-2">
                      {item?.quantity}
                    </span>
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
