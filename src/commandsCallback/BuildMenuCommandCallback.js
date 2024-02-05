import Command from "../../engine/commonClasses/Command.js";
import {MainMenuInlineKeyboard} from "../inlineKeyboards/MainMenuInlineKeyboard.js";
import inlineButtons from "../../engine/commonClasses/InlineButtons.js";
import {Op} from "sequelize";

export default class BuildMenuCommandCallback extends Command {
    constructor(bot) {
        super("menu.builds", async (msg) => {
            let _user = await bot.db.models.UserModel.findOne({where: {idChat: msg.chat.id}});
            if (_user != null) {
                let buildList = await bot.db.models.BuildModel.findAll({
                    where: {
                        lvl: {
                            [Op.lte]: _user.dataValues.lvl
                        }
                    }
                });
                let arr_btns = buildList.map(el=>{
                    return {
                        text: el.name,
                        callback_data: el.cmd
                    }
                });
                await bot.sendMessage(msg.chat.id, "Чтобы вы хотели построить?", new inlineButtons(arr_btns))
            }
        });
    }
}