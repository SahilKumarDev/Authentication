import { connect } from "@/dbConnect/dbConnect";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmailToUser } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { username, email, password }= reqBody;

    // Validation
    console.log(reqBody);

    // Register the user
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "Suer already exists" },
        { status: 200 }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    // Send verification email
    await sendEmailToUser({
      email,
      emailType: "Verify",
      userId: savedUser._id,
    });

    return NextResponse.json({
      message: "User Register Successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
