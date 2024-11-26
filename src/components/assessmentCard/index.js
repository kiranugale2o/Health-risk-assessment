"use client";

import {
  HealthRiskAssessmentField,
  initialHealthRiskAssessmentData,
} from "@/utils";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { StepForward } from "lucide-react";
import { StepBack } from "lucide";
import { useState } from "react";

export default function AssessmentPageCard() {
  const [currentData, setData] = useState(initialHealthRiskAssessmentData);
  const [hra, setHra] = useState("");
  const [form, setForm] = useState(1);
  const [step, setSteps] = useState(1);
  const style = {
    backgroundImage: "url('back.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "auto", // Full height of the viewport
    margin: 0, // Remove default margin
  };

  function handleHRA() {
    let prompt = `${currentData?.name}, a ${currentData?.age}-year-old ${currentData?.gender} with ${currentData?.medicalConditions} or ${currentData?.familyhistory},my weight is${currentData?.weight} kg and height is ${currentData?.height} cm, reports experiencing ${currentData?.symptoms}, despite leading a sedentary lifestyle and having an ${currentData?.diet} diet. so write my health riks assessment with recommandation`;

    fetch("/api/hra-generator", {
      method: "POST",
      body: JSON.stringify({ prompt: prompt }),
    }).then((res) =>
      res.json().then((res) => {
        setHra(res.message);
      })
    );
  }

  return (
    <>
      <div
        className="lg:px-20 flex flex-1 justify-center py-10 lg:py-5  "
        style={style}
      >
        <div className="block w-full lg:w-[500px] lg:shadow-lg p-5 h-fit ">
          <div className="flex w-full">
            <h1 className="text-4xl lg:p-5 font-serif   flex">
              Health Risk Assessment{" "}
            </h1>
          </div>
          <hr />
          <br />
          <div className="flex flex-col gap-1">
            <p className="text-[18px] text-normal  font-serif ">
              Step {step}/4{" "}
            </p>
            <Progress
              value={
                step === 1
                  ? 25
                  : step === 2
                  ? 50
                  : step === 3
                  ? 75
                  : step == 4
                  ? 100
                  : ""
              }
            />
          </div>
          <div className={`form1 py-5 ${form === 1 ? "block" : "hidden"}`}>
            <p className="text-2xl font-sans">Personal Information:</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();

                setForm(form + 1);
                setSteps(step + 1);
              }}
            >
              {HealthRiskAssessmentField.slice(0, 5).map((d) => {
                return (
                  <div
                    key={d.name}
                    className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3"
                  >
                    <label className="flex flex-col min-w-40 flex-1">
                      {d.label}
                      <input
                        value={currentData?.[d.name] || ""}
                        onChange={(e) => {
                          setData({
                            ...currentData,
                            [d.name]: e.target.value,
                          });
                        }}
                        required
                        placeholder={d.placeholder}
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border border-[#dce0e5] bg-white focus:border-[#dce0e5] h-14 placeholder:text-[#637488] p-[15px] text-base font-normal leading-normal"
                      />
                    </label>
                  </div>
                );
              })}
              <div className="flex gap-5">
                <button
                  type="button"
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1  text-md font-bold leading-normal tracking-[0.015em] disabled:opacity-50 "
                ></button>
                <button
                  type="submit"
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#80ED99] text-black hover:bg-black hover:text-white text-md font-bold leading-normal tracking-[0.015em] disabled:opacity-50 "
                >
                  <span className="truncate">Next</span>
                </button>
              </div>
            </form>
          </div>

          <div className={`form2 py-5 ${form === 2 ? "block" : "hidden"}`}>
            <p className="text-2xl font-sans">Medical History:</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setForm(form + 1);
                setSteps(step + 1);
              }}
            >
              {HealthRiskAssessmentField.slice(5, 7).map((d) => {
                return (
                  <div
                    key={d.name}
                    className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3"
                  >
                    <label className="flex flex-col min-w-40 flex-1">
                      {d.label}
                      <input
                        value={currentData?.[d.name] || ""}
                        onChange={(e) => {
                          setData({
                            ...currentData,
                            [d.name]: e.target.value,
                          });
                        }}
                        required
                        placeholder={d.placeholder}
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border border-[#dce0e5] bg-white focus:border-[#dce0e5] h-14 placeholder:text-[#637488] p-[15px] text-base font-normal leading-normal"
                      />
                    </label>
                  </div>
                );
              })}
              <div className="flex gap-5">
                <button
                  type="button"
                  onClick={() => {
                    setForm(form - 1);
                    setSteps(step - 1);
                  }}
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#80ED99] text-black hover:bg-black hover:text-white text-md font-bold leading-normal tracking-[0.015em] disabled:opacity-50 "
                >
                  <span className="truncate "> Previous</span>
                </button>
                <button
                  type="submit"
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#80ED99] text-black hover:bg-black hover:text-white text-md font-bold leading-normal tracking-[0.015em] disabled:opacity-50 "
                >
                  <span className="truncate">Next</span>
                </button>
              </div>
            </form>
          </div>

          <div className={`form3 py-5 ${form === 3 ? "" : "hidden"}`}>
            <p className="text-2xl font-sans">Lifestyle Factors:</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setForm(form + 1);
                setSteps(step + 1);
              }}
            >
              {HealthRiskAssessmentField.slice(7, 11).map((d) => {
                return (
                  <div
                    key={d.name}
                    className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3"
                  >
                    <label className="flex flex-col min-w-40 flex-1">
                      {d.label}
                      <input
                        value={currentData?.[d.name] || ""}
                        onChange={(e) => {
                          setData({
                            ...currentData,
                            [d.name]: e.target.value,
                          });
                        }}
                        required
                        placeholder={d.placeholder}
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border border-[#dce0e5] bg-white focus:border-[#dce0e5] h-14 placeholder:text-[#637488] p-[15px] text-base font-normal leading-normal"
                      />
                    </label>
                  </div>
                );
              })}
              <div className="flex gap-5">
                <button
                  type="button"
                  onClick={() => {
                    setForm(2);
                    setSteps(2);
                  }}
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#80ED99] text-black hover:bg-black hover:text-white text-md font-bold leading-normal tracking-[0.015em] disabled:opacity-50 "
                >
                  <span className="truncate "> Previous</span>
                </button>
                <button
                  type="submit"
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#80ED99] text-black hover:bg-black hover:text-white text-md font-bold leading-normal tracking-[0.015em] disabled:opacity-50 "
                >
                  <span className="truncate">Next</span>
                </button>
              </div>
            </form>
          </div>

          <div
            className={`form4 py-5 ${
              form === 4 ? "" : "hidden"
            } h-[330px] lg:h-[280px]`}
          >
            <p className="text-2xl font-sans">Symptoms:</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setForm(4);
                handleHRA();
              }}
            >
              {HealthRiskAssessmentField.slice(11, 12).map((d) => {
                return (
                  <div
                    key={d.name}
                    className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3"
                  >
                    <label className="flex flex-col min-w-40 flex-1">
                      {d.label}
                      <input
                        value={currentData?.[d.name] || ""}
                        onChange={(e) => {
                          setData({
                            ...currentData,
                            [d.name]: e.target.value,
                          });
                        }}
                        required
                        placeholder={d.placeholder}
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border border-[#dce0e5] bg-white focus:border-[#dce0e5] h-14 placeholder:text-[#637488] p-[15px] text-base font-normal leading-normal"
                      />
                    </label>
                  </div>
                );
              })}
              <div className="flex gap-5">
                <button
                  type="button"
                  onClick={() => {
                    setForm(3);
                    setSteps(3);
                  }}
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#80ED99] text-black hover:bg-black hover:text-white text-md font-bold leading-normal tracking-[0.015em] disabled:opacity-50 "
                >
                  <span className="truncate "> Previous</span>
                </button>
                <button
                  type="submit"
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#80ED99] text-black hover:bg-black hover:text-white text-md font-bold leading-normal tracking-[0.015em] disabled:opacity-50 "
                >
                  <span className="truncate">Next</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <p className="text-[20px]">{hra}</p>
    </>
  );
}
