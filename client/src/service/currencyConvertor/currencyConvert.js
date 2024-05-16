import axios from "axios";
import conf from "../conf/conf";

export const currencySymbolsToSymbols = {
  INR: "₹",
  USD: "$",
  EUR: "€",
  JPY: "¥",
  GBP: "£",
  CNY: "¥",
  AUD: "$",
  CHF: "Rp.",
  CAD: "$",
  // Rest of the currencies remain in alphabetical order
  BGN: "лв",
  BRL: "R$",
  CZK: "Kč",
  DKK: "kr.",
  HKD: "HK$",
  HRK: "kn",
  HUF: "Ft",
  IDR: "Rp",
  ILS: "₪",
  ISK: "kr.",
  KRW: "₩",
  MXN: "$",
  MYR: "RM",
  NOK: "kr",
  NZD: "$",
  PHP: "₱",
  PLN: "zł",
  RON: "lei",
  RUB: "₽",
  SEK: "kr",
  SGD: "$",
  THB: "฿",
  TRY: "₺",
  ZAR: "R",
};

export async function currencyConvert(currencyTo, currencyFrom, amount) {
  if (!(currencyTo && currencyFrom && amount)) return;
  const crrlist = await getCurrencyList();
  if (!crrlist) {
    throw Error("currency list not found");
  }
  const to = crrlist[currencyTo] || 1;
  const from = crrlist[currencyFrom] || 1;
  const amt = amount * (to / from);
  const symbol = currencySymbolsToSymbols[currencyTo] || "₹";
  return { amt, symbol };
}

export function setUserCurrency(crr) {
  if (crr) {
    window.localStorage.setItem("userCurrency", crr);
  }
}

export function getUserCurrency() {
  const userCrr = window.localStorage.getItem("userCurrency");
  return userCrr || "INR";
}

export function setCurrencyListToLocalStorage(crrlist) {
  if (crrlist) {
    window.localStorage.setItem("crrlist", JSON.stringify(crrlist));
    window.localStorage.setItem(
      "crrlistExpiry",
      new Date(Date.now() + 86400000)
    );
  }
}

export function getCurrencyListFromLocalStorage() {
  const crrlist = window.localStorage.getItem("crrlist");
  const expiryDate = window.localStorage.getItem("crrlistExpiry");
  if (!crrlist || !expiryDate || new Date(expiryDate) < new Date()) {
    return null;
  }
  return JSON.parse(crrlist);
}

export async function getCurrencyList() {
  let crrlist = getCurrencyListFromLocalStorage();
  if (!crrlist) {
    try {
      crrlist = await fetchedData();
      setCurrencyListToLocalStorage(crrlist);
    } catch (error) {
      console.error("Failed to fetch currency list:", error);
      throw error;
    }
  }
  return crrlist;
}

async function fetchedData() {
  try {
    const { data } = await axios.get(`${conf.URL}/api/v1/currencylist`);
    if (data?.data) {
      return data?.data;
    }
    throw new Error("Currency list not found");
  } catch (error) {
    console.error("Failed to fetch currency list:", error);
    throw error;
  }
}

export function getCurrencysymbol(crr) {
  return currencySymbolsToSymbols[crr] || "INR";
}
