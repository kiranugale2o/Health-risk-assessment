"use client";

import {
  healthRiskAssessment,
  HealthRiskAssessmentField,
  initialHealthRiskAssessmentData,
} from "@/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import {
  Volume2,
  VolumeOff,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import CaptureImage from "../CaptureHRAImage";
import { useToast } from "@/hooks/use-toast";

const STEPS = [
  { id: 1, label: "Personal Info" },
  { id: 2, label: "Medical History" },
  { id: 3, label: "Lifestyle Factors" },
  { id: 4, label: "Symptoms" },
];

export default function AssessmentPageCard({ email }) {
  const { toast } = useToast();
  const [currentData, setData] = useState(initialHealthRiskAssessmentData);
  const [form, setForm] = useState(1);
  const [step, setSteps] = useState(1);
  const [dialogBtn, setDialogBtn] = useState(false);
  const [indianVoice, setIndianVoice] = useState(null);
  const [healthToRecommendations, setHealthToRecommendations] = useState("");
  const [recommendationsData, setRecommendation] = useState("");

  const progress = (form / 4) * 100;

  function handleHRA() {
    setDialogBtn(true);
    let prompt = `${currentData?.name}, a ${currentData?.age}-year-old ${currentData?.gender} with ${currentData?.medicalConditions} or ${currentData?.familyhistory},my weight is${currentData?.weight} kg and height is ${currentData?.height} cm, reports experiencing ${currentData?.symptoms}, despite leading a sedentary lifestyle and having an ${currentData?.diet} diet. so write my health riks assessment with recommandation. that all information get me into like Patient,lifestyle ,bmi ,Diet,Symptoms,Risk factor`;

    fetch("/api/hra-generator", {
      method: "POST",
      body: JSON.stringify({ prompt, email }),
    })
      .then((res) => res.json())
      .then((res) => {
        setHealthToRecommendations(res.healthToRecommendations);
        setRecommendation(res.recommendationsData);
      })
      .finally(() => setDialogBtn(false));
  }

  function speechTotext() {
    toast({ title: "Reading your report..." });
    if (typeof window !== "undefined") {
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find((v) => v.name.toLowerCase().includes("indian"));
      const speech = new SpeechSynthesisUtterance(
        healthToRecommendations + " " + recommendationsData,
      );
      speech.voice = voice || null;
      speech.lang = voice ? "en-IN" : "en-US";
      speech.pitch = 1;
      speech.rate = 1;
      window.speechSynthesis.speak(speech);
    }
  }

  function stopSpeech() {
    toast({ title: "Stopped reading." });
    if (typeof window !== "undefined") window.speechSynthesis.cancel();
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-[#D0E8E0] bg-white text-[#1A2E2A] text-sm placeholder:text-[#6B8C83] focus:outline-none focus:border-[#0D9E75] focus:ring-2 focus:ring-[#0D9E75]/10 transition-all";

  const fieldBlock = (d) => (
    <div key={d.name} className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-[#1A2E2A]">{d.label}</label>
      <input
        value={currentData?.[d.name] || ""}
        onChange={(e) => setData({ ...currentData, [d.name]: e.target.value })}
        required
        placeholder={d.placeholder}
        className={inputClass}
      />
    </div>
  );

  return (
    <>
      {/* Loading Dialog */}
      <Dialog open={dialogBtn}>
        <DialogContent className="max-w-sm rounded-2xl border-0 shadow-xl p-0 overflow-hidden">
          <div
            className="flex flex-col items-center justify-center gap-4 p-10 text-white text-center"
            style={{
              background: "linear-gradient(135deg, #085041 0%, #0D9E75 100%)",
            }}
          >
            <div className="w-14 h-14 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            <DialogTitle className="text-white text-xl font-semibold">
              Analysing your data...
            </DialogTitle>
            <p className="text-white/70 text-sm">
              Generating your personalised health risk report. This may take a
              few seconds.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex min-h-screen bg-[#F7FAF9]">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-[#D0E8E0] p-8 gap-2 flex-shrink-0">
          <p className="text-[11px] font-semibold tracking-widest text-[#6B8C83] uppercase mb-3">
            Assessment Steps
          </p>
          {STEPS.map((s, i) => (
            <div key={s.id}>
              <div
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all cursor-pointer ${
                  form === s.id ? "bg-[#E1F5EE]" : "hover:bg-[#F7FAF9]"
                }`}
                onClick={() => form > s.id && setForm(s.id)}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all ${
                    form > s.id
                      ? "bg-[#0D9E75] text-white"
                      : form === s.id
                        ? "bg-[#0D9E75] text-white ring-4 ring-[#0D9E75]/20"
                        : "border-2 border-[#D0E8E0] text-[#6B8C83]"
                  }`}
                >
                  {form > s.id ? <CheckCircle2 className="w-4 h-4" /> : s.id}
                </div>
                <span
                  className={`text-sm font-medium ${
                    form === s.id
                      ? "text-[#085041] font-semibold"
                      : form > s.id
                        ? "text-[#0D9E75]"
                        : "text-[#6B8C83]"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`h-5 w-px ml-[26px] ${
                    form > s.id ? "bg-[#0D9E75]/40" : "bg-[#D0E8E0]"
                  }`}
                />
              )}
            </div>
          ))}

          <div className="mt-auto bg-[#E1F5EE] rounded-xl p-4">
            <p className="text-xs font-semibold text-[#085041] mb-1">
              Privacy protected
            </p>
            <p className="text-xs text-[#6B8C83] leading-relaxed">
              Your health data is encrypted and never shared without consent.
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-6 py-10 lg:px-14 lg:py-12 max-w-2xl">
          {/* Progress Bar */}
          <div className="h-1 bg-[#D0E8E0] rounded-full mb-10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#0D9E75] to-[#1DC7A5] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Step 1 — Personal Info */}
          {form === 1 && (
            <div className="animate-[fadeIn_.3s_ease]">
              <div className="mb-8">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#0D9E75] bg-[#E1F5EE] px-3 py-1.5 rounded-full mb-4">
                  Step 1 of 4
                </span>
                <h1 className="text-3xl font-serif text-[#1A2E2A] mb-2">
                  Personal Information
                </h1>
                <p className="text-[#6B8C83] text-sm leading-relaxed">
                  Tell us about yourself to personalise your health assessment.
                </p>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setForm(2);
                  setSteps(2);
                }}
                className="flex flex-col gap-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {HealthRiskAssessmentField.slice(0, 5).map((d) =>
                    fieldBlock(d),
                  )}
                </div>
                <div className="flex pt-4 border-t border-[#D0E8E0]">
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#0D9E75] text-white text-sm font-semibold rounded-xl hover:bg-[#085041] transition-all hover:-translate-y-0.5"
                  >
                    Continue <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Step 2 — Medical History */}
          {form === 2 && (
            <div className="animate-[fadeIn_.3s_ease]">
              <div className="mb-8">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#0D9E75] bg-[#E1F5EE] px-3 py-1.5 rounded-full mb-4">
                  Step 2 of 4
                </span>
                <h1 className="text-3xl font-serif text-[#1A2E2A] mb-2">
                  Medical History
                </h1>
                <p className="text-[#6B8C83] text-sm leading-relaxed">
                  Share any pre-existing conditions or family health background.
                </p>
              </div>
              <div className="flex items-start gap-2 bg-[#E1F5EE] text-[#085041] text-xs rounded-xl px-4 py-3 mb-6 leading-relaxed">
                <span className="mt-0.5">ℹ️</span>
                If you have no conditions, simply type &quot;None&quot; in
                either field.
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setForm(3);
                  setSteps(3);
                }}
                className="flex flex-col gap-5"
              >
                {HealthRiskAssessmentField.slice(5, 7).map((d) =>
                  fieldBlock(d),
                )}
                <div className="flex gap-3 pt-4 border-t border-[#D0E8E0]">
                  <button
                    type="button"
                    onClick={() => {
                      setForm(1);
                      setSteps(1);
                    }}
                    className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-[#6B8C83] border border-[#D0E8E0] rounded-xl hover:border-[#1A2E2A] hover:text-[#1A2E2A] transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#0D9E75] text-white text-sm font-semibold rounded-xl hover:bg-[#085041] transition-all hover:-translate-y-0.5"
                  >
                    Continue <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Step 3 — Lifestyle */}
          {form === 3 && (
            <div className="animate-[fadeIn_.3s_ease]">
              <div className="mb-8">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#0D9E75] bg-[#E1F5EE] px-3 py-1.5 rounded-full mb-4">
                  Step 3 of 4
                </span>
                <h1 className="text-3xl font-serif text-[#1A2E2A] mb-2">
                  Lifestyle Factors
                </h1>
                <p className="text-[#6B8C83] text-sm leading-relaxed">
                  Your daily habits play a big role in your overall health risk.
                </p>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setForm(4);
                  setSteps(4);
                }}
                className="flex flex-col gap-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {HealthRiskAssessmentField.slice(7, 11).map((d) =>
                    fieldBlock(d),
                  )}
                </div>
                <div className="flex gap-3 pt-4 border-t border-[#D0E8E0]">
                  <button
                    type="button"
                    onClick={() => {
                      setForm(2);
                      setSteps(2);
                    }}
                    className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-[#6B8C83] border border-[#D0E8E0] rounded-xl hover:border-[#1A2E2A] hover:text-[#1A2E2A] transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#0D9E75] text-white text-sm font-semibold rounded-xl hover:bg-[#085041] transition-all hover:-translate-y-0.5"
                  >
                    Continue <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Step 4 — Symptoms */}
          {form === 4 && (
            <div className="animate-[fadeIn_.3s_ease]">
              <div className="mb-8">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#0D9E75] bg-[#E1F5EE] px-3 py-1.5 rounded-full mb-4">
                  Step 4 of 4
                </span>
                <h1 className="text-3xl font-serif text-[#1A2E2A] mb-2">
                  Current Symptoms
                </h1>
                <p className="text-[#6B8C83] text-sm leading-relaxed">
                  Describe any symptoms you have been experiencing recently.
                </p>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleHRA();
                }}
                className="flex flex-col gap-5"
              >
                {HealthRiskAssessmentField.slice(11, 12).map((d) =>
                  fieldBlock(d),
                )}
                <div className="flex gap-3 pt-4 border-t border-[#D0E8E0]">
                  <button
                    type="button"
                    onClick={() => {
                      setForm(3);
                      setSteps(3);
                    }}
                    className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-[#6B8C83] border border-[#D0E8E0] rounded-xl hover:border-[#1A2E2A] hover:text-[#1A2E2A] transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#FF6B35] text-white text-sm font-semibold rounded-xl hover:bg-[#e55a27] transition-all hover:-translate-y-0.5"
                  >
                    Generate Report <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* Result Area */}
              {(healthToRecommendations || recommendationsData) && (
                <div className="mt-8 bg-white border border-[#D0E8E0] rounded-2xl p-6 animate-[fadeIn_.4s_ease]">
                  <div className="flex items-center gap-4 pb-5 mb-5 border-b border-[#D0E8E0]">
                    <div className="w-12 h-12 bg-[#E1F5EE] rounded-xl flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-[#0D9E75]" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-[#1A2E2A]">
                        Assessment Complete
                      </h3>
                      <p className="text-xs text-[#6B8C83] mt-0.5">
                        Personalised report for {currentData.name},{" "}
                        {currentData.age}
                      </p>
                    </div>
                  </div>

                  <div className="text-sm text-[#6B8C83] leading-relaxed mb-2">
                    {healthToRecommendations}
                  </div>
                  <div className="text-sm text-[#6B8C83] leading-relaxed">
                    {recommendationsData}
                  </div>

                  <div className="flex gap-3 mt-5 pt-5 border-t border-[#D0E8E0]">
                    <button
                      onClick={speechTotext}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#1A2E2A] border border-[#D0E8E0] rounded-lg hover:bg-[#E1F5EE] hover:border-[#0D9E75] hover:text-[#085041] transition-all"
                    >
                      <Volume2 className="w-4 h-4" /> Read aloud
                    </button>
                    <button
                      onClick={stopSpeech}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#1A2E2A] border border-[#D0E8E0] rounded-lg hover:bg-[#E1F5EE] hover:border-[#0D9E75] hover:text-[#085041] transition-all"
                    >
                      <VolumeOff className="w-4 h-4" /> Stop
                    </button>
                  </div>
                </div>
              )}

              {/* Capture Image */}
              <CaptureImage
                healthToRecommendations={healthToRecommendations}
                name={currentData.name}
                age={currentData.age}
                gender={currentData?.gender}
                recommendationsData={recommendationsData}
              />
            </div>
          )}
        </main>
      </div>
    </>
  );
}
