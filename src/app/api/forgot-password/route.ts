import { NextResponse } from "next/server";
import { dbHelpersAsync } from "@/lib/db-new"; // NEU
import { generateId } from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/mail";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const user = await dbHelpersAsync.getUserByEmail(email); // NEU: await
    if (!user) {
      // Security: Wir sagen trotzdem "gesendet", damit man keine Emails testen kann
      return NextResponse.json({ message: "Falls die E-Mail existiert, wurde ein Link gesendet." });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const id = generateId();
    const expires = new Date(Date.now() + 3600000).toISOString(); // 1 Stunde

    // NEU: await
    await dbHelpersAsync.createResetToken({
      id,
      email,
      token,
      expires
    });

    // Email senden (Bleibt vorerst wie es ist, Schritt 2 kommt gleich)
    await sendPasswordResetEmail(email, token);

    return NextResponse.json({ message: "E-Mail gesendet." });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return NextResponse.json({ error: "Fehler beim Senden." }, { status: 500 });
  }
}