import { domElements } from './domElements';
import { getWeatherByCode, handleTimeFormat, getDayOfWeekName } from './utils';

export const displayWeather = (weatherObj, type) => {
  switch (type) {
    case 'current':
      displayCurrentWeather(weatherObj);
      break;
    case 'hourly':
      displayHourlyWeather(weatherObj);
      break;
    case 'daily':
      displayDailyWeather(weatherObj);
      break;
  }
};

export const displayCurrentWeather = (weatherObj) => {
  domElements.currentTemperature.innerHTML = `${Math.round(
    weatherObj.main.temp
  )}&#176;`;
  domElements.currentCity.innerHTML = `${weatherObj.name}, ${weatherObj.sys.country}`;
  domElements.currentWeather.innerHTML = weatherObj.weather['0'].description;
  domElements.todayForecastInner.className = '';
  domElements.todayForecastInner.classList.add(
    'today-forecast__inner',
    `today-forecast--${getWeatherByCode(weatherObj.weather['0'].id)}`
  );
};

export const displayHourlyWeather = (weatherObj) => {
  const weatherList = weatherObj.list.slice(0, 5);

  const innerHTML = weatherList
    .map((weather) => {
      const time = weather.dt_txt.match(/\d{2}:\d{2}/)[0];
      const timeArray = handleTimeFormat(time);
      return `<li class="hourly-forecast__item hourly-forecast__item--${getWeatherByCode(
        weather.weather['0'].id
      )}">
                <p class="temp">${Math.round(weather.main.temp)}&#176;</p>
                <p class="time">${
                  timeArray[0]
                }<br /><span class="period">${timeArray[1].toUpperCase()}</span></p>
              </li>`;
    })
    .join('');

  domElements.hourlyForecastList.innerHTML = innerHTML;
};

export const displayDailyWeather = (weatherObj) => {
  const innerHTML = weatherObj.list
    .filter((weather) => weather.dt_txt.includes('12:00:00'))
    .map((weather) => {
      return `<li class="daily-forecast__item daily-forecast__item--${getWeatherByCode(
        weather.weather['0'].id
      )}">
                <p class="temp">${Math.round(weather.main.temp)}&#176;</p>
                <p class="day">${getDayOfWeekName(
                  weather.dt_txt.substring(0, 10)
                ).substring(0, 3)}</p>
              </li>`;
    })
    .join('');

  domElements.dailyForecastList.innerHTML = innerHTML;
};

export const displayError = (message) => {
  domElements.errorText.innerHTML = message;
  domElements.errorSection.classList.remove('none');
};

export const clearError = () => {
  domElements.cityInput.value = '';
  domElements.errorSection.classList.add('none');
};
