import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface CurrentWeatherResponse {
  coord: {
      lon: number;
      lat: number; 
  };
  weather: {
      id: number; 
      main: string; 
      description: string; 
      icon: string; 
  }[];
  base: string; 
  main: {
      temp: number;
      feels_like: number; 
      temp_min: number;
      temp_max: number;
      pressure: number; 
      humidity: number; 
      sea_level: number;
      grnd_level: number;
  };
  visibility: number;
  wind: {
      speed: number;
      deg: number;
      gust: number;
  };
  snow: {
      '1h': number;
  };
  clouds: {
      all: number;
  };
  dt: number; 
  sys: {
      country: string;
      sunrise: number;
      sunset: number; 
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface ForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: {
      dt: number;
      main: {
          temp: number;
          feels_like: number;
          temp_min: number;
          temp_max: number;
          pressure: number;
          sea_level: number;
          grnd_level: number;
          humidity: number;
          temp_kf: number;
      };
      weather: {
          id: number;
          main: string;
          description: string;
          icon: string;
      }[];
      clouds: {
          all: number;
      };
      wind: {
          speed: number;
          deg: number;
          gust: number;
      };
      visibility: number;
      pop: number;
      snow?: {
          '3h': number;
      };
      sys: {
          pod: string;
      };
      dt_txt: string;
  }[];
  city: {
      id: number;
      name: string;
      coord: {
          lat: number;
          lon: number;
      };
      country: string;
      population: number;
      timezone: number;
      sunrise: number;
      sunset: number;
  };
}

interface GetForecastQuery {
  lat: number;
  lon: number;
}

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.openweathermap.org/data/2.5/',
  }),
  endpoints: (builder) => ({
    getCurrentWeather: builder.query<CurrentWeatherResponse, string>({
      query: (location) =>
        `weather?q=${location}&appid=e51f52d8f0bf6c7f27d55a39c28f41bf&units=metric`,
    }),
    getForecast: builder.query<ForecastResponse, GetForecastQuery>({
      query: ({ lat, lon }) =>
        `forecast?lat=${lat}&lon=${lon}&appid=e51f52d8f0bf6c7f27d55a39c28f41bf&units=metric`,
    }),
  }),
});

export const { useGetCurrentWeatherQuery, useGetForecastQuery } = weatherApi;