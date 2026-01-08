import CommonModel from "../../../engine/commonClasses/CommonModel.js";
import {DataTypes} from "sequelize";

class JobsModel extends CommonModel{
    static db = null;

    static init(sequelize) {
        this.db = sequelize;
        console.log("JobsModel loaded");
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                name: {
                    type: DataTypes.TEXT
                },
                lvl: {
                    type: DataTypes.INTEGER
                },
                exp: {
                    type: DataTypes.INTEGER
                },
                income_rate: {
                    type: DataTypes.FLOAT
                },
                income_rate_default: {
                    type: DataTypes.FLOAT
                },
                income_rate_max: {
                    type: DataTypes.FLOAT
                },
                income_rate_min: {
                    type: DataTypes.FLOAT
                },
                cmd_name:{
                    type: DataTypes.TEXT
                },
                events:{
                    type: DataTypes.JSON
                }
            },
            {
                sequelize,
                tableName: 'jobs',
                timestamps: false
            }
        )
    }
}

// BuildItemsModel.hasOne(BuildCategoryModel);

export default JobsModel