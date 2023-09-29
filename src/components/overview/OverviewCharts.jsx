import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { CardLarge } from "./OverviewCards";

export const OverviewCharts = () => {
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );
  let incomeExpenses = [];
  if (user) {
    incomeExpenses = [...user.monthlyIncomeExpenses];
  }

  const chartData = incomeExpenses
    .map((item) => ({
      month: item.month,
      income: item.income,
      expenses: item.expenses,
    }))
    .sort((a, b) => new Date(a.month) - new Date(b.month));

  const chartContainerRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(0);

  useEffect(() => {
    const updateChartWidth = () => {
      if (chartContainerRef.current) {
        const containerWidth = chartContainerRef.current.clientWidth;
        setChartWidth(containerWidth);
      }
    };

    updateChartWidth();

    window.addEventListener("resize", updateChartWidth);

    return () => {
      window.removeEventListener("resize", updateChartWidth);
    };
  }, []);

  return (
    <OVERVIEWCHARTS>
      <h3>Income vs Expenses</h3>
      <CardLarge>
        <div ref={chartContainerRef} className="chart-container">
          <LineChart
            width={chartWidth}
            height={500}
            data={chartData}
            // margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid stroke="var(--primary-grey)" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="income"
              name="Income"
              stroke="var(--primary)"
              isAnimationActive={true}
              animationBegin={100}
              animationDuration={6000}
              strokeWidth={3}
            />
            <Line
              type="monotone"
              dataKey="expenses"
              name="Expenses"
              stroke="var(--complementary)"
              isAnimationActive={true}
              animationBegin={100}
              animationDuration={6000}
              strokeWidth={3}
            />
          </LineChart>
        </div>
      </CardLarge>
    </OVERVIEWCHARTS>
  );
};

const OVERVIEWCHARTS = styled.div`
  text-align: left;
  grid-area: charts;
  > h3 {
    margin-bottom: 1rem;
    transition: color 0.1s ease-in;
    &:hover {
      color: var(--primary-light);
    }
  }
`;
