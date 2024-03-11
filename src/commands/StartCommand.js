import CommandAndAnswer from "../../engine/commonClasses/CommandAndAnswer.js";
import {MainMenuKeyboard} from "../keyboards/MainMenuKeyboard.js";

export default class StartCommand extends CommandAndAnswer {
    constructor(bot) {
        super("/start", async (msg) => {
            if (await this.ifUserExist(bot, msg)) {
                await MainMenuKeyboard.showMainMenu(bot, msg);
            } else {
                await bot.sendMessage(msg.chat.id, "Привет, я твой гид, я помогу тебе достичь высот! Придумай название своему городу");
                bot.regMachineState(msg, this);
            }
        }, async (msg) => {
            try {
                let modelUser = bot.db.models.UserModel;
                await modelUser.defaultCreateUser(msg.chat.id, msg.text);

                await bot.sendMessage(msg.chat.id, "Ваш город успешно создан!");
                await MainMenuKeyboard.showMainMenu(bot, msg);
            } catch (ex) {
                await bot.sendMessage(ex);
            }
        })
    }

    // Если пользователь существует
    async ifUserExist(bot, msg) {
        let model = bot.db.models.UserModel;
        let check = await model.findOne(
            {
                where:
                    {id_chat: msg.chat.id}
            }
        );
        if (check != null)
            return true
        else
            return false
    }
}