"use client";
// components/CaptureImage.js

import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { Button } from "../ui/button";
import jsPDF from "jspdf";

const CaptureImage = ({
  healthToRecommendations,
  name,
  age,
  gender,
  recommendationsData,
}) => {
  const elementRef = useRef();

  const handleCapture = async () => {
    const canvas = await html2canvas(elementRef.current);
    const imgData = canvas.toDataURL("image/png");
    const doc = new jsPDF();

    // Add the captured image as the first page in the PDF
    doc.addImage(imgData, "PNG", 10, 10, 180, 160); // You can adjust x, y, width, height as per your requirement

    // Save the PDF with the desired filename
    doc.save("HRAReport.pdf");
    // const link = document.createElement("a");
    // link.href = imgData;
    // link.download = `HRAReport.pdf`; // Specify the filename
    // link.click();
  };

  const style = {
    backgroundImage: "url('back.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "auto", // Full height of the viewport
    margin: 0, // Remove default margin
  };

  return (
    <>
      <Button
        onClick={handleCapture}
        className={`absolute right-10 mt-[-20px] lg:mt-5  ${
          healthToRecommendations === "" ? "hidden" : ""
        }`}
      >
        Download HRA
      </Button>
      <div ref={elementRef} className="h-full w-full">
        <h2 className="text-center text-gray-800 text-2xl font-semibold mt-4">
          Risk Assessment for {name} ({age}-year-old {gender})
        </h2>
        <table className="w-full table-auto mt-5">
          <thead className="w-full">
            <tr className="bg-green-500 text-white">
              <th className="hidden lg:flex lg:py-3 lg:px-4 border border-gray-300">
                Factors
              </th>
              <th className="py-3 px-4 border border-gray-300">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr className=" even:bg-gray-100 hover:bg-gray-200">
              <td className="hidden lg:flex py-3 px-4 border ">
                <strong>Health Information</strong>
              </td>
              <td className="text-wrap text-xl py-3 px-4 lg:mx-10 whitespace-pre-line text-center font-serif">
                {healthToRecommendations}
              </td>
            </tr>
            <tr className=" even:bg-gray-100 hover:bg-gray-200 bg-red-200">
              <td className="hidden lg:flex py-3 px-4 border ">
                <strong>Recommendations</strong>
              </td>
              <td className="text-xl py-3 px-4 lg:mx-10 whitespace-pre-line text-center font-serif">
                {recommendationsData}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="hidden"></div>
    </>
  );
};

export default CaptureImage;
