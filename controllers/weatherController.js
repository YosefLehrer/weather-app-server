import axios from "axios";
import WeatherLog from "../models/WeatherLog.js";

export const getWeather = async (req, res) => {
  try {
    const { region } = req.query;
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${region}`
    );
    const weatherData = response.data;

    const log = new WeatherLog({ region, data: weatherData });
    await log.save();

    res.json(weatherData);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

export const getWeatherLogs = async (req, res) => {
  try {
    const { region } = req.query;
    const logs = await WeatherLog.find({ region })
      .sort({ timestamp: -1 })
      .limit(10);
    res.json(logs);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

export const fetchAndUpdateWeather = async (io) => {
  const regions = await WeatherLog.distinct("region");
  for (const region of regions) {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${region}`
    );
    const weatherData = response.data;

    const log = new WeatherLog({ region, data: weatherData });
    await log.save();

    io.emit("weatherUpdate", { region, data: weatherData });
  }
};
