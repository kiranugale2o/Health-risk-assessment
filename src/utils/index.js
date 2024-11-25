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

// Create a new Date object for the current date
const today = new Date();

// Array of month names
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Get the day of the month
const day = today.getDate();

// Get the month name
const month = months[today.getMonth()];

// Get the full year
const year = today.getFullYear();

// Format the date as "12 June 2024"
export const formattedDate = `${day} ${month} ${year}`;

export const HealthRiskAssessmentField = [
  {
    label: "Name",
    name: "name",
    placeholder: "Enter your Name",
    contentType: "input",
  },
  {
    label: "Age",
    name: "age",
    placeholder: "Enter your age",
    contentType: "input",
  },
  {
    label: "Gender",
    name: "gender",
    placeholder: "Select your gender",
    contentType: "select",
  },
  {
    label: "Height",
    name: "height",
    placeholder: "Enter your height in cm",
    contentType: "input",
  },
  {
    label: "Weight",
    name: "weight",
    placeholder: "Enter your weight in kg",
    contentType: "input",
  },
  {
    label: "Medical Conditions",
    name: "medical_conditions",
    placeholder: "Enter your medical conditions",
    contentType: "input",
  },
  {
    label: "Family History of Health Conditions",
    name: "family_history",
    placeholder: "Enter family history of health conditions",
    contentType: "input",
  },
  {
    label: "Physical Activity",
    name: "physical_activity",
    placeholder: "Describe your physical activity habits",
    contentType: "input",
  },
  {
    label: "Diet",
    name: "diet",
    placeholder: "Describe your dietary habits",
    contentType: "input",
  },
  {
    label: "Smoking",
    name: "smoking",
    placeholder: "Enter smoking habits ",
    contentType: "input",
  },
  {
    label: "Alcohol",
    name: "alcohol",
    placeholder: "Enter alcohol consumption details",
    contentType: "input",
  },
  {
    label: "Symptoms",
    name: "symptoms",
    placeholder: "Enter any symptoms",
    contentType: "input",
  },
];

export const initialHealthRiskAssessmentData = {
  firstName: "",
  age: "",
  gender: "",
  weight: "",
  height: "",
  medicalConditions: "",
  familyHistory: "",
  physicalActivity: "",
  diet: "",
  smoking: "",
  alcohol: "",
  symptoms: "chest pain",
};
