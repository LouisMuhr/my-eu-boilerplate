import { NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import { dbHelpers } from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  const { priceId } = await req.json();

  let customerId = (dbHelpers.getUserById.get(session.user.id as string) as any)?.stripeCustomerId;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: session.user.email || undefined,
      metadata: { userId: session.user.id },
    });
    customerId = customer.id;

    dbHelpers.updateUserSubscription.run({
      id: session.user.id,
      stripeCustomerId: customerId,
      subscriptionStatus: "free",
    });
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: priceId.includes("recurring") ? "subscription" : "payment",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?canceled=true`,
    metadata: { userId: session.user.id },
  });

  return NextResponse.json({ url: checkoutSession.url });
}