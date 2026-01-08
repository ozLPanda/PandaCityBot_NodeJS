import Command from "../../engine/commonClasses/Command.js";
import moment from "moment";
import {Helper} from "../functions/commonFunctions.js";
import CityInfo from "../classes/CityInfo.js";


export default class AdminCheckPaydayBuildItems extends Command {
    constructor(bot) {
        super("/getPaydayItems", async (msg) => {
            // let keysBigInt = ["money", 'prestige'];
            // let users = await bot.db.models.UserModel.findAll();
            // for (let user of users) {
            //     user.money = BigInt(user.money);
            //     user.prestige = BigInt(user.prestige);
            //     user = new Proxy(user, {
            //         get(target, prop){
            //             if(keysBigInt.includes(prop)){
            //                 return Number(target[prop].toString());
            //             }else{
            //                 return target[prop];
            //             }
            //         },
            //         set(target,prop, val){
            //             if(keysBigInt.includes(prop)){
            //                 target[prop] = BigInt(val);
            //             }else{
            //                 target[prop] = val;
            //             }
            //             return true;
            //         }
            //     });
            //     let info = new CityInfo(user.city_info);
            //     let buildList = bot.services.ServiceBuildItems.items;
            //     let keysInfo = info.getCityInfo();
            //     for (let key in keysInfo) {
            //         if(keysInfo[key] != 0){
            //             let item = buildList.find(i=>i.object_name == key);
            //             if(item != undefined){
            //                 user.prestige += (item.prestige_lvl * keysInfo[key]);
            //                 console.log(`${user.name} set prestige ${item.prestige_lvl * keysInfo[key]}`);
            //             }
            //         }
            //     }
            //     await user.save();
            // }

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