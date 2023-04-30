// Напиши проверку внутри этой команды.
// Если внутри arrIdUsers уже есть элемент равный ctx.message.from.id 
// то выводится сообщение ваше ID уже есть в наше базе

bot.command('update', async (ctx) => {
    try {
      const userId = String(ctx.message.from.id);
      if (arrIdUsers.includes(userId)) {
        await ctx.reply(`Ваш ID уже есть в нашей базе`);
        return;
      }
      arrIdUsers.push(userId);
      console.log(arrIdUsers);
      await ctx.reply(`Добовляю ваш `);
    } catch (e) {
      console.error(e);
      await ctx.reply('Ошибка при обновлении данных');
    }
})

// Таким образом, мы сначала проверяем, содержит ли массив arrIdUsers ID пользователя, 
// который инициировал команду.
//  Если содержит, мы выводим сообщение об ошибке и прерываем выполнение функции. 
//  Если нет, мы добавляем ID пользователя в массив и продолжаем выполнение функции.