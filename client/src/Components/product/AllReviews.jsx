import axios from "axios";
import React, { useEffect } from "react";
import conf from "../../service/conf/conf";

function AllReviews({ id }) {
  useEffect(() => {
    if (id) {
      axios
        .get(`${conf.URL}/api/v1/reviews/all?p=${id}`)
        .then(({ data }) => {
          console.log(data);
          if (data?.data) {
          }
        })
        .catch((err) => console.log(err));
    }
  }, [id]);
  return <div></div>;
}

export default AllReviews;
