import { Weight } from "lucide-react";

export const initialUserData = {
  firstName: "",
  LastName: "",
  age: "",
  gender: "male",
  weight: "",
  height: "",
  profile_image: "",
};

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD9X4hY1a1W9jOI0LedOvOs8L07bhSVGqg",
  authDomain: "studybuddy-5a2fe.firebaseapp.com",
  projectId: "studybuddy-5a2fe",
  storageBucket: "studybuddy-5a2fe.appspot.com",
  messagingSenderId: "481736869337",
  appId: "1:481736869337:web:6fc2c02f44dea61e1245c8",
  measurementId: "G-R8J22FTCV8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
export const storage = getStorage(app);
