import Command from "../../engine/commonClasses/Command.js";
import inlineButtons from "../../engine/commonClasses/InlineButtons.js";
import {Op} from "sequelize";
import {Helper} from "../functions/commonFunctions.js";

export default class BuildMenuCommand extends Command {
    constructor(bot) {
        super("🏗Построить здания", async (msg) => {
            let _user = await bot.db.models.UserModel.findOne({where: {id_chat: msg.chat.id}});
            if (_user != null) {
                let buildList = bot.services.ServiceBuildItems.items;

                let arr_btns = buildList.map(el=>{
                    return {
                        text: `${Helper.text.getIcons(el.object_name)}${el.name} (${Helper.math.formatPrice(el.price)})`,
                        callback_data: `menu.builds.buy/${el.id}`
                    }
                });
                // await bot.answerCallbackQuery(ctx.id);
                await bot.sendMessage(msg.chat.id, "Чтобы вы хотели построить?", new inlineButtons(arr_btns));
            }
        });
    }
}