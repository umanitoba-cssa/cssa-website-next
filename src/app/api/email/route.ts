import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export async function POST(request: NextRequest) {
  const { email, name, message, recaptchaToken } = await request.json();

  const params = new URLSearchParams({
    secret: process.env.RECAPTCHA_SECRET_KEY ?? "",
    response: recaptchaToken ?? "",
  });
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify",{
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString()
  });
  const {success} = await res.json();
  if (!success){
    return NextResponse.json({ error: "reCAPCHA failed" }, { status: 400 }); 
  }
  const transport = nodemailer.createTransport({
    host: "mail.smtp2go.com",
    port: 465,
    secure: true, // upgrade later with STARTTLS
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions: Mail.Options = {
    from: '"CSSA Website Contact Form" <website@umanitobacssa.ca>',
    to: '"CSSA" <cssa@umanitoba.ca>',
    replyTo: email,
    cc: email, //(uncomment this line if you want to send a copy to the sender)
    subject: `Message from ${name} (${email})`,
    text: message,
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve("Email sent");
        } else {
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise();
    return NextResponse.json({ message: "Email sent" });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
