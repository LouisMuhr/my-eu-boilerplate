import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { dbHelpersAsync, UserRow } from "@/lib/db-new";
import Stripe from "stripe";
import { env } from "@/env";

const stripe = new Stripe(env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia" as any,
});

export async function POST() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    // User aus der DB holen
    const user = await dbHelpersAsync.getUserById(session.user.id) as UserRow | undefined;

    if (!user || !user.stripeCustomerId) {
      console.error("❌ Portal-Fehler: User hat keine stripeCustomerId in der DB.");
      return NextResponse.json({ 
        error: "Kunden-ID fehlt. Bitte kauf erst ein Abo oder lade die Seite neu." 
      }, { status: 400 });
    }

    // Portal Session erstellen
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${env.NEXT_PUBLIC_URL}/dashboard`,
    });

    if (!portalSession.url) {
      throw new Error("Stripe hat keine Portal-URL generiert.");
    }

    return NextResponse.json({ url: portalSession.url });

  } catch (error: any) {
    console.error("🔥 STRIPE PORTAL ERROR:", error.message);
    
    // WICHTIG: Sende IMMER JSON zurück, damit das Frontend nicht abstürzt
    return NextResponse.json({ 
      error: "Stripe-Konfigurationsfehler: Hast du das Kundenportal im Stripe-Dashboard aktiviert?" 
    }, { status: 500 });
  }
}