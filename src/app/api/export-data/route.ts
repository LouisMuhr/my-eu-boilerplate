import { auth } from "@/auth";
import { dbHelpers } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = dbHelpers.getUserById.get(session.user.id);

  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  // Passwort entfernen
  // @ts-ignore
  delete user.password;

  const json = JSON.stringify(user, null, 2);

  return new NextResponse(json, {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="meine-daten-${session.user.id}.json"`,
    },
  });
}