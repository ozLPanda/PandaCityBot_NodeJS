import Bot from "./engine/commonClasses/Bot.js";
import StartCommand from "./src/commands/StartCommand.js";
import DataBase from "./src/classes/DataBase.js";
import BuildMenuCommandCallback from "./src/commandsCallback/BuildMenuCommandCallback.js";
import BuildMenuBuyCommandCallback from "./src/commandsCallback/BuildMenuBuyCommandCallback.js";

let API_KEY_BOT = "6249415706:AAHb3aqqUw3IT_FXvqaPt1Qy6YeRgKhEapA";
let bot = new Bot(API_KEY_BOT);

let db = new DataBase();

await db.authenticate().then(async res=>{
    console.log('DataBase connected');
    bot.db = db;
}).catch(ex=>{
    console.error(ex);
});

// Список команд бота
bot.regCommand(new StartCommand(bot));

// Список команд под callback
bot.regCallbackCommand(new BuildMenuCommandCallback(bot));
bot.regCallbackCommand(new BuildMenuBuyCommandCallback(bot));

bot.on();