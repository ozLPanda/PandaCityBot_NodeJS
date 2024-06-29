import Command from '../../engine/commonClasses/Command.js'
import { sendBet } from '../commands/CasinoCommand.js'

export default class CasinoCommandCallback extends Command {
  constructor(bot) {
    super('casino.bet', async (msg, ctx) => {
      let bet = Number(ctx.data.split('/')[1])
      const user = await bot.getUser(msg)

      if (bet == null) {
        await bot.answerCallbackQuery(ctx.id).then(async () => {
          await bot.sendMessage(msg.chat.id, 'Ваша ставка не валидна')
        })
      }
      await bot.answerCallbackQuery(ctx.id).then(async () => {
        await sendBet(bot, msg, user, bet)
      })
    })
  }
}
