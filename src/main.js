import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'
import config from 'config'
import { ogg } from './ogg.js'

const bot = new Telegraf(config.get('TELEGRAM_TOKEN'))

bot.on(message('voice'), async (ctx) => {
    try {
        const link = await ctx.telegram.getFileLink(ctx.message.voice.file_id)
        const userId = String(ctx.message.from.id)
        console.log(link.href)
        const oggPath = await ogg.create(link.href, userId)
        await ctx.reply(JSON.stringify(link, null, 2))
    } catch (e) {
        console.log('Error while voice massage', e.message)
    }
})

bot.command('start', async (ctx) => {
    await ctx.reply(JSON.stringify(ctx.message, null, 2))
})

bot.launch()

process.prependOnceListener('SIGINT', () => bot.stop('SIGINT'))
process.prependOnceListener('SIGTERM', () => bot.stop('SIGTERM'))
