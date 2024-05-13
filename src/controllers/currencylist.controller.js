import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import axios from "axios";
const getCurrencyList = asyncHandler(async (req, res) => {
  const { data } = await axios.get(
    `https://api.freecurrencyapi.com/v1/latest?apikey=${process.env.CURRENCY_API}`
  );
  if (!data.data) {
    throw new ApiError(500, "failed to get currency list");
  }
  const crr = {
    crrencyList: data.data,
  };
  return res
    .status(200)
    .json(new ApiResponse(200, crr, "currency list fetched successfull"));
});

export { getCurrencyList };
