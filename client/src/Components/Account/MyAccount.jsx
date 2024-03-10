import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

function MyAccount() {
  const user = useSelector((state) => state.authentication.userData);
  return (
    <>
      <h1 className="text-center text-3xl mt-6 font-bold">Account Dashboard</h1>

      <div className="w-full flex">
        <div className="h-full lg:w-1/5 sm:w-2/5 p-3 pl-5 dark:bg-gray-700 bg-gray-100 ml-4 mt-14 rounded-lg">
          <div className="w-full">
            <h1 className="text-lime-400 text-xl underline mb-5">My Account</h1>

            <ul>
              <li className="mb-1 text-gray-400 cursor-pointer">
                <Link to="/account">Account Dashboard</Link>
              </li>
              <li className="mb-1 text-gray-400 cursor-pointer">
                <Link to="/account/edit">Edit User Details</Link>
              </li>
              <li className="mb-1 text-gray-400 cursor-pointer">
                <Link to="/account/address">Edit Address Details</Link>
              </li>
              <li className="mb-1 text-gray-400 cursor-pointer">
                <Link to="/account/orders">All Oders</Link>
              </li>
              <li className="mb-1 text-gray-400 cursor-pointer">
                <Link to="/account/reviews">Reveiws</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="h-full flex-1 lg:mx-10 p-5">
          <h1 className="mb-3">Hello! {user?.fullname || "user"}</h1>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default MyAccount;
