import axios from "axios";
import React from "react";
import conf from "../../service/conf/conf";
import toast from "react-hot-toast";

function EmailVerifyBtn({ t }) {
  const sendVerificationMail = () => {
    const requestEmail = axios.get(`${conf.URL}/api/v1/verify/`, {
      withCredentials: true,
    });
    toast.promise(requestEmail, {
      loading: "Sending Email...",
      success: (data) => {
        return `${data?.data?.message}`;
      },
      error: (error) => `${error.response?.data?.message || error.message}`,
    });
  };
  return (
    <span>
      Email is not Verified
      <button
        onClick={sendVerificationMail}
        className="border border-lime-500 rounded-md px-3 mx-2"
      >
        verify Now
      </button>
      <button
        onClick={() => toast.dismiss(t.id)}
        className="size-5 rounded-full bg-gray-100"
      >
        X
      </button>
    </span>
  );
}

export default EmailVerifyBtn;
