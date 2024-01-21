import Bot from "./classes/Bot.js";
import StartCommand from "./commands/StartCommand.js";
import DataBase from "./classes/DataBase.js";

let API_KEY_BOT = "6249415706:AAHb3aqqUw3IT_FXvqaPt1Qy6YeRgKhEapA";
let bot = new Bot(API_KEY_BOT);

let db = new DataBase();

await db.authenticate().then(async res=>{
    console.log('DataBase connected');
    bot.db = db;
}).catch(ex=>{
    console.error(ex);
});


bot.regCommand(new StartCommand(bot));
bot.on();