"use server"; 
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken" ; 

export async function GET(req) { 
  try{
    const token = await req.cookies.get("authToken")?.value;
    if(!token) NextResponse.json({LoggedIn : false, success  : false})
      const user = jwt.verify(token , process.env.JWT_SECRET)
      return NextResponse.json({LoggedIn : true , user , success : true})
  
    }catch (err) { 
    return NextResponse.json({LoggedIn :false , success : false})    
  }
}
