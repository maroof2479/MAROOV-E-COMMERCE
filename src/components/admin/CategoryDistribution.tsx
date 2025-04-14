
import React from "react";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export const CategoryDistribution = () => {
  // Mock data
  const data = [
    { name: "Electronics", value: 45 },
    { name: "Clothing", value: 30 },
    { name: "Home & Kitchen", value: 15 },
    { name: "Others", value: 10 },
  ];

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

  const chartConfig = {
    category: {
      label: "Categories",
      theme: {
        light: "#8884d8",
        dark: "#8884d8",
      },
    },
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Category Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value}%`, ""]} />
          </PieChart>
        </ChartContainer>
        <ChartLegend className="justify-center mt-4">
          <ChartLegendContent payload={data.map((item, index) => ({
            value: item.name,
            color: COLORS[index % COLORS.length]
          }))} />
        </ChartLegend>
      </CardContent>
    </Card>
  );
};
