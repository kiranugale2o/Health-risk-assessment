import DatabaseConn from "@/database";
import { UserProfile } from "@/models/UserProfile";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await DatabaseConn();
    const { id, data } = await req.json();
    console.log(id, data);

    const updateProfile = await UserProfile.updateOne(
      { _id: id },
      {
        $set: { age: data?.age, weight: data?.weight, height: data?.height },
      }
    );
    if (updateProfile) {
      return NextResponse.json({
        success: true,
        message: "Profile Update Successfully !",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Somthing Else Try Again !",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
