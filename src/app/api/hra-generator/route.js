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
      subject: `Health Risk Assessment - ${formattedDate}`,
      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2 style="color: green;">Health Risk Assessment</h2>

          <table style="width:100%; border-collapse: collapse;">
            <tr style="background: #16a34a; color: white;">
              <th style="padding:10px; border:1px solid #ccc;">Section</th>
              <th style="padding:10px; border:1px solid #ccc;">Details</th>
            </tr>

            <tr>
              <td style="padding:10px; border:1px solid #ccc;">
                <strong>Health</strong>
              </td>
              <td style="padding:10px; border:1px solid #ccc; white-space: pre-line;">
                ${healthToRecommendations}
              </td>
            </tr>

            <tr>
              <td style="padding:10px; border:1px solid #ccc;">
                <strong>Recommendations</strong>
              </td>
              <td style="padding:10px; border:1px solid #ccc; white-space: pre-line;">
                ${recommendationsData}
              </td>
            </tr>
          </table>

          <p style="margin-top:20px; font-size:12px; color:gray;">
            Generated on ${formattedDate}
          </p>
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
