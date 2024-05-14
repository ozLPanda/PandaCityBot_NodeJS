import Command from "../../engine/commonClasses/Command.js";
import {Helper} from "../functions/commonFunctions.js";
import {Op} from "sequelize";

const ratingIcon = {
    1: "🥇",
    2: "🥈",
    3: "🥉"
}

export class RatingCommand extends Command {
    constructor(bot) {
        super("🥇Рейтинг", async (msg) => {
            let _user = await bot.getUser(msg);
            if (_user != null) {
                let ratingList = await bot.db.models.UserModel.findAll({
                    where: {
                        admin_lvl: {[Op.lt]: 1}
                    },
                    order: [
                        ['prestige', 'DESC']
                        // ['money', 'ASC'],
                        // ['lvl', 'DESC']
                    ],
                    attributes: ['id_chat', 'name'/*,'money', 'lvl'*/, 'prestige'],
                    limit: 10
                });
                if (ratingList != null) {
                    let indexRating = 1;
                    let text = "Топ игроков: \n";
                    for (let user of ratingList) {
                        let icon = ratingIcon[indexRating];
                        if (icon != undefined)
                            text += `${icon} ${user.name} (${Helper.math.formatPrice(user.prestige)}🌟) \n`
                        else
                            text += `${indexRating}. ${user.name} (${Helper.math.formatPrice(user.prestige)}🌟) \n`
                        indexRating++;
                    }
                    await bot.sendMessage(msg.chat.id, text);
                }
            }
        });
    }
}