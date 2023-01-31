import { displayWeather, displayError, clearError } from './domHandlers';
import { domElements } from './domElements';
import { handleResponse } from './utils';

// API URL configuration
const GEO_API_URL = 'https://api.openweathermap.org/geo/1.0/';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = '03eee01b4a0dd55879e44806d5f2345b';

export const getCityCoordinates = async (query) => {
  clearError();
  domElements.cityInput.value = '';

  try {
    const response = await fetch(
      `${GEO_API_URL}direct?q=${query}&limit=100&appid=${API_KEY}`
    );

    handleResponse(response);

    const coordinates = await response.json();

    getCurrentWeather(coordinates[0]);
    getDailyWeather(coordinates[0]);
  } catch (err) {
    displayError(err.message);
  }
};

export const getWeather = async (coordinates, url) => {
  const response = await fetch(url);
  const weatherObj = await response.json();

  return weatherObj;
};

export const getCurrentWeather = async (coordinates) => {
  const url = `${WEATHER_API_URL}weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${API_KEY}&units=metric`;
  const weatherObj = await getWeather(coordinates, url);

  displayWeather(weatherObj, 'current');
};

export const getDailyWeather = async (coordinates) => {
  const url = `${WEATHER_API_URL}forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${API_KEY}&units=metric`;
  const weatherObj = await getWeather(coordinates, url);

  displayWeather(weatherObj, 'hourly');
  displayWeather(weatherObj, 'daily');
};
