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
          { text: "Курс валют НБРБ", callback_data: "nbrbCourse" },
        ],
      ],
    }),
  },

  currencyKeyboard: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          { text: "Курс Доллара США (USD)", callback_data: "USD" },
          { text: "Курс Евро (EUR)", callback_data: "EUR" },
        ],
        [
          { text: "Курс Рубля (RUB)", callback_data: "RUB" },
          { text: "Курс Китайских юаней (CNY)", callback_data: "CNY" },
        ],
        [{ text: "Назад", callback_data: "step_back" }],
      ],
    }),
  },

  removeKeyboard: {
    reply_markup: JSON.stringify({
      remove_keyboard: true,
    }),
  },
};
