"use client";

import * as React from "react";
import { Label, Pie, PieChart, Cell } from "recharts";
import { formattedDate } from "@/utils";

// BMI thresholds & their visual identities
const BMI_ZONES = [
  {
    key: "underweight",
    label: "Underweight",
    range: "< 18.5",
    color: "#60a5fa",
    bg: "from-blue-500/20 to-blue-600/5",
    border: "border-blue-200",
    text: "text-blue-600",
    emoji: "📉",
  },
  {
    key: "normal",
    label: "Normal",
    range: "18.5 – 24.9",
    color: "#34d399",
    bg: "from-emerald-500/20 to-emerald-600/5",
    border: "border-emerald-200",
    text: "text-emerald-600",
    emoji: "✅",
  },
  {
    key: "overweight",
    label: "Overweight",
    range: "25 – 29.9",
    color: "#fbbf24",
    bg: "from-amber-500/20 to-amber-600/5",
    border: "border-amber-200",
    text: "text-amber-600",
    emoji: "⚠️",
  },
  {
    key: "obese",
    label: "Obese",
    range: "≥ 30",
    color: "#f87171",
    bg: "from-red-500/20 to-red-600/5",
    border: "border-red-200",
    text: "text-red-600",
    emoji: "🔴",
  },
];

function getBmiZone(bmi) {
  if (bmi < 18.5) return 0;
  if (bmi < 25) return 1;
  if (bmi < 30) return 2;
  return 3;
}

function getBmiMessage(bmi) {
  if (bmi < 18.5) return "You are below the healthy weight range. Consider consulting a nutritionist.";
  if (bmi < 25) return "You are within the healthy weight range. Keep up the great work!";
  if (bmi < 30) return "You are slightly above the healthy range. Small lifestyle changes can help.";
  return "Your BMI suggests obesity. It's recommended to consult a healthcare professional.";
}

// Custom tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 shadow-2xl">
        <p className="text-xs font-bold text-white">{d.label}</p>
        <p className="text-xs text-slate-400">{d.range}</p>
      </div>
    );
  }
  return null;
};

export default function BmiChart({ currentBmi }) {
  const bmi = typeof currentBmi === "number" ? currentBmi : parseFloat(currentBmi) || 22;
  const zoneIndex = getBmiZone(bmi);
  const activeZone = BMI_ZONES[zoneIndex];

  // Chart data: show the full arc filled proportionally
  // We split the 0-40 scale into 4 segments, highlighting the active one
  const SEGMENT_MAX = [18.5, 24.9, 29.9, 40];
  const chartData = BMI_ZONES.map((zone, i) => ({
    label: zone.label,
    range: zone.range,
    value: i === 3 ? 10 : SEGMENT_MAX[i] - (i === 0 ? 0 : SEGMENT_MAX[i - 1]),
    color: zone.color,
    opacity: i === zoneIndex ? 1 : 0.2,
  }));

  // Needle position: map bmi 0-40 to 0-360 degrees
  const needleAngle = Math.min(Math.max((bmi / 40) * 360, 0), 359);

  // Progress bar: 0–40 range
  const progressPct = Math.min((bmi / 40) * 100, 100);

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">
              Body Mass Index
            </p>
            <h2 className="text-xl font-bold text-white">BMI Tracker</h2>
          </div>
          <div
            className="text-4xl font-black tabular-nums"
            style={{ color: activeZone.color }}
          >
            {bmi.toFixed(1)}
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-2">{formattedDate}</p>
      </div>

      {/* Donut chart */}
      <div className="px-6 pt-6">
        <div className="flex justify-center">
          <div className="relative w-48 h-48">
            <PieChart width={192} height={192}>
              <Pie
                data={chartData}
                cx={96}
                cy={96}
                innerRadius={64}
                outerRadius={88}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                strokeWidth={0}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    fillOpacity={entry.opacity}
                  />
                ))}
                <Label
                  content={({ viewBox }) => {
                    const { cx, cy } = viewBox;
                    return (
                      <g>
                        <text
                          x={cx}
                          y={cy - 10}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill={activeZone.color}
                          fontSize="28"
                          fontWeight="900"
                          fontFamily="Arial"
                        >
                          {bmi.toFixed(1)}
                        </text>
                        <text
                          x={cx}
                          y={cy + 16}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="#94a3b8"
                          fontSize="11"
                          fontFamily="Arial"
                        >
                          kg/m²
                        </text>
                      </g>
                    );
                  }}
                />
              </Pie>
            </PieChart>
          </div>
        </div>
      </div>

      {/* Active zone badge */}
      <div className="px-6 pb-2">
        <div
          className={`flex items-center gap-3 rounded-2xl px-4 py-3 bg-gradient-to-r ${activeZone.bg} border ${activeZone.border}`}
        >
          <span className="text-2xl">{activeZone.emoji}</span>
          <div>
            <p className={`text-sm font-bold ${activeZone.text}`}>
              {activeZone.label}
            </p>
            <p className="text-xs text-slate-500 leading-snug mt-0.5">
              {getBmiMessage(bmi)}
            </p>
          </div>
        </div>
      </div>

      {/* BMI scale bar */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">BMI Scale</span>
          <span className="text-[10px] font-bold text-slate-400">0 — 40+</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden relative">
          {/* Colored zones */}
          <div className="absolute inset-0 flex rounded-full overflow-hidden">
            <div className="h-full" style={{ width: "46.25%", background: "#60a5fa" }} />
            <div className="h-full" style={{ width: "16%", background: "#34d399" }} />
            <div className="h-full" style={{ width: "12.5%", background: "#fbbf24" }} />
            <div className="h-full" style={{ width: "25.25%", background: "#f87171" }} />
          </div>
          {/* Needle indicator */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-white shadow-md transition-all duration-700"
            style={{ left: `${progressPct}%`, backgroundColor: activeZone.color }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-[9px] text-slate-400">0</span>
          <span className="text-[9px] text-slate-400">18.5</span>
          <span className="text-[9px] text-slate-400">25</span>
          <span className="text-[9px] text-slate-400">30</span>
          <span className="text-[9px] text-slate-400">40</span>
        </div>
      </div>

      {/* Zone legend */}
      <div className="grid grid-cols-2 gap-2 px-6 pb-6">
        {BMI_ZONES.map((zone, i) => (
          <div
            key={zone.key}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border transition-all
              ${i === zoneIndex
                ? `border-current bg-gradient-to-r ${zone.bg} ${zone.border}`
                : "border-slate-100 bg-slate-50"
              }`}
          >
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: zone.color }}
            />
            <div>
              <p className={`text-[11px] font-bold ${i === zoneIndex ? zone.text : "text-slate-500"}`}>
                {zone.label}
              </p>
              <p className="text-[9px] text-slate-400">{zone.range}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}