import { NextResponse } from "next/server";
import { dbHelpers, hashPassword, generateId } from "@/lib/db";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "E-Mail und Passwort erforderlich" }, { status: 400 });
  }

  const existing = dbHelpers.getUserByEmail.get(email);
  if (existing) {
    return NextResponse.json({ error: "E-Mail bereits vergeben" }, { status: 409 });
  }

  const hashed = await hashPassword(password);
  const id = generateId();

  dbHelpers.createUser.run({ id, name: name || null, email, password: hashed });

  return NextResponse.json({ success: true });
}