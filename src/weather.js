const axios = require("axios");

module.exports = {
  async weatherRequest(lat, long) {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=b14e69a74786d8e6191dd31323bd1cc0`;
      const response = await axios.get(url);
      return response;
    } catch (e) {
      console.log("Error while weather request", e.message);
    }
  },
};
