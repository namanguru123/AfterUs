import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
  try {
    console.log("📧 Sending email to:", to);

    const msg = {
      to,
      from: process.env.EMAIL_FROM, 
      subject,
      html,
    };

    const response = await sgMail.send(msg);

    console.log("✅ Email sent:", response[0].statusCode);
    return response;
  } catch (error) {
    console.error("❌ EMAIL ERROR:", error.response?.body || error.message);
    throw error; 
  }
};

export default sendEmail;