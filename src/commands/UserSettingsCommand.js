import Command from '../../engine/commonClasses/Command.js'
import LoginMiddleware from '../middleware/LoginMiddleware.js'
import inlineButtons from '../../engine/commonClasses/InlineButtons.js'

export default class UserSettingsCommand extends Command {
  constructor(bot) {
    super('📝Настройки', async (msg) => {
      const arr_btn = [
        {
          text: 'Кол-во покупаемых зданий',
          callback_data: 'settings.buyCount'
        }
      ]
      await bot.sendMessage(msg.chat.id, 'Настройки', new inlineButtons(arr_btn))
    })
    this.middlewares.push(new LoginMiddleware(bot))
  }
}
