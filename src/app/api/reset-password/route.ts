// Datei: src/app/api/reset-password/route.ts

import { NextResponse } from "next/server";
import db, { dbHelpers, hashPassword } from "@/lib/db";
/**
 * Diese Route verarbeitet die tatsächliche Passwort-Änderung.
 * Sie validiert den Token und updated das Passwort.
 */
export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();
    // ---------------------

    if (!token || !password || password.length < 8) {
      return NextResponse.json(
        { error: "Ungültige Daten oder Passwort zu kurz." },
        { status: 400 }
      );
    }

    // 1. Token in der DB suchen
    const resetRequest = (dbHelpers as any).getResetTokenByToken.get(
      token
    ) as any;
    console.log("Gefundener Request:", resetRequest);

    if (!resetRequest) {
      return NextResponse.json(
        { error: "Ungültiger oder abgelaufener Token." },
        { status: 400 }
      );
    }

    // 2. Prüfen ob Token abgelaufen ist
    const isExpired = new Date(resetRequest.expires) < new Date();
    if (isExpired) {
      (dbHelpers as any).deleteResetToken.run(resetRequest.id);
      return NextResponse.json(
        { error: "Token ist abgelaufen." },
        { status: 400 }
      );
    }

    // 3. Neues Passwort hashen und updaten
    const hashedPassword = await hashPassword(password);
    dbHelpers.updateUserPassword.run(hashedPassword, resetRequest.email);

    // 4. Token löschen (Sicherheit: Token darf nur 1x benutzt werden)
    (dbHelpers as any).deleteResetToken.run(resetRequest.id);

    return NextResponse.json({ message: "Passwort erfolgreich geändert." });
  } catch (error) {
    console.error("Reset-Password API Fehler:", error);
    return NextResponse.json(
      { error: "Serverfehler beim Zurücksetzen." },
      { status: 500 }
    );
  }
}
