import mongoose from "mongoose";

const weatherLogSchema = new mongoose.Schema({
  region: { type: String, required: true },
  data: { type: Object, required: true },
  timestamp: { type: Date, default: Date.now },
});

const WeatherLog = mongoose.model("WeatherLog", weatherLogSchema);

export default WeatherLog;
