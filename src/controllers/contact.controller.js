import { contactMail } from "../emailTemplets/contactMail.js";
import { Contact } from "../modles/contact.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { transporter } from "../utils/Email.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import axios from "axios";
const verifyRecaptcha = async (token) => {
  const secretKey = process.env.PS_RECAPTCHA_SECRET_KEY;
  var verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
  return await axios.post(verificationUrl);
};

const addContactForm = asyncHandler(async (req, res) => {
  const { email, subject, message, fullName, token } = req.body;

  if (!email && !subject && !message && !fullName) {
    throw new ApiError(401, "All Feilds are Required");
  }
  if (!token) {
    throw new ApiError(401, "Human Validation failed");
  }
  const { data } = await verifyRecaptcha(token);
  if (!data.success) {
    throw new ApiError(403, "recaptcha Verification failed");
  }

  const post = await Contact.create({
    email,
    subject,
    message,
    fullName,
  });
  if (!post) {
    throw new ApiError(401, "cannot Post your form, try again later");
  }

  await transporter.sendMail({
    from: '"Proteinslice.com" <contact@proteinslice.com>',
    to: email,
    subject: "Thankyou For Contacting Us",
    text: "Contact mail submition Confirmition.",
    html: contactMail({ fullName, email, subject }),
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Contact Form Submitted successfully"));
});

export { addContactForm };
