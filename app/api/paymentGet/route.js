"use server";
import { NextResponse } from "next/server";
import paymentSchema from "@/models/PaymentSchema";
import { connectDB } from "@/lib/mongodb";
import { convertSegmentPathToStaticExportFilename } from "next/dist/shared/lib/segment-cache/segment-value-encoding";
export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const userNamee = searchParams.get("userName");

  try {
    await connectDB();

  } catch (err) {
    return NextResponse.json({
      success: false,
      error: "Failed in connecting in Patment get in connecting db",
    });
  }
  try {
    
    const user = await paymentSchema.find({
      tuserName: userNamee,
    });


    return NextResponse.json({ success: true, res: user });
  } catch (err) {
    ``;
    return NextResponse.json({
      success: false,
      error: "some error while entered the function get some unknown error",
    });
  }
}
