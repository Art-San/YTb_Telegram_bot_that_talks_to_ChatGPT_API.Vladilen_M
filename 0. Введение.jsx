// ================  ВАЖНО ======================
// на гите не будет хватать двух папок
// 1. config/default.json
// {
//     "TELEGRAM_TOKEN": "???????",
//     "OPENAI_KEY": "???????"
// }

// 2. voices/ внутри фаил заглушки "keep", и аудио в mp3

// ===============================================================

// npm init -y // node.js

// npm i -D nodemon cross-env

// {
//     "name": "ytb_telegram_bot_that_talks_to_chatgpt_api.vladilen_m",
//     "version": "1.0.0",
//     "description": "",
//     "main": "index.js",
//     "type": "module",  // для использования современого синтаксиса ИМПОРТА и ЭКСПОРТА
//     "scripts": {
//         "dev": "nodemon ./src/main.js",
//         "start": "node ./src/main.js"
//     },
//     "keywords": [],
//     "author": "",
//     "license": "ISC",
//     "dependencies": {
//         "cross-env": "^7.0.3",
//         "nodemon": "^2.0.22"
//     }
// }

// Базовая настройка готова
// Далее

// npm i telegraf
// npm i config

// npm i axios fluent-ffmpeg @ffmpeg-installer/ffmpeg

// npm i openai
// npm i openai

// https://slc.tl/8buc3

// Облачный сервер для телеграм-бота: https://slc.tl/8buc3

// 00:00 - О чем видео
// 02:08 - Про опыт работы с ChatGPT
// 03:47 - Создание Telegram бота
// 14:45 - Конвертация голосового сообщения
// 39:38 - Работа с OpenAI API
// 1:00:00 - Добавление Telegraf сессии
// 1:08:25 - Добавляем Git & Docker
// 1:19:36 - Деплой бота на VPS

// репо сделал приватным

// .gitignore  от Владилена
// .idea
// node_modules
// config/default.json
// config/production.json
// .vscode

// Dockerfile // создаем такой фаил

// FROM node:16-alpine

// WORKDIR /app

// COPY package*.json ./

// RUN npm ci

// COPY . .

// ENV PORT=3000

// EXPOSE $PORT

// CMD ["npm", "start"]
