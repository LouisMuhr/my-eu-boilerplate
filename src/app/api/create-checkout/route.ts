import { NextResponse } from "next/server";
import { auth } from "@/auth"; 
import Stripe from "stripe";

// WICHTIG: Wir nutzen die Version, die dein Paket verlangt!
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-09-30.acacia", // <--- Deine Version
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || !session.user.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { priceId } = await req.json();
    
    const checkoutSession = await stripe.checkout.sessions.create({
      customer_email: session.user.email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?canceled=true`,
      
      // Metadaten für die Session
      metadata: {
        userId: session.user.id,
      },
      
      // WICHTIG: Metadaten direkt am Abo speichern!
      subscription_data: {
        metadata: {
          userId: session.user.id,
        },
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("[STRIPE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}