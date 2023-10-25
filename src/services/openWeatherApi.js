import axios from "axios";
const openWeatherApi = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  headers: {
    Accept: "application/json",
  },
});

export const getWeatherData = async (lat, lon) => {
  const weatherData = await openWeatherApi.get(
    `onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${
      import.meta.env.VITE_OPEN_WEATHER_API_KEY
    }`
  );
  // cal current date & time
  const localOffset = new Date().getTimezoneOffset() * 60000;
  const utc = weatherData.data.current.dt * 1000 + localOffset;
  weatherData.data.currentTime = utc + 1000 * weatherData.data.timezone_offset;

  // cal hourly weather offset
  weatherData.data.hourly.forEach((hour) => {
    const utc = hour.dt * 1000 + localOffset;
    hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
  });

  return weatherData.data;
};
