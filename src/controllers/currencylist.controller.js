import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import axios from "axios";
const getCurrencyList = asyncHandler(async (req, res) => {
  const { data } = await axios.get(
    `https://api.freecurrencyapi.com/v1/latest?apikey=${process.env.CURRENCY_API}`
  );
  if (!data.data) {
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          AUD: 1.5150002441,
          BGN: 1.8091701831,
          BRL: 5.1555309626,
          CAD: 1.367880173,
          CHF: 0.9065501461,
          CNY: 7.2265512845,
          CZK: 23.1236033522,
          DKK: 6.9263909602,
          EUR: 0.9282501062,
          GBP: 0.7986901581,
          HKD: 7.8151710887,
          HRK: 6.7613008312,
          HUF: 360.0551705825,
          IDR: 16026.118992314,
          ILS: 3.7139504192,
          INR: 83.5190449279,
          ISK: 139.4545039569,
          JPY: 155.823670014,
          KRW: 1369.2585589935,
          MXN: 16.7771321324,
          MYR: 4.738760897,
          NOK: 10.8498915986,
          NZD: 1.6616202737,
          PHP: 57.453149333,
          PLN: 3.9921504844,
          RON: 4.6214806848,
          RUB: 92.3437767133,
          SEK: 10.8413411278,
          SGD: 1.3549501541,
          THB: 36.7788870319,
          TRY: 32.1983940195,
          USD: 1,
          ZAR: 18.4300926578,
        },
        "currency list fetched successfull"
      )
    );
  }
  const crr = data.data;
  return res
    .status(200)
    .json(new ApiResponse(200, crr, "currency list fetched successfull"));
});

export { getCurrencyList };
