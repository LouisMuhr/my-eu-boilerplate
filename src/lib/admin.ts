// Datei: src/lib/admin.ts

import { auth } from "@/auth";
import { redirect } from "next/navigation";

// Trag hier deine E-Mail ein!
const ADMIN_EMAILS = ["louismuhr8@gmail.com"]; 

export async function requireAdmin() {
  const session = await auth();
  
  if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
    return redirect("/dashboard"); // Unbefugte fliegen raus
  }
  
  return session;
}