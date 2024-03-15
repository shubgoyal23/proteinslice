import express from "express";
import cookieParser from "cookie-parser";
import { ApiError } from "./utils/ApiError.js";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(cookieParser());

import paymentRouter from "./routers/payment.router.js";
import userRouter from "./routers/user.router.js";
import ProductRouter from "./routers/products.router.js";
import reviewRouter from "./routers/review.router.js"
import orderRouter from "./routers/order.router.js"

app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/product", ProductRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/orders", orderRouter);

app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
  } else {
    console.error(err);
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/dist/index.html'));
});

export { app };
