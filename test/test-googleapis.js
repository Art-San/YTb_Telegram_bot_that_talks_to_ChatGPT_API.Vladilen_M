// Можно использовать конструкцию try-catch для обработки ошибок 
// внутри функции. В таком случае, если произойдет ошибка, 
// функция вернет значение по умолчанию - массив с одним элементом 
// ['721836748']. Вот пример кода с такой обработкой ошибок:

async function getArrId(arrId = ['721836748']) {
    try {
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: config.get('CLIENT_EMAIL'),
          private_key: config.get('PRIVATE_KEY')
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
      })
  
      const sheets = google.sheets({ version: 'v4', auth })
  
      const range = 'A1:B'
      const spreadsheetId = '1O56QCJRrgbNBI6ZWfdrDAQQLoyaITI2BwY3TFg-N72c'
  
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range
      })
  
      const rows = response.data.values
  
      if (!rows) {
        console.log('Таблица пуста')
        return arrId
      }
  
      let arrIdUsers = rows.map((row) => row[0]).filter((id) => typeof id === 'string')
  
      arrIdUsers = [...arrId, ...arrIdUsers]
  
      return arrIdUsers
    } catch (error) {
      console.log('Ошибка при получении arrIdUsers в функции getArrId', error.message)
      return arrId
    }
  }
  
  arrIdUsers = await getArrId()
  
  console.log(arrIdUsers)

//   Обратите внимание, что при вызове console.log() 
//   внутри функции используется console.log('Error while getting arrIdUsers', error.message), 
//   чтобы вывести более информативное сообщение об ошибке в консоль.




==============   1 вариант работает =======================
// Для получения arrId из Google таблицы,
// вам необходимо выполнить несколько шагов:

// Установите библиотеку googleapis в ваш проект:

// npm install googleapis

// Создайте ключи для своего проекта на Google Cloud Console.

// Создайте сервисный аккаунт и скачайте файл ключа.

// Создайте Google таблицу, в которой будет список доступных пользователей.
// Заполните таблицу данными. Например, первый столбец может содержать id пользователей, а второй столбец - их имена.

// Установите права на чтение таблицы для созданного вами сервисного аккаунта.

// В коде добавьте функцию, которая будет извлекать значения из таблицы и возвращать массив arrId.

// Вот пример кода для получения arrId из Google таблицы:

import { google } from 'googleapis'
import config from 'config'

let arrIdUsers = []
async function getArrId(arrId = ['721836748']) {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: config.get('CLIENT_EMAIL'),
            private_key: config.get('PRIVATE_KEY')
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
    })

    const sheets = google.sheets({ version: 'v4', auth })

    const range = 'A1:B' // диапазон ячеек таблицы, которые мы хотим получить
    const spreadsheetId = '1O56QCJRrgbNBI6ZWfdrDAQQLoyaITI2BwY3TFg-N72c' // id таблицы Googleapis ID_users_telgram_bot

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range
    })

    const rows = response.data.values

    if (!rows) {
        console.log('Таблица пуста')
        return arrId
    }

    let arrIdUsers = rows.map((row) => row[0]).filter((id) => typeof id === 'string') // получаем массив id пользователей

    arrIdUsers = [...arrId, ...arrIdUsers]
  
    return arrIdUsers;
}

arrIdUsers = await getArrId()

console.log(arrIdUsers) // [
//     '11111',
//     '466220524',
//     '2138185861',
//     '5016904767',
//     '5016904768',
//     '501690476712',
//     '50169047655'
//   ]


// Вам необходимо заменить 'ваш id таблицы' на реальный id
// вашей таблицы и добавить в конфигурационный файл параметры
// GOOGLE_CLIENT_EMAIL и GOOGLE_PRIVATE_KEY, содержащие email
// и приватный ключ вашего сервисного аккаунта.


// ======= вАРИАН 2 НЕ ПРОВЕРЯЛ =======

// Для получения данных из ячеек таблицы и записи
// их в массив можно использовать Google Sheets API и библиотеку googleapis для Node.js.

// Перед тем, как начать работу с API,
// необходимо настроить авторизацию и получить ключ доступа.
// Это можно сделать, следуя инструкции
// по ссылке https://developers.google.com/sheets/api/quickstart/nodejs.

// После настройки авторизации можно использовать
// следующий код для получения данных из таблицы:

import { google } from 'googleapis'
import config from 'config'

async function getSpreadsheetData(spreadsheetId, range) {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: config.get('CLIENT_EMAIL'),
            private_key: config.get('PRIVATE_KEY')
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
    })

    const sheets = google.sheets({ version: 'v4', auth })

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range
    })

    const data = response.data.values.flat()

    return data
}

// пример использования
const spreadsheetId = '1RYXy9KnsQ7T9_hYPRgEkmAajxe8W3NwLl_ovwk4raBY'
const range = 'Sheet1!A1:A3'

const userId = await getSpreadsheetData(spreadsheetId, range)
console.log(userId)

// Для получения данных из другого диапазона ячеек нужно изменить значение переменной range.
// Например, чтобы получить данные из ячеек A1, A2, A3 и A4, можно указать range = 'Sheet1!A1:A4'.
