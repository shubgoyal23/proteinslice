import {app} from "./app.js"
import { connectDb } from "./db/conectDb.js";

const port = Number(process.env.PORT) + 1;

connectDb().then(() => {
   app.listen(port, () => {
      console.log(`server starte at http://localhost:${port}`);
   });
}).catch(() => console.log("connection to db failed"))

