import Command from "../../engine/commonClasses/Command.js";
import moment from "moment";
import CityInfo from "../classes/CityInfo.js";
import buildEconomy from "../dataBaseModels/BuildEconomy.js";
import {Helper} from "../functions/commonFunctions.js";

export default class PaydayCommand extends Command{
    constructor(bot) {
        super("💵Собрать налоги", async (msg)=>{
            let user = await bot.getUser(msg);
            if(user != null){
                let utc = user.last_payday;
                if(utc == null) utc = user.created_at;

                let sub = Number(Math.round(+moment() / 1000)) - utc;

                if(sub > 300_000){

                    // Что есть у игрока
                    let cityData = new CityInfo(user.city_info);
                    let infoList = cityData.getCityInfo();
                    // Общий список всех элементов постройки
                    let buildList = bot.services.ServiceBuildItems.items;
                    let buildEconomyList = bot.services.ServiceBuildEconomy.items;

                    let payday = 0;

                    let coef = 0.0005;
                    sub =  sub / 10000;

                    for(let buildKey in infoList){
                        let count = infoList[buildKey];
                        if(count != null && count != 0){
                            let itemBuild = buildList.find(i => i.object_name == buildKey);
                            if(itemBuild != null){
                                let buildEconomy = buildEconomyList.find(i => i.build_id == itemBuild.id);
                                if(buildEconomy != null){
                                    let x = (((itemBuild.price * buildEconomy.income_rate) / user.rate_speed * coef) * count) * (sub);
                                    payday += x;
                                }
                            }
                        }
                    }

                    payday = Math.round(payday);

                    let current_date = Math.round(Number(new Date()) / 1000);
                    let payday_format = Helper.math.formatPrice(payday);

                    user.money += payday;
                    user.last_payday = current_date;
                    await user.save();

                    let log = await bot.db.models.LogsModel.create({
                        name: `Получил payday ${payday_format}`,
                        dateTime: current_date,
                        id_user: user.id_chat,
                    });

                    await bot.sendMessage(msg.chat.id,`Вы заработали ${payday_format}💵`);

                    // Доход от здания = (стоимость здания * коэффициент дохода) / скорость работы здания
                }else{
                    await bot.sendMessage(msg.chat.id, `Еще рано для сбора налогов`);
                }
            }
        });
    }
}