import { openai } from './openai.js'
import { googleAPI } from './googleAPI.js'

export const INITIAL_SESSION = {
  messages: []
}

export let arrIdUsers = []

arrIdUsers = await googleAPI.getArrId()

export async function initCommand(ctx) {
  ctx.session = { ...INITIAL_SESSION }
  await ctx.reply('Жду вашего голосового или текстового сообщения')
}

export async function initCommandHelp(ctx) {
  await ctx.reply(
    'пока тут три команды "/start", "/new", "/getId", "/update"-эта не работает'
  )
}

export async function initCommandUp1(ctx) {
  try {
    const userId = String(ctx.message.from.id)
    const nameUser = ctx.message.from.first_name
    if (arrIdUsers.includes(userId)) {
      await ctx.reply(`${nameUser} ваш id: ${userId} уже есть в нашей базе`)
      return
    }
    arrIdUsers.push(userId)
    console.log(arrIdUsers)

    await ctx.reply(`${nameUser} ваш id: ${userId} добавлен в базу`)
  } catch (e) {
    console.error(e)
    await ctx.reply('Ошибка при обновлении данных')
  }
}

export async function initCommandUp2(ctx) {
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
}

export async function initCommandGetId(ctx) {
  try {
    arrIdUsers = await googleAPI.getArrId()
    await ctx.reply(`Массив пользователей: ${arrIdUsers}`)
    console.log(arrIdUsers)
  } catch (e) {
    console.log('Error while getting rows', e.message)
  }
}

export async function processTextToChat(ctx, content) {
  try {
    ctx.session.messages.push({ role: openai.roles.USER, content })

    const response = await openai.chat(ctx.session.messages)

    ctx.session.messages.push({
      role: openai.roles.ASSISTANT,
      content: response.content
    })

    await ctx.reply(response.content)
  } catch (e) {
    console.log('Error while proccesing text to gpt', e.message)
  }
}
