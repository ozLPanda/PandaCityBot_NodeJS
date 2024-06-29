import Service from "../../engine/commonClasses/BotService.js";
import buildItemsModel from "../dataBaseModels/botModels/BuildItemsModel.js";
import sequelize from "sequelize";

export default class ServiceBuildEconomy extends Service{
    items = [];

    constructor() {
        super("ServiceBuildEconomy", async (bot)=>{
            let model = bot.db.models.BuildEconomy;
            this.items = await model.findAll();
            this.items = this.items.map(i => {
                return i.dataValues
            })
        });
    }
}