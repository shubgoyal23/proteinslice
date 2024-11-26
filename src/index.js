import dotenv from "dotenv";
import {app} from "./app.js"

dotenv.config();
const port = Number(process.env.PORT);


app.listen(port, () => {
   console.log(`server starte at http://localhost:${port}`);
});


