"use client";

import BmiChart from "../BmiChart";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import UpdateProfile from "../updateProfile";

export default function DashboardCard({ user, ProfileUser }) {
  const style = {
    backgroundImage: "url('back2.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "auto", // Full height of the viewport
    margin: 0, // Remove default margin
  };
  // Convert height from inches to meters
  console.log(ProfileUser?.height);

  const heightInMeters = ProfileUser?.height / 100;

  // Calculate BMI: weight (kg) / height (m)^2
  const bmi = ProfileUser?.weight / (heightInMeters * heightInMeters);
  var category;
  var advice;
  if (bmi < 18.5) {
    category = "Underweight";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    category = "Normal weight";
  } else if (bmi >= 25 && bmi < 29.9) {
    category = "Overweight";
  } else {
    category = "Obesity";
  }

  return (
    <div style={style} classNameName="w-full">
      <div classNameName="w-full  mx-auto  max-w-4xl  py-20 px-5 lg:p-20 bg-none  ">
        {/* Profile Header */}
        <div classNameName="flex items-center mb-8">
          <img
            src={ProfileUser?.profile_image}
            alt="User Image"
            classNameName="w-32 h-32 rounded-full mr-6"
          />
          <div>
            <h1 classNameName="text-3xl font-bold text-gray-200">
              {ProfileUser?.firstName} {ProfileUser?.LastName}
            </h1>
            <p classNameName="text-sm text-gray-400">
              Age: {ProfileUser?.age}years
            </p>
            <p classNameName="text-sm text-gray-400">
              BMI: <span classNameName="font-bold">{bmi.toFixed(2)}</span>
            </p>
          </div>
        </div>

        {/* Profile Details */}
        <div classNameName="mb-6">
          <p classNameName="text-lg text-gray-500">
            <strong>Weight:</strong> {ProfileUser?.weight} kg
          </p>
          <p classNameName="text-lg text-gray-500">
            <strong>Height:</strong> {ProfileUser?.height} cm
          </p>
        </div>

        {/* Health Information */}
        <div classNameName="mb-8">
          <div classNameName="text-xl font-semibold text-gray-400 border-b-2 border-green-500 pb-2 mb-4">
            Health Information
          </div>
          <ul classNameName="list-none pl-4">
            <li classNameName="text-lg text-gray-700 flex items-start mb-2">
              <span classNameName="mr-2 text-green-500">✔</span> Blood Pressure:
              Normal
            </li>
            <li classNameName="text-lg text-gray-700 flex items-start mb-2">
              <span classNameName="mr-2 text-green-500">✔</span> Cholesterol:
              Moderate
            </li>
            <li classNameName="text-lg text-gray-700 flex items-start mb-2">
              <span classNameName="mr-2 text-green-500">✔</span> Physical Activity:
              Moderate (30 minutes daily)
            </li>
            <li classNameName="text-lg text-gray-700 flex items-start mb-2">
              <span classNameName="mr-2 text-green-500">✔</span> Sleep: 7-8 hours
              per night
            </li>
          </ul>
        </div>

        {/* Recommendations */}
        <div classNameName="mb-8">
          <div classNameName="text-xl font-semibold text-gray-400 border-b-2 border-green-500 pb-2 mb-4">
            Recommendations for {category} To Good Health
          </div>
          <>
            {category === "Overweight" ? (
              <>
                <div classNameName="bg-gray-100 p-4 mb-4 rounded-md shadow-sm">
                  <p classNameName="text-lg text-gray-700">
                    <strong>1. Eat a balanced diet:</strong> Include more
                    fruits, vegetables, and whole grains in your diet.
                  </p>
                </div>
                <div classNameName="bg-gray-100 p-4 mb-4 rounded-md shadow-sm">
                  <p classNameName="text-lg text-gray-700">
                    <strong>2. Exercise regularly:</strong> Aim for at least 150
                    minutes of moderate-intensity exercise weekly.
                  </p>
                </div>
                <div classNameName="bg-gray-100 p-4 mb-4 rounded-md shadow-sm">
                  <p classNameName="text-lg text-gray-700">
                    <strong>3. Regular check-ups:</strong> Schedule annual
                    health check-ups to monitor your health.
                  </p>
                </div>
              </>
            ) : category === "Underweight" ? (
              <>
                <div classNameName="bg-gray-100 p-4 mb-4 rounded-md shadow-sm">
                  <p classNameName="text-lg text-gray-700">
                    <strong>1. Increase Caloric Intake:</strong> Focus on eating
                    more calorie-dense, nutrient-rich foods like nuts, seeds,
                    avocados, and lean protein to help gain weight in a healthy
                    way.
                  </p>
                </div>

                <div classNameName="bg-gray-100 p-4 mb-4 rounded-md shadow-sm">
                  <p classNameName="text-lg text-gray-700">
                    <strong>2. Strength Training:</strong> Incorporate strength
                    training exercises into your routine to build muscle mass
                    and improve overall body composition.
                  </p>
                </div>

                <div classNameName="bg-gray-100 p-4 mb-4 rounded-md shadow-sm">
                  <p classNameName="text-lg text-gray-700">
                    <strong>3. Consult a Healthcare Provider:</strong> Work with
                    a nutritionist or healthcare provider to create a tailored
                    plan for gaining weight and addressing any underlying health
                    conditions.
                  </p>
                </div>
              </>
            ) : category === "Obesity" ? (
              <>
                {" "}
                <div classNameName="bg-gray-100 p-4 mb-4 rounded-md shadow-sm">
                  <p classNameName="text-lg text-gray-700">
                    <strong>1. Adopt a balanced diet:</strong> Focus on eating
                    nutrient-dense, low-calorie foods such as vegetables,
                    fruits, lean proteins, and whole grains. Reduce the intake
                    of processed foods, sugary drinks, and high-fat snacks.
                  </p>
                </div>
                <div classNameName="bg-gray-100 p-4 mb-4 rounded-md shadow-sm">
                  <p classNameName="text-lg text-gray-700">
                    <strong>2. Regular physical activity:</strong> Incorporate
                    at least 30 minutes of moderate-intensity exercise (such as
                    walking, cycling, or swimming) most days of the week to help
                    burn calories and improve overall health.
                  </p>
                </div>
                <div classNameName="bg-gray-100 p-4 mb-4 rounded-md shadow-sm">
                  <p classNameName="text-lg text-gray-700">
                    <strong>3. Consult a healthcare professional:</strong> Work
                    with a doctor, dietitian, or personal trainer to create a
                    personalized weight loss plan that includes dietary changes,
                    exercise, and behavioral adjustments.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div classNameName="bg-gray-100 p-4 mb-4 rounded-md shadow-sm">
                  <p classNameName="text-lg text-gray-700">
                    <strong>1. Maintain a balanced diet:</strong> Continue
                    eating a variety of nutrient-dense foods, including fruits,
                    vegetables, whole grains, lean proteins, and healthy fats to
                    keep your weight within a healthy range.
                  </p>
                </div>

                <div classNameName="bg-gray-100 p-4 mb-4 rounded-md shadow-sm">
                  <p classNameName="text-lg text-gray-700">
                    <strong>2. Stay physically active:</strong> Aim for at least
                    150 minutes of moderate-intensity exercise per week. Regular
                    physical activity helps to maintain your weight, improve
                    muscle strength, and enhance overall health.
                  </p>
                </div>

                <div classNameName="bg-gray-100 p-4 mb-4 rounded-md shadow-sm">
                  <p classNameName="text-lg text-gray-700">
                    <strong>3. Regular health check-ups:</strong> Continue with
                    regular health check-ups to monitor your overall health,
                    manage stress, and detect any potential health issues early
                    before they become more serious.
                  </p>
                </div>
              </>
            )}
          </>
        </div>

        {/* Edit Profile Button */}
        <UpdateProfile ProfileUser={ProfileUser} />
      </div>
    </div>
  );
}
