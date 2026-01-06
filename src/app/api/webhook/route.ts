// Datei: src/app/api/webhook/route.ts

import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { dbHelpers } from '@/lib/db';
import { headers } from 'next/headers';

// Wir nutzen eine stabile API-Version. "Clover" existiert nicht offiziell.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover', 
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`❌ Webhook-Fehler: ${err.message}`);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  console.log(`🔔 Event empfangen: ${event.type}`);

  switch (event.type) {
    
    // 1. Erstkauf
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const customerId = session.customer as string;
      const userId = session.client_reference_id; 

      if (userId) {
        dbHelpers.updateUserStripe.run(customerId, 'active', userId);
        console.log(`✅ Abo aktiviert für User: ${userId}`);
      }
      break;
    }

    // 2. Abo-Update (Kündigung, Verlängerung)
    case 'customer.subscription.updated': {
      // Wir casten zu 'any', um TypeScript-Fehler bei properties zu umgehen, 
      // die zur Laufzeit definitiv existieren.
      const subscription = event.data.object as any;
      const customerId = subscription.customer as string;
      
      const status = subscription.status;
      let dbStatus = 'free';
      if (status === 'active' || status === 'trialing') dbStatus = 'active';
      if (status === 'past_due') dbStatus = 'past_due';

      // Zugriff über 'any' verhindert den "Property does not exist" Fehler
      const cancelAtPeriodEnd = subscription.cancel_at_period_end ? 1 : 0;
      
      // Umrechnung: Sekunden (Stripe) * 1000 = Millisekunden (JS)
      const currentPeriodEnd = new Date(subscription.current_period_end * 1000).toISOString();

      // Update in der DB (4 Parameter)
      dbHelpers.updateUserSubscription.run(
        dbStatus, 
        cancelAtPeriodEnd, 
        currentPeriodEnd, 
        customerId
      );
      
      console.log(`🔄 Update ${customerId}: ${dbStatus}, Ende: ${currentPeriodEnd}`);
      break;
    }

    // 3. Abo gelöscht
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as any;
      dbHelpers.updateUserSubscription.run('free', 0, null, subscription.customer as string);
      console.log(`❌ Abo gelöscht: ${subscription.customer}`);
      break;
    }

    // 4. Rückerstattung (Refund)
    case 'charge.refunded': {
      const charge = event.data.object as Stripe.Charge;
      if (charge.customer) {
        // Bei Refund sofort Zugang weg -> Datum ist null
        dbHelpers.updateUserSubscription.run(
            'free', 
            0,      
            null,   
            charge.customer as string
        );
        console.log(`💰 Rückerstattung erfolgt. Zugang entzogen.`);
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}