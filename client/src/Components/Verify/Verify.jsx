import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import conf from "../../service/conf/conf";

function Verify() {
  let [queryParameters] = useSearchParams();
  const navigate = useNavigate();
  const email = queryParameters.get("email");
  const code = queryParameters.get("code");

  const verifyEmail = () => {
    if (!email && !code) {
      toast.error("Email id or Code not Availabe");
    }

    const send = axios.post(`${conf.URL}/api/v1/verify`, { email, code });
    toast.promise(send, {
      loading: "Verifying...",
      success: (data) => {
        navigate("/");
        return data?.data?.message;
      },
      error: (error) =>
        `This just happened: ${error.response?.data?.message || error.message}`,
    });
  };

  return (
    <div className="w-full min-h-[80vh] flex flex-col justify-center items-center">
      <h1 className="text-3xl mb-4">Verify your Email</h1>
      <div>Email: {email}</div>
      <button
        onClick={verifyEmail}
        className="bg-amber-500 px-10 py-2 rounded-full mt-6"
      >
        Verify
      </button>
    </div>
  );
}

export default Verify;
