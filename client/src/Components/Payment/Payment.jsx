import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import conf from "../../service/conf/conf";

function Payment() {
  const cart = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.authentication);
  const [total, setTotal] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!user.isLogged) {
      navigate("/login");
    }
    setValue("name", user?.userData?.fullname);
    setValue("email", user?.userData?.email);
    setValue("phone", user?.userData?.phone);
    setValue("address", `${user?.userData?.address?.house} ${user?.userData?.address?.street}`);
    setValue("city", user?.userData?.address?.city);
    setValue("country", user?.userData?.address?.country);
    setValue("state", user?.userData?.address?.state);
    setValue("zip", user?.userData?.address?.zip);
  }, [user]);

  useEffect(() => {
    let total = cart.reduce((accumulator, currentValue) => {
      let value =
        (currentValue.price *
          currentValue.Qty *
          (100 - currentValue.discount)) /
        100;
      return accumulator + value;
    }, 0);
    total = (total * 100).toFixed(0);
    setTotal(Number(total));
  }, [cart]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  async function checkPayment(data) {
    const { data: key } = await axios.get(`${conf.URL}/api/v1/payment/key`, {
      withCredentials: true,
    });

    let items = cart.map((item) => {
      return { _id: item._id, quantity: item.Qty };
    });

    const { data: oderdetails } = await axios.post(
      `${conf.URL}/api/v1/payment/pay`,
      {
        cart: items,
      },
      { withCredentials: true }
    );

    const options = {
      key: key.data.key,
      amount: oderdetails.data.amount,
      currency: "INR",
      name: "ProteinSlice",
      description: "Payment for Order",
      image: "/proteinslice-logo-transparent.png",
      order_id: oderdetails.data.orderId,
      callback_url: `${conf.URL}/api/v1/payment/verify/${oderdetails.data._id}`,
      prefill: {
        name: data.name,
        email: data.email,
        contact: data.mobile,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }
  return (
    <div className="">
      <div>
        <div className="min-h-screen p-6 flex items-center justify-center">
          <div className="container max-w-screen-lg mx-auto">
            <div>
              <h2 className="font-semibold text-xl text-gray-600 dark:text-gray-100">
                Delivery Details
              </h2>
              <p className="text-gray-500 dark:text-gray-300 mb-6">
                Please Fill Correct Details To get Faster Delicvery
              </p>
              <div className="bg-gray-300 dark:bg-gray-600 backdrop-blur-sm rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                  <div className="text-gray-600 dark:text-gray-50">
                    <p className="font-medium text-lg">Personal Details</p>
                    <p>Please fill out all the fields.</p>
                  </div>
                  <form
                    className="lg:col-span-2"
                    onSubmit={handleSubmit(checkPayment)}
                  >
                    <div className="w-full">
                      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div className="md:col-span-5">
                          <label htmlFor="full_name">Full Name</label>
                          {errors.name && (
                            <span className="text-xs text-red-600">
                              This field is required
                            </span>
                          )}
                          <input
                            type="text"
                            name="full_name"
                            id="full_name"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:bg-gray-500"
                            {...register("name", {
                              required: true,
                            })}
                          />
                        </div>
                        <div className="md:col-span-5">
                          <label htmlFor="email">Email Address</label>
                          {errors.email && (
                            <span className="text-xs text-red-600">
                              This field is required
                            </span>
                          )}
                          <input
                            type="text"
                            name="email"
                            id="email"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:bg-gray-500"
                            placeholder="email@domain.com"
                            {...register("email", {
                              required: true,
                            })}
                          />
                        </div>

                        <div className="md:col-span-5">
                          <label htmlFor="P_number">Phone Number</label>
                          {errors.phone && (
                            <span className="text-xs text-red-600">
                              This field is required
                            </span>
                          )}
                          <input
                            type="text"
                            name="phone"
                            id="P_number"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:bg-gray-500"
                            placeholder=""
                            {...register("phone", {
                              required: true,
                            })}
                          />
                        </div>

                        <div className="md:col-span-3">
                          <label htmlFor="address">Address / Street</label>
                          {errors.address && (
                            <span className="text-xs text-red-600">
                              This field is required
                            </span>
                          )}
                          <input
                            type="text"
                            name="address"
                            id="address"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:bg-gray-500"
                            {...register("address", {
                              required: true,
                            })}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label htmlFor="city">City</label>
                          {errors.exampleRequired && (
                            <span className="text-xs text-red-600">
                              This field is required
                            </span>
                          )}
                          <input
                            type="text"
                            name="city"
                            id="city"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:bg-gray-500"
                            defaultValue=""
                            {...register("city", {
                              required: true,
                            })}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label htmlFor="country">Country / region</label>
                          <div className="h-10 bg-gray-50 dark:bg-gray-500 flex border border-gray-200 rounded items-center mt-1">
                            {errors.country && (
                              <span className="text-xs text-red-600">
                                This field is required
                              </span>
                            )}
                            <input
                              name="country"
                              id="country"
                              placeholder="Country"
                              className="px-4 appearance-none outline-none w-full bg-transparent"
                              {...register("country", {
                                required: true,
                              })}
                            />
                          </div>
                        </div>
                        <div className="md:col-span-2">
                          <label htmlFor="state">State / province</label>
                          <div className="h-10 bg-gray-50 dark:bg-gray-500 flex border border-gray-200 rounded items-center mt-1">
                            {errors.state && (
                              <span className="text-xs text-red-600">
                                This field is required
                              </span>
                            )}
                            <input
                              name="state"
                              id="state"
                              placeholder="State"
                              className="px-4 appearance-none outline-none w-full bg-transparent"
                              {...register("state", {
                                required: true,
                              })}
                            />
                          </div>
                        </div>
                        <div className="md:col-span-1">
                          <label htmlFor="zipcode">Zipcode</label>
                          {errors.zip && (
                            <span className="text-xs text-red-600">
                              This field is required
                            </span>
                          )}
                          <input
                            type="text"
                            name="zipcode"
                            id="zipcode"
                            className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:bg-gray-500"
                            placeholder=""
                            defaultValue=""
                            {...register("zip", {
                              required: true,
                            })}
                          />
                        </div>
                        <div className="md:col-span-5">
                          <div className="inline-flex items-center">
                            {errors.tnc && (
                              <span className="text-xs text-red-600">
                                This field is required
                              </span>
                            )}
                            <input
                              type="checkbox"
                              name="billing_same"
                              id="billing_same"
                              className="form-checkbox"
                              {...register("tnc", {
                                required: true,
                              })}
                            />
                            <label
                              htmlFor="billing_same"
                              className="ml-2 capitalize"
                            >
                              i Agree to terms and conditons
                            </label>
                          </div>
                        </div>
                        <div className="md:col-span-5 text-right">
                          <div className="inline-flex items-end">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                              Pay {total / 100}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
