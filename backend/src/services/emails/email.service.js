import nodemailer from "nodemailer";

let transporter = null;

export const getEmailTransporter = () => {
  if (transporter) return transporter;

  const { EMAIL_USER, EMAIL_PASS } = process.env;

  if (!EMAIL_USER || !EMAIL_PASS) {
    throw new Error("Email credentials are missing");
  }

  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  });

  return transporter;
};