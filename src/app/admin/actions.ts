"use server";

import { dbHelpers } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
import { revalidatePath } from "next/cache";

export async function deleteUserAction(id: string) {
  // 1. Sicherheit: Nochmal prüfen, ob der Aufrufer Admin ist
  await requireAdmin();

  try {
    // 2. User löschen
    (dbHelpers as any).deleteUser.run(id);
    
    // 3. Cache ungültig machen, damit die Liste sofort aktuell ist
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Fehler beim Löschen des Users:", error);
    return { success: false, error: "Datenbankfehler beim Löschen." };
  }
}