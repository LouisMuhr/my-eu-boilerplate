import { handlers } from "@/auth"; // Importiert aus der neuen src/auth.ts

// Nur noch die Handler exportieren, keine Logik mehr hier!
export const { GET, POST } = handlers;