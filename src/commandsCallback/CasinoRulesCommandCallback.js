import Command from '../../engine/commonClasses/Command.js'
import LoginMiddleware from '../middleware/LoginMiddleware.js'

export default class CasinoRulesCommandCallback extends Command {
  constructor(bot) {
    super('access.casino.rules', async (msg) => {
      const user = await bot.getUser(msg)
      user.use_casino = true
      await user.save()
      await bot.sendMessage(msg.chat.id, 'Теперь вы можете использовать казино!\nУдачных круток')
    })
    this.middlewares.push(new LoginMiddleware(bot))
  }
}
