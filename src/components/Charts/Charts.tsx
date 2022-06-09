import React, { memo, useState, useEffect, useMemo, useCallback } from 'react';
import { Box, Tab, Tabs } from '@material-ui/core';
import LineChart from '../LineChart/LineChart';
import BarChart from '../BarChart/BarChart';
import { ICountry } from '../../types';

import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

interface IChartsProps {
  currentCountry: ICountry;
  covidDataValues: ICountry[];
};

enum chartsNames {
  LINE = 'LINE',
  BAR = 'BAR',
};

const additionalChartsOptions = {
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
};

const Charts: React.FC<IChartsProps> = memo(({
  currentCountry,
  covidDataValues,
}) => {
  const [tabShown, setTabShown] = useState<chartsNames>(chartsNames.LINE);
  const [dateCount, setDateCount] = useState<number>(0);
  const [countriesAmount, setCountriesAmount] = useState<number>(10); // amount of countries to shown
  const [startCountryIndex, setStartCountyIndex] = useState<number>(0); // index of selected country in array

  useEffect(() => {
    const beginningIndex = covidDataValues
      .findIndex(({ location }) => location === currentCountry.location);

    setStartCountyIndex(beginningIndex);
  }, [covidDataValues, currentCountry.location]);

  const handleDatesAmount = useCallback((val: number) => setDateCount(val), []);

  const handleCountriesAmountChange = useCallback((e: React.ChangeEvent<{ value: unknown }>) => {
    setCountriesAmount(e.target.value as number);
  }, []);

  const handleSwitchTabs = useCallback((tabName: chartsNames) => setTabShown(tabName), []);

  const lineChartData = useMemo(() => ({
    labels: currentCountry.data.map(({ date }) => date).splice(-dateCount), // minus here to move <- from current date
    datasets: [
      {
        data: currentCountry.data.map(({ new_cases }) => new_cases),
        label: 'Confirmed Cases (clickable)',
        backgroundColor: 'aquamarine',
        borderColor: 'blue',
      },
      {
        data: currentCountry.data.map(({ new_deaths }) => new_deaths),
        label: 'Deaths (clickable)',
        backgroundColor: 'tomato',
        borderColor: 'red',
      }
    ]
  }), [currentCountry.data, dateCount]);

  const barChartData = useMemo(() => ({
    labels: covidDataValues
      .slice(startCountryIndex, startCountryIndex + countriesAmount)
      .map(({ location }) => location),
    datasets: [
      {
        label: 'Total Cases (clickable)',
        backgroundColor: 'aquamarine',
        borderColor: 'blue',
        data: covidDataValues
          .slice(startCountryIndex, startCountryIndex + countriesAmount) // find my country and siblings of it
          .map(({ data }) => data.map(({ total_cases }) => total_cases)) // convert it to array of total_death per each country that shown
          .map((deaths) => deaths.pop()), // grab only last item in array (actual summary total_deaths)
      },
      {
        label: 'Total Deaths (clickable)',
        data: covidDataValues
          .slice(startCountryIndex, startCountryIndex + countriesAmount)
          .map(({ data }) => data.map(({ total_deaths }) => total_deaths))
          .map((deaths) => deaths.pop()),
        backgroundColor: 'red',
        borderColor: 'tomato',
      }
    ]
  }), [countriesAmount, covidDataValues, startCountryIndex]);

  return (
    <Box>
      <Tabs value={tabShown}>
        <Tab label="Reported cases" value={chartsNames.LINE} onClick={() => handleSwitchTabs(chartsNames.LINE)} />
        <Tab label="Ranked charts" value={chartsNames.BAR} onClick={() => handleSwitchTabs(chartsNames.BAR)} />
      </Tabs>
      {(() => {
        switch (tabShown) {
          case chartsNames.LINE:
            return (
              <LineChart
                handleDaysAmount={handleDatesAmount}
                lineChartData={lineChartData}
                additionalOptions={additionalChartsOptions}
              />
            );
        
          case chartsNames.BAR:
            return (
              <BarChart
                barChartData={barChartData}
                countriesAmount={countriesAmount}
                additionalOptions={additionalChartsOptions}
                handleCountriesAmountChange={handleCountriesAmountChange}
              />
            );

          default:
            const _never: never = tabShown
            return _never;
        }
      })()}
    </Box>
  );
});

export default Charts
