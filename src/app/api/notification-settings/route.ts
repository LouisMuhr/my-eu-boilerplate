import { NextResponse } from "next/server";
import { auth } from "@/auth";

/**
 * TODO: Add notification preferences to database schema
 * For now, this is a placeholder that always returns success
 * Settings are stored client-side in localStorage
 */
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const settings = await req.json();

    // TODO: Save to database when schema is updated
    // await db.update(users)
    //   .set({ notificationSettings: JSON.stringify(settings) })
    //   .where(eq(users.id, session.user.id));

    console.log("[NOTIFICATION_SETTINGS]", {
      userId: session.user.id,
      settings,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[NOTIFICATION_SETTINGS_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
