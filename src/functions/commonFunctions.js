import {IconEnums} from "../enums/iconEnums.js";
import moment from "moment/moment.js";
import CityInfo from "../classes/CityInfo.js";

export const Helper = {
    math: {
        formatPrice(x) {
            if (x == null) {
                return "0"
            }
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        }
    },
    text: {
        getIcons(cmd) {
            let icon = IconEnums[cmd];
            return icon ? icon : "";
        }
    },
    user: {
        async setExp(bot, msg, user, exp) {
            let lvlUp = false;
            let levelObject = await bot.db.models.UserLevelsModel.findOne({where: {lvl: user.lvl}});
            user.exp += exp;
            while (levelObject != null && levelObject.exp_need <= user.exp) {
                const nextLevel = await bot.db.models.UserLevelsModel.findOne({ where: { lvl: user.lvl + 1 } });
                if (nextLevel == null) {
                    user.exp = levelObject.exp_need;
                    break;
                }
                user.lvl += 1;
                lvlUp = true;
                user.exp = user.exp - levelObject.exp_need;
                levelObject = nextLevel;
            }

            if (lvlUp)
                await bot.sendMessage(msg.chat.id, `Ваш уровень повышен, теперь у вас ${user.lvl}!`);

            return lvlUp;
        },
        getPaydayFiveMinutes(user, bot) {
            let utc = user.last_payday;
            let curUTC = Math.round(+moment() / 1000);
            if (utc == null) utc = user.created_at;
            let sub = curUTC - (curUTC - 300);
            // Что есть у игрока
            let cityData = new CityInfo(user.city_info);
            let infoList = cityData.getCityInfo();
            // Общий список всех элементов постройки
            let buildList = bot.services.ServiceBuildItems.items;
            let buildEconomyList = bot.services.ServiceBuildEconomy.items;

            let payday = 0;

            // let coef = 0.0005;
            // sub = sub / 10000;

            for (let buildKey in infoList) {
                let count = infoList[buildKey];
                if (count != null && count != 0) {
                    let itemBuild = buildList.find(i => i.object_name == buildKey);
                    let coef = itemBuild.payday_coef;
                    if (itemBuild != null) {
                        let buildEconomy = buildEconomyList.find(i => i.build_id == itemBuild.id);
                        if (buildEconomy != null) {
                            //Доход = (Цена здания * Коэффициент дохода (фиксированный) + Цена здания * Коэффициент дохода (изменяемый)) / 12
                            let x = (itemBuild.price * itemBuild.payday_coef + itemBuild.price * buildEconomy.income_rate) / sub;
                            // let x = (((itemBuild.price * buildEconomy.income_rate) / user.rate_speed * coef) * count) * (sub);
                            payday += x;
                        } else {
                            let x = (itemBuild.price * itemBuild.payday_coef + itemBuild.price * 1) / sub;
                            payday += x;
                        }
                    }
                }
            }

            payday = Math.round(payday);
            let lvlCoef = 1 + (user.lvl * 0.1);

            return Math.round(payday * lvlCoef);
        }
    }
}
