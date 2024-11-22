import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
    trim: true,
  },
  profilePicture: {
    type: String,
    default:
      "https://yzlxgraclfixtcrahgup.supabase.co/storage/v1/object/public/studybuddy/public/programmer.jpg",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
  },
});

// Ensure proper model registration without resetting `mongoose.models`
export const UserProfile =
  mongoose.models.Student || mongoose.model("Student", userSchema);
