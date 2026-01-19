// Datei: src/app/api/user/update/route.ts

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { dbHelpers } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const { name } = await req.json();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    if (!name || name.length < 2) {
      return NextResponse.json({ error: "Name ist zu kurz." }, { status: 400 });
    }

    // Nutzt den updateUserProfile Helper aus src/lib/db.ts (siehe Canvas)
    (dbHelpers as any).updateUserProfile.run(name, session.user.id);

    return NextResponse.json({ success: true, message: "Profil aktualisiert." });
  } catch (error) {
    console.error("Update Fehler:", error);
    return NextResponse.json({ error: "Update fehlgeschlagen" }, { status: 500 });
  }
}