// Datei: src/app/api/delete-account/route.ts

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { dbHelpers } from "@/lib/db";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover" as any,
});

export async function DELETE() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    const user = dbHelpers.getUserById.get(session.user.id) as any;

    // 1. Stripe Abo kündigen, falls vorhanden
    if (user?.stripeCustomerId) {
      try {
        const subscriptions = await stripe.subscriptions.list({
          customer: user.stripeCustomerId,
          status: 'active',
        });
        
        for (const sub of subscriptions.data) {
          await stripe.subscriptions.cancel(sub.id);
        }
      } catch (stripeErr) {
        console.error("Stripe Deletion Error:", stripeErr);
        // Wir machen trotzdem weiter, die DB-Löschung ist wichtiger
      }
    }

    // 2. Nutzer aus der SQLite löschen (Helper ist in Canvas bereits vorhanden)
    dbHelpers.deleteUser.run(session.user.id);

    return NextResponse.json({ success: true, message: "Account erfolgreich gelöscht." });
  } catch (error) {
    console.error("Deletion Fehler:", error);
    return NextResponse.json({ error: "Löschvorgang fehlgeschlagen" }, { status: 500 });
  }
}