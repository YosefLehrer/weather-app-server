import express from "express";
import {
  getWeather,
  getWeatherLogs,
} from "../controllers/weatherController.js";

const router = express.Router();

router.get("/", getWeather);
router.get("/logs", getWeatherLogs);

export default router;
