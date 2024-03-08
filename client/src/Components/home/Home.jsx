import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Card, Corosal, InfoCard } from "../index";
import axios from "axios";
import conf from "../../service/conf/conf";

function Home() {
   const [topProducts, setTopProducts] = useState([]);
   function handleClick(name) {
      axios
         .get(`${conf.URL}/api/v1/product/category?q=${name}`)
         .then((data) => {
            if (data?.data?.success) {
               setTopProducts(data?.data?.data);
            }
         });
   }
   useEffect(() => {
      handleClick("Protein Supplements");
   }, []);
   return (
      <div>
         <Corosal />
         <div className="flex w-full flex-wrap justify-center mt-16 md:mt-24">
            {[
               {
                  title: "Free Shipping",
                  img: "fa-truck",
                  desc: "Free on order over $100",
               },
               {
                  title: "Security Payment",
                  img: "fa-credit-card",
                  desc: "100% security payment",
               },
               {
                  title: "30 Day Return",
                  img: "fa-rotate-left",
                  desc: "30 day money back",
               },
               {
                  title: "24/7 Support",
                  img: "fa-phone",
                  desc: "Support every time fast",
               },
            ].map((item) => (
               <InfoCard key={uuidv4()} {...item} />
            ))}
         </div>

         <div>
            <div className="flex justify-between flex-col md:px-16 px-4 mt-12">
               <h1 className="text-lg md:text-5xl mb-4 text-center">
                  Our Top Products
               </h1>
               <div className="flex flex-wrap justify-center my-4 md:gap-6">
                  {[
                     "Protein Supplements",
                     "Beverages",
                     "Supplements",
                     "Grains",
                     "Snacks",
                  ].map((item) => (
                     <button
                        className="px-4 py-2 m-2 hover:bg-amber-400 dark:hover:bg-amber-400 bg-gray-300 dark:bg-gray-700 rounded-lg"
                        onClick={() => handleClick(item)}
                        key={uuidv4()}
                     >
                        {item}
                     </button>
                  ))}
               </div>
               <section className="container mx-auto p-10 md:py-12 px-0 md:p-8 md:px-0">
                  <section className="p-5 md:p-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 items-start ">
                     {topProducts.map((items) => (
                        <Card key={items._id} {...items} />
                     ))}
                  </section>
               </section>
            </div>
         </div>
      </div>
   );
}

export default Home;
