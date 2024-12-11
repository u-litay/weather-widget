import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { configureStore } from '@reduxjs/toolkit';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.openweathermap.org/data/2.5/'}),
  endpoints: (builder) => ({
    getCurrentWeather: builder.query({
      query: (location) =>
        `weather?q=${location}&appid=e51f52d8f0bf6c7f27d55a39c28f41bf&units=metric`,
    }),
    getForecast: builder.query({
      query: ({ lat, lon }) =>
        `forecast?lat=${lat}&lon=${lon}&appid=e51f52d8f0bf6c7f27d55a39c28f41bf&units=metric`,
    }),
  }),
});

export const { useGetCurrentWeatherQuery, useGetForecastQuery } = weatherApi;