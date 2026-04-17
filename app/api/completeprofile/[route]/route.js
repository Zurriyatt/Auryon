import { connectDB } from "@/lib/mongodb";
import FormSch from "@/models/FormSch";
import { NextResponse } from "next/server";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import User from "@/models/User";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { SessionContext } from "next-auth/react";
import { PathParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken");
  let newToken;
  let session;

  let userNamee;
  let data;
  let formUser;
  let findUser;
  try {
    try {
      if (token?.value) {
        newToken = jwt.verify(token.value, process.env.JWT_SECRET);
      }

      if (!token) {
        session = await getServerSession(authOptions);
      }
      if (!token && !session) {
        return NextResponse.json({
          success: false,
          error: "User is not logged in",
        });
      }
      if (newToken) {
        session = newToken;
      }
    } catch (err) {
      return NextResponse.json({ success: false, error: err });
    }
    try {
      await connectDB();
    } catch (err) {
      return NextResponse.json({
        success: false,
        error: "DB is not connecting",
      });
    }
    // it printed realyuser.userName)
    if (newToken) {
      userNamee = session.user.userName;
    } else {
      userNamee = session.user.name;
    }

    data = await request.formData();
    let nameForm = data.get("name");
    let aboutyou = data.get("aboutyou");
    if (aboutyou === "undefined" || !aboutyou) {
      aboutyou = undefined;
    } else {
      aboutyou = data.get("aboutyou");
    }
    const image = data.get("image");
    const coverImage = data.get("coverImage");

    const UploadToCloudinary = async (file, folderName) => {
      const fileBuffer = Buffer.from(await file.arrayBuffer());
      const base64 = `data:${file.type};base64,${fileBuffer.toString(
        "base64",
      )}`;
      const res = await cloudinary.uploader.upload(base64, {
        folder: folderName,
      });

      return res.secure_url;
    };

    const [uploadedImage, uploadedCover] = await Promise.all([
      image ? UploadToCloudinary(image, "profile_images") : undefined,
      coverImage ? UploadToCloudinary(coverImage, "cover_images") : undefined,
    ]);

    const pageData = {
      name: nameForm,
      image: uploadedImage,
      coverImage: uploadedCover,
      aboutyou: aboutyou ? aboutyou : "Its a user of Auryon , Boost My AURA",
      userName: `${userNamee}`,
      email: session.user.email,
    };

    const updatedUser = await FormSch.findOneAndUpdate(
  { email: session.user.email },
  { $set: pageData }, 
  { upsert: true, new: true }
);

    return NextResponse.json({ success: true, res: pageData });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: "i a m overall error",
    });
  }
}

export async function GET(request, context) {
  const param = context.params;
  const searchedUser = param.route;

  const cookieStore = await cookies();
  const token = cookieStore.get("authToken");
  let newToken;
  let session;
  try {
    await connectDB();
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: `DB connection failed: ${err.message}`,
    });
  }

  try {
    if (!token) {
      session = await getServerSession(authOptions);
    }
    if (token?.value) {
      newToken = jwt.verify(token.value, process.env.JWT_SECRET);
    }

    if (!token && !session) {
      return NextResponse.json({
        success: false,
        error: "You are not logged in",
      });
    }
    if (newToken) {
      session = newToken;
    }

    let forms;
    if (searchedUser == "YourPage") {
      forms = await FormSch.findOne({
        email: session.user.email,
      });

      return NextResponse.json({ success: true, res: forms });
    } else {
      forms = await FormSch.findOne({
        userName: `${searchedUser}`,
      });
      if (forms) {
        return NextResponse.json({ success: true, res: forms });
      } else {
        return NextResponse.json({ success: false, error: "No user founnd" });
      }
    }
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: `Error fetching forms: ${err.message}`,
    });
  }
}
