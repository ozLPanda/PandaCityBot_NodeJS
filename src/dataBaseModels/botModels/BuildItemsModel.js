import CommonModel from "../../../engine/commonClasses/CommonModel.js";
import {DataTypes} from "sequelize";
import BuildCategoryModel from "./BuildCategoryModel.js";

class BuildItemsModel extends CommonModel{
    static db = null;

    static init(sequelize) {
        this.db = sequelize;
        console.log("BuildItemsModel loaded");
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                name: {
                    type: DataTypes.STRING
                },
                lvl: {
                    type: DataTypes.INTEGER
                },
                price: {
                    type: DataTypes.BIGINT,
                },
                prestige_lvl: {
                    type: DataTypes.INTEGER,
                },
                desc:{
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                cmd:{
                    type: DataTypes.STRING
                },
                object_name:{
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                id_category:{
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                payday_coef:{
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                exp:{
                    type: DataTypes.INTEGER,
                    allowNull: false,
                }
            },
            {
                sequelize,
                tableName: 'build_items',
                timestamps: false
            }
        )
    }
}

// BuildItemsModel.hasOne(BuildCategoryModel);

export default BuildItemsModel