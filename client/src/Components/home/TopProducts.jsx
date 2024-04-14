import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import conf from "../../service/conf/conf";
import { Card } from "../index";

function TopProducts() {
  const [topProductsArchive, setTopProductsArchive] = useState({});
  const [topProducts, setTopProducts] = useState([]);
  const [active, setActive] = useState("");

  const getProducts = useCallback(handleClick, [active]);

  function handleClick() {
    if (topProductsArchive[active]) {
      setTopProducts(topProductsArchive[active]);
      return;
    }
    axios
      .get(`${conf.URL}/api/v1/product/category?q=${active}&limit=3`)
      .then((data) => {
        if (data?.data?.success) {
          setTopProducts(data?.data?.data);
          setTopProductsArchive((prev) => {
            return { ...prev, [active]: data?.data?.data };
          });
        }
      });
  }
  useEffect(() => {
    getProducts();
  }, [active]);
  return (
    <div className="flex justify-between flex-col md:px-16 px-4 mt-24">
      <h1 className="text-4xl md:text-6xl mb-2 text-center text-gray-600 dark:text-gray-200 font-cormorant font-bold tracking-wide capitalize">
        Explore Our{" "}
        <span className="bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
          Top Products
        </span>
      </h1>
      <h4 className="text-md mb-4 text-center font-poppins text-gray-400 dark:text-gray-500 font-bold tracking-wide capitalize">
        Most trusted and Used Products
      </h4>
      <div className="hidden md:flex justify-between my-4 px-6 py-1 w-full md:w-[80%] lg:w-[70%] m-auto bg-gray-300 dark:bg-white/10 backdrop-blur-lg rounded-full border-b dark:border-white/30 border-black/30">
        {[
          "Protein Supplements",
          "Beverages",
          "Supplements",
          "Grains",
          "Snacks",
        ].map((item, i) => (
          <button
            className={`${active === item ? "dark:bg-gray-900 bg-gray-700 text-white" : " dark:text-gray-300 text-gray-500"} w-content px-3 rounded-full hover:bg-gray-700 dark:hover:bg-gray-900 h-10`}
            onClick={() => setActive(item)}
            key={item}
          >
            {item}
          </button>
        ))}
      </div>
      <section className="container mx-auto p-10 pt-2 md:py-12 px-0 md:p-8 md:px-0">
        <section className="p-5 md:p-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 items-start ">
          {topProducts.map((items) => (
            <Card key={items._id} {...items} />
          ))}
        </section>
      </section>
    </div>
  );
}
export default TopProducts;
