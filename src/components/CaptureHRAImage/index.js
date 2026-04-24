"use client";

import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download } from "lucide-react";

const CaptureImage = ({
  healthToRecommendations,
  name,
  age,
  gender,
  recommendationsData,
}) => {
  const elementRef = useRef();

  const handleCapture = async () => {
    const canvas = await html2canvas(elementRef.current, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 210;
    const pageHeight = 297;

    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("Health_Report.pdf");
  };

  const show = healthToRecommendations !== "";

  // 👉 Optional BMI calculation (basic)
  const bmi = 25.45; // replace with dynamic if needed

  return (
    <>
      {/* Download Button */}
      {show && (
        <button
          onClick={handleCapture}
          className="mt-4 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-700 text-white text-sm font-semibold rounded-xl shadow hover:opacity-90 w-full justify-center"
        >
          <Download className="w-4 h-4" />
          Download Full Report as PDF
        </button>
      )}

      {/* Hidden PDF Layout */}
      <div
        ref={elementRef}
        className="fixed -top-[9999px] left-0 w-[800px]"
      >
        <div
          style={{
            background:
              "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
            padding: "40px",
            fontFamily: "Georgia, serif",
            color: "#fff",
          }}
        >
          {/* HEADER */}
          <div
            style={{
              background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
              borderRadius: "16px",
              padding: "28px",
              marginBottom: "24px",
            }}
          >
            <h1 style={{ fontSize: "26px", marginBottom: "6px" }}>
              Personal Health Report
            </h1>
            <p style={{ fontSize: "12px", opacity: 0.8 }}>
              AI-Powered Health Risk Assessment
            </p>

            {/* Patient Info */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "18px",
                flexWrap: "wrap",
              }}
            >
              {[
                { label: "Patient", value: name },
                { label: "Age", value: `${age} years` },
                { label: "Gender", value: gender },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    padding: "8px 14px",
                    borderRadius: "8px",
                  }}
                >
                  <p style={{ fontSize: "10px", opacity: 0.7 }}>
                    {item.label}
                  </p>
                  <p style={{ fontWeight: "bold" }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* HEALTH ANALYSIS */}
          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: "14px",
              padding: "20px",
              marginBottom: "16px",
            }}
          >
            <h2 style={{ marginBottom: "10px", fontSize: "16px" }}>
              1. Health Analysis
            </h2>

            <p style={{ fontSize: "14px", lineHeight: "1.8" }}>
              {healthToRecommendations}
            </p>
          </div>

          {/* BMI */}
          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: "14px",
              padding: "20px",
              marginBottom: "16px",
            }}
          >
            <h2 style={{ marginBottom: "10px", fontSize: "16px" }}>
              2. BMI Analysis
            </h2>

            <p style={{ fontSize: "14px", lineHeight: "1.8" }}>
              Your Body Mass Index (BMI) is approximately{" "}
              <strong>{bmi}</strong>, which falls in the{" "}
              <strong>overweight</strong> category.

              {"\n\n"}
              Maintaining a healthy BMI helps reduce the risk of heart disease,
              diabetes, and other metabolic conditions.
            </p>
          </div>

          {/* RECOMMENDATIONS */}
          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: "14px",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            <h2 style={{ marginBottom: "10px", fontSize: "16px" }}>
              3. Recommendations
            </h2>

            <p style={{ fontSize: "14px", lineHeight: "1.8" }}>
              {recommendationsData
                ?.split(",")
                .map((item, i) => `• ${item.trim()}`)
                .join("\n\n")}
            </p>
          </div>

          {/* FOOTER */}
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.1)",
              paddingTop: "12px",
              display: "flex",
              justifyContent: "space-between",
              fontSize: "11px",
              opacity: 0.6,
            }}
          >
            <p>AI-generated report · Consult a doctor</p>
            <p>HealthAI © {new Date().getFullYear()}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CaptureImage;