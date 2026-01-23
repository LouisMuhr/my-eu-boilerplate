// Datei: src/lib/config.ts

export const siteConfig = {
  name: "EU Boilerplate",
  company: "Deine Firma GmbH / Einzelunternehmen",
  owner: "Max Mustermann",
  address: "Musterstraße 1, 12345 Berlin",
  email: "support@deine-domain.de",
  phone: "+49 30 12345678",
  vatId: "DE123456789", // Falls vorhanden
  registrationNumber: "HRB 12345", // Falls vorhanden (Handelsregister)
  url: process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
  stripePrivacyUrl: "https://stripe.com/de/privacy",
  resendPrivacyUrl: "https://resend.com/privacy",
};