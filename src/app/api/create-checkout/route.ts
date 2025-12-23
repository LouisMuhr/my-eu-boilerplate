import { NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import { dbHelpers, UserRow } from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { priceId } = await req.json();

  const userRow = dbHelpers.getUserById.get(session.user.id) as
    | UserRow
    | undefined;
  let customerId = userRow?.stripeCustomerId;

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
    mode: priceId.includes("sub") ? "subscription" : "payment", // automatische Erkennung oder explizit
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${
      process.env.NEXT_PUBLIC_URL || "http://localhost:3000"
    }/dashboard?success=true`,
    cancel_url: `${
      process.env.NEXT_PUBLIC_URL || "http://localhost:3000"
    }/dashboard?canceled=true`,
    metadata: { userId: session.user.id },
  });

  return NextResponse.json({ url: checkoutSession.url });
}
