// Datei: src/app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { hashPassword, generateId } from "@/lib/auth-utils"; // <--- NEUER IMPORT
import { dbHelpersAsync } from "@/lib/db-new";
import { registerSchema } from "@/lib/validations"; // <--- ZOD SCHEMA
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. VALIDIERUNG (Der Türsteher)
    const { email, password, name } = registerSchema.parse(body);

    // Ab hier sind die Daten GARANTIERT sicher und im richtigen Format.

    const existingUser = await dbHelpersAsync.getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json({ error: "E-Mail wird bereits verwendet" }, { status: 409 });
    }

    const hashedPassword = await hashPassword(password);
    const id = generateId();

    await dbHelpersAsync.createUser({
      id,
      name: name || null,
      email,
      password: hashedPassword,
      subscriptionStatus: "free",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    // 2. ZOD FEHLER ABFANGEN
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    
    console.error("Register Error:", error);
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 });
  }
}