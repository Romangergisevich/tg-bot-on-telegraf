const { Telegraf } = require("telegraf");
// const { message } = require("telegraf/filters");
const { weatherRequest } = require("./weather.js");
const {
  weatherKeyboard,
  removeKeyboard,
  infoKeyboard,
} = require("./buttons.js");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.telegram.setMyCommands([
  { command: "start", description: "Начало работы" },
  { command: "info", description: "Информация о моих возможностях" },
  { command: "weather", description: "Погода" },
]);

bot.start((ctx) => ctx.reply("Hail, brother!"));

bot.command("weather", async (ctx) => {
  await ctx.reply(
    "Выбери из представленных вариантов или просто отправь геолокацию",
    weatherKeyboard
  );
});

bot.command("info", async (ctx) => {
  await ctx.reply("Нижее представлены мои текущие возможности", infoKeyboard);
});

bot.on("callback_query", async (ctx) => {
  const callbackData = ctx.update.callback_query.data;
  if (callbackData == "weather") {
    await ctx.reply(
      "Выбери из представленных вариантов или просто отправь геолокацию",
      weatherKeyboard
    );
  }
  await console.log(callbackData);
});

bot.on("message", async (ctx) => {
  const text = ctx.update.message.text;
  const location = ctx.update.message.location;
  if (text == "Погода в Бресте") {
    const lat = 52.0975;
    const long = 23.6877;
    const response = await weatherRequest(lat, long);
    ctx.reply(
      `На данный момент погода в ${
        response.data.name
      } выглядит так. Температура воздуха: ${Math.floor(
        response.data.main.temp - 273.15
      )} ℃. Ощущается как ${Math.floor(
        response.data.main.feels_like - 273.15
      )} ℃. Скорость ветра: ${response.data.wind.speed} м/с. Влажность: ${
        response.data.main.humidity
      }%.`,
      removeKeyboard
    );
  }
  if (location) {
    const lat = location.latitude;
    const long = location.longitude;
    const response = await weatherRequest(lat, long);
    ctx.reply(
      `На данный момент погода в ${
        response.data.name
      } выглядит так. Температура воздуха: ${Math.floor(
        response.data.main.temp - 273.15
      )} ℃. Ощущается как ${Math.floor(
        response.data.main.feels_like - 273.15
      )} ℃. Скорость ветра: ${response.data.wind.speed} м/с. Влажность: ${
        response.data.main.humidity
      }%.`,
      removeKeyboard
    );
  }
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
