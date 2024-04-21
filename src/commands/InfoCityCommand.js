import Command from "../../engine/commonClasses/Command.js";
import {Helper} from "../functions/commonFunctions.js";
import moment from "moment";
import CityInfo from "../classes/CityInfo.js";
import {IconEnums} from "../enums/iconEnums.js";
import LoginMiddleware from "../middleware/LoginMiddleware.js";

export default class InfoCityCommand extends Command{
    constructor(bot) {
        super("🏢Информация о городе", async (msg)=>{
            let user = await bot.getUser(msg);

            if(user != null){

                let date = moment(user.created_at, "X");

                let str = "";
                str += "Информация о вашем городе\n";
                str += `Ваше имя: ${user.name}\n`;
                str += `Ваш уровень: (${user.lvl}) ${user.Levels.name}\n`
                str += `Ваш опыт: ${user.exp}/${user.Levels.exp_need}\n`
                str += `Казна города: ${Helper.math.formatPrice(user.money)}💵\n`;
                str += `Ваша прибыль каждые 5 минут: - \n`;
                str += `Дата регистрации: ${date?.format("DD.MM.YYYY HH:mm:ss")}\n`;

                // Вывод кулпенных зданий и полная информация о CityInfo
                let cityInfo = new CityInfo(user.city_info);
                let data = cityInfo.getCityInfo();
                let buildList = bot.services.ServiceBuildItems.items;
                for(let key in data){
                    let count = data[key];
                    if(Number(count) > 0){
                        let buildName = `${IconEnums[key]}${buildList.find(i => i.object_name == key).name}: ${count}`
                        str += `${buildName}\n`
                    }
                }

                await bot.sendMessage(msg.chat.id, str);
            }
        });
        this.middlewares.push(new LoginMiddleware(bot));
    }
}