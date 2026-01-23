"use server";

import { dbHelpersAsync } from "@/lib/db-new"; // NEU
import { requireAdmin } from "@/lib/admin";
import { revalidatePath } from "next/cache";

export async function deleteUserAction(id: string) {
  await requireAdmin();

  try {
    // NEU: await
    await dbHelpersAsync.deleteUser(id);
    
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Fehler beim Löschen:", error);
    return { success: false, error: "Fehler beim Löschen." };
  }
}