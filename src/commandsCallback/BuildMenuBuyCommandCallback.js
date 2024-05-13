import Command from "../../engine/commonClasses/Command.js";
import CityInfo from "../classes/CityInfo.js";
import sequelize from "sequelize";
import {Helper} from "../functions/commonFunctions.js";


export default class BuildMenuBuyCommandCallback extends Command {
    constructor(bot) {
        super("menu.builds.buy", async (msg, ctx) => {
            let idBuild = ctx.data.split("/")[1];
            let user =  await bot.getUser(msg);

            let build = bot.services.ServiceBuildItems.items.find(i => i.id == idBuild);

            if (build != null && user != null) {
                if (user.money >= build.price) {
                    try {
                        let cityInfo = new CityInfo(user.city_info);
                        cityInfo[build.Category.dataValues.code_name][build.object_name] += 1;

                        await bot.answerCallbackQuery(ctx.id);

                        user.money -= build.price;
                        user.city_info = cityInfo.getJSON();

                        let expUp = await Helper.user.setExp(bot, msg, user, build.exp);

                        await user.save();
                        await bot.sendMessage(msg.chat.id, `Вы успешно купили ${build.name}`);

                    }catch (ex){
                        // await bot.answerCallbackQuery(ctx.id);
                        await bot.sendMessage(msg.chat.id, `Произошла ошибка, сообщение уже отправлено администраторам`);
                        let err_msg = "При покупке у пользователя\n";
                        err_msg += `ID: ${user.id_chat}\n`;
                        err_msg += `Name: ${user.name}\n`;
                        err_msg += `Попытка покупки: (${build.id}) ${build.name}\n`
                        err_msg += `Произошла ошибка: ${ex.message}`;
                        await bot.sendMessage(bot.admin_chat, err_msg);
                    }

                    let log = await bot.db.models.LogsModel.create({
                        name: `Купил ${build.name}`,
                        dateTime: Math.round(Number(new Date()) / 1000),
                        id_user: user.id_chat,
                    });

                    console.log(`Log create ${user.name}`);
                } else {
                    await bot.answerCallbackQuery(ctx.id).then(async () => {
                        await bot.sendMessage(msg.chat.id, "У вас недостаточно денег");
                    })
                }
            }
        });
    }
}