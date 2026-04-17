"use server";
import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";
import bcrypt from "bcrypt";


export async function POST(request) {

  try {
    try{
    await connectDB();

    }catch(err) {
      console.log("Theres a db problem " , err)
    }
    const data = await request.json();
    if(data.password){
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds); // 🔑 hash the password

    data.password = hashedPassword;}
    data.userName = `@${data.userName}`
    const checkin = await User.findOne({ email: data.email });
    const userChecking = await User.findOne({ userName: data.userName });
    if (checkin) {
      return NextResponse.json({ error: "User Already Exist" });
    } else if (userChecking) {
      return NextResponse.json({
        error:
          "Choose a different UserName(Because this username already Exist) and rather try to do manual signup",
      });
    } else {
      const user = await User.create(data);
      return NextResponse.json({
        success: true,
        res: "User created",
        uid: data.uid,
      });
    }
  } catch (err) {
    console.log(err); // This will now show the real error
    return NextResponse.json(
      { error: "Signup failed", err: err },
      { status: 500 }
    );
  }
}
