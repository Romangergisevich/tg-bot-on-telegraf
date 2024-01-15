const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
const { weatherRequest } = require("./weather.js");
const { nbrbCourse, findCurrency } = require("./nbrb.js");
const moment = require("moment");
require("moment/locale/ru");
const {
  weatherKeyboard,
  infoKeyboard,
  currencyKeyboard,
  removeKeyboard,
} = require("./buttons.js");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.telegram.setMyCommands([
  { command: "start", description: "Начало работы" },
  { command: "info", description: "Информация о моих возможностях" },
  { command: "weather", description: "Погода" },
  { command: "nbrb", description: "Курс валют НБРБ" },
]);

bot.start(async (ctx) => {
  const userName = ctx.update.message.from.first_name;
  await ctx.reply(`Hail to you, ${userName}!`);
  await ctx.reply(
    "Ты можешь ознакомиться с моими возможностями отправив команду /info или нажав на кнопку меню слева от поля ввода сообщений"
  );
});

bot.command("weather", async (ctx) => {
  await ctx.reply(
    "Выбери из представленных вариантов или просто отправь геолокацию",
    weatherKeyboard
  );
});

bot.command("info", async (ctx) => {
  await ctx.reply("Ниже представлены мои текущие возможности", infoKeyboard);
});

bot.command("nbrb", async (ctx) => {
  const course = await nbrbCourse();
  const date = await moment(course.headers.date).locale("ru").format("LLLL");
  await ctx.reply(`Курсы валют на ${date}`, currencyKeyboard);
});

bot.on("callback_query", async (ctx) => {
  const callbackData = ctx.update.callback_query.data;
  const messageId = ctx.update.callback_query.message.message_id;
  const chatId = ctx.chat.id;
  if (callbackData == "weather") {
    await ctx.reply(
      "Выбери из представленных вариантов или просто отправь геолокацию",
      weatherKeyboard
    );
  }
  if (callbackData == "nbrbCourse") {
    const course = await nbrbCourse();
    const date = await moment(course.headers.date).locale("ru").format("LLLL");
    await ctx.telegram.editMessageText(
      chatId,
      messageId,
      0,
      `Курсы валют на ${date}`,
      currencyKeyboard
    );
  }
  if (callbackData == "USD") {
    const course = await nbrbCourse();
    const currName = await findCurrency(course.data, "USD");
    await ctx.reply(
      `${JSON.stringify(currName.Cur_Scale).replace(/"/g, "")} ${JSON.stringify(
        currName.Cur_Name
      ).replace(/"/g, "")} - ${JSON.stringify(
        currName.Cur_OfficialRate.toPrecision(3)
      ).replace(/"/g, "")} Белорусских Рубля`
    );
  }
  if (callbackData == "EUR") {
    const course = await nbrbCourse();
    const currName = await findCurrency(course.data, "EUR");
    await ctx.reply(
      `${JSON.stringify(currName.Cur_Scale).replace(/"/g, "")} ${JSON.stringify(
        currName.Cur_Name
      ).replace(/"/g, "")} - ${JSON.stringify(
        currName.Cur_OfficialRate.toPrecision(3)
      ).replace(/"/g, "")} Белорусских Рубля`
    );
  }
  if (callbackData == "RUB") {
    const course = await nbrbCourse();
    const currName = await findCurrency(course.data, "RUB");
    await ctx.reply(
      `${JSON.stringify(currName.Cur_Scale).replace(/"/g, "")} ${JSON.stringify(
        currName.Cur_Name
      ).replace(/"/g, "")} - ${JSON.stringify(
        currName.Cur_OfficialRate.toPrecision(3)
      ).replace(/"/g, "")} Белорусских Рубля`
    );
  }
  if (callbackData == "CNY") {
    const course = await nbrbCourse();
    const currName = await findCurrency(course.data, "CNY");
    await ctx.reply(
      `${JSON.stringify(currName.Cur_Scale).replace(/"/g, "")} ${JSON.stringify(
        currName.Cur_Name
      ).replace(/"/g, "")} - ${JSON.stringify(
        currName.Cur_OfficialRate.toPrecision(3)
      ).replace(/"/g, "")} Белорусских Рубля`
    );
  }
  if (callbackData == "step_back") {
    await ctx.telegram.editMessageText(
      chatId,
      messageId,
      0,
      `Ниже представлены мои текущие возможности`,
      infoKeyboard
    );
  }
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
