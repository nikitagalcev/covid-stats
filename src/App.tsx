import React, { memo, useEffect, useState, useMemo } from 'react';
import useFetchCovidStats from './hooks/useFetchCovidStats';
import './App.css';
import { Box, LinearProgress, TextField, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useCallback } from 'react';
import Charts from './components/Charts/Charts';
import { ICountry } from './types';
import ThemeSwitcher from './components/ThemeSwitcher/ThemeSwitcher';

const App: React.FC = memo(() => {
  const { isLoading, covidData, defaultCountry } = useFetchCovidStats();

  const [selectedCountry, setSelectedCountry] = useState<ICountry>();

  const covidDataValues = useMemo(() => [...covidData.values()], [covidData])

  useEffect(() => {
    if (defaultCountry) {
      setSelectedCountry(defaultCountry);
    }
  }, [defaultCountry])

  const handleCountryChange = useCallback((_: React.ChangeEvent<{}>, val: ICountry['location']) => {
    const selectedCountry = covidData?.get(val);

    if (selectedCountry) {
      setSelectedCountry(selectedCountry);
    }
  }, [covidData]);

  if (isLoading) {
    return (
      <Box m="0 auto" display="flex" flexDirection="column" justifyContent="center" textAlign="center">
        <LinearProgress />
        <Typography>Jeesus, you're fetching almost 130mb of JSON, of course you need to wait!</Typography>
        <Box width="50%" display="flex" flexDirection="column" alignSelf="start" justifyContent="center" textAlign="right">
          <ThemeSwitcher />
          <Typography variant='subtitle1'>(Meanwhile you can play with theme toggler)</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box width="90%" m="0 auto">
      <h1>Covid Statistic</h1>
      <ThemeSwitcher />
      {covidData && defaultCountry ? (
        <Autocomplete
          renderInput={(args) => <TextField label="Country" {...args}/>}
          defaultValue={defaultCountry}
          options={covidDataValues}
          getOptionLabel={(data) => data.location}
          onInputChange={handleCountryChange}
        />
      ) : null}

      {(selectedCountry && covidData.size) ? <Charts currentCountry={selectedCountry} covidDataValues={covidDataValues} /> : null}
    </Box>
  );
});

export default App;
