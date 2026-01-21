import { NextRequest, NextResponse } from "next/server";
import {hashPassword, generateId } from "@/lib/db";
import { dbHelpersAsync } from "@/lib/db-new";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "E-Mail und Passwort sind erforderlich" },
        { status: 400 }
      );
    }

    // Prüfen, ob User schon existiert
    const existingUser = await dbHelpersAsync.getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: "Ein Account mit dieser E-Mail existiert bereits" },
        { status: 409 }
      );
    }

    // Passwort hashen
    const hashedPassword = await hashPassword(password);

    // Neuen User anlegen
    const id = generateId();
    await dbHelpersAsync.createUser({
      id,
      name: name || null,
      email,
      password: hashedPassword,
      subscriptionStatus: "free",
    }
    );

    return NextResponse.json({
      success: true,
      message: "Registrierung erfolgreich",
    });
  } catch (error) {
    console.error("Registrierungs-Fehler:", error);
    return NextResponse.json(
      { error: "Etwas ist schiefgelaufen. Bitte später erneut versuchen." },
      { status: 500 }
    );
  }
}
