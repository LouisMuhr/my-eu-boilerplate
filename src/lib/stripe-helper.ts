/**
 * Datei: src/lib/stripe-helper.ts
 * * Hilfsfunktionen zur Verarbeitung von Stripe-Daten.
 * Stripe liefert Zeitstempel in Sekunden (Unix), JavaScript benötigt Millisekunden.
 */

/**
 * Konvertiert einen Stripe Unix-Timestamp (Sekunden) in einen ISO-String für SQLite.
 * @param stripeTimestamp - Der Timestamp von Stripe (z.B. subscription.current_period_end)
 * @returns Ein ISO-String oder null bei ungültigen Daten
 */
export function formatStripeDate(stripeTimestamp: number | null | undefined): string | null {
  // Sicherheits-Check: Wenn Stripe 0, null oder undefined schickt
  if (!stripeTimestamp || isNaN(stripeTimestamp)) {
    return null;
  }

  try {
    // Stripe Sekunden * 1000 = JavaScript Millisekunden
    const date = new Date(stripeTimestamp * 1000);

    // Prüfen, ob das resultierende Datum valide ist
    if (isNaN(date.getTime())) {
      console.warn("Ungültiger Stripe-Zeitstempel empfangen:", stripeTimestamp);
      return null;
    }

    // Rückgabe als standardisierter String (YYYY-MM-DDTHH:mm:ss.sssZ)
    return date.toISOString();
  } catch (error) {
    console.error("Fehler bei formatStripeDate:", error);
    return null;
  }
}

/**
 * Formatiert Cent-Beträge von Stripe in lesbare Euro-Strings.
 * @param amount - Betrag in Cents (z.B. 999)
 * @param currency - Währungskürzel (Standard: 'eur')
 */
export function formatAmountFromStripe(amount: number, currency: string = 'eur') {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}