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
  apiVersion: "2024-11-20.acacia",
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
        const customerId = (subscription as any).customer as string;

        console.log(`📅 Sync für ${customerId} - Ende: ${endDate}`);
        console.log(`🔍 Debug: status=${(subscription as any).status}, cancel_at_period_end=${(subscription as any).cancel_at_period_end}, customerId=${customerId}`);
        console.log(`🔍 Full subscription data:`, JSON.stringify({
          id: (subscription as any).id,
          status: (subscription as any).status,
          cancel_at_period_end: (subscription as any).cancel_at_period_end,
          canceled_at: (subscription as any).canceled_at,
          current_period_end: (subscription as any).current_period_end,
          metadata: (subscription as any).metadata
        }, null, 2));

        // Try to update via stripeCustomerId first
        const updateResult = await dbHelpersAsync.updateUserSubscription(
          (subscription as any).status,
          (subscription as any).cancel_at_period_end ? 1 : 0,
          endDate as string,
          customerId
        );

        console.log(`✅ Update attempted for customerId: ${customerId}`);

        // Fallback: Check if user exists with this stripeCustomerId, if not use userId
        const userCheck = await db.select().from(users).where(eq(users.stripeCustomerId, customerId)).limit(1);

        if (userCheck.length === 0 && userId) {
          console.log(`🔄 Fallback-Update via UserID: ${userId}`);
          await db.update(users).set({
            subscriptionStatus: (subscription as any).status,
            cancelAtPeriodEnd: !!(subscription as any).cancel_at_period_end,
            currentPeriodEnd: endDate,
            stripeCustomerId: customerId
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