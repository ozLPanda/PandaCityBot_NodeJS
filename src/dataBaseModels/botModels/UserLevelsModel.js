import CommonModel from "../../../engine/commonClasses/CommonModel.js";
import {DataTypes} from "sequelize";

export default class UserLevelsModel extends CommonModel {
    static db = null;

    static init(sequelize) {
        this.db = sequelize;
        console.log("UserLevelsModel loaded");
        super.init(
            {
                id: {
                    type: DataTypes.BIGINT,
                    primaryKey: true,
                    autoIncrement: true,
                },
                name: {
                    type: DataTypes.TEXT
                },
                lvl: {
                    type: DataTypes.INTEGER,
                    unique: true
                },
                exp_need:{
                    type: DataTypes.INTEGER
                }
            },
            {
                sequelize,
                tableName: 'user_levels',
                timestamps: false
            }
        )
    }
}
