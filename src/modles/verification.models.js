import mongoose from "mongoose";
import bcrypt from "bcrypt";

const verificationSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    code: {
      type: String,
    },
  },
  { timestamps: true }
);

verificationSchema.methods.checkCode = async function (code) {
  return await bcrypt.compare(code, this.code);
};

export const Verification = mongoose.model("verification", verificationSchema);
