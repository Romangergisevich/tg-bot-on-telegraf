const axios = require("axios");

module.exports = {
  async nbrbCourse() {
    try {
      const url = "https://api.nbrb.by/exrates/rates?periodicity=0";
      const response = await axios.get(url);
    //   console.log(response);
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
