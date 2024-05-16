import React, { useState } from "react";
import DetailsEdit from "./DetailsEdit";
import DetailsPassword from "./DetailsPassword";

function Edit() {
  const [toggle, setToggle] = useState(true);
  return (
    <div className="border-2 dark:border-gray-500 border-gray-300 bg-gray-50 dark:bg-gray-700 rounded-lg p-3 pb-10">
      <div className="grid lg:w-3/5 mx-auto grid-cols-2 divide-x mt-6 dark:bg-gray-700 bg-gray-50 h-10 rounded-lg overflow-hidden shadow-lg">
        <div
          className={`flex justify-center items-center cursor-pointer transition-all ease-in duration-200 ${toggle ? "dark:bg-gray-800 bg-gray-300" : "bg-transparent"}`}
          onClick={() => setToggle(true)}
        >
          Edit Account Details
        </div>
        <div
          className={`flex justify-center items-center cursor-pointer transition-all ease-in duration-200 ${!toggle ? "dark:bg-gray-800 bg-gray-300" : "bg-transparent"}`}
          onClick={() => setToggle(false)}
        >
          Change Password
        </div>
      </div>

      {toggle ? <DetailsEdit /> : <DetailsPassword />}
    </div>
  );
}

export default Edit;
