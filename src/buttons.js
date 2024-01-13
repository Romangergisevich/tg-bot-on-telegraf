module.exports = {
  weatherKeyboard: {
    reply_markup: JSON.stringify({
      resize_keyboard: true,
      keyboard: [
        [
          { text: "Погода в Бресте" },
          { text: "Погода в геолокации", request_location: true },
        ],
      ],
    }),
  },

  infoKeyboard: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          { text: "Погода", callback_data: "weather" },
          { text: "empty", callback_data: "empty" },
        ],
      ],
    }),
  },

  removeKeyboard: {
    reply_markup: JSON.stringify({
      remove_keyboard: true,
    }),
  },
};
