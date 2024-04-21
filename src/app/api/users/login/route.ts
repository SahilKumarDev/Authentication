import { connect } from "@/dbConnect/dbConnect";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    // Validation
    console.log(reqBody);

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "USER DOES NOT EXISTS" },
        { status: 402 }
      );
    }
    console.log("Uesr exists");

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        { error: "Check your credentials" },
        { status: 400 }
      );
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(
      tokenData,
      process.env.TOKEN_SECRET!,
      {
        expiresIn: "1d",
      }
    );

    const nextResponce = NextResponse.json({
      message: "Logged In Success",
      success: true,
    });

    nextResponce.cookies.set("token", token, {
      httpOnly: true,
    });

    return nextResponce;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
