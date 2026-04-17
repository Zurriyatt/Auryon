"use server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
export async function POST(request) {
  try { 
  try {
    await connectDB();
  } catch (err) {
    return NextResponse.json({ success: false, error: "db failed" });
  }
  let data;
  let user;
  try {
    data = await request.json();
    if (data.email) {
      user = await User.findOne({ email: data.email });
    } else {
      return NextResponse.json({
        success: false,
        error: "data.email not found",
      });
    }
    if (!user) {
      await User.create(data);
      return NextResponse.json({
        success: true,
        res: "Account has been  created",
      });
    } else {
      return NextResponse.json({
        success: false,
        error: "Account already exist  ",
      });
    }
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: "Overall failed by authchck",
    });
  }} catch(err)  { 
    return NextResponse.json({success  : false , error : "complete failure from start in auth check b"})
  }
}
