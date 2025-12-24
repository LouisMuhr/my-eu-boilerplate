import { NextRequest, NextResponse } from "next/server";
import { dbHelpers, hashPassword, generateId } from "@/lib/db";

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
    const existingUser = dbHelpers.getUserByEmail.get(email);
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
    dbHelpers.createUser.run(
      id,
      name || null,
      email,
      hashedPassword,
      null,
      "free"
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
