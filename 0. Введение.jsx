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
// "docker build -t bottelgpt ." собираем образ из инструкции Dockerfile// bottelgpt -- Это имя

// 3. чтобы упростить создаем в корне проэкта Makefile
// build:
//   docker build -t bottelgpt .

// run:
//   docker run -d -p 3000:3000 --name bottelgpt --rm bottelgpt

// make run
// make build
// make run
// make build
// 3 пункт както не так сработал

// 4. docker images

// 5. docker stop bottelgpt

// 6. docker run -d -p 3000:3000 --name bottel --rm bottelgpt // тут какието непонятки bottel --rm bottelgpt с именами
// // .. все запустилось и работало

// 7. docker stop bottel // "bottel" обрати внимание

//===============================================


// ssh root@45.00000000
1. ls 

2. git -v

3. если нет гита 
// apt install git

4. копируем с гита
// git clone https://github.com/Art-San/YTb_MERN-Blog

5. Теперь смотрим и видем скопированный репозиторий 
// ls --- snap  clone

6. Переходим в нее
// cd YTb_MERN-Blog_2022_

7. Если посмотрим в ней 
// ls --- '0. Введение.jsx'   Dockerfile     package-lock.json   voices ( 0.dop-- это лишнее)
// config             package.json   src

8. Переходим в config
cd config // и там не хрена нет. ключи переносим руками

9. Создаем production.json
touch production.json

10. заходим в нуторь
nano production.json 
// вставляем ключи

11. выходим на вверх
cd ..

12. docker build -t bottelgpt .

13. docker run -d -p 3000:3000 --name bottelgpt --rm bottelgpt

14. docker images
REPOSITORY   TAG       IMAGE ID       CREATED         SIZE
bottelgpt    latest    326f73de704b   3 minutes ago   220MB

15. docker run -d -p 3000:3000 --name bottelgpt --rm bottelgpt

16. docker logs bottelgpt // смотрим запускается ли контейнер

ls