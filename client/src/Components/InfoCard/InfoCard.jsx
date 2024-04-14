import React from "react";

function InfoCard({ title, desc, img }) {
  return (
    <div className="p-6">
      <div className="mb-4">
        <i className={`fa-solid ${img} text-2xl`}></i>
      </div>
      <div className="text-3xl font-league tracking-wide uppercase text-gray-700 dark:text-white mb-4">
        {title}
      </div>
      <div className="text-md text-gray-800 dark:text-gray-400 mt-2">
        {desc}
      </div>
    </div>
  );
}

export default InfoCard;
