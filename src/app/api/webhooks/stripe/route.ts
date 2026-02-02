import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { dbHelpersAsync } from "@/lib/db-new"; // NEU
import { formatStripeDate } from "@/lib/stripe-helper";
import { db } from "@/lib/drizzle"; // NEU für Fallback
import { users } from "@/lib/schema"; // NEU für Fallback
import { eq } from "drizzle-orm"; // NEU für Fallback
import { env } from "@/env";

const stripe = new Stripe(env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature,env.STRIPE_WEBHOOK_SECRET!);
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
        // NEU: await
        await dbHelpersAsync.updateUserStripe(
          session.customer as string, 
          "active", 
          session.metadata.userId
        );
      }
    }

    // 2. Abo-Daten aktualisieren
    if (
      event.type === "customer.subscription.created" ||
      event.type === "customer.subscription.updated" ||
      event.type === "invoice.payment_succeeded"
    ) {
      const obj = event.data.object as any;
      const subId = event.type.startsWith("invoice") ? obj.subscription : obj.id;

      if (subId && typeof subId === 'string') {
        const subscription = await stripe.subscriptions.retrieve(subId);
        const endDate = formatStripeDate((subscription as any).current_period_end);
        const userId = (subscription as any).metadata?.userId;

        console.log(`📅 Sync für ${(subscription as any).customer} - Ende: ${endDate}`);

        // NEU: await und Result prüfen
        const result = await dbHelpersAsync.updateUserSubscription(
          (subscription as any).status,
          (subscription as any).cancel_at_period_end ? 1 : 0,
          endDate as string,
          (subscription as any).customer as string
        );

        // Fallback (Wenn Stripe ID noch nicht in DB war)
        if (result.rowsAffected === 0 && userId) {
          console.log(`🔄 Fallback-Update via UserID: ${userId}`);
          // Direktes Drizzle Update für den Fallback
          await db.update(users).set({
            subscriptionStatus: (subscription as any).status,
            currentPeriodEnd: endDate,
            stripeCustomerId: (subscription as any).customer as string
          }).where(eq(users.id, userId));
        }
      }
    }

    return new NextResponse(null, { status: 200 });
  } catch (error: any) {
    console.error(`❌ Webhook Crash:`, error.message);
    return new NextResponse("Internal Error", { status: 500 });
  }
}