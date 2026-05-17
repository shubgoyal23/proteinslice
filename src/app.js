import express from "express";
import cookieParser from "cookie-parser";
import { ApiError } from "./utils/ApiError.js";
import cors from "cors";
import { connectDb } from "./db/conectDb.js";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(async (req, res, next) => {
  await connectDb();
  next();
});

// Global rate limit
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 150,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});

// Strict limit for expensive/sensitive endpoints (auth, contact, verification)
const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});

app.use(globalLimiter);

import paymentRouter from "./routers/payment.router.js";
import userRouter from "./routers/user.router.js";
import ProductRouter from "./routers/products.router.js";
import reviewRouter from "./routers/review.router.js";
import orderRouter from "./routers/order.router.js";
import verificationRouter from "./routers/verification.router.js";
import contactRouter from "./routers/contact.router.js";
import currencyRouter from "./routers/currency.router.js";

app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/users", strictLimiter, userRouter);
app.use("/api/v1/product", ProductRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/verify", strictLimiter, verificationRouter);
app.use("/api/v1/contact", strictLimiter, contactRouter);
app.use("/api/v1/currencylist", strictLimiter, currencyRouter);

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

app.get("/health", (_req, res) => {
  res.status(200).json({ message: "Server is running" });
});

export { app };
