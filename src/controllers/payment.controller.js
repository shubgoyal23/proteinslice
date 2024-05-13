import Razorpay from "razorpay";
import crypto from "crypto";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../modles/products.models.js";
import { Order } from "../modles/oders.models.js";
import { stringify } from "querystring";
import axios from "axios";
import { OrderDetails } from "../modles/userDetials.model.js";
import { User } from "../modles/user.models.js";

async function getCurrencyList() {
  try {
    const { data } = await axios.get(
      `https://api.freecurrencyapi.com/v1/latest?apikey=${process.env.CURRENCY_API}`
    );
    return data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
async function currencyConvert(currencyTo, data) {
  const crrlist = await getCurrencyList();

  const amount = data.reduce((acc, crr) => {
    const to = crrlist[currencyTo] || 1;
    const from = crrlist[crr.currency] || 1;
    const amt = (crr.price * (to / from)).toFixed(0);
    return acc + Number(amt);
  }, 0);

  return amount;
}
const createOrder = asyncHandler(async (req, res) => {
  const { cart, currency, userDetails } = req.body;

  if (cart.length === 0) {
    throw new ApiError(401, "Your Cart is empty");
  }
  if (!currency) {
    throw new ApiError(401, "User Currency is required");
  }
  let cardids = cart.map((item) => item._id);
  const cartItems = await Product.find({ _id: { $in: cardids } }).lean();

  const mergedCartItems = cartItems.map((item) => {
    const quantity =
      cart.find((cartItem) => cartItem._id === item._id.toString())?.quantity ||
      0;
    const price = (quantity * (item?.price * (100 - item?.discount))).toFixed(
      0
    );
    return {
      productId: item._id,
      price: price,
      quantity: quantity,
      currency: item.currency,
    };
  });

  const itemsName = cartItems.map((item) => item.name);

  const amount = await currencyConvert(currency, mergedCartItems);

  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
  });

  const data = await instance.orders.create({
    amount: amount,
    currency: currency,
  });

  if (!data || data.error) {
    throw new ApiError(500, "payment creation failed");
  }

  const userDet = await OrderDetails.create({
    userId: req.user._id,
    ...userDetails,
  });

  const order = await Order.create({
    userId: req?.user?._id,
    items: mergedCartItems,
    itemsName: itemsName.toString(),
    coverImage: cartItems[0]?.images[0],
    total: amount,
    status: "pending",
    payment: data.id,
    paymentCurrency: req?.user?.userCurrency,
    userDetails: userDet._id,
  });

  if (userDetails.saveadd) {
    await User.findByIdAndUpdate(req.user._id, {
      $set: {
        address: {
          house: userDetails.house,
          street: userDetails.street,
          city: userDetails.city,
          country: userDetails.country,
          state: userDetails.state,
          zip: userDetails.zip,
        },
      },
    });
  }

  if (!order) {
    throw new ApiError(500, "payment creation failed try Again");
  }

  res.status(200).json(
    new ApiResponse(
      200,
      {
        orderId: data.id,
        _id: order._id,
        amount,
        currency: req?.user?.userCurrency,
      },
      "order created successfully"
    )
  );
});
const key = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { key: process.env.RAZORPAY_KEY_ID },
        "key fetch successfully"
      )
    );
});

const verifyPayment = asyncHandler(async (req, res) => {
  const orderid = req.params.id;
  const order = await Order.findById(orderid);

  if (!order) {
    throw new ApiError(
      500,
      "payment verification failed please contact support if amount is deducted"
    );
  }

  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  if (!(razorpay_order_id === order.payment)) {
    throw new ApiError(401, "Payment Verification failed");
  }
  if (!(razorpay_order_id || razorpay_order_id || razorpay_signature)) {
    throw new ApiError(401, "Payment Verification failed");
  }

  const body = order.payment + "|" + razorpay_payment_id;
  const generated_sign = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (generated_sign === razorpay_signature) {
    order.payment = stringify({
      pi: razorpay_payment_id,
      oi: razorpay_order_id,
    });
    order.status = "Payment Recieved";
    await order.save({ validateBeforeSave: false });

    res.redirect(`/payment/success/${razorpay_order_id}`);
  } else {
    res
      .status(400)
      .json(new ApiResponse(400, {}, "payment verification failed"));
  }
});

export { key, createOrder, verifyPayment };
