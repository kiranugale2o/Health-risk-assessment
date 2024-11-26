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
    name: "medicalConditions",
    placeholder: "Enter your medical conditions",
    contentType: "input",
  },
  {
    label: "Family History of Health Conditions",
    name: "familyhistory",
    placeholder: "Enter family history of health conditions",
    contentType: "input",
  },
  {
    label: "Physical Activity",
    name: "physicalActivity",
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
  name: "",
  age: "",
  gender: "",
  weight: "",
  height: "",
  medicalConditions: "",
  familyhistory: "",
  physicalActivity: "",
  diet: "",
  smoking: "",
  alcohol: "",
  symptoms: "",
};

export let healthRiskAssessment = `
Health Risk Assessment for Kiran (20-year-old Male)
**Presenting Complaint:** Chest pain
**Demographics:** 20-year-old male, 170 cm (5'7"), 45 kg (99 lbs) - significantly underweight. Sedentary lifestyle, no specific diet reported.
**Risk Factors:**
* **Low Body Weight:** Kiran's BMI is significantly below the healthy range, indicating potential malnutrition or underlying health issues. This can weaken the body, making it more susceptible to various problems including heart-related issues, though it's uncommon to be the *direct* cause of chest pain in a young adult.
* **Sedentary Lifestyle:** Lack of physical activity increases the risk of cardiovascular disease, obesity, and other health problems. This is a significant risk factor.
* **Unspecified Diet:** Lack of information regarding Kiran's diet makes it difficult to assess potential nutritional deficiencies which could contribute to weakness and other symptoms. Poor diet increases the risk of many health problems.
* **Chest Pain:** This is the primary concern and warrants immediate medical attention. Chest pain can be a symptom of numerous conditions, ranging from relatively benign (muscle strain) to life-threatening (heart attack, pericarditis, pneumothorax). The cause needs to be determined promptly.
* **Age (20 years old):** While relatively young, the presence of chest pain at this age still requires investigation, even if the cause is eventually found to be non-serious.
**Potential Diagnoses (requiring medical evaluation):** The list below are possibilities and are *not* a diagnosis. Only a medical professional can diagnose Kiran's condition.
* **Musculoskeletal pain:** Muscle strain or costochondritis (inflammation of the cartilage connecting the ribs to the breastbone) are possibilities.
* **Gastrointestinal issues:** Acid reflux, esophageal spasm, or other digestive problems can cause chest pain.
* **Cardiovascular issues:** While less likely given his age, the possibility of a cardiac issue (though unlikely without other risk factors) requires immediate investigation to rule out.
* **Anxiety/Panic attack:** Chest pain is a common symptom of anxiety and panic attacks.
* **Other:** Less common causes include lung problems (pneumothorax), esophageal rupture, or other conditions.
**Recommendations:**
**IMMEDIATE ACTION:**
* **Seek immediate medical attention:** Kiran needs to go to a doctor or emergency room immediately to have his chest pain evaluated. This is the **most crucial** recommendation. Delaying assessment could have serious consequences.
**Following Medical Evaluation:**
* **Follow medical advice:** Strictly adhere to any diagnostic tests, treatments, or lifestyle changes recommended by the physician.
* **Comprehensive medical examination:** This should include a thorough physical examination, electrocardiogram (ECG), and potentially other tests depending on the findings.
* **Dietary assessment and counseling:** A registered dietitian can assess Kiran's nutritional needs and create a balanced eating plan to address his underweight status.
* **Gradual increase in physical activity:** A physician or physiotherapist can guide Kiran on a safe and effective program to gradually increase his physical activity level. This will improve overall health and well-being. Starting slowly is essential given his current low weight and sedentary lifestyle.
* **Stress management techniques:** If anxiety or stress are contributing factors, learning coping mechanisms through therapy or relaxation techniques might be beneficial.
**Disclaimer:** This is a general health risk assessment and should not be considered a substitute for professional medical advice. Kiran must seek immediate medical attention for his chest pain.
`;
