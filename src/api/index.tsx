const COVID_DATA_ENDPOINT: string = 'https://covid.ourworldindata.org/data/owid-covid-data.json';

export const getCovidDataRequest = async () => {
  const response = await fetch(COVID_DATA_ENDPOINT);

  if (response.ok) {
    const responseJson = await response.json();

    return responseJson;
  }

  throw new Error('Something bad happend while fetching 127mb of JSON, try again');
};
