// Datei: src/app/dashboard/actions.ts
"use server";

import { auth } from "@/auth";
import { dbHelpersAsync } from "@/lib/db-new"; // WICHTIG: Neue DB!
import { revalidatePath } from "next/cache";

export async function updateUserName(formData: FormData) {
  const session = await auth();
  
  if (!session?.user?.id) {
    return { error: "Nicht eingeloggt" };
  }

  const name = formData.get("name") as string;

  if (!name || name.length < 2) {
    return { error: "Name muss mindestens 2 Zeichen lang sein." };
  }

  try {
    await dbHelpersAsync.updateUserProfile(session.user.id, name);
    revalidatePath("/dashboard"); // Zwingt Next.js, die Daten neu zu laden
    return { success: true };
  } catch (error) {
    console.error("Update Error:", error);
    return { error: "Fehler beim Speichern." };
  }
}