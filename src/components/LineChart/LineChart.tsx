import React, { memo } from "react";
import { Box, Button } from "@material-ui/core";
import { Line } from "react-chartjs-2";

interface ILineChartProps {
  handleDaysAmount: (val: number) => void;
  additionalOptions?: {
    [key: string]: any;
  };
  lineChartData: {
    labels: string[];
    datasets: {
        data: number[];
        label: string;
        backgroundColor: string;
        borderColor: string;
    }[];
  };
};

const daysAmount: number[] = [7, 14, 30, 90, 0];

const LineChart: React.FC<ILineChartProps> = memo(({
  handleDaysAmount,
  lineChartData,
  additionalOptions,
}) => {
  // place for creating styles (from useStyles hook)
  return (
    <div>
      <h2>Reported Cases</h2>
      <Line data={lineChartData} options={additionalOptions} />
      <Box display="flex" textAlign="center" m="1" flexDirection="column">
        <h3>Select amount of days to show</h3>
        <Box>
          {daysAmount.map((day) => ( //have no idea what is cumulative mode so I made a day switcher
            <Button key={day} onClick={() => handleDaysAmount(day)}>
              {!day ? 'Show all' : `Last ${day} Days`}
            </Button>
          ))}
        </Box>
      </Box>
    </div>
  )
});

export default LineChart;
