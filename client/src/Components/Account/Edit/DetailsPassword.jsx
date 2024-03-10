import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import conf from "../../../service/conf/conf";

function DetailsPassword() {
  const [err, setErr] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const editUserPassword = (data) => {
    axios
      .post(`${conf.URL}/api/v1/users/password`, data, {
        withCredentials: true,
      })
      .then((res) => {
        if (res?.data?.success) {
          setErr("Password updated Successfully");
        }
      })
      .catch((error) => {
        setErr(error.response?.data?.message || error.message);
      });
  };
  return (
    <form
      className="max-w-sm mx-auto"
      onSubmit={handleSubmit(editUserPassword)}
    >
      <h1 className="text-2xl text-center font-medium text-lime-500 mt-8 mb-6 underline underline-offset-4">
        Change password
      </h1>
      {err && <h2 className="text-red-600 text-center mt-4 mb-8">{err}</h2>}

      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your Old password
        </label>
        <input
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          placeholder="********"
          {...register("password", { required: true, minLength: 8 })}
        />
        {errors.password && (
          <span className="text-xs text-red-600">This field is required</span>
        )}
      </div>

      <div className="mb-5">
        <label
          htmlFor="newpassword"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your New password
        </label>
        <input
          type="password"
          id="newpassword"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          placeholder="min 8 char with atleat 1 digit and 1 special char"
          {...register("newPassword", { required: true, minLength: 8 })}
        />
        {errors.newpassword && (
          <span className="text-xs text-red-600">This field is required</span>
        )}
      </div>

      <button
        type="submit"
        className="text-white bg-lime-500 hover:bg-amber-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Change Password
      </button>
    </form>
  );
}

export default DetailsPassword;
