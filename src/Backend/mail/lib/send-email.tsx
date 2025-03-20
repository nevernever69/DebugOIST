import { createTransport, SentMessageInfo } from "nodemailer";
import { render } from "@react-email/render";
import RegistrationSuccessEmail from "../templates/RegistrationSuccessEmail";

interface SendRegistrationSuccessEmailProps {
  to: string;
  userName: string;
  userEmail: string;
  eventName: string;
  eventDate: string;
}

export async function sendRegistrationSuccessEmail({
  to,
  userName,
  userEmail,
  eventName,
  eventDate,
}: SendRegistrationSuccessEmailProps): Promise<SentMessageInfo> {
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailAppPassword) {
    throw new Error("Missing GMAIL_USER or GMAIL_APP_PASSWORD environment variable");
  }

  const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  });

  try {
    await transporter.verify();
    console.log("Gmail SMTP credentials are valid. Ready to send emails!");
  } catch (error) {
    console.error("Error verifying Gmail SMTP credentials:", error);
    throw error;
  }

  // Render the email as HTML
  const emailHtml = await render(
    <RegistrationSuccessEmail
      userName={userName}
      eventName={eventName}
      eventDate={eventDate}
    />,
    { pretty: true }
  );

  const mailOptions = {
    from: `"Debug Club" <${gmailUser}>`,
    to,
    subject: "Registration Successful – Debug Club",
    html: emailHtml,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Test email sent successfully:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending test email:", error);
    throw error;
  }
}
