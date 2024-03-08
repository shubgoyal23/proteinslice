import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../modles/user.models.js";

const verifyJwt = asyncHandler(async (req, res, next) => {
  try {
    const accessToken = req?.cookies?.accessToken || req.body?.accessToken;

    if (!accessToken) {
      throw new ApiError(404, "unauthorised request");
    }

    const decodetoken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    const user = await User.findById(decodetoken._id)?.select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(404, "user not found");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

export { verifyJwt };
