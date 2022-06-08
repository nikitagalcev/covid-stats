import { useState, useEffect } from "react";
import { getCovidDataRequest } from "../api";
import { ICountry } from "../types";

const useFetchCovidStats = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [covidData, setCovidData] = useState<Map<ICountry['location'], ICountry>>(new Map());
  const [defaultCountry, setDefaultCountry] = useState<ICountry>()

  useEffect(() => {
    getCovidDataRequest()
      .then((res) => {
        
        const covidDataValuesMap = new Map<ICountry['location'], ICountry>( 
          Object.values(res)
            .map((country: ICountry) => [country.location, country])
          );

        setCovidData(covidDataValuesMap);

        const defaultCountry = covidDataValuesMap.get('International')!;
  
        setDefaultCountry(defaultCountry)

      }).finally(() => setIsLoading(false)); // todo add catch
  }, []);

  return { isLoading, covidData, defaultCountry }
};

export default useFetchCovidStats;
