import { MenuItem, Select, Typography } from "@material-ui/core";
import React, { memo } from "react";
import { Bar } from "react-chartjs-2";

interface IBarChartProps {
  barChartData: any;
  countriesAmount: number;
  additionalOptions?: {
    [key: string]: any;
  };
  handleCountriesAmountChange: (e: React.ChangeEvent<{value: unknown}>) => void;
};

const countriesAmountArr: number[] = [2, 5, 10, 20, 30];

const BarChart: React.FC<IBarChartProps> = memo(({
  barChartData,
  countriesAmount,
  additionalOptions,
  handleCountriesAmountChange,
}) => {
  // place for creating styles
  return (
    <div>
      <h2>Ranked Charts</h2>
      <Bar data={barChartData} options={additionalOptions} />
      <Typography>Select an amount of countries on the screen</Typography>
      <Select
        value={countriesAmount}
        onChange={handleCountriesAmountChange}
      >
        {countriesAmountArr.map((day) => (
          <MenuItem key={day} value={day}>
            <Typography>{day.toString()}</Typography>
          </MenuItem>
        ))}
      </Select>
    </div>
  );
});

export default BarChart;
