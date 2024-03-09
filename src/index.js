import dotenv from "dotenv";
import {app} from "./app.js"
import { connectDb } from "./db/conectDb.js";

dotenv.config();
const port = Number(process.env.PORT) + 0;

connectDb().then(() => {
   app.listen(port, () => {
      console.log(`server starte at http://localhost:${port}`);
   });
}).catch(() => console.log("connection to db failed"))

