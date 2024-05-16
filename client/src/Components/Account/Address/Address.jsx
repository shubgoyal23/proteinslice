import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import conf from "../../../service/conf/conf";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../store/authSlice";

function Address() {
  const [err, setErr] = useState("");
  const user = useSelector((state) => state.authentication.userData);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(()=>{
    setValue("house", user?.address?.house)
    setValue("street", user?.address?.street)
    setValue("city", user?.address?.city)
    setValue("state", user?.address?.state)
    setValue("country", user?.address?.country)
    setValue("zip", user?.address?.zip)
  }, [user])

  const editAddressHandler = (data) => {
    axios
      .post(`${conf.URL}/api/v1/users/address`, data, {
        withCredentials: true,
      })
      .then((res) => {
        if (res?.data?.success) {
          setErr("Address updated Successfully");
          dispatch(login(res?.data?.data));
        }
      })
      .catch((error) => {
        setErr(error.response?.data?.message || error.message);
      });
  };
  return (
    <div className="border-2 dark:border-gray-500 border-gray-300 bg-gray-50 dark:bg-gray-700 rounded-lg p-3 pb-10">
      <form
        className="max-w-sm mx-auto"
        onSubmit={handleSubmit(editAddressHandler)}
      >
        <h1 className="text-2xl text-center font-medium text-lime-500 mt-8 mb-6 underline underline-offset-4">
          Edit Address Detalis
        </h1>
        {err && <h2 className="text-red-600 text-center mt-4 mb-8">{err}</h2>}

        <div className="mb-5">
          <label
            htmlFor="house"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            House
          </label>
          <input
            type="text"
            id="house"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            {...register("house")}
          />
          {errors.house && (
            <span className="text-xs text-red-600">This field is required</span>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="street"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            street
          </label>
          <input
            type="text"
            id="street"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            {...register("street")}
          />
          {errors.street && (
            <span className="text-xs text-red-600">This field is required</span>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="city"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            City
          </label>

          <input
            type="text"
            id="city"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            {...register("city")}
          />
          {errors.city && (
            <span className="text-xs text-red-600">This field is required</span>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="state"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            State
          </label>

          <input
            type="text"
            id="state"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            {...register("state")}
          />
          {errors.state && (
            <span className="text-xs text-red-600">This field is required</span>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="country"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Country
          </label>

          <input
            type="text"
            id="country"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            {...register("country")}
          />
          {errors.state && (
            <span className="text-xs text-red-600">This field is required</span>
          )}
        </div>
        
        <div className="mb-5">
          <label
            htmlFor="zip"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Zip/Postal code
          </label>

          <input
            type="text"
            id="zip"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            {...register("zip")}
          />
          {errors.zip && (
            <span className="text-xs text-red-600">This field is required</span>
          )}
        </div>
        <button
          type="submit"
          className="text-white bg-lime-500 hover:bg-amber-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Edit
        </button>
      </form>
    </div>
  );
}

export default Address;
