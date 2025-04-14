
import React from "react";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export const RevenueChart = () => {
  // Mock data
  const data = [
    { name: "Jan", revenue: 4000, expense: 2400 },
    { name: "Feb", revenue: 3000, expense: 1398 },
    { name: "Mar", revenue: 2000, expense: 9800 },
    { name: "Apr", revenue: 2780, expense: 3908 },
    { name: "May", revenue: 1890, expense: 4800 },
    { name: "Jun", revenue: 2390, expense: 3800 },
    { name: "Jul", revenue: 3490, expense: 4300 },
    { name: "Aug", revenue: 4000, expense: 2400 },
    { name: "Sep", revenue: 3000, expense: 1398 },
    { name: "Oct", revenue: 2000, expense: 9800 },
    { name: "Nov", revenue: 2780, expense: 3908 },
    { name: "Dec", revenue: 4890, expense: 4800 },
  ];

  const chartConfig = {
    revenue: {
      label: "Revenue",
      theme: {
        light: "#7c3aed",
        dark: "#8b5cf6",
      },
    },
    expense: {
      label: "Expenses",
      theme: {
        light: "#e11d48",
        dark: "#f43f5e",
      },
    },
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Revenue Overview</CardTitle>
        <ChartLegend>
          <ChartLegendContent payload={[
            { value: 'Revenue', color: chartConfig.revenue.theme.light },
            { value: 'Expenses', color: chartConfig.expense.theme.light }
          ]} />
        </ChartLegend>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#e11d48" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#e11d48" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `$${value}`} />
            <Tooltip formatter={(value) => [`$${value}`, ""]} />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#7c3aed" 
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
            />
            <Area 
              type="monotone" 
              dataKey="expense" 
              stroke="#e11d48" 
              fillOpacity={1} 
              fill="url(#colorExpense)" 
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
