import Bot from "./engine/commonClasses/Bot.js";
import StartCommand from "./src/commands/StartCommand.js";
import DataBase from "./src/classes/DataBase.js";
import BuildMenuCommand from "./src/commands/BuildMenuCommand.js";
import BuildMenuBuyCommandCallback from "./src/commandsCallback/BuildMenuBuyCommandCallback.js";
import BuildItemsModel from "./src/dataBaseModels/BuildItemsModel.js";
import BuildCategoryModel from "./src/dataBaseModels/BuildCategoryModel.js";
import InfoCityCommand from "./src/commands/InfoCityCommand.js";
import addServices from "./src/functions/addServices.js";

let API_KEY_BOT = "6249415706:AAHb3aqqUw3IT_FXvqaPt1Qy6YeRgKhEapA";
let bot = new Bot(API_KEY_BOT);

let db = new DataBase();

BuildItemsModel.hasOne(BuildCategoryModel, {as: "Category", foreignKey: "id"});

await db.authenticate().then(async res=>{
    console.log('DataBase connected');
    bot.db = db;
}).catch(ex=>{
    console.error(ex);
});

// Запуск и регистрация сервисов
addServices(bot);

// Список команд бота
bot.regCommand(new StartCommand(bot));
bot.regCommand(new BuildMenuCommand(bot));
bot.regCommand(new InfoCityCommand(bot));

// Список команд под callback
bot.regCallbackCommand(new BuildMenuBuyCommandCallback(bot));

bot.setMyCommands([
    {
        command: "/start",
        description: "Запустить бота"
    },
])

bot.on();