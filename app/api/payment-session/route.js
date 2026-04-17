import Stripe from "stripe";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { getToken } from "next-auth/jwt";
import { connectDB } from "@/lib/mongodb";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import paymentSchema from "@/models/PaymentSchema";
const stripe = new Stripe(process.env.STRIPE_PAY_SECRET_KEY);
export async function GET(req) {
  const cookiess = cookies();
  const token = cookiess.get("authToken");
  if (!cookiess) {
    return NextResponse.json({
      success: false,
      error: "the error is in cookies",
    });
  }
 
  let obvToken;
  if (token) {
    obvToken = jwt.verify(token.value, process.env.JWT_SECRET);
  }
  let sessionAuth;
  if (!token) {
    sessionAuth = await getServerSession(authOptions);

  }
  if (obvToken) {
    sessionAuth = obvToken;
  }
  const userNamee = sessionAuth.user.userName
    ? sessionAuth.user.userName
    : sessionAuth.user.name;
  try {
    await connectDB();
  } catch (err) {
    return NextResponse.json({ success: false, error: "failed to connect db" });
  }
  try {
    const { searchParams } = new URL(req.url);
    const session_id = searchParams.get("session_id");
    const ttuserName = searchParams.get("tuserName");
    const commentss = searchParams.get("comments");

    if (!session_id) {
      return (
        NextResponse.json({ error: "No session_id provided" }),
        {
          status: 400,
        }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    try {
      if (session) {
        const payments = await paymentSchema.create({
          fuserName: userNamee,
          tuserName: ttuserName,
          amount: session.amount_total / 100,
          sessionId: session.id,
          currency: session.currency.toUpperCase(),
          comments: commentss,
        });
      }
    } catch (err) {
      console.log(err, "err in schema");
    }
    return NextResponse.json({ session: session, status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
