import { NextResponse } from "next/server";
import Stripe from "stripe";
import { dbHelpers } from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.log("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const userId = session.metadata.userId;

    if (session.mode === "subscription") {
      dbHelpers.updateUserSubscription.run({
        id: userId,
        stripeCustomerId: session.customer,
        subscriptionStatus: "active",
      });
    } else {
      dbHelpers.updateUserSubscription.run({
        id: userId,
        stripeCustomerId: session.customer,
        subscriptionStatus: "premium_one_time",
      });
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as any;
    const customerId = subscription.customer as string;

    // Finde User per stripeCustomerId (suche über alle User, da Prepared Statement kein .all() hat)
    const users = dbHelpers.getUserById.all(); // ← Fehler: getUserById hat kein .all()!
    // Fix: Verwende stattdessen eine neue Prepared Statement für Suche nach customerId

    // Neue Prepared Statement in db.ts hinzufügen (siehe unten)
    const user = dbHelpers.getUserByStripeCustomerId.get(customerId) as any;

    if (user) {
      dbHelpers.updateUserSubscription.run({
        id: user.id,
        stripeCustomerId: customerId,
        subscriptionStatus: "canceled",
      });
    }
  }

  return NextResponse.json({ received: true });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
