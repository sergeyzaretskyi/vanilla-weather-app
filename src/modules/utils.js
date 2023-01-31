export const getWeatherByCode = (code) => {
  switch (true) {
    case code >= 200 && code <= 232:
      return 'thunderstorm';
    case (code >= 300 && code <= 321) ||
      code === 520 ||
      code === 521 ||
      code === 522 ||
      code === 531:
      return 'shower-rain';
    case code >= 500 && code <= 504:
      return 'rain';
    case code === 511 || (code >= 600 && code <= 622):
      return 'snow';
    case code >= 701 && code <= 781:
      return 'mist';
    case code === 800:
      return 'clear-sky';
    case code === 801:
      return 'few-clouds';
    case code === 802:
      return 'scattered-clouds';
    case code === 803 || code === 804:
      return 'broken-clouds';
    default:
      return null;
  }
};

export const handleTimeFormat = (time) => {
  const date = new Date(`1970-01-01 ${time}`);
  const hours = date.getUTCHours() % 12 || 12;
  const ampm = date.getUTCHours() >= 12 ? 'pm' : 'am';

  return [`${hours}:00`, ampm];
};

export const handleResponse = (response) => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
};

export const getDayOfWeekName = (dateString) => {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const date = new Date(dateString.substring(0, 10));
  const dayOfWeek = date.getDay();
  const dayOfWeekName = daysOfWeek[dayOfWeek];

  return dayOfWeekName;
};
