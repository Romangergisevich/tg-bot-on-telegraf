const axios = require("axios");
require("dotenv").config();

module.exports = {
  async nbrbCourse() {
    try {
      const url = process.env.NBRB_URL;
      const response = await axios.get(url);
      return response;
    } catch (e) {
      console.log("Error while nbrb course request.", e.message);
    }
  },

  async findCurrency(arr, currName) {
    try {
      const result = await arr.find(
        (item) => item.Cur_Abbreviation == currName
      );
      return result;
    } catch (e) {
      console.log("Error while trying to find currency name.", e.message);
    }
  },
};
