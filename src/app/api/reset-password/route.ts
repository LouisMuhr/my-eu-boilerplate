import { NextResponse } from "next/server";
import { dbHelpersAsync } from "@/lib/db-new"; // NEU
import { hashPassword } from "@/lib/auth-utils";
import { rateLimit, rateLimitResponse, getIP } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const ip = getIP(req);
  const limit = rateLimit(ip, { max: 5, windowMs: 60_000 });
  if (!limit.success) return rateLimitResponse(limit.resetTime);

  try {
    const { token, password } = await req.json();

    if (!token || !password || password.length < 8) {
      return NextResponse.json({ error: "Ungültige Daten." }, { status: 400 });
    }

    // NEU: await
    const resetRequest = await dbHelpersAsync.getResetTokenByToken(token);

    if (!resetRequest) {
      return NextResponse.json({ error: "Ungültiger oder abgelaufener Token." }, { status: 400 });
    }

    const isExpired = new Date(resetRequest.expires) < new Date();
    if (isExpired) {
      await dbHelpersAsync.deleteResetToken(resetRequest.id);
      return NextResponse.json({ error: "Token ist abgelaufen." }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);
    
    // NEU: await
    await dbHelpersAsync.updateUserPassword(hashedPassword, resetRequest.email);
    await dbHelpersAsync.deleteResetToken(resetRequest.id);

    return NextResponse.json({ message: "Passwort erfolgreich geändert." });
  } catch (error) {
    console.error("Reset Error:", error);
    return NextResponse.json({ error: "Serverfehler." }, { status: 500 });
  }
}