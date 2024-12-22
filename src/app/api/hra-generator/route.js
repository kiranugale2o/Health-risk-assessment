// Make sure to include these imports:
import { formattedDate } from "@/utils";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const { prompt, email } = await req.json();

  const result = await model.generateContent(prompt);

  // Extract the content between "Health" and "Recommendations"
  let healthStartIndex = result.response.text().indexOf("Health");
  // Extract everything after the word "Recommendations"
  let recommendationsStartIndex = result.response
    .text()
    .indexOf("Recommendations:");

  // Extract the data between "Health" and "Recommendations"
  let healthToRecommendations = result.response
    .text()
    .substring(healthStartIndex, recommendationsStartIndex)
    .trim();

  let recommendationsData = result.response
    .text()
    .substring(recommendationsStartIndex);

  // Send OTP email
  await transporter.sendMail({
    to: email,
    subject: `Your Health Risk Assessment . ${formattedDate} `,
    html: `
         <h2 className="text-center text-white text-2xl font-semibold mt-4">
          Risk Assessment for 
        </h2>
        <table className=" bg-gray-200 w-full table-auto mt-5">
          <thead className="w-full">
            <tr className="bg-green-500 text-white">
              <th className="hidden lg:flex lg:py-3 lg:px-4 border border-gray-300">
                Factors
              </th>
              <th className="py-3 px-4 border border-gray-300">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr className=" bg-gray-200 even:bg-gray-100 hover:bg-gray-200">
              <td className="hidden lg:flex py-3 px-4 border ">
                <strong>Health Information</strong>
              </td>
              <td className="text-wrap text-xl py-3 px-4 lg:mx-10 whitespace-pre-line text-center font-serif">
                ${healthToRecommendations}
              </td>
            </tr>
            <tr>
              <td className="hidden lg:flex py-3 px-4 border ">
                <strong>Recommendations</strong>
              </td>
              <td className="text-xl py-3 px-4 lg:mx-10 whitespace-pre-line text-center font-serif">
                ${recommendationsData}
              </td>
            </tr>
          </tbody>
        </table>
        `,
  });

  return NextResponse.json({
    healthToRecommendations: healthToRecommendations,
    recommendationsData: recommendationsData,
  });
}
