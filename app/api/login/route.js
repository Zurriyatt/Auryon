"use server";
import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    try {
      await connectDB();
    } catch (err) {
      return NextResponse.json({ error :`${err} its at the first call at login`});
    }
    let userchk;
    let data;
    let userName;
    try {
      data = await request.json();
    } catch (err) {
      console.log("invalid json body received");
      return NextResponse.json(err);
    }
    try {
      userchk = await User.findOne({ email: data.email });

      if (userchk) {
        console.log("user found ");
        userName = userchk.userName;
        if(userchk.password) { 

        }else { 
          return NextResponse.json({success : false , error : "This is account is logged in by oneClick not manual try one click authentication"})
        }
      } else {
        throw new Error("User not found");
      }
    } catch (err) {
      return NextResponse.json({ error: "User Not found" });
    }
    try {
      const pass = data.password;
      const user ={ uid: userchk.uid, email: userchk.email, userName: userName }
      const token = jwt.sign(
        {user}
        ,
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );
      let isMatched = await bcrypt.compare(pass, userchk.password);
      if (isMatched) {
        const response =  NextResponse.json(
          {
            success: true,
            res: "Password Matched User is authenticated ",
            token,
          },
          { status: 200 }
        );
        response.cookies.set("authToken" , token , {
          httpOnly : true , 
          secure : process.env.NODE_ENV === "production",
          sameSite : "strict" , 
          maxAge  : 60 * 60 *24 * 7 
        } )
        return response
      } else {
        return NextResponse.json({ error: "Invalid password or continue with oneclick" });
      }
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log("Authentication Failed");
  }
}
