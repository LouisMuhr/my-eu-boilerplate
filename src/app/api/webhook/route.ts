import { NextResponse } from "next/server";
import Stripe from "stripe";
import { dbHelpers } from "../../../lib/db";
import { headers } from "next/headers";
import { formatStripeDate } from "../../../lib/stripe-helper";

// Initialisierung mit deiner spezifischen API-Version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover" as any, 
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature") as string;

  let event: Stripe.Event;

  // 1. Validierung der Stripe-Signatur
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`❌ Webhook-Signatur-Fehler: ${err.message}`);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  console.log(`🔔 Stripe Event empfangen: ${event.type}`);

  try {
    switch (event.type) {
      
      /**
       * FALL 1: Initialer Kauf via Checkout abgeschlossen
       */
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const customerId = session.customer as string;
        const userId = session.client_reference_id;
        const subscriptionId = session.subscription as string;

        if (!userId) {
          console.error("❌ Fehler: Keine client_reference_id in Checkout Session gefunden.");
          break;
        }

        // Verknüpfe die Stripe Customer ID sofort mit dem User in der DB
        dbHelpers.updateUserStripe.run(customerId, "active", userId);
        console.log(`✅ Stripe Customer ${customerId} mit User ${userId} verknüpft.`);

        // Abo-Details für das exakte Enddatum abrufen
        if (subscriptionId) {
          const subscription = (await stripe.subscriptions.retrieve(subscriptionId)) as any;
          const currentPeriodEnd = formatStripeDate(subscription.current_period_end);

          dbHelpers.updateUserSubscription.run(
            "active",
            0, // cancelAtPeriodEnd ist initial immer 0 (nicht gekündigt)
            currentPeriodEnd,
            customerId
          );
          console.log(`📅 Initiales Enddatum gesetzt: ${currentPeriodEnd}`);
        }
        break;
      }

      /**
       * FALL 2: Abo wurde aktualisiert (Verlängerung oder Kündigungsvormerkung)
       */
      case "customer.subscription.updated": {
        const subscription = event.data.object as any;
        const customerId = subscription.customer as string;

        // Status-Mapping von Stripe zu DB
        let dbStatus = "free";
        if (subscription.status === "active" || subscription.status === "trialing") {
          dbStatus = "active";
        } else if (subscription.status === "past_due") {
          dbStatus = "past_due";
        }

        const cancelAtPeriodEnd = subscription.cancel_at_period_end ? 1 : 0;
        const currentPeriodEnd = formatStripeDate(subscription.current_period_end);

        const result = dbHelpers.updateUserSubscription.run(
          dbStatus,
          cancelAtPeriodEnd,
          currentPeriodEnd,
          customerId
        );

        if (result.changes === 0) {
          console.warn(`⚠️ Warnung: Kein User für Stripe-ID ${customerId} gefunden (Update fehlgeschlagen).`);
        } else {
          console.log(`🔄 Abo-Update für ${customerId}: Status=${dbStatus}, Gekündigt=${cancelAtPeriodEnd}`);
        }
        break;
      }

      /**
       * FALL 3: Abo endgültig gelöscht oder abgelaufen
       */
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        // User auf 'free' zurücksetzen und Datum löschen
        dbHelpers.updateUserSubscription.run("free", 0, null, customerId);
        console.log(`❌ Abo für ${customerId} endgültig beendet.`);
        break;
      }

      default:
        console.log(`ℹ️ Unbehandeltes Event: ${event.type}`);
    }
  } catch (error) {
    console.error(`❌ Interner Webhook-Verarbeitungsfehler:`, error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}