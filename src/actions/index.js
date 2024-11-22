"use server";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import cookie from "cookie";
import { UserProfile } from "@/models/UserProfile";
import { headers } from "next/headers";
import { cookies } from "next/headers";
import { parse } from "cookie";
import DatabaseConn from "@/database";

//fetch Current User is exit or not

export async function currentUser() {
  // Await headers() to get the headers correctly
  const headersList = headers(); // Await headers function
  const cookieHeader = (await headersList).get("cookie") || ""; // Now await and get cookie header
  const cookies = parse(cookieHeader); // Parse the cookie string

  const myObject = cookies["healthcare"];

  if (myObject) {
    try {
      // jwt.verify is synchronous in the way you're using it, but it has a callback.
      // You should use the promise-based API of `jwt.verify` for async/await usage
      const decoded = await new Promise((resolve, reject) => {
        jwt.verify(myObject, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
          if (err) {
            reject(err); // Reject on error
          } else {
            resolve(decoded); // Resolve with the decoded token
          }
        });
      });

      return decoded; // Return the decoded token if everything is valid
    } catch (err) {
      console.error(err); // Log any error
      return null; // Return null in case of an error (invalid or expired token)
    }
  }

  return null; // Return null if the "healthcare" cookie is not present
}

//fetch exiting user data and return
export async function fetchUser(id) {
  await DatabaseConn();
  const data = await UserProfile.findOne({ userId: id });
  if (data) {
    return JSON.parse(JSON.stringify(data));
  } else {
    return null;
  }
}
