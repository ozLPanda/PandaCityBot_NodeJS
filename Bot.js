import Bot from './engine/commonClasses/Bot.js'
import DataBase from './src/classes/DataBase.js'
import addServices from './src/functions/addServices.js'
import {
  StartCommand,
  BuildMenuCommand,
  InfoCityCommand,
  PaydayCommand,
  RatingCommand,
  UserSettingsCommand,
  JobsCommand,
  AdminCheckPaydayBuildItems,
  CasinoCommand
} from './src/commands/index.js'
import {
  SettingsBuyCountCommandCallback,
  BuildMenuBuyCommandCallback,
  JobCommandCallback,
  CasinoRulesCommandCallback,
  CasinoCommandCallback
} from './src/commandsCallback/index.js'

let start_time = new Date()
console.log('Bot loading...')

//prod - 5986324391:AAFuSQ20dkzU-Z3I4wdtL9OpsIOTGpW_slQ   |  dev - 6249415706:AAHb3aqqUw3IT_FXvqaPt1Qy6YeRgKhEapA

let API_KEY_BOT = '6249415706:AAHb3aqqUw3IT_FXvqaPt1Qy6YeRgKhEapA'
let admin_chat = -4101189130
let bot = new Bot(API_KEY_BOT, admin_chat)

// bot.setTimeUpdateServices(3000);

let debug_mode = false

let db = new DataBase(debug_mode)

await db
  .authenticate()
  .then(async (res) => {
    console.log('DataBase connected')
    bot.db = db
  })
  .catch((ex) => {
    console.error(ex)
  })

// Запуск и регистрация сервисов
addServices(bot)

// Список команд бота
bot.regCommand(new StartCommand(bot))
bot.regCommand(new BuildMenuCommand(bot))
bot.regCommand(new InfoCityCommand(bot))
bot.regCommand(new PaydayCommand(bot))
bot.regCommand(new JobsCommand(bot))
bot.regCommand(new RatingCommand(bot))
bot.regCommand(new AdminCheckPaydayBuildItems(bot))
bot.regCommand(new UserSettingsCommand(bot))
bot.regCommand(new CasinoCommand(bot))

// Список команд под callback
bot.regCallbackCommand(new BuildMenuBuyCommandCallback(bot))
bot.regCallbackCommand(new JobCommandCallback(bot))
bot.regCallbackCommand(new SettingsBuyCountCommandCallback(bot))
bot.regCallbackCommand(new CasinoRulesCommandCallback(bot))
bot.regCallbackCommand(new CasinoCommandCallback(bot))

bot.setMyCommands([
  {
    command: '/start',
    description: 'Запустить бота'
  }
])

bot.on()

console.log(`Bot started ${+new Date() - start_time}ms`)
