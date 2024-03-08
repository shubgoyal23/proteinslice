import Razorpay from "razorpay";
import crypto from "crypto";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../modles/products.models.js";
import { Order } from "../modles/oders.models.js";
import { stringify } from "querystring";
import { User } from "../modles/user.models.js";

const createOrder = asyncHandler(async (req, res) => {
  const { cart } = req.body;

  if (cart.length === 0) {
    throw new ApiError(401, "Your Cart is empty");
  }
  async function getCartItems(cart) {
    const itemsPromises = cart.map(async (item) => {
      const product = await Product.findById(item?._id);

      if (!product) {
        throw new ApiError(404, "Items are not valid in your cart");
      }
      const quantity = Number(item.quantity);

      const price = (
        quantity *
        (product?.price * (100 - product?.discount))
      ).toFixed(0);
      return { price, productId: product._id, quantity };
    });

    const items = await Promise.all(itemsPromises);
    return items;
  }

  const cartItems = await getCartItems(cart);

  const amount = cartItems.reduce((acc, crr) => {
    return acc + Number(crr.price);
  }, 0);

  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
  });

  const data = await instance.orders.create({
    amount: amount,
    currency: "INR",
  });

  if (!data || data.error) {
    throw new ApiError(500, "payment creation failed");
  }

  const order = await Order.create({
    userId: req?.user?._id,
    items: cartItems,
    total: amount,
    status: "pending",
    payment: data.id,
  });

  if (!order) {
    throw new ApiError(500, "payment creation failed try Again");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { orderId: data.id, _id: order._id, amount },
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
    order.status = "Verified";
    await order.save({ validateBeforeSave: false });

    res.redirect(`/payment/success/${razorpay_order_id}`);
  } else {
    res
      .status(400)
      .json(new ApiResponse(400, {}, "payment verification failed"));
  }
});

export { key, createOrder, verifyPayment };
