import axios from "axios";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { formattedDate } from "@/utils";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export async function POST(req) {
  try {
    const { prompt, email } = await req.json();

    // ✅ Gemini API Call (REST)
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GOOGLE_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `You are Krushna, an AI assistant. Always respond as Krushna. 
Format the output strictly like this:

Health:
<health analysis>

Recommendations:
<recommendations>
                `,
              },
              { text: prompt },
            ],
          },
        ],
      },
    );

    // ✅ Extract response safely
    const text =
      response?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // ✅ Extract sections
    let healthStartIndex = text.indexOf("Health:");
    let recommendationsStartIndex = text.indexOf("Recommendations:");

    let healthToRecommendations =
      healthStartIndex !== -1 && recommendationsStartIndex !== -1
        ? text.substring(healthStartIndex, recommendationsStartIndex).trim()
        : text;

    let recommendationsData =
      recommendationsStartIndex !== -1
        ? text.substring(recommendationsStartIndex).trim()
        : "No recommendations available.";

    // ✅ Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Send Email
   await transporter.sendMail({
  to: email,
  subject: `🩺 Your Health Risk Assessment Report - ${formattedDate}`,
  html: `
  <div style="margin:0; padding:0; background:#f1f5f9; font-family: Arial, sans-serif;">
    
    <div style="max-width:650px; margin:30px auto; background:#ffffff; border-radius:14px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.08);">

      <!-- HEADER -->
      <div style="background:linear-gradient(135deg,#16a34a,#22c55e); padding:24px;">
        <h2 style="margin:0; color:white;">🩺 Health Risk Assessment</h2>
        <p style="margin:6px 0 0; color:rgba(255,255,255,0.8); font-size:13px;">
          Personalized health insights & recommendations
        </p>
      </div>

      <!-- CONTENT -->
      <div style="padding:24px;">

        <!-- DATE -->
        <p style="font-size:12px; color:#64748b; margin-bottom:16px;">
          Generated on ${formattedDate}
        </p>

        <!-- HEALTH ANALYSIS -->
        <div style="margin-bottom:20px; padding:18px; border-radius:10px; background:#f8fafc; border-left:5px solid #3b82f6;">
          <h3 style="margin:0 0 10px; color:#1e293b;">📊 Health Analysis</h3>
          <p style="margin:0; color:#475569; font-size:14px; line-height:1.7; white-space:pre-line;">
            ${healthToRecommendations}
          </p>
        </div>

        <!-- RECOMMENDATIONS -->
        <div style="margin-bottom:20px; padding:18px; border-radius:10px; background:#f8fafc; border-left:5px solid #f59e0b;">
          <h3 style="margin:0 0 10px; color:#1e293b;">✨ Recommendations</h3>
          <p style="margin:0; color:#475569; font-size:14px; line-height:1.7; white-space:pre-line;">
            ${recommendationsData}
          </p>
        </div>

        <!-- CTA -->
        <div style="text-align:center; margin-top:25px;">
          <a href="#" style="
            display:inline-block;
            padding:12px 22px;
            background:#16a34a;
            color:white;
            text-decoration:none;
            border-radius:8px;
            font-size:14px;
            font-weight:bold;
          ">
            View Full Report
          </a>
        </div>

      </div>

      <!-- FOOTER -->
      <div style="padding:18px; background:#f1f5f9; text-align:center;">
        <p style="margin:0; font-size:12px; color:#64748b;">
          ⚠️ This report is AI-generated. Please consult a doctor for medical advice.
        </p>
        <p style="margin-top:6px; font-size:11px; color:#94a3b8;">
          © ${new Date().getFullYear()} HealthAI
        </p>
      </div>

    </div>
  </div>
  `,
});

    return NextResponse.json({
      success: true,
      healthToRecommendations,
      recommendationsData,
    });
  } catch (error) {
    console.error("ERROR:", error?.response?.data || error.message);

    return NextResponse.json(
      {
        success: false,
        error: error?.response?.data || error.message,
      },
      { status: 500 },
    );
  }
}
