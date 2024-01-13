const axios = require("axios");
require("dotenv").config();

module.exports = {
  async weatherRequest(lat, long) {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.WEATHER_TOKEN}`;
      const response = await axios.get(url);
      return response;
    } catch (e) {
      console.log("Error while weather request.", e.message);
    }
  },
};
