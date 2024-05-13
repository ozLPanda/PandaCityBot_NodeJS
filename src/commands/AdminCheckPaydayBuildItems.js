import Command from "../../engine/commonClasses/Command.js";
import moment from "moment";
import {Helper} from "../functions/commonFunctions.js";


export default class AdminCheckPaydayBuildItems extends Command {
    constructor(bot) {
        super("/getPaydayItems", async (msg) => {
            let user = await bot.getUser(msg);
            if (user != null && user.admin_lvl > 5) {
                let curUTC = Math.round(+moment() / 1000);
                let sub = curUTC - (curUTC - 300);
                let infoMsg = "";
                let buildList = bot.services.ServiceBuildItems.items;
                let buildEconomyList = bot.services.ServiceBuildEconomy.items;

                for (let itemBuild of buildList) {
                    let coef = itemBuild.payday_coef;
                    if (itemBuild != null) {
                        let buildEconomy = buildEconomyList.find(i => i.build_id == itemBuild.id);
                        if (buildEconomy != null) {
                            let x = (itemBuild.price * itemBuild.payday_coef + itemBuild.price * buildEconomy.income_rate) / sub;
                            x = Math.round(x);
                            infoMsg += `${itemBuild.name}: ${Helper.math.formatPrice(x)}\n`;
                        } else {
                            let x = (itemBuild.price * itemBuild.payday_coef + itemBuild.price * 1) / sub;
                            x = Math.round(x);
                            infoMsg += `${itemBuild.name}: ${Helper.math.formatPrice(x)}\n`;
                        }

                    }
                }

                await bot.sendMessage(msg.chat.id, infoMsg);
            }
        });
    }
}