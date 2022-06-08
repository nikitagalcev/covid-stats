import statMockJSON from '../owid-covid-data.json';

const COVID_DATA_ENDPOINT: string = 'https://covid.ourworldindata.org/data/owid-covid-data.json';

// console.log({ statMockJSON });

export const getCovidDataRequest = async () => {
  // const response = await fetch(getCovidDataEndpoint);

  return statMockJSON;

  // if (response.ok) {
  //   const responseJson = await response.json();

  //   return responseJson;
  // }

  // throw new Error("Something bad happend while fetching 127mb of JSON, try again");
};
