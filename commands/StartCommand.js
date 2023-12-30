import CommandAndAnswer from "../classes/CommandAndAnswer.js";

export default class StartCommand extends CommandAndAnswer {
    constructor(bot) {
        super("/start", async (msg) => {
            await bot.sendMessage(msg.chat.id, "Привет, я твой гид, я помогу тебе достичь высот! Придумай название своему городу");
            bot.regMachineState(msg);
        }, async (msg) => {
            if (msg.text.length > 3) {
                await bot.sendMessage(msg.chat.id, "Название слишком длинное, придумай другое!");
            }else{
                bot.executeCommandModel("Users", "create", {
                    cityName: msg.text,
                    idChat: msg.chat.id,
                    cityInfo: "",
                    adminLvl: 0,
                    money: 20,
                })
            }
        })
    }
}