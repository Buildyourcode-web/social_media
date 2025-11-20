const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true, // <== IMPORTANT for port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async ({ to, subject, text, html }) => {
  return await transport.sendMail({
    from: process.env.EMAIL_FROM, // "SocialApp <info@buildyourcode.in>"
    to,
    subject,
    text,
    html,
  });
};

module.exports = { sendEmail };
