import {app} from "./app.js"
import dotenv from "dotenv";
import { connectDb } from "./db/conectDb.js";

dotenv.config();
const port = Number(process.env.PORT) + 1;

console.log("this", process.env.RAZORPAY_KEY_ID)
console.log("this", process.env.PORT)

connectDb().then(() => {
   app.listen(port, () => {
      console.log(`server starte at http://localhost:${port}`);
   });
}).catch(() => console.log("connection to db failed"))

