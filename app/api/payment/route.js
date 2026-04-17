import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_PAY_SECRET_KEY);

export async function POST(req) {
  try {
    const jsonData = await req.json()
    // Stripe expects amount in cents

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd", // or "pkr" if supported
            product_data: {
              name: jsonData.comment || "Payment from Auryon",
            },
            unit_amount: jsonData.amount * 100, // convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/Payment-success?session_id={CHECKOUT_SESSION_ID}&tuserName=${encodeURIComponent(jsonData.userName)}&comments=${encodeURI(jsonData.comment)}`,
      cancel_url: "http://localhost:3000/payment-cancel",
    });

    return NextResponse.json({ success: true, url: session.url });
  } catch (err) {
    console.error("❌ Stripe Payment Error:", err.message);
    return NextResponse.json({ success: false, message: err.message });
  }
}
