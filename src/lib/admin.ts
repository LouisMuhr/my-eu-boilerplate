/**
 * Brutale Einfachheit: Wir definieren Admins über die E-Mail.
 * Später kannst du ein "role" Feld in der DB hinzufügen.
 */
export const ADMIN_EMAILS = [
    "louismuhr8@gmail.com", // Ersetze das durch deine echte E-Mail
  ];
  
  export function isAdmin(email?: string | null) {
    if (!email) return false;
    return ADMIN_EMAILS.includes(email);
  }