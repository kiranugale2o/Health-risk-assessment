import DatabaseConn from "@/database";
import { UserProfile } from "@/models/UserProfile";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req) {
  await DatabaseConn();
  try {
    const { data } = await req.json();
    console.log("serverdata", data);
    const profile = await UserProfile(data);
    await profile.save();
    if (profile) {
      return NextResponse.json({
        success: true,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went Wrong !",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
