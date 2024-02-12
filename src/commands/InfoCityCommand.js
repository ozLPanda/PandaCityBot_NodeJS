import Command from "../../engine/commonClasses/Command.js";
import {Helper} from "../functions/commonFunctions.js";
import moment from "moment";

export default class InfoCityCommand extends Command{
    constructor(bot) {
        super("🏢Информация о городе", async (msg)=>{
            let user = await bot.db.models.UserModel.findOne(
                {
                    where: {idChat: msg.chat.id}
                }
            )

            if(user != null){

                let date = moment(user.created_at, "X");

                let str = "";
                str += "Информация о вашем городе\n";
                str += `Ваше имя: ${user.name}\n`;
                str += `Казна города: ${Helper.math.formatPrice(user.money)}💵\n`;
                str += `Ваша прибыль каждые 5 минут: - \n`;
                str += `Дата регистрации: ${date?.format("YYYY.MM.DD HH:mm:ss")}\n`;

                await bot.sendMessage(msg.chat.id, str);
            }
        });
    }
}