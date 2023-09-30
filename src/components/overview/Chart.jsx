import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export const Chart = ({ chartWidth, chartData, chartType }) => {
  const customTooltipStyle = {
    backgroundColor: "var(--background-light)",
    borderRadius: "1rem",
    border: "1px solid var(--primary-grey)",
    color: "var(--primary-white)",
    padding: "0.5rem",
  };

  return (
    <ResponsiveContainer width={chartWidth} height={500}>
      {chartType === "line" ? (
        <LineChart data={chartData}>
          <CartesianGrid stroke="var(--primary-grey)" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip contentStyle={customTooltipStyle} />
          <Legend />
          <Line
            type="monotone"
            dataKey="income"
            name="Income"
            stroke="var(--primary-light)"
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="expenses"
            name="Expenses"
            stroke="var(--complementary)"
            strokeWidth={3}
          />
        </LineChart>
      ) : (
        <BarChart data={chartData}>
          <CartesianGrid stroke="var(--primary-grey)" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip contentStyle={customTooltipStyle} />
          <Legend />
          <Bar
            dataKey="income"
            name="Income"
            fill="var(--primary-light)"
            barRadius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="expenses"
            name="Expenses"
            fill="var(--complementary-light)"
            barRadius={"10, 10, 0, 0"}
          />
        </BarChart>
      )}
    </ResponsiveContainer>
  );
};
