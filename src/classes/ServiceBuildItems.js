import Service from "../../engine/commonClasses/BotService.js";
import buildItemsModel from "../dataBaseModels/BuildItemsModel.js";
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
                        on: {
                            "id": sequelize.col("BuildItemsModel.idCategory")
                        },
                    }
                ],
                group: "id",
            });
            this.items = this.items.map(i => {
                return i.dataValues
            })
        });
    }
}