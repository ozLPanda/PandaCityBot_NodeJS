import Service from "../../engine/commonClasses/BotService.js";
import buildItemsModel from "../dataBaseModels/botModels/BuildItemsModel.js";
import sequelize from "sequelize";

export default class ServiceBuildItems extends Service{
    items = [];

    constructor() {
        super("ServiceBuildItems", async (bot)=>{
            let builtItemsModel = bot.db.models.BuildModel;
            this.items = await builtItemsModel.findAll({
                include: [
                    {
                        association: "Category",
                    }
                ]
            });
            this.items = this.items.map(i => {
                return i.dataValues
            })
        });
    }
}