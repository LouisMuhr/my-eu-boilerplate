// Datei: src/lib/mail.ts
import { Resend } from "resend";
import { render } from "@react-email/render";
import ResetPasswordEmail from "@/emails/ResetPasswordEmail";
import VerifyEmail from "@/emails/VerifyEmail";
import { env } from "@/env";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPasswordResetEmail(email: string, token: string) {
  // 1. Link bauen (Lokal vs Live beachten!)
  const resetLink = `${process.env.NEXT_PUBLIC_URL}/auth/reset-password?token=${token}`;

  // 2. React-Template zu HTML rendern
  const emailHtml = await render(ResetPasswordEmail({ resetLink }));

  try {
    await resend.emails.send({
      from: "Onboarding <onboarding@resend.dev>", // WICHTIG: Nur ändern, wenn du eine Domain bei Resend verifiziert hast!
      to: email,
      subject: "Passwort zurücksetzen",
      html: emailHtml,
    });
    console.log("📧 Email gesendet an:", email);
  } catch (error) {
    console.error("❌ Fehler beim Email-Senden:", error);
    // Kein Throw, damit die UI nicht crasht
  }
}
export async function sendVerificationEmail(email: string, token: string) {
  const verifyLink = `${env.NEXT_PUBLIC_URL}/auth/verify-email?token=${token}`;
  const emailHtml = await render(VerifyEmail({ verifyLink }));

  try {
    await resend.emails.send({
      from: "Onboarding <onboarding@resend.dev>",
      to: email,
      subject: "Bestätige deine E-Mail-Adresse",
      html: emailHtml,
    });
    console.log("📧 Verification Email gesendet an:", email);
  } catch (error) {
    console.error("❌ Fehler beim Email-Senden:", error);
  }
}