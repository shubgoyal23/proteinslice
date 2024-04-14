import { Outlet } from "react-router-dom";
import { Header, Footer } from "./index";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout, login } from "../store/authSlice";
import conf from "../service/conf/conf";
import axios from "axios";

export default function Layout() {
  const dispatch = useDispatch();

  const getuserData = useCallback(async () => {
    try {
      const { data } = await axios.post(
        `${conf.URL}/api/v1/users/current`,
        {},
        { withCredentials: true }
      );
      if (data?.success) {
        dispatch(login(data?.data));
      } else {
        const { data } = await axios.post(
          `${conf.URL}/api/v1/users/token`,
          {},
          { withCredentials: true }
        );

        if (data?.success) {
          const { data } = await axios.post(
            `${conf.URL}/api/v1/users/current`,
            {},
            { withCredentials: true }
          );
          if (data?.success) {
            dispatch(login(data?.data));
          }
        }
      }
    } catch (error) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getuserData();
  }, []);

  return (
    <div className="w-full block dark:bg-gray-800 min-h-screen dark:text-white font-poppins antialiased">
      <Header />
      <main className="min-h-96">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
