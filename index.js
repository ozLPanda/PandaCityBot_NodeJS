import Bot from "./classes/Bot.js";
import StartCommand from "./commands/StartCommand.js";
import DataBase from "./classes/DataBase.js";
import UserModel from "./DataBaseModels/UserModel.js";

let API_KEY_BOT = "6249415706:AAHb3aqqUw3IT_FXvqaPt1Qy6YeRgKhEapA";
let bot = new Bot(API_KEY_BOT);

let bd = new DataBase();

bd.authenticate().then(res=>{
    console.log('DataBase connected');
    InitModels(this);
}).catch(ex=>{
    console.error(ex);
});

bot.regCommand(new StartCommand(bot));

bot.on();

function InitModels(_db){
    bot.addModels("Users", new UserModel(_db));
}