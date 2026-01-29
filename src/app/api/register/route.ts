import { NextRequest, NextResponse } from "next/server";
import { hashPassword, generateId } from "@/lib/auth-utils";
import { dbHelpersAsync } from "@/lib/db-new";
import { registerSchema } from "@/lib/validations";
import { sendVerificationEmail } from "@/lib/mail";
import { ZodError } from "zod";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, name } = registerSchema.parse(body);
    console.log("🔥 REGISTER: User wird erstellt:", email);

    const existingUser = await dbHelpersAsync.getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json({ error: "E-Mail wird bereits verwendet" }, { status: 409 });
    }

    const hashedPassword = await hashPassword(password);
    const id = generateId();

    // User erstellen (noch nicht verifiziert)
    await dbHelpersAsync.createUser({
      id,
      name: name || null,
      email,
      password: hashedPassword,
      subscriptionStatus: "free",
      emailVerified: false, // NEU
    });
console.log("✅ REGISTER: User erstellt, sende Verification Email...");
    // Verification Token erstellen
    const token = crypto.randomBytes(32).toString("hex");
    const tokenId = generateId();
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 Stunden

    await dbHelpersAsync.createVerificationToken({
      id: tokenId,
      email,
      token,
      expires,
    });

    // Verification E-Mail senden
    await sendVerificationEmail(email, token);
console.log("📧 REGISTER: Email-Funktion aufgerufen");
    return NextResponse.json({ 
      success: true, 
      message: "Bitte bestätige deine E-Mail-Adresse." 
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    
    console.error("Register Error:", error);
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 });
  }
}