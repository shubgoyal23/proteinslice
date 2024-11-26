import mongoose from "mongoose"

let isConnected = false
const connectDb = async () => {
    if (isConnected) return;
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/proteinslice`)
        isConnected = true;
        console.log(`MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export {connectDb}