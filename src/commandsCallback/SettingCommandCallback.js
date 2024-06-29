import Command from '../../engine/commonClasses/Command.js'
import CommandAndAnswer from '../../engine/commonClasses/CommandAndAnswer.js'
import { UserSettings } from '../classes/UserSettings.js'

export default class SettingsBuyCountCommandCallback extends CommandAndAnswer {
  constructor(bot) {
    super(
      'settings.buyCount',
      async (msg, ctx) => {
        await bot.sendMessage(msg.chat.id, 'Напиши мне кол-во зданий, сколько бы ты хотел купить')
        await bot.answerCallbackQuery(ctx.id)
        bot.regMachineState(msg, this)
      },
      async (msg) => {
        let count = Number(msg.text)
        if (!isNaN(count)) {
          let user = await bot.getUser(msg)
          let settings = new UserSettings(user.settings)
          settings.buyCount = count
          user.settings = settings.getJSON()
          await user.save()
          await bot.sendMessage(msg.chat.id, `Вы установили покупку зданий ${count} шт`)
        } else {
          await bot.sendMessage(msg.chat.id, 'Вы ввели не корректное число')
        }
      }
    )
  }
}
