import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendMail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to,
      subject,
      html,
    });

    return { success: true, data };
  } catch (error) {
    console.error("E-Mail Fehler:", error);
    return { success: false, error };
  }
}

/**
 * Vorlage für die Passwort-Wiederherstellung.
 */
export async function sendPasswordResetEmail(email: string, token: string) {
  const resetLink = `${process.env.NEXT_PUBLIC_URL}/auth/reset-password?token=${token}`;

  await sendMail({
    to: email,
    subject: "Passwort zurücksetzen - EU Boilerplate",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
        <h1>Passwort zurücksetzen</h1>
        <p>Du hast eine Anfrage zum Zurücksetzen deines Passworts gestellt.</p>
        <p>Klicke auf den folgenden Link, um ein neues Passwort zu vergeben:</p>
        <a href="${resetLink}" style="display: inline-block; padding: 12px 24px; background-color: #2563eb; color: white; text-decoration: none; rounded: 8px;">Passwort zurücksetzen</a>
        <p>Dieser Link ist für 1 Stunde gültig.</p>
        <hr />
        <p style="font-size: 12px; color: gray;">Falls du diese Anfrage nicht gestellt hast, kannst du diese Mail ignorieren.</p>
      </div>
    `,
  });
}