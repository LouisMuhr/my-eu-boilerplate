// Datei: src/app/api/create-portal-link/route.ts

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import Stripe from "stripe";
import { dbHelpers } from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

/**
 * Erstellt einen Link zum Stripe Customer Portal.
 * Hier können Nutzer Abos kündigen, Rechnungen laden und Karten ändern.
 * UNVERZICHTBAR für EU-Compliance.
 */
export async function POST() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    const user = dbHelpers.getUserById.get(session.user.id) as any;

    if (!user?.stripeCustomerId) {
      return NextResponse.json({ error: "Kein Stripe-Kunde gefunden." }, { status: 400 });
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error: any) {
    console.error("Portal Fehler:", error);
    return NextResponse.json({ error: "Portal konnte nicht geladen werden." }, { status: 500 });
  }
}