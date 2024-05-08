import React from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import conf from "../../service/conf/conf";
import toast from "react-hot-toast";

function ResetPassword() {
  const [queryParameters] = useSearchParams();
  const navigate = useNavigate();
  const email = queryParameters.get("email");
  const code = queryParameters.get("code");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const resetPassword = (data) => {
    const resetPasswordRequest = axios.post(
      `${conf.URL}/api/v1/users/reset-password`,
      { email, code, ...data }
    );

    toast.promise(resetPasswordRequest, {
      loading: "Loading...",
      success: (data) => {
        navigate("/login");
        return data?.data?.message;
      },
      error: (error) => `${error.response?.data?.message || error.message}`,
    });
  };

  return (
    <>
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit(resetPassword)}>
        <h1 className="text-2xl text-center font-medium text-lime-500 mt-8 mb-6 underline underline-offset-4">
          Reset Password
        </h1>
        <h3 className="text-blue-700 dark:text-amber-400 text-center mt-5 mb-8">
          {email}
        </h3>

        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            New Password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            {...register("password", {
              required: true,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            })}
          />
          {errors.password?.type === "required" && (
            <span className="text-xs text-red-600">This Feild is Required</span>
          )}
          {errors.password?.type === "pattern" && (
            <span className="text-xs text-red-600">
              Password must be at least 8 characters long and contain at least
              one lowercase letter, one uppercase letter, one digit, and one
              special character.
            </span>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="confirmPassword"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            {...register("confirmPassword", {
              required: true,
              validate: (val) => {
                if (watch("password") != val) {
                  return "Your passwords and Confirm Password do no match";
                }
              },
            })}
          />
          {errors.confirmPassword && (
            <span className="text-xs text-red-600">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="text-white mt-6 bg-lime-500 hover:bg-amber-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Reset Password
        </button>
      </form>
    </>
  );
}

export default ResetPassword;

// import axios from "axios";
// import React from "react";
// import toast from "react-hot-toast";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import conf from "../../service/conf/conf";

// function ResetPassword() {
//   let [queryParameters] = useSearchParams();
//   const navigate = useNavigate();
//   const email = queryParameters.get("email");
//   const code = queryParameters.get("code");

//   const verifyEmail = () => {
//     if (!email && !code) {
//       toast.error("Email id or Code not Availabe");
//     }

//     const send = axios.post(`${conf.URL}/api/v1/users/reset-password`, {
//       email,
//       code,
//       password,
//     });
//     toast.promise(send, {
//       loading: "Verifying...",
//       success: (data) => {
//         navigate("/");
//         return data?.data?.message;
//       },
//       error: (error) =>
//         `This just happened: ${error.response?.data?.message || error.message}`,
//     });
//   };

//   return (
//     <div className="w-full min-h-[80vh] flex flex-col justify-center items-center">
//       <h1 className="text-3xl mb-4">Reset Your Password</h1>
//       <div>Email: {email}</div>
//       <button
//         onClick={verifyEmail}
//         className="bg-amber-500 px-10 py-2 rounded-full mt-6"
//       >
//         Verify
//       </button>
//     </div>
//   );
// }

// export default ResetPassword;
