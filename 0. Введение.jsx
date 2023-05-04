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

// 1.создаем такой фаил
// Dockerfile

// FROM node:16-alpine

// WORKDIR /app

// COPY package*.json ./

// RUN npm ci

// COPY . .

// ENV PORT=3000

// EXPOSE $PORT

// CMD ["npm", "start"]

// 2. в терменале
docker -v
// "docker build -t bottelgpt ." собираем образ из инструкции Dockerfile// bottelgpt -- Это имя

// 2.1 чтобы упростить создаем в корне проэкта Makefile
// build:
//   docker build -t bottelgpt .

// run:
//   docker run -d -p 3000:3000 --name bottelgpt --rm bottelgpt
//   docker run -d -p 3000:3000 --name bottelgpt_1 --rm bottelgpt_1

// 4. docker images // bottelgpt    latest    c9205665efab   31 minutes ago   573MB

// 0. docker stop bottelgpt // на предыдущем шаге увилел IMAGE стоп не понадобился

// 6. docker run -d -p 3000:3000 --name bottel --rm bottelgpt // тут какието непонятки bottel --rm bottelgpt с именами
// // .. все запустилось и работало

// 7. docker stop bottelgpt
// 7. docker stop bottelgpt_1

// docker logs bottelgpt_1



//===============================================

// ssh root@45.141.78.244
// 1. ls

// 2. git -v
//    docker -v

// 3. если нет гита
// apt install git

// 4. копируем с гита
// git clone https://github.com/Art-San/YTb_Telegram_bot_that_talks_to_ChatGPT_API.Vladilen_M.git

// 5. Теперь смотрим и видем скопированный репозиторий
// ls --- snap  clone

// 6. Переходим в нее
// cd YTb_MERN-Blog_2022_

// 7. Если посмотрим в ней
// ls --- '0. Введение.jsx'   Dockerfile     package-lock.json   voices ( 0.dop-- это лишнее)
// config             package.json   src

// 8. Переходим в config
// cd config // и там не хрена нет. ключи переносим руками
===================================================
// 9. Создаем production.json
// touch production.json
// проверяем ls // kepp  production.json

ЗАШЕЛ НА ХОСТИНГ vps НАШЕЛ ПАПКУ root И ТАМ "КЛОН"

// 10. 
//. РЕДАКТИРОВАТЬ
// ---- nano ----
// nano production.json
// ctrl + SHIFT + V // вставить 
// CTRL + O // СОХРОНИТЬ ВСТАВЛЕНОЕ
// заием нажать ENTER
// CTRL + X // выход из нано
// Заходим еще раз nano production.json СМОТРИМ все ЛИ на месте

alt+shift+v  вставить 
====================================================


// 11. выходим на вверх
// cd ..

// 12. docker build -t bottelgpt .

// 13. docker run -d -p 3000:3000 --name bottelgpt --rm bottelgpt

// 14. docker images
// REPOSITORY   TAG       IMAGE ID       CREATED         SIZE
// bottelgpt    latest    326f73de704b   3 minutes ago   220MB

// 15. docker run -d -p 3000:3000 --name bottelgpt --rm bottelgpt

// 16. docker logs bottelgpt // смотрим запускается ли контейнер

// ls


// ПОЛУЧИЛОСЬ ПОЛУЧИТЬ ДАННЫЕ
// npm i google-spreadsheet
// https://www.youtube.com/watch?v=9tD0YmfGZ1s
//https://github.com/RajKKapadia/Youtube-GoogleSheet-NodeJS

// еще видео из формы в гугл табицу
// https://www.youtube.com/watch?v=ZA6j2PhXSUg&t=205s
