import config from 'config'
import { GoogleSpreadsheet } from 'google-spreadsheet'

const RESPONSES_SHEET_ID = '1C95uFJ-kRGrG2dQYLMChK-hvZYV0_QpG0kYYgWpBl80' // asava ID_users_telgram_bot


const doc = new GoogleSpreadsheet(RESPONSES_SHEET_ID)

let arrIdUsers = []
const getId = async (id, arrId = ['721836748']) => {

    // use service account creds
    await doc.useServiceAccountAuth({
      client_email: config.get('CLIENT_EMAIL'),
      private_key: config.get('PRIVATE_KEY')
    });
  
    // load the documents info
    await doc.loadInfo()
  
    // Index of the sheet
    let sheet = doc.sheetsByIndex[0]
  
    // Get all the rows
    let rows = await sheet.getRows()
    let arrIdUsers = rows.filter(row => row._id === id).map(row => row.user_id)
  
    // Combine with initial values
    arrIdUsers = [...arrId, ...arrIdUsers]
  
    return arrIdUsers;
  }

  arrIdUsers = await getId('_id')