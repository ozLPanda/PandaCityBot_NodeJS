import {DataTypes} from "sequelize";
import CommonModel from "../../engine/commonClasses/CommonModel.js";
import {ErrorEnum} from "../enums/ErrorEnums.js";
import moment from "moment";
import UserModel from "./UserModel.js";

class LogsModel extends CommonModel {
    static db = null;

    static init(sequelize) {
        this.db = sequelize;
        console.log("LogsModel loaded");
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.TEXT
                },
                dateTime: {
                    type: DataTypes.INTEGER
                },
                idUser: {
                    type: DataTypes.BIGINT,
                },
            },
            {
                sequelize,
                tableName: 'logs',
                timestamps: false
            }
        )
    }
}

export default LogsModel