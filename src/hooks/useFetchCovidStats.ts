import { useState, useEffect } from 'react';
import { getCovidDataRequest } from '../api';
import { ICountry } from '../types';

const useFetchCovidStats = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [covidData, setCovidData] = useState<Map<ICountry['location'], ICountry>>(new Map());
  const [defaultCountry, setDefaultCountry] = useState<ICountry>()

  useEffect(() => {
    getCovidDataRequest()
      .then((res: Record<string, ICountry>) => {

        const covidDataValuesMap = new Map<ICountry['location'], ICountry>( 
          Object.values(res)
            .map((country: ICountry) => [country.location, country])
          );

        setCovidData(covidDataValuesMap);

        const defaultCountry = covidDataValuesMap.get('International')!;
  
        setDefaultCountry(defaultCountry);
      })
      .catch((err) => console.error('blablabla some stupid error', err))
      .finally(() => setIsLoading(false));
  }, []);

  return { isLoading, covidData, defaultCountry }
};

export default useFetchCovidStats;
