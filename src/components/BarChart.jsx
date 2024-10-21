/** @format */
"use client";

import React from "react";
import {
  BarChart as BarGraph,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Bar,
} from "recharts";

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 100),
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 100),
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 100),
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 100),
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 100),
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 100),
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 100),
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 100),
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 100),
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 100),
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 100),
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 100),
  },
];

export default function BarChart() {
  return (
      <ResponsiveContainer width={"100%"} height={350} >
      <BarGraph data={data}>
        <XAxis
          dataKey={"name"}
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={12}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={12}
          tickFormatter={(value) => `${value}`}
        />
        <Bar dataKey={"total"} radius={[4, 4, 0, 0]} />
      </BarGraph>
    </ResponsiveContainer>
    
  );
}
