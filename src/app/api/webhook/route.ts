// Datei: src/app/api/webhook/route.ts

import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { dbHelpers } from '@/lib/db';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover", // Nutze die stabile Version
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`❌ Webhook-Signatur fehlgeschlagen: ${err.message}`);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  // --- LOGIK-ZENTRALE ---
  switch (event.type) {
    // 1. Der User hat den Checkout erfolgreich abgeschlossen
    case 'checkout.session.completed':
      const customerId = session.customer as string;
      const userId = session.client_reference_id; // Wir geben die ID beim Checkout mit!

      if (userId) {
        console.log(`✅ Zahlung erfolgreich für User: ${userId}`);
        dbHelpers.updateUserStripe.run(customerId, 'active', userId);
      }
      break;

    // 2. Das Abonnement wurde aktualisiert (z.B. Upgrade/Downgrade)
    case 'customer.subscription.updated':
      const subscription = event.data.object as Stripe.Subscription;
      dbHelpers.updateUserSubscription.run(
        subscription.status === 'active' ? 'active' : 'past_due',
        subscription.customer as string
      );
      break;

    // 3. Das Abonnement wurde gelöscht/gekündigt
    case 'customer.subscription.deleted':
      const deletedSub = event.data.object as Stripe.Subscription;
      console.log(`❌ Abo beendet für Kunde: ${deletedSub.customer}`);
      dbHelpers.updateUserSubscription.run('free', deletedSub.customer as string);
      break;

    default:
      console.log(`ℹ️ Unbehandelter Event-Typ: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}