import {Sequelize} from "sequelize";
import UserModel from "../dataBaseModels/botModels/UserModel.js";
import BuildItemsModel from "../dataBaseModels/botModels/BuildItemsModel.js";
import LogsModel from "../dataBaseModels/botModels/LogsModel.js";
import BuildCategoryModel from "../dataBaseModels/botModels/BuildCategoryModel.js";
import BuildEconomyModel from "../dataBaseModels/botModels/BuildEconomyModel.js";
import JobsModel from "../dataBaseModels/botModels/JobsModel.js";
import UserLevelsModel from "../dataBaseModels/botModels/UserLevelsModel.js";
import UsersCMS from "../dataBaseModels/UsersCMS.js";

export default class DataBase extends Sequelize {

    models = {
        "UserModel": UserModel,
        "BuildEconomy": BuildEconomyModel,
        "BuildCategoryModel": BuildCategoryModel,
        "BuildModel": BuildItemsModel,
        "LogsModel": LogsModel,
        "JobsModel": JobsModel,
        "UserLevelsModel": UserLevelsModel,
        "UsersCMS": UsersCMS
    }

    constructor(debug) {
        const {
            DB_NAME,
            DB_USER,
            DB_PASSWORD,
            DB_HOST = 'localhost',
            DB_PORT,
            DB_DIALECT = 'postgres',
            DB_LOGGING,
        } = process.env

        const logging = DB_LOGGING === undefined ? debug : DB_LOGGING === 'true'

        super(
            DB_NAME,
            DB_USER,
            DB_PASSWORD,
            {
                host: DB_HOST,
                dialect: DB_DIALECT,
                port: DB_PORT,
                pool: {
                    max: 10, //максимальное кол-во соединений в пуле (Default: 5)
                    min: 0, //минимальное кол-во соединений в пуле (Default: 0)
                    acquire: 30000, //время в миллисекундах, в течение которого будет осуществляться попытка установить соединение, прежде чем будет сгенерировано исключение (Default: 60000)
                    idle: 10000, //время простоя в миллисекундах, по истечении которого соединение покинет пул (Default: 1000)
                },
                logging: logging,
            })
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