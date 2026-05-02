import { Router } from "express";
import nodemailer from "nodemailer";

const router = Router();

const SMTP_USER = "kirubelgpt@gmail.com";
const SMTP_PASS = "sakf efpt avgl owpt";
const TO_EMAIL  = "kiruabatu@gmail.com";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body as {
    name?: string;
    email?: string;
    message?: string;
  };

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email and message are required." });
  }

  try {
    await transporter.sendMail({
      from: `"${name}" <${SMTP_USER}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
          <h2 style="color:#3b82f6">New message from your portfolio</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:6px 0;color:#6b7280;width:80px">Name</td><td style="padding:6px 0;font-weight:600">${name}</td></tr>
            <tr><td style="padding:6px 0;color:#6b7280">Email</td><td style="padding:6px 0"><a href="mailto:${email}">${email}</a></td></tr>
          </table>
          <div style="margin-top:16px;padding:16px;background:#f3f4f6;border-radius:8px;white-space:pre-wrap">${message}</div>
        </div>
      `,
    });
    return res.json({ ok: true });
  } catch (err: any) {
    console.error("Mail error:", err);
    return res.status(500).json({ error: "Failed to send email. Please try again." });
  }
});

export default router;
