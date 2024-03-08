import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Theme from "../theme/Theme";

function Header() {
   const user = useSelector((state) => state.authentication.isLogged);
   const cartGloabal = useSelector((state) => state.cart.items);

   const [display, setDisplay] = useState({
      account: false,
      nav: false,
      cart: false,
   });

   return (
      <header className="w-full h-20 bg-gray-50 flex justify-between items-center flex-col md:flex-row dark:bg-gray-900 border-gray-200 shadow-md">
         <div className="md:flex-initial md:w-64 md:pl-8 w-full p-4 flex  justify-between">
            <button
               className="md:hidden text-2xl dark:text-white"
               onClick={() =>
                  setDisplay((prev) => {
                     return { ...prev, nav: !prev.nav };
                  })
               }
            >
               <i
                  className={`fa-solid fa-${display.nav ? "xmark" : "bars"}`}
               ></i>
            </button>

            <Link
               to="/"
               onClick={() =>
                  setDisplay((prev) => {
                     return { ...prev, nav: false };
                  })
               }
            >
               <img
                  src="/proteinslice-logo-transparent.png"
                  alt="proteinSlice Logo"
                  className="object-contain h-14"
               />
            </Link>
            <div className="flex md:hidden justify-center items-center">
               <div className="relative flex-1 flex justify-end justify-items-end flex-col md:flex-row">
                  <Link to={"/cart"}>
                     <button className="relative text-2xl font-medium text-red-500 py-2 px-2">
                        <span className="absolute dark:text-white text-gray-800 top-1 right-1 text-xs">
                           {cartGloabal?.length}
                        </span>
                        <i className="fa-solid fa-bag-shopping "></i>
                     </button>
                  </Link>
               </div>
            </div>
         </div>
         <div
            className={`flex absolute md:justify-between md:flex-auto flex-col md:flex-row w-full md:static md:w-auto md:items-center md:h-20 h-screen z-10 bg-gray-200 dark:bg-gray-900 md:bg-transparent pt-10 pb-10 md:p-0 ${
               display.nav ? " top-20 left-0" : " top-20 -left-[720px]"
            } ease-in duration-500 transition-all`}
         >
            <div className="md:flex-auto flex justify-center text-center gap-6 flex-col md:flex-row">
               {[
                  ["Home", "/"],
                  ["Store", "/shop"],
                  ["About", "/about"],
                  ["Contact Us", "/contact"],
               ].map(([name, url]) => (
                  <NavLink
                     key={url}
                     to={url}
                     className={({ isActive }) =>
                        `text-lime-500 text-2xl font-medium hover:text-amber-400 flex justify-center items-center ${
                           isActive ? "text-amber-400" : ""
                        }`
                     }
                     onClick={() =>
                        setDisplay((prev) => {
                           return { ...prev, nav: false };
                        })
                     }
                  >
                     {name}
                  </NavLink>
               ))}
               <div className="block md:h-20 md:pt-4">
                  <button
                     className="text-2xl font-medium text-lime-500 hover:text-amber-400 py-2 px-2"
                     onClick={() =>
                        setDisplay((prev) => {
                           return { ...prev, account: !prev.account };
                        })
                     }
                  >
                     Account <i className="fa-solid fa-caret-down"></i>
                  </button>
                  <div
                     className={`w-full z-20 h-30 flex flex-col rounded-lg border-2 border-slate-300 border-solid pt-1 bg-gray-200 dark:bg-gray-900 text-amber-400 ${
                        display.account ? "block" : "hidden"
                     }`}
                     onClick={() =>
                        setDisplay((prev) => {
                           return { ...prev, account: !prev.account };
                        })
                     }
                  >
                     <Link
                        to="/login"
                        onClick={() =>
                           setDisplay((prev) => {
                              return { ...prev, nav: false };
                           })
                        }
                     >
                        {!user && (
                           <button className="bg-transparent text-lime-500 px-4 py-2 text-2xl font-medium hover:text-amber-400">
                              Login
                           </button>
                        )}
                     </Link>
                     <Link
                        to="/register"
                        onClick={() =>
                           setDisplay((prev) => {
                              return { ...prev, nav: false };
                           })
                        }
                     >
                        {!user && (
                           <button className="bg-transparent text-lime-500 px-4 py-2 text-2xl font-medium hover:text-amber-400">
                              Register
                           </button>
                        )}
                     </Link>
                     <Link
                        to="/account"
                        onClick={() =>
                           setDisplay((prev) => {
                              return { ...prev, nav: false };
                           })
                        }
                     >
                        {user && (
                           <button className="bg-transparent text-lime-500 px-4 py-2 text-2xl font-medium hover:text-amber-400">
                              My Account
                           </button>
                        )}
                     </Link>
                     <Link
                        to="/logout"
                        onClick={() =>
                           setDisplay((prev) => {
                              return { ...prev, nav: false };
                           })
                        }
                     >
                        {user && (
                           <button className="bg-transparent text-lime-500 px-4 py-2 text-2xl font-medium hover:text-amber-400">
                              Logout
                           </button>
                        )}
                     </Link>
                  </div>
               </div>
               <div className="md:hidden">
                  <Theme />
               </div>
            </div>

            <div className=" md:flex hidden justify-center items-center pr-4">
               <div className="relative flex-1 flex justify-end justify-items-end flex-col md:flex-row">
                  <Link to={"/cart"}>
                     <button className="relative text-2xl font-medium text-red-500 py-2 px-2">
                        <span className="absolute dark:text-white text-gray-800 top-1 right-1 text-xs">
                           {cartGloabal?.length}
                        </span>
                        <i className="fa-solid fa-bag-shopping "></i>
                     </button>
                  </Link>
               </div>
               <div className=" md:h-20 hidden  md:flex justify-center items-center">
                  <Theme />
               </div>
            </div>
         </div>
      </header>
   );
}

export default Header;
