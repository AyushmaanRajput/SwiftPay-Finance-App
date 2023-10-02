import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { CardLarge } from "./OverviewCards";
import { Chart } from "./Chart";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

export const OverviewCharts = () => {
  const [user, setUser] = React.useState(
    useSelector((store) => store.authReducer.loggedInUser) || null
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

  const [chartType, setChartType] = useState("line");

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

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      borderRadius: "2rem",
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.1,
      },
    },
    hover: {
      scale: 1.01,
      boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.3)",
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <OverviewChartsContainer>
      <motion.h3 whileHover={{ color: "var(--primary-light)" }}>
        Income vs Expenses
      </motion.h3>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        whileHover="hover"
      >
        <CardLarge>
          <SelectContainer>
            <select value={chartType} onChange={handleChartTypeChange}>
              <option value="line">Line Graph</option>
              <option value="bar">Bar Graph</option>
            </select>
          </SelectContainer>
          <ChartContainer ref={chartContainerRef}>
            {chartType === "line" ? (
              <Chart chartWidth={chartWidth} chartData={chartData} chartType="line" />
            ) : (
              <Chart chartWidth={chartWidth} chartData={chartData} chartType="bar" />
            )}
          </ChartContainer>
        </CardLarge>
      </motion.div>
    </OverviewChartsContainer>
  );
};

const OverviewChartsContainer = styled.div`
  text-align: left;
  grid-area: charts;
  h3 {
    margin-bottom: 1rem;
    transition: color 0.1s ease-in;
    &:hover {
      color: var(--primary-light);
    }
  }
`;

const SelectContainer = styled.div`
  select {
    width: 10rem;
    padding: 10px;
    font-size: 16px;
    border: 1px solid var(--primary-grey);
    border-radius: 5px;
    background-color: var(--background-light);
    color: var(--primary-dark);
    cursor: pointer;
    margin-bottom: 2rem;
  }

  select option {
    background-color: var(--background-light);
    color: var(--primary-dark);
    padding: 1rem;
  }
`;

const ChartContainer = styled.div`
  .recharts-wrapper {
    width: 100%;
    height: 500px;
  }
`;
