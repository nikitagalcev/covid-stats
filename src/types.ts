export interface ICountryCovidData {
  date: string;
  new_cases: number;
  new_deaths: number;
  new_cases_per_million: number;
  stringency_index: number;
  total_cases: number;
  total_deaths: number;
  total_cases_per_million: number;
};

export interface ICountry {
  aged_65_older: number;
  aged_70_older: number;
  cardiovasc_death_rate: number;
  continent: string;
  diabetes_prevalence: number;
  gdp_per_capita: number;
  handwashing_facilities: number;
  hospital_beds_per_thousand: number;
  human_development_index: number;
  life_expectancy: number;
  location: string;
  median_age: number;
  population: number;
  population_density: number;
  data: ICountryCovidData[];
}
