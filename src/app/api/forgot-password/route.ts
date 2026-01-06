import { NextResponse } from "next/server";
import { dbHelpers, generateId } from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/mail";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // 1. Prüfen ob User existiert
    const user = dbHelpers.getUserByEmail.get(email) as any;
    if (!user) {
      // Aus Sicherheitsgründen (Enumeration Protection) sagen wir trotzdem "Erfolg"
      return NextResponse.json({ message: "Falls ein Account existiert, wurde eine Mail gesendet." });
    }

    // 2. Token generieren (32 Zeichen)
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 3600000).toISOString(); // 1 Stunde gültig

    // 3. Token in DB speichern
    (dbHelpers as any).createResetToken.run(generateId(), email, token, expires);

    // 4. E-Mail senden
    await sendPasswordResetEmail(email, token);

    return NextResponse.json({ message: "E-Mail gesendet." });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Fehler beim Senden der Mail." }, { status: 500 });
  }
}