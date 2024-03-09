import React, { useEffect, useState } from "react";
import { Card } from "../index";
import axios from "axios";
import conf from "../../service/conf/conf";
function shop() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get(`${conf.URL}/api/v1/product/list`).then((data) => {
      if (data?.data?.success) {
        setProducts(data?.data?.data);
      }
    });
  }, []);

  return (
    <>
      <div className="text-2xl text-center my-6">All Products</div>

      <section className="container mx-auto p-10 md:py-12 px-0 md:p-8 md:px-0">
        <section className="p-5 md:p-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 items-start ">
          {products.map((items) => (
            <Card key={items._id} {...items} />
          ))}
        </section>
      </section>
    </>
  );
}

export default shop;
