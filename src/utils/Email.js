import nodemailer from 'nodemailer'
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    host: "email-smtp.ap-south-1.amazonaws.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.AWS_SES_USER,
      pass: process.env.AWS_SES_PASS,
    },
  });

  export {transporter}
