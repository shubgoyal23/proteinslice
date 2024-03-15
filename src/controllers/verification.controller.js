import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { transporter } from "../utils/Email.js";
import { otpTemplate } from "../emailTemplets/verificationMail.js";
import { v4 as uuidv4 } from "uuid";
import { Verification } from "../modles/verification.models.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../modles/user.models.js";

const generateCode = asyncHandler(async (req, res) => {
  const code = uuidv4().toString();

  const checkRecords = await Verification.findOne({ userId: req.user?._id });

  if (checkRecords) {
    const CurrentTime = new Date();
    const createdTime = new Date(checkRecords.createdAt);

    const diffrence = (CurrentTime.getTime() - createdTime.getTime()) / 60000;

    if (diffrence < 15) {
      throw new ApiError(
        403,
        `Email is already send Please Check Your email inbox or scam box. or wait for ${Math.floor(15 - diffrence)} Min to resend Email`
      );
    }
  }
  await Verification.findOneAndDelete({ userId: req.user?._id });

  const mail = await transporter.sendMail({
    from: '"Proteinslice.com" <verify@proteinslice.com>',
    to: req.user?.email,
    subject: "Verify Your Email",
    text: "Email verification mail from ProteinSlice",
    html: otpTemplate({ fullname: req.user?.fullname, code: code }),
  });

  if (mail.rejected.length !== 0) {
    throw new ApiError(
      500,
      "email Failed to delever please contact customer Care"
    );
  }

  const createrecord = await Verification.create({
    userId: req.user?._id,
    code: code,
  });

  res.status(200).json(new ApiResponse(200, {}, "success"));
});

const verifycode = asyncHandler(async (req, res) => {
  const code = req.params.id;

  const dbCode = await Verification.findOne({ userId: req.user?._id });

  if (!dbCode) {
    throw new ApiError(403, "verification is not Requested");
  }

  const check = dbCode.checkCode(code);

  if (!check) {
    throw new ApiError(403, "verification failed");
  }

  await User.findByIdAndUpdate(req.user._id, {
    $set: { emailVerification: true },
  });

  await Verification.findByIdAndDelete(dbCode._id);

  res.redirect("/")
});

export { generateCode, verifycode };
