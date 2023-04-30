import { google } from 'googleapis';
import config from 'config';

class GoogleAPI {
  constructor(clientEmail, privateKey) {
    this.auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
    this.sheets = google.sheets({ version: 'v4', auth: this.auth });
  }

  async getArrId(defaultId = ['721836748']) {
    try {
      const range = 'A2:B';
      const spreadsheetId = '1O56QCJRrgbNBI6ZWfdrDAQQLoyaITI2BwY3TFg-N72c' // Googleapis ID_users_telgram_bot

      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });

      const rows = response.data.values;

      if (!rows) {
        console.log('Таблица пуста');
        return defaultId;
      }

      let arrIdUsers = rows.map((row) => row[0]).filter((id) => typeof id === 'string');

      arrIdUsers = [...defaultId, ...arrIdUsers];

      return arrIdUsers;
    } catch (error) {
      console.log('Ошибка при получении arrIdUsers в функции getArrId', error.message);
      return defaultId;
    }
  }
}

export const googleAPI = new GoogleAPI(config.get('CLIENT_EMAIL'), config.get('PRIVATE_KEY'));
