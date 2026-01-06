/**
 * Datei: src/lib/stripe-helper.ts
 * * Diese Datei enthält Hilfsfunktionen für die Stripe-Integration.
 * Da Stripe Zeitstempel in Sekunden (Unix) liefert, JavaScript aber 
 * Millisekunden benötigt, ist diese Konvertierung kritisch.
 */

/**
 * Konvertiert einen Stripe Unix-Timestamp (Sekunden) in einen ISO-String für die Datenbank.
 * @param stripeTimestamp - Der Timestamp von Stripe (z.B. subscription.current_period_end)
 * @returns Ein ISO-String (z.B. "2026-01-06T10:00:00.000Z") oder null bei ungültigen Daten
 */
export function formatStripeDate(stripeTimestamp: number | null | undefined): string | null {
  if (!stripeTimestamp || isNaN(stripeTimestamp)) {
    return null;
  }

  try {
    // Stripe liefert Sekunden. JS-Date benötigt Millisekunden.
    // Multiplikation mit 1000 verhindert das "Januar 1970" Problem.
    const date = new Date(stripeTimestamp * 1000);

    // Prüfen, ob das Datum valide ist, bevor wir toISOString() aufrufen
    if (isNaN(date.getTime())) {
      console.warn("Ungültiger Zeitstempel von Stripe erhalten:", stripeTimestamp);
      return null;
    }

    // .toISOString() erzeugt das standardisierte Format YYYY-MM-DDTHH:mm:ss.sssZ
    return date.toISOString();
  } catch (error) {
    console.error("Fehler bei der Konvertierung des Stripe-Datums:", error);
    return null;
  }
}

/**
 * Hilfsfunktion zum Berechnen von Preis-Anzeigen (Cents zu Euro).
 */
export function formatAmountFromStripe(amount: number, currency: string = 'eur') {
  const numberFormat = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: currency.toUpperCase(),
  });
  return numberFormat.format(amount / 100);
}