import axios from "axios";
import React, { useEffect, useState } from "react";
import conf from "../../../service/conf/conf";
import OrdersCard from "./OrdersCard";

function AllOrders() {
  const [oredrsList, setOrdersList] = useState([]);

  useEffect(() => {
    axios
      .get(`${conf.URL}/api/v1/orders`, { withCredentials: true })
      .then((res) => {
        setOrdersList(res.data?.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <h1 className="text-xl font-semibold underline mb-3">All Orders</h1>
      {!oredrsList.length && <h2>No order found</h2>}
      {oredrsList?.map((item) => (
        <OrdersCard key={item._id} data={item} />
      ))}
    </div>
  );
}

export default AllOrders;
