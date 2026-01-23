// Datei: src/app/dashboard/actions.ts
"use server";

import { auth } from "@/auth";
import { dbHelpersAsync } from "@/lib/db-new";
import { revalidatePath } from "next/cache";
import { updateProfileSchema } from "@/lib/validations"; // <--- ZOD SCHEMA

export async function updateUserName(formData: FormData) {
  const session = await auth();
  
  if (!session?.user?.id) {
    return { error: "Nicht eingeloggt" };
  }

  // Daten extrahieren
  const rawData = {
    name: formData.get("name"),
  };

  // Validierung mit Zod (safeParse wirft keinen Fehler, sondern gibt success-Flag)
  const validation = updateProfileSchema.safeParse(rawData);

  if (!validation.success) {
    return { error: validation.error.issues[0].message };
  }

  try {
    await dbHelpersAsync.updateUserProfile(session.user.id, validation.data.name);
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Update Error:", error);
    return { error: "Fehler beim Speichern." };
  }
}