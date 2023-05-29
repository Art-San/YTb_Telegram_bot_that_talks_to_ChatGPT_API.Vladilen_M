import { Telegraf, session } from 'telegraf'
import { message } from 'telegraf/filters'
import { code } from 'telegraf/format'
import config from 'config'
import { ogg } from './ogg.js'
import { openai } from './openai.js'
import { removeFile } from './utils.js'

import {
  initCommand,
  initCommandHelp,
  initCommandUp1,
  initCommandUp2,
  initCommandGetId,
  processTextToChat,
  INITIAL_SESSION,
  arrIdUsers
} from './logic.js'

console.log(config.get('TEST_ENV'))

// const defaultId = ['721836748']

console.log(arrIdUsers)

const bot = new Telegraf(config.get('TELEGRAM_TOKEN'))

bot.use(session())

bot.command('new', initCommand)

bot.command('start', initCommand)

bot.command('help', initCommandHelp)

bot.command('up1', initCommandUp1)

bot.command('up2', initCommandUp2)

bot.command('getId', initCommandGetId)

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

    await processTextToChat(ctx, text)
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

    await processTextToChat(ctx, ctx.message.text)
  } catch (e) {
    console.log('Ошибка при отправке текстового сообщения', e.message)
    await ctx.reply(`Ошибка при отправке текстового сообщения ${e.message}`)
  }
})

bot.launch()

process.prependOnceListener('SIGINT', () => bot.stop('SIGINT'))
process.prependOnceListener('SIGTERM', () => bot.stop('SIGTERM'))
