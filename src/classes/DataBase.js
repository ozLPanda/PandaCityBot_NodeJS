import {Sequelize} from "sequelize";
import UserModel from "../dataBaseModels/UserModel.js";
import BuildItemsModel from "../dataBaseModels/BuildItemsModel.js";
import LogsModel from "../dataBaseModels/LogsModel.js";
import BuildCategoryModel from "../dataBaseModels/BuildCategoryModel.js";
import BuildEconomyModel from "../dataBaseModels/BuildEconomyModel.js";
import JobsModel from "../dataBaseModels/JobsModel.js";
import UserLevelsModel from "../dataBaseModels/UserLevelsModel.js";

export default class DataBase extends Sequelize {

    models = {
        "UserModel": UserModel,
        "BuildEconomy": BuildEconomyModel,
        "BuildCategoryModel": BuildCategoryModel,
        "BuildModel": BuildItemsModel,
        "LogsModel": LogsModel,
        "JobsModel": JobsModel,
        "UserLevelsModel": UserLevelsModel,
    }

    constructor(debug) {
        super(
            'f0220387_pandaCity',
            'f0220387_f0220387',
            'n22022003',
            {
                host: '141.8.192.54',
                dialect: "mysql",
                pool: {
                    max: 10, //максимальное кол-во соединений в пуле (Default: 5)
                    min: 0, //минимальное кол-во соединений в пуле (Default: 0)
                    acquire: 30000, //время в миллисекундах, в течение которого будет осуществляться попытка установить соединение, прежде чем будет сгенерировано исключение (Default: 60000)
                    idle: 10000, //время простоя в миллисекундах, по истечении которого соединение покинет пул (Default: 1000)
                },
                logging: debug,
            });
        this.init();

        LogsModel.belongsTo(UserModel, {as: "UserInfoLog", foreignKey: "id_user"});
        BuildItemsModel.belongsTo(BuildCategoryModel, {as: "Category", foreignKey: "id_category"});
        UserModel.hasOne(UserLevelsModel, {as: "Levels", sourceKey: "lvl", foreignKey: "lvl"});
    }

    init() {
        for (let key in this.models) {
            this.models[key].init(this);
        }
    }
}