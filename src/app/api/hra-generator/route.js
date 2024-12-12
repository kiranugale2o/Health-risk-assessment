// Make sure to include these imports:
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});
export async function POST(req) {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const { prompt } = await req.json();

  const result = await model.generateContent(prompt);
  console.log(result.response.text());
  return NextResponse.json({
    message: result.response.text(),
  });
}

/* Rectangle 1 */
