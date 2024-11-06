"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart"

export const description = "A donut chart representing top skills"

const chartData = [
  { skill: "Next.js", percentage: 50, fill: "var(--color-nextjs)" },
  { skill: "React.js", percentage: 25, fill: "var(--color-reactjs)" },
  { skill: "Node.js", percentage: 15, fill: "var(--color-nodejs)" },
  { skill: "TypeScript", percentage: 10, fill: "var(--color-typescript)" },
]

const chartConfig = {
  nextjs: {
    label: "Next.js",
    color: "hsl(var(--chart-1))",
  },
  reactjs: {
    label: "React.js",
    color: "hsl(var(--chart-2))",
  },
  nodejs: {
    label: "Node.js",
    color: "hsl(var(--chart-3))",
  },
  typescript: {
    label: "TypeScript",
    color: "hsl(var(--chart-4))",
  },
}

export function TopSkills() {
  const totalPercentage = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.percentage, 0)
  }, [])

  return (
    <Card className="flex flex-col shadow-none border-0">
      <CardContent className="flex-1 pb-0 border-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] shadow-none border-0"
          style={{ border: 'none' }}
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="percentage"
              nameKey="skill"
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
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalPercentage}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Skills
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
