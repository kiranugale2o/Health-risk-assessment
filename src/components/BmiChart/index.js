"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { formattedDate } from "@/utils";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },

  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
};

export default function BmiChart({ currentBmi }) {
  const chartData = [
    {
      browser: "chrome",
      visitors: currentBmi < 18.5 ? currentBmi : 18,
      fill: "var(--color-chrome)",
    },
    {
      browser: "edge",
      visitors: currentBmi >= 18.5 && currentBmi < 24.9 ? currentBmi : 24,
      fill: "var(--color-edge)",
    },
    {
      browser: "safari",
      visitors: currentBmi >= 25 && currentBmi < 29.9 ? currentBmi : 29,
      fill: "var(--color-safari)",
    },
    {
      browser: "other",
      visitors: currentBmi >= 30 && currentBmi < 100 ? currentBmi : 50,
      fill: "var(--color-other)",
    },
  ];

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <Card classNameName="flex flex-col shadow-md">
      <CardHeader classNameName="items-center pb-0">
        <CardTitle>BMI (Body Mass Index) </CardTitle>
        <CardDescription>{formattedDate}</CardDescription>
      </CardHeader>
      <CardContent classNameName="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          classNameName="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          classNameName="fill-foreground text-3xl font-bold"
                        >
                          {currentBmi.toFixed(2)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          classNameName="fill-muted-foreground"
                        >
                          Kg/m²
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter classNameName="flex-col gap-2 text-sm">
        <div classNameName="flex items-center gap-2 font-medium leading-none">
          Your BMI IS {currentBmi.toFixed(2)} <TrendingUp classNameName="h-4 w-4" />
        </div>
        <div classNameName="leading-none text-muted-foreground">
          Showing Body mass Index on Live Profile information
        </div>
      </CardFooter>
    </Card>
  );
}
