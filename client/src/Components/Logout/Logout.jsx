import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import axios from "axios";
import conf from "../../service/conf/conf";

function Logout() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   useEffect(() => {
      axios
         .get(`${conf.URL}/api/v1/users/logout`, { withCredentials: true })
         .then(() => {
            dispatch(logout());
            navigate("/");
         })
         .catch((error) => {
            console.log(error);
            navigate("/");
         });
   }, []);
   return (
      <div className="h-96 w-full flex justify-center items-center">
         loading...
      </div>
   );
}

export default Logout;
