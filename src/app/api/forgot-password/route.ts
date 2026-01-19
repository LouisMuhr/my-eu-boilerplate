import { NextResponse } from "next/server";
import db, { dbHelpers, generateId } from "@/lib/db"
import crypto from "crypto";
import { Resend } from "resend";

// Initialisierung von Resend mit dem API-Key aus der .env.local
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Validierung der Eingabe
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Ungültige E-Mail-Adresse." }, { status: 400 });
    }

    const user: any = db.prepare("SELECT id, name FROM users WHERE email = ?").get(email);

    if (!user) {
      // DSGVO: Keine Information darüber, ob der User existiert (Enumeration Protection)
      return NextResponse.json({ 
        message: "Anweisungen wurden gesendet, falls die Adresse registriert ist." 
      });
    }

    // Token-Generierung
    const token = crypto.randomUUID();
    const id = generateId();
    const expires = new Date(Date.now() + 3600000).toISOString(); // 1 Stunde Gültigkeit

    try {
        const info = (dbHelpers as any).createResetToken.run(id, email, token, expires);
    } catch (dbError) {
        console.error("3. ❌ DB INSERT ERROR:", dbError);
    }

    // Datenbank-Update
    db.prepare("UPDATE users SET reset_tokens = ?, reset_expires = ? WHERE id = ?")
      .run(token, expires, user.id);

    // KORREKTUR: Wir nutzen NEXT_PUBLIC_URL (konsistent) und den korrekten Pfad /auth/reset-password
    const baseUrl = process.env.NEXT_PUBLIC_URL || process.env.NEXT_PUBLIC_APP_URL;
    const resetLink = `${baseUrl}/auth/reset-password?token=${token}`;

    // --- E-MAIL VERSAND MIT RESEND ---
    try {
      if (process.env.RESEND_API_KEY) {
        await resend.emails.send({
          // KORREKTUR: onboarding@resend.dev funktioniert NUR für deine eigene Account-Mail
          from: process.env.MAIL_FROM || "onboarding@resend.dev",
          to: email,
          subject: "Passwort zurücksetzen - EU Boilerplate",
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 16px;">
              <h1 style="color: #1e293b;">Passwort zurücksetzen</h1>
              <p>Hallo ${user.name || 'Nutzer'},</p>
              <p>du hast angefordert, dein Passwort zurückzusetzen. Klicke auf den Button, um ein neues Passwort zu wählen:</p>
              <div style="margin: 32px 0;">
                <a href="${resetLink}" style="background-color: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">Neues Passwort festlegen</a>
              </div>
              <p style="font-size: 14px; color: #64748b;">Dieser Link läuft in 60 Minuten ab. Falls du das nicht warst, lösche diese Mail einfach.</p>
            </div>
          `,
        });
      }
    } catch (mailError) {
      // Wir loggen den Fehler, verraten dem User aber nichts (Sicherheit)
      console.error("Resend System Error:", mailError);
    }

    return NextResponse.json({ 
      message: "Anweisungen wurden gesendet, falls die Adresse registriert ist." 
    });
  } catch (error) {
    console.error("Critical Auth Error:", error);
    return NextResponse.json({ error: "Interner Serverfehler." }, { status: 500 });
  }
}