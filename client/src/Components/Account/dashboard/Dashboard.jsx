import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Dashboard() {
  const user = useSelector((state) => state.authentication.userData);
  const order = null;
  return (
    <div className="w-full">
      <div className="border-2 border-gray-600 bg-gray-50 dark:bg-gray-700 p-2 pl-4 rounded-lg mb-10">
        <h1 className="mb-2 text-amber-400 font-bold text-xl">
          Account Profile
        </h1>
        <p className="text-gray-400">Email: {user?.email}</p>
        <p className="text-gray-400">Mobile: {user?.phone}</p>
        <p className="text-gray-400">Password: ********</p>
        <Link to={"/account/edit"}>
          <h1 className="text-sm text-blue-400 text-center mt-2">
            Edit Details
          </h1>
        </Link>
      </div>
      <div className="border-2 border-gray-600 bg-gray-50 dark:bg-gray-700 p-2 pl-4 rounded-lg mb-10">
        <h1 className="mb-2 text-amber-400 font-bold text-xl">
          Billing Address
        </h1>
        <p className="text-gray-400">house: {user?.address?.house}</p>
        <p className="text-gray-400">Street: {user?.address?.street}</p>
        <p className="text-gray-400">Pin Code: {user?.address?.zip}</p>
        <Link to={"/account/address"}>
          <h1 className="text-sm text-blue-400 text-center mt-2">
            Edit Details
          </h1>
        </Link>
      </div>
      <div className="border-2 border-gray-600 bg-gray-50 dark:bg-gray-700 p-2 pl-4 rounded-lg mb-10">
        <h1 className="mb-2 text-amber-400 font-bold text-xl">
          Most Recent Order
        </h1>
        <p className="text-gray-400">Oder ID: {order?._id}</p>
        <p className="text-gray-400">
          Price: {(order?.total / 100)?.toFixed(2)}
        </p>
        <p className="text-gray-400">Status: {order?.status}</p>
        <Link to={"/account/edit"}>
          <h1 className="text-sm text-blue-400 text-center mt-2">
            View Details
          </h1>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
