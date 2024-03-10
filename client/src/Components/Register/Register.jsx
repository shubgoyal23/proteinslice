import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import conf from "../../service/conf/conf";

function Register() {
   const [err, setErr] = useState("")
   const user = useSelector((state) => state.authentication);
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();
   useEffect(() => {
      if (user.isLogged) {
         navigate("/");
      }
   }, []);

   const userRegistrationDataHandler = (data) => {
      axios
      .post(`${conf.URL}/api/v1/users/register`, data, { withCredentials: true })
      .then(() => {
         axios
         .post(`${conf.URL}/api/v1/users/login`, data, { withCredentials: true })
         .then((data) => {
            if (data?.data?.data) {
               dispatch(login(data?.data?.data));
               navigate("/");
            }
         })
      })
      .catch((error) => {
         setErr(error.response?.data?.message || error.message)});
   };
    return (
        <>
             <form className="max-w-sm mx-auto" onSubmit={handleSubmit(userRegistrationDataHandler)}>
            <h1 className="text-2xl text-center font-medium text-lime-500 mt-8 mb-6 underline underline-offset-4">Create Account</h1>
            <h3 className="text-blue-700 dark:text-amber-400 text-center mt-5 mb-8"><Link to="/login">Already have a Account Login</Link></h3>
    
                {err && <h2 className="text-red-600 text-center mt-4 mb-8">{err}</h2>}

                <div className="mb-5">
                   <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                     
                   >
                      Your Full Name
                   </label>
                   <input
                      type="text"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Raman Dušan"
                      required
                      {...register("fullname", { required: true, minLength: 5 })}
                   />
                   {errors.name && <span className="text-xs text-red-600">This field is required</span>}
                </div>
                <div className="mb-5">
                   <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                     
                   >
                      Your email
                   </label>
                   <input
                      type="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@flowbite.com"
                      required
                      {...register("email", { required: true, minLength: 5 })}
                   />
                   {errors.email && <span className="text-xs text-red-600">This field is required</span>}
                </div>
                <div className="mb-5">
                   <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                     
                   >
                      Your Phone
                   </label>
                   <input
                      type="text"
                      id="phone"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="+919876543210"
                      required
                      {...register("phone", { required: true, minLength: 10 })}
                   />
                   {errors.phone && <span className="text-xs text-red-600">This field is required</span>}
                </div>
                <div className="mb-5">
                   <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                   >
                      Your password
                   </label>
                   <input
                      type="password"
                      id="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      placeholder="min 8 char"
                      {...register("password", { required: true, minLength: 8 })}
                   />
                   {errors.password && <span className="text-xs text-red-600">This field is required</span>}
                </div>
                <div className="flex items-start mb-5">
                   <div className="flex items-center h-5">
                      <input
                         id="remember"
                         type="checkbox"
                         value=""
                         className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                         required                        
                      />
                   </div>
                   <label
                      htmlFor="remember"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                   >
                      I Agree T&C
                   </label>
                </div>
                <button
                   type="submit"
                   className="text-white bg-lime-500 hover:bg-amber-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                   Submit
                </button>
    
             </form>
          </>
       );
}

export default Register;
