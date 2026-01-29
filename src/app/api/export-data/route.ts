// Datei: src/app/api/export-data/route.ts

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { dbHelpersAsync } from "@/lib/db-new";


export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    // Alle Daten des Nutzers aus der DB holen
    const user = await dbHelpersAsync.getUserById(session.user.id) as any;

    if (!user) {
      return NextResponse.json({ error: "Nutzer nicht gefunden" }, { status: 404 });
    }

    // Sensible Daten wie das Passwort-Hash entfernen
    const { password, ...safeData } = user;

    // Das JSON als Datei-Download bereitstellen
    return new NextResponse(JSON.stringify(safeData, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="dsgvo-daten-export-${session.user.id}.json"`,
      },
    });
  } catch (error) {
    console.error("Export Fehler:", error);
    return NextResponse.json({ error: "Export fehlgeschlagen" }, { status: 500 });
  }
}