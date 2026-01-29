import { NextRequest, NextResponse } from "next/server";
import { dbHelpersAsync } from "@/lib/db-new";

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Token fehlt" }, { status: 400 });
    }

    const verificationToken = await dbHelpersAsync.getVerificationTokenByToken(token);

    if (!verificationToken) {
      return NextResponse.json({ error: "Ungültiger Token" }, { status: 400 });
    }

    // Prüfe ob abgelaufen
    if (new Date(verificationToken.expires) < new Date()) {
      await dbHelpersAsync.deleteVerificationToken(verificationToken.id);
      return NextResponse.json({ error: "Token abgelaufen" }, { status: 400 });
    }

    // User verifizieren
    await dbHelpersAsync.verifyUserEmail(verificationToken.email);

    // Token löschen
    await dbHelpersAsync.deleteVerificationToken(verificationToken.id);

    return NextResponse.json({ success: true, message: "E-Mail bestätigt!" });
  } catch (error) {
    console.error("Verify Error:", error);
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 });
  }
}