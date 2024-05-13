import { Router } from "express";
import { getCurrencyList } from "../controllers/currencylist.controller.js";

const router = Router();

router.route("/").get(getCurrencyList);

export default router;
