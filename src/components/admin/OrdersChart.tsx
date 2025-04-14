
import React from "react";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export const OrdersChart = () => {
  // Mock data
  const data = [
    { name: "Mon", orders: 12 },
    { name: "Tue", orders: 19 },
    { name: "Wed", orders: 15 },
    { name: "Thu", orders: 8 },
    { name: "Fri", orders: 22 },
    { name: "Sat", orders: 30 },
    { name: "Sun", orders: 24 },
  ];

  const chartConfig = {
    orders: {
      label: "Orders",
      theme: {
        light: "#0ea5e9",
        dark: "#38bdf8",
      },
    },
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Orders This Week</CardTitle>
        <ChartLegend>
          <ChartLegendContent payload={[
            { value: 'Orders', color: chartConfig.orders.theme.light }
          ]} />
        </ChartLegend>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => [`${value} orders`, ""]} />
            <Bar 
              dataKey="orders" 
              fill="#0ea5e9"
              radius={[4, 4, 0, 0]} 
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
