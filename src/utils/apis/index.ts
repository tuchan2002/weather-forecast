import axios from "axios";

const apiKey = process.env["API_KEY"];

export const getCityByCityName = async (cityName: string) => {
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=&appid=${apiKey}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getWeatherByCity = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${apiKey}&lang=en&units=metric`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getWeatherFiveDayByCity = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=en&units=metric`
    );

    return response.data.list;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentWeatherByCity = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=en&units=metric`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
