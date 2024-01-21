import CommandAndAnswer from "../classes/CommandAndAnswer.js";
import UserModel from "../DataBaseModels/UserModel.js";

export default class StartCommand extends CommandAndAnswer {
    constructor(bot) {
        super("/start", async (msg) => {
            await bot.sendMessage(msg.chat.id, "Привет, я твой гид, я помогу тебе достичь высот! Придумай название своему городу");
            bot.regMachineState(msg, this);
        }, async (msg) => {
            try {
                let modelUser = bot.db.models.UserModel;
                await modelUser.defaultCreateUser(msg.chat.id, msg.text);
            }catch (ex){
                await bot.sendMessage(ex);
            }
        })
    }
}