import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  // Transporter using ethereal or real SMTP (e.g. Gmail, Mailtrap)
  // For development, we use ethereal or fake console if not configured
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.mailtrap.io",
    port: process.env.EMAIL_PORT || 2525,
    auth: {
      user: process.env.EMAIL_USER || "test_user",
      pass: process.env.EMAIL_PASS || "test_pass",
    },
  });

  const mailOptions = {
    from: "Zero Degree <noreply@zerodegree.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Email sending failed:", error);
  }
};

export default sendEmail;
