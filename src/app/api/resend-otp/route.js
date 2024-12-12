import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import User from "@/models/User";
import DatabaseConn from "@/database";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req) {
  try {
    await DatabaseConn();
    let { email } = await req.json();

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiration = Date.now() + 300000;

    const user = await User.findOne({ email: email });
    if (user) {
      await User.updateOne(
        { email: email },
        { otp: otp, expiration: expiration }
      );
    }
    await transporter.sendMail({
      to: email,
      subject: "RESEND Your OTP Code",
      html: `
           <div>
          <h1><b>HealthCare</b></h1>
            <h1 className="color:"red"">Verification code</h1>
             <br/>
            <p>Enter the following verification code when prompted:
            <h1>
            <bold>
            ${otp}
            </bold></h1> valid upto 5 minitues</p>
            <b>To Protect Do not Share this code !</b>
            <footer>thank you</footer>
          </div>`,
    });

    return NextResponse.json({
      success: true,
      message: "OTP RESEND",
    });
  } catch (error) {
    console.log(error.message);

    return NextResponse.json({
      success: false,
      message: "SOME ERROR",
    });
  }
}
