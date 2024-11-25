"use client";
// components/CaptureImage.js

import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { Button } from "../ui/button";

const CaptureImage = ({ healthToRecommendations, recommendationsData }) => {
  const elementRef = useRef();

  const handleCapture = async () => {
    const canvas = await html2canvas(elementRef.current);
    const imgData = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = imgData;
    link.download = "captured-image.png"; // Specify the filename
    link.click();
  };

  return (
    <>
      <div className="flex flex-col lg:w-[900px] mx-auto " ref={elementRef}>
        <Button
          onClick={handleCapture}
          className={`absolute right-10 mt-5  ${
            healthToRecommendations === "" ? "hidden" : ""
          }`}
        >
          Download HRA
        </Button>
        <p className="mt-10 lg:mt-0 text-[20px] p-5   lg:mx-10 whitespace-break-spaces text-center flex flex-1 text-wrap  font-times">
          {healthToRecommendations.replace(/\*/g, "")}
        </p>
        <hr />
        <hr />
        <hr />
        <hr />
        <br />

        <p className="text-[20px] p-15    lg:mx-10 whitespace-break-spaces text-center flex flex-1 text-wrap font-times">
          {recommendationsData.replace(/\*/g, "")}
        </p>
        <p
          className={`text-[20px] text-center ${
            healthToRecommendations === "" ? "hidden" : ""
          }`}
        >
          Created By HealthCare
        </p>
      </div>

      <div className="hidden"></div>
    </>
  );
};

export default CaptureImage;
