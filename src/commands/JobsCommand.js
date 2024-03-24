import Command from "../../engine/commonClasses/Command.js";
import inlineButtons from "../../engine/commonClasses/InlineButtons.js";
import {Helper} from "../functions/commonFunctions.js";

export default class JobsCommand extends Command {
    constructor(bot) {
        super("💼Работы", async (msg) => {
            let _user = await bot.getUser(msg);
            if (_user != null) {

                let job_list = await bot.db.models.JobsModel.findAll();

                let arr_btns = job_list.map(i => {
                    return {
                        text: `${Helper.text.getIcons(i.cmd_name)}${i.name}`,
                        callback_data: `jobs/${i.id}`,
                    }
                })

                await bot.sendMessage(msg.chat.id, "Доступные работы:", new inlineButtons(arr_btns));
            }
        });
    }
}