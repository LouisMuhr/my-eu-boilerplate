import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { dbHelpers } from "@/lib/db";
import { formatStripeDate } from "@/lib/stripe-helper";
import db from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-09-30.acacia", // DAS ist der stabile Anker
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (error: any) {
    console.error("❌ Webhook Signatur Fehler");
    return new NextResponse("Webhook Error", { status: 400 });
  }

  console.log(`🔔 Event: ${event.type}`);

  try {
    // 1. Verknüpfung beim Checkout
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.metadata?.userId) {
        dbHelpers.updateUserStripe.run(session.customer as string, "active", session.metadata.userId);
      }
    }

    // 2. Abo-Daten aktualisieren (Stabile Felder nutzen)
    if (
      event.type === "customer.subscription.created" ||
      event.type === "customer.subscription.updated" ||
      event.type === "invoice.payment_succeeded"
    ) {
      const obj = event.data.object as any;
      const subId = event.type.startsWith("invoice") ? obj.subscription : obj.id;

      if (subId && typeof subId === 'string') {
        // In Version 17 ist 'retrieve' wieder ein direktes Objekt, kein Response-Müll!
        const subscription = await stripe.subscriptions.retrieve(subId);
        
        // current_period_end ist hier GARANTIERT eine Zahl (Unix Timestamp)
        const endDate = formatStripeDate(subscription.current_period_end);
        const userId = subscription.metadata?.userId;

        console.log(`📅 Sync für ${subscription.customer} - Ende: ${endDate}`);

        // Update in der DB
        const result = dbHelpers.updateUserSubscription.run(
          subscription.status,
          subscription.cancel_at_period_end ? 1 : 0,
          endDate,
          subscription.customer as string
        );

        // Fallback falls die Stripe-ID noch nicht in der DB war (Race Condition)
        if (result.changes === 0 && userId) {
          console.log(`🔄 Fallback-Update via UserID: ${userId}`);
          db.prepare(`
            UPDATE users 
            SET subscriptionStatus = ?, currentPeriodEnd = ?, stripeCustomerId = ? 
            WHERE id = ?
          `).run(subscription.status, endDate, subscription.customer as string, userId);
        }
      }
    }

    return new NextResponse(null, { status: 200 });
  } catch (error: any) {
    console.error(`❌ Webhook Crash:`, error.message);
    return new NextResponse("Internal Error", { status: 500 });
  }
}