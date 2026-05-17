import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import axios from "axios";
import { ConnectRedis, Redisclient } from "../db/redis.js";
const getCurrencyList = asyncHandler(async (_req, res) => {
  await ConnectRedis();

  const currencyList = await Redisclient.get("currencyList");
  if (currencyList) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          JSON.parse(currencyList),
          "currency list fetched successfull"
        )
      );
  }
  const { data } = await axios.get(
    `https://api.freecurrencyapi.com/v1/latest?apikey=${process.env.CURRENCY_API}`,
    { timeout: 5000 }
  );
  if (data && data.data) {
    await Redisclient.set("currencyList", JSON.stringify(data.data));
    await Redisclient.expire("currencyList", 86400); // 24 hours
  }
  if (!data || !data.data) {
    const constantData = {
      AUD: 1.3990002359,
      BGN: 1.6650003061,
      BRL: 5.0706008703,
      CAD: 1.3750001482,
      CHF: 0.7868001197,
      CNY: 6.8099013299,
      CZK: 20.915303886,
      DKK: 6.4288010289,
      EUR: 0.860182098,
      GBP: 0.7504701483,
      HKD: 7.8298010796,
      HRK: 6.482040721,
      HUF: 311.1000621559,
      IDR: 17470.002787886,
      ILS: 2.9170005753,
      INR: 95.9881150542,
      ISK: 123.5300223798,
      JPY: 158.7500212749,
      KRW: 1498.4351986715,
      MXN: 17.3350020221,
      MYR: 3.9500007173,
      NOK: 9.311181027,
      NZD: 1.713000287,
      PHP: 61.6970094878,
      PLN: 3.6502006089,
      RON: 4.4450905336,
      RUB: 72.8500086722,
      SEK: 9.4504017689,
      SGD: 1.2806701726,
      THB: 32.6800056666,
      TRY: 45.4933060747,
      USD: 1,
      ZAR: 16.6986021624,
    };
    return res
      .status(200)
      .json(
        new ApiResponse(200, constantData, "currency list fetched successfull")
      );
  }
  return res
    .status(200)
    .json(new ApiResponse(200, data.data, "currency list fetched successfull"));
});

export { getCurrencyList };
