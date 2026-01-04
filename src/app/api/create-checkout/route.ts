// Datei: src/app/api/create-checkout/route.ts

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    const { priceId } = await req.json();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    // Wir erstellen eine Stripe Checkout Session
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription", // Oder 'payment' für Einmalzahlung
      payment_method_types: ["card", "paypal"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?canceled=true`,
      customer_email: session.user.email!,
      client_reference_id: session.user.id, // EXTREM WICHTIG für den Webhook-Match!
      subscription_data: {
          metadata: {
              userId: session.user.id
          }
      }
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error: any) {
    console.error("Stripe Fehler:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}