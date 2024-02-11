import Command from "../../engine/commonClasses/Command.js";
import CityInfo from "../classes/cityInfo.js";
import sequelize from "sequelize";


export default class BuildMenuBuyCommandCallback extends Command {
    constructor(bot) {
        super("menu.builds.buy", async (msg, ctx) => {
            let idBuild = ctx.data.split("/")[1];
            let user = await bot.db.models.UserModel.findOne({where: {idChat: msg.chat.id}})
            let build = await bot.db.models.BuildModel.findOne({
                where: {id: idBuild},
                include: [
                    {
                        association: "Category",
                        on: {
                            "id": sequelize.col("BuildItemsModel.idCategory")
                        },
                    }
                ],
                group: "id",
            });

            if (build != null && user != null) {
                if (user.money >= build.price) {
                    let cityInfo = new CityInfo(user.cityInfo);
                    cityInfo[build.Category.dataValues.code_name][build.objectName] += 1;

                    await bot.answerCallbackQuery(ctx.id);
                    await bot.sendMessage(msg.chat.id, `Вы успешно купили ${build.name}`);

                    user.money -= build.price
                    user.cityInfo = cityInfo.getJSON();

                    await user.save();

                    let log = await bot.db.models.LogsModel.create({
                        name: `Купил ${build.name}`,
                        dateTime: Math.round(Number(new Date()) / 1000),
                        id_user: user.idChat,
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