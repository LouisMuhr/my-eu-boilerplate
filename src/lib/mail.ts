import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

export const sendPasswordResetEmail = async (email: string, token: string) => {
  // FEHLER-CHECK: In deinem Repo steht 'new-password', dein Ordner heißt aber 'reset-password'
  const resetLink = `${domain}/auth/reset-password?token=${token}`;
  
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email, // MUSS dein Resend-Account-Email sein, solange Domain nicht verifiziert
      subject: "Passwort zurücksetzen",
      html: `
        <div style="font-family: sans-serif;">
          <h1>Passwort-Reset angefordert</h1>
          <p>Klicke auf den Link, um dein Passwort zu ändern:</p>
          <a href="${resetLink}">${resetLink}</a>
          <p>Der Link ist 1 Stunde gültig.</p>
        </div>
      `,
    });
    
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};