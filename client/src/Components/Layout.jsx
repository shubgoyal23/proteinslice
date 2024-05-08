import { Outlet } from "react-router-dom";
import { Header, Footer, EmailVerifyBtn } from "./index";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import conf from "../service/conf/conf";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

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
        toast(`welcome ${data?.data?.fullname}`, {
          icon: "👏",
        });
        if (!data?.data.emailVerification) {
          toast((t) => <EmailVerifyBtn t={t} />);
        }
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
            toast(`welcome ${data?.data?.fullname}`, {
              icon: "👏",
            });
            if (!data?.data.emailVerification) {
              toast((t) => <EmailVerifyBtn t={t} />);
            }
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
      <Toaster />
    </div>
  );
}
