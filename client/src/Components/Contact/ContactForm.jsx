import React from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";
import axios from "axios";
import conf from "../../service/conf/conf";
import toast from "react-hot-toast";

function ContactForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitContactForm = async (data) => {
    if (!executeRecaptcha) {
      toast.error("captcha loading Failed")
      return
    };
    const token = await executeRecaptcha();
    const res = axios.post(
      `${conf.URL}/api/v1/contact`,
      {
        ...data,
        token,
      },
      {
        withCredentials: true,
      }
    );
    toast.promise(res, {
      loading: "Sending...",
      success: (data) => {
        reset();
        return data.data.message;
      },
      error: (error) => error.response?.data?.message || "something Went Wrong",
    });
  };

  return (
    <form
      className="space-y-8"
      name="contact"
      onSubmit={handleSubmit(submitContactForm)}
    >
      <div>
        <label
          htmlFor="fullName"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Your full name
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
          placeholder="name@flowbite.com"
          {...register("fullName", { required: true })}
        />
        {errors.email && (
          <span className="text-xs text-red-600">This field is required</span>
        )}
      </div>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Your email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
          placeholder="name@flowbite.com"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="text-xs text-red-600">This field is required</span>
        )}
      </div>
      <div>
        <label
          htmlFor="subject"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
          placeholder="Let us know how we can help you"
          {...register("subject", { required: true })}
        />
        {errors.subject && (
          <span className="text-xs text-red-600">This field is required</span>
        )}
      </div>
      <div className="sm:col-span-2">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Your message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Leave a comment..."
          {...register("message", { required: true })}
        />
        {errors.message && (
          <span className="text-xs text-red-600">This field is required</span>
        )}
      </div>
      <button
        type="submit"
        className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-lime-500 sm:w-fit hover:bg-amber-400 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Send message
      </button>
    </form>
  );
}

export default ContactForm;
