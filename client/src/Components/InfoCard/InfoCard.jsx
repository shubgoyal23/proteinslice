import React from "react";

function InfoCard({ title, desc, img }) {
   return (
      <div className="min-h-64 min-w-60 m-4 bg-gray-200 dark:bg-gray-600 rounded-lg p-6 flex justify-start flex-col items-center">
         <div className="w-28 h-28 rounded-full bg-lime-500 flex justify-center items-center">
            <i className={`fa-solid ${img} text-5xl text-white`}></i>
         </div>
         <div className="h-8 w-8 bg-lime-500 rotate-45 -translate-y-6"></div>
         <div className="text-2xl text-black dark:text-white">{title}</div>
         <div className="text-lg text-gray-800 dark:text-gray-200 mt-2">
            {desc}
         </div>
      </div>
   );
}

export default InfoCard;
