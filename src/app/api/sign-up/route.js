import { NextResponse } from "next/server.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import User from "@/models/User";
import DatabaseConn from "@/database";

const authemail = process.env.AUTH_EMAIL;
const pass = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: authemail,
    pass: pass,
  },
});
export async function POST(req) {
  await DatabaseConn();
  try {
    let { email, password } = await req.json();
    console.log(email, password);

    if (email === "" || password === "") {
      return NextResponse.json({
        success: false,
        message: "All Values are Required !",
      });
    }

    //Check Email is Already exit in database
    const userExit = await User.findOne({ email: email });
    if (userExit) {
      console.log(userExit);

      if (!userExit.verifyUser) {
        await User.deleteOne({ email: email });
      }
      return NextResponse.json({
        success: false,
        message: "this Email Already Used !",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiration = Date.now() + 300000;

    email = email.trim();
    password = password.trim();
    var salt = await bcrypt.genSalt(10);
    var hashPass = await bcrypt.hash(password, salt);

    //add user email and otp in database
    const user = await User.create({
      email,
      password: hashPass,
      otp,
      expiration,
      verifyUser: false,
    });

    if (user) {
      // Send OTP email
      console.log(user);

      await transporter.sendMail({
        to: email,
        subject: "Email Verification Code send  ",
        html: `
         <div>
          <h1><b>HealthCare</b></h1>
            <h1 className="color:"red"">Verification code</h1>
             <br/>
            <b>Enter the following verification code when prompted:
            <h1>
            <bold>
            ${otp}
            </bold></h1> valid upto 5 minitues</b>
            <b>To Protect Do not Share this code !</b>
            <footer>thank you</footer>
          </div> 
        `,
      });
      return NextResponse.json({
        success: true,
        email: email,
        message: "OTP Send !",
      });
    } else {
      console.log("fff");

      return NextResponse.json({
        success: false,
        message: "Somting Went Wrong !",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
