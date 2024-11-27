"use client";

import BmiChart from "../BmiChart";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import UpdateProfile from "../updateProfile";

export default function DashboardCard({ user, ProfileUser }) {
  const style = {
    backgroundImage: "url('back.jpg')",
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
    <>
      <div className="lg:px-40 block  justify-center py-5" style={style}>
        <UpdateProfile
          className="absolute mt-5 right-5"
          ProfileUser={ProfileUser}
        />

        <div className="block lg:p-5 py-5 lg:flex  w-full flex-col shadow-lg ">
          <div className="block w-full h-auto shadow-lg lg:flex  lg:w-[890px] lg:h-[100px] border rounded-md  bg-white justify-between">
            <div className="flex flex-row  gap-2 mx-1 lg:mx-10">
              <div
                className="bg-center bg-no-repeat border mt-5 aspect-square bg-cover rounded-full w-[70px] h-[70px]"
                style={{
                  backgroundImage: `url(bg2.jpg)`,
                }}
              />
              <div className="flex flex-col justify-center ">
                <p className=" text-[22px] text-[#80ED99]  font-bold leading-tight tracking-[-0.015em]">
                  {ProfileUser?.firstName} {ProfileUser?.LastName}
                </p>
                <p className="text-[#636e88]  text-base font-normal leading-normal">
                  {ProfileUser?.gender},{ProfileUser?.age} years old{" "}
                </p>
              </div>
            </div>
            <div className=" flex mt-3 gap-2 lg:gap-4 p-5 lg:p-0 ">
              <div className="flex w-[1px] h-[60px] bg-[#80ED99]"></div>
              <div className="flex flex-col gap-2">
                <p className="text-[18px] text-gray-400">Age</p>
                <p className="text-[15px] mx-5">{ProfileUser?.age}</p>
              </div>
              <div className="flex w-[1px] h-[60px] bg-[#80ED99]"></div>
              <div className="flex flex-col gap-2">
                <p className="text-[18px] text-gray-400">Gender</p>
                <p className="text-[15px] mx-5">{ProfileUser?.gender}</p>
              </div>
              <div className="flex w-[1px] h-[60px] bg-[#80ED99]"></div>
              <div className="flex flex-col gap-2">
                <p className="text-[18px] text-gray-400">Weight</p>
                <p className="text-[15px] mx-5 ">{ProfileUser?.weight}Kg</p>
              </div>
              <div className="flex w-[1px] h-[60px] bg-[#80ED99]"></div>
              <div className="flex flex-col gap-2">
                <p className="text-[18px] text-gray-400">Height</p>
                <p className="text-[15px] mx-5 ">{ProfileUser?.height}cm</p>
              </div>
            </div>
          </div>
          <div className="block p-4 lg:flex  gap-5 ">
            <div className="flex py-5  ">
              <BmiChart currentBmi={bmi} />
            </div>
            <div className="flex py-5 ">
              <Card>
                <CardContent>
                  <CardTitle className="text-2xl p-5">
                    Health Information
                  </CardTitle>
                  <CardDescription>
                    <p className="text-[20px] text-start">
                      # Healthy BMI range{" "}
                    </p>{" "}
                    <p className="text-[18px] mt-3 underline text-green-500">
                      18.5 - 24.9
                    </p>
                    <br />
                    <p className="text-[20px] text-start">your Report is :</p>
                    <p
                      className={`text-[18px] mt-3 underline ${
                        category === "Underweight"
                          ? "text-red-400"
                          : "text-green-500"
                      }`}
                    >
                      {category}
                    </p>
                    <br />
                    <p className="text-[20px] text-start">
                      HealthCare Suggestion :
                    </p>
                    <p className={`text-[18px] mt-3 underline text-green-500`}>
                      {category === "Underweight"
                        ? " To safely gain weight and improve your overall health."
                        : category === "Overweight"
                        ? " it's important to focus on achieving a balanced diet, regular exercise . "
                        : "regular exercise"}
                    </p>
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
