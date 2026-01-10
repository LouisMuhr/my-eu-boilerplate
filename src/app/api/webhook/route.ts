import { NextResponse } from "next/server";
import Stripe from "stripe";
import { dbHelpers } from "../../../lib/db";
import { headers } from "next/headers";
import { formatStripeDate } from "../../../lib/stripe-helper";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover", // Nutze eine stabile Version
});

interface StripeSubscriptionWithPeriod extends Stripe.Subscription {
  current_period_end: number;
  cancel_at_period_end: boolean;
}

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature") as string;

  let event;
  let eventType;
  let data;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`❌ Webhook-Signatur-Fehler: ${err.message}`);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  console.log(`🔔 Stripe Event empfangen: ${event.type}`);

  data = event.data;
  eventType = event.type;

  switch (eventType) {
    case "checkout.session.completed": {
      let user;

      const session = await stripe.checkout.sessions.retrieve(data.object.id, {
        expand: ["line_items"],
      });

      const customerId = session?.customer;
      const customer = await stripe.customers.retrieve(
        customerId as string
      );
      const priceId = session?.line_items?.data[0]?.price.id;
      const userId = session.client_reference_id;
      const subscriptionId = session.subscription as string;

      if (!userId) {
        console.error("❌ Keine client_reference_id im Checkout gefunden.");
        break;
      }

      dbHelpers.updateUserStripe.run(customerId, "active", userId);

      if (subscriptionId) {
        const subscription = (await stripe.subscriptions.retrieve(
          subscriptionId
        )) as unknown as StripeSubscriptionWithPeriod;

        console.log("📊 Subscription Daten:", {
          cancel_at_period_end: subscription.cancel_at_period_end,
          current_period_end: subscription.current_period_end,
          status: subscription.status,
        });

        const currentPeriodEnd = formatStripeDate(
          subscription.current_period_end
        );
        console.log("CurrentPeriodEnd in success-case", currentPeriodEnd);

        dbHelpers.updateUserSubscription.run(
          "active",
          subscription.cancel_at_period_end ? 1 : 0,
          currentPeriodEnd,
          customerId
        );
      }
      break;
    }
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      dbHelpers.updateUserSubscription.run(
        "free",
        0,
        null,
        subscription.customer as string
      );
      console.log(`❌ Abo für ${subscription.customer} beendet.`);
      break;
    }

    default:
      console.log(`ℹ️ Ignoriertes Event: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
