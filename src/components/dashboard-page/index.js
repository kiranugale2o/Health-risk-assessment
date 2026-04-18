"use client";

import { motion } from "framer-motion";
import UpdateProfile from "../updateProfile";

export default function DashboardCard({ user, ProfileUser }) {
  const heightInMeters = ProfileUser?.height / 100;
  const bmi = ProfileUser?.weight / (heightInMeters * heightInMeters);

  let category = "";
  let color = "";

  if (bmi < 18.5) {
    category = "Underweight";
    color = "text-blue-400";
  } else if (bmi < 24.9) {
    category = "Normal";
    color = "text-green-400";
  } else if (bmi < 29.9) {
    category = "Overweight";
    color = "text-yellow-400";
  } else {
    category = "Obesity";
    color = "text-red-400";
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto p-6 lg:p-12"
      >
        {/* PROFILE CARD */}
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 shadow-xl flex items-center gap-6 hover:scale-[1.02] transition">
          <img
            src={ProfileUser?.profile_image}
            className="w-28 h-28 rounded-full border-4 border-green-400 shadow-lg"
          />

          <div>
            <h1 className="text-3xl font-bold">
              {ProfileUser?.firstName} {ProfileUser?.LastName}
            </h1>
            <p className="text-gray-300">Age: {ProfileUser?.age}</p>

            <div className="mt-2">
              <span className="text-sm text-gray-400">BMI</span>
              <div className={`text-2xl font-bold ${color}`}>
                {bmi.toFixed(2)} ({category})
              </div>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {[
            { title: "Weight", value: `${ProfileUser?.weight} kg` },
            { title: "Height", value: `${ProfileUser?.height} cm` },
            { title: "Daily Goal", value: "2,200 kcal" },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-md p-5 rounded-xl shadow-lg"
            >
              <p className="text-gray-400">{item.title}</p>
              <h2 className="text-xl font-semibold">{item.value}</h2>
            </motion.div>
          ))}
        </div>

        {/* HEALTH STATUS */}
        <div className="mt-10 bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 border-b border-green-500 pb-2">
            Health Status
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Blood Pressure: Normal",
              "Cholesterol: Moderate",
              "Sleep: 7-8 hrs",
              "Hydration: Good",
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 5 }}
                className="bg-black/30 p-3 rounded-md"
              >
                ✔ {item}
              </motion.div>
            ))}
          </div>
        </div>

        {/* RECOMMENDATIONS */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold border-b border-green-500 pb-2 mb-4">
            Smart Recommendations
          </h2>

          <div className="grid gap-4">
            {[
              "Eat more whole foods and reduce processed sugar",
              "Exercise at least 30 mins daily",
              "Stay hydrated (2–3L water)",
              "Maintain consistent sleep schedule",
              "Track your calories weekly",
            ].map((tip, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-green-500/20 to-transparent p-4 rounded-lg"
              >
                💡 {tip}
              </motion.div>
            ))}
          </div>
        </div>

        {/* EXTRA HEALTH INSIGHTS */}
        <div className="mt-10 bg-white/10 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4 border-b border-green-500 pb-2">
            Insights
          </h2>

          <p className="text-gray-300 leading-relaxed">
            Maintaining a healthy BMI is important for reducing risks of heart
            disease, diabetes, and other conditions. Combine balanced nutrition,
            regular exercise, and stress management to improve long-term health.
          </p>
        </div>

        {/* BUTTON */}
        <div className="mt-8">
          <UpdateProfile ProfileUser={ProfileUser} />
        </div>
      </motion.div>
    </div>
  );
}
