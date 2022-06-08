import React, { memo, useEffect, useState, useMemo } from 'react';
import { debounce } from 'lodash';
import useFetchCovidStats from './hooks/useFetchCovidStats';
import './App.css';
import { Box, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useCallback } from 'react';
import Charts from './components/Charts/Charts';
import { ICountry } from './types';


const App: React.FC = memo(() => {
  const { isLoading, covidData, defaultCountry } = useFetchCovidStats();

  const [selectedCountry, setSelectedCountry] = useState<ICountry>();
  
  const covidDataValues = useMemo(() => [...covidData.values()], [covidData])

  useEffect(() => {
    if (defaultCountry) {
      setSelectedCountry(defaultCountry)
    }
  }, [defaultCountry])


  const updateCountry = useCallback(debounce((val: ICountry['location']) => {
    const selectedCountry = covidData?.get(val);
    
    if (selectedCountry) {
      setSelectedCountry(selectedCountry);
    }
  }, 400), [])

  const handleCountryChange = useCallback((_: React.ChangeEvent<{}>, val: ICountry['location']) => {
    updateCountry(val);
  }, [updateCountry]);


  if (isLoading) {
    return <span>LOADING</span>;
  }

  return (
    <Box width="90%" m="0 auto">
      <h1>Covid Statistic</h1>

      {covidData && defaultCountry ? (
        <Autocomplete
          renderInput={(args) => <TextField label="Country" {...args}/>}
          defaultValue={defaultCountry}
          options={covidDataValues}
          getOptionLabel={(data) => data.location}
          onInputChange={(e: React.ChangeEvent<{}>, val: ICountry['location']) => handleCountryChange(e, val)}
        />
      ) : null}

      {(selectedCountry && covidData.size) ? <Charts currentCountry={selectedCountry} covidDataValues={covidDataValues} /> : null}
    </Box>
  );
});

export default App;
