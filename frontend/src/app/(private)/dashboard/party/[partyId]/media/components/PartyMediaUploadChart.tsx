"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PartySettingsUpgradePlanDialog from "../../settings/components/PartySettingsUpgradePlanDialog";

function PartyMediaUploadChart() {
  const chartData = [
    { browser: "safari", visitors: 5, fill: "var(--color-safari)" },
  ];
  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col mt-4 w-full max-w-[362px]">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-md">Upload Limit ( Free Plan )</CardTitle>
        <CardDescription>3 od 100 uploadovano</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[100px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={250}
            innerRadius={30}
            outerRadius={40}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted"
              polarRadius={[32, 30]}
            />
            <RadialBar dataKey="visitors" background cornerRadius={5} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    const centerX = viewBox.cx || 0;
                    const centerY = viewBox.cy || 0;
                    return (
                      <text
                        x={centerX}
                        y={centerY}
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="fill-foreground"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="text-sm font-bold" // Prilagodljiv font
                        >
                          {chartData[0].visitors.toLocaleString()}%
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <PartySettingsUpgradePlanDialog />
      </CardFooter>
    </Card>
  );
}

export default PartyMediaUploadChart;
