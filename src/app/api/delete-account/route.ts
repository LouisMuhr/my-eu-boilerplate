import { auth } from "@/app/api/auth/[...nextauth]/route";
import { dbHelpers } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  dbHelpers.deleteUser.run(session.user.id);

  return new NextResponse("Account gelöscht", { status: 200 });
}