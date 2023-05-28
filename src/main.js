import { Telegraf, session } from 'telegraf'
import { message } from 'telegraf/filters'
import { code } from 'telegraf/format'
import config from 'config'
import { ogg } from './ogg.js'
import { openai } from './openai.js'
import { removeFile } from './utils.js'

// import { googleAPI } from './googleAPI.js' // 20/05/23
import {
  initCommand,
  initCommandHelp,
  initCommandUp1,
  processTextToChat,
  INITIAL_SESSION,
  arrIdUsers
} from './logic.js'

console.log(config.get('TEST_ENV'))

// const defaultId = ['721836748']
// let arrIdUsers = [] // 20/05/23

// arrIdUsers = await googleAPI.getArrId() // 20/05/23

console.log(arrIdUsers)

// const INITIAL_SESSION = { // 20/05/23
//     messages: []
// }

const bot = new Telegraf(config.get('TELEGRAM_TOKEN'))

bot.use(session())

bot.command('new', initCommand)
// bot.command('new', async (ctx) => { // 20/05/23
//   ctx.session = { ...INITIAL_SESSION }
//   await ctx.reply('Жду вашего голосового или текстового сообщения')
// })
bot.command('start', initCommand)
// bot.command('start', async (ctx) => { // 20/05/23
//   ctx.session = INITIAL_SESSION
//   await ctx.reply('Жду вашего голосового или текстового сообщения')
// })
bot.command('help', initCommandHelp)
// bot.command('help', async (ctx) => { // 20/05/23
//   await ctx.reply(
//     'пока тут три команды "/start", "/new", "/getId", "/update"-эта не работает'
//   )
// })

bot.command('up1', initCommandUp1)
// bot.command('up1', async (ctx) => { // 20/05/23
//   try {
//     const userId = String(ctx.message.from.id)
//     const nameUser = ctx.message.from.first_name
//     if (arrIdUsers.includes(userId)) {
//       await ctx.reply(`${nameUser} ваш id: ${userId} уже есть в нашей базе`)
//       return
//     }
//     arrIdUsers.push(userId)
//     console.log(arrIdUsers)

//     await ctx.reply(`${nameUser} ваш id: ${userId} добавлен в базу`)
//   } catch (e) {
//     console.error(e)
//     await ctx.reply('Ошибка при обновлении данных')
//   }
// })

bot.command('up2', async (ctx) => {
  try {
    const userId = String(ctx.message.from.id)
    const nameUser = ctx.message.from.first_name
    if (arrIdUsers.includes(userId)) {
      await ctx.reply(`${nameUser} ваш id: ${userId} уже есть в нашей базе`)
      await ctx.reply(`Массив пользователей: ${arrIdUsers}`)
      return
    }
    console.log(arrIdUsers)

    await ctx.reply(`${nameUser} вашего id: ${userId} нет в базе `)
  } catch (e) {
    console.error(e)
    await ctx.reply('Ошибка при обновлении данных')
  }
})

bot.command('getId', async (ctx) => {
  try {
    arrIdUsers = await googleAPI.getArrId()
    await ctx.reply(`Массив пользователей: ${arrIdUsers}`)
    console.log(arrIdUsers)
  } catch (e) {
    console.log('Error while getting rows', e.message)
  }
})

bot.on(message('voice'), async (ctx) => {
  ctx.session ??= INITIAL_SESSION
  try {
    await ctx.reply(code('Сообщение принято Жду ответ от сервера...'))
    const link = await ctx.telegram.getFileLink(ctx.message.voice.file_id)
    const userId = String(ctx.message.from.id)

    if (!arrIdUsers.includes(userId)) {
      await ctx.reply(
        `У вас нет доступа, так как вашего id: ${ctx.message.from.id} нет в нашей базе`
      )
      return
    }

    const oggPath = await ogg.create(link.href, userId)
    const mp3Path = await ogg.toMp3(oggPath, userId)

    removeFile(oggPath)

    const text = await openai.transcription(mp3Path)
    await ctx.reply(code(`Ваш запрос: ${text}`))

    ctx.session.messages.push({ role: openai.roles.USER, content: text })

    const response = await openai.chat(ctx.session.messages)

    ctx.session.messages.push({
      role: openai.roles.ASSISTANT,
      content: response.content
    })

    await ctx.reply(response.content)
  } catch (e) {
    console.log('Ошибка во время голосового сообщения', e.message)
    await ctx.reply(`Ошибка во время голосового сообщения ${e.message}`)
  }
})

bot.on(message('text'), async (ctx) => {
  ctx.session ??= INITIAL_SESSION
  try {
    await ctx.reply(code('Сообщение принято Жду ответ от сервера...'))

    const userId = String(ctx.message.from.id)
    if (!arrIdUsers.includes(userId)) {
      await ctx.reply(
        `У вас нет доступа, так как вашего id: ${ctx.message.from.id} нет в нашей базе`
      )
      return
    }

    ctx.session.messages.push({
      role: openai.roles.USER,
      content: ctx.message.text
    })

    const response = await openai.chat(ctx.session.messages)

    ctx.session.messages.push({
      role: openai.roles.ASSISTANT,
      content: response.content
    })

    await ctx.reply(response.content)
  } catch (e) {
    console.log('Ошибка при отправке текстового сообщения', e.message)
    await ctx.reply(`Ошибка при отправке текстового сообщения ${e.message}`)
  }
})

bot.launch()

process.prependOnceListener('SIGINT', () => bot.stop('SIGINT'))
process.prependOnceListener('SIGTERM', () => bot.stop('SIGTERM'))
