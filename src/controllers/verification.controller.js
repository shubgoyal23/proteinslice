import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { transporter } from "../utils/Email.js";
import { otpTemplate } from "../emailTemplets/verificationMail.js";
import { v4 as uuidv4 } from "uuid";
import { Verification } from "../modles/verification.models.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../modles/user.models.js";

const sendVerificationMail = asyncHandler(async (req, res) => {
  if (req.user.Verification) {
    throw new ApiError(403, "Email Id is already verified!");
  }
  const code = uuidv4().toString();

  const checkRecords = await Verification.findOne({ email: req.user?.email });

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
  await Verification.findOneAndDelete({ email: req.user?.email });

  const mail = await transporter.sendMail({
    from: '"Proteinslice.com" <verify@proteinslice.com>',
    to: req.user?.email,
    subject: "Verify Your Email",
    text: "Email verification mail from ProteinSlice",
    html: otpTemplate({
      fullname: req.user?.fullname,
      code: code,
      email: req.user?.email,
    }),
  });

  if (mail.rejected.length !== 0) {
    throw new ApiError(
      500,
      "email Failed to deliver please contact customer Care"
    );
  }

  const createrecord = await Verification.create({
    email: req.user?.email,
    code: code,
  });

  res.status(200).json(new ApiResponse(200, {}, "success"));
});

const verifycode = asyncHandler(async (req, res) => {
  const { code, email } = req.body;

  if (!email && !code) {
    throw new ApiError(401, "Email Id and Code are required");
  }

  const dbCode = await Verification.findOne({ email });

  if (!dbCode) {
    throw new ApiError(403, "verification is not Requested");
  }

  const check = dbCode.checkCode(code);

  if (!check) {
    throw new ApiError(403, "verification failed");
  }

  await User.findOneAndUpdate(
    { email },
    {
      $set: { emailVerification: true },
    }
  );

  await Verification.findByIdAndDelete(dbCode._id);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Email Verified successfully"));
});

export { sendVerificationMail, verifycode };
