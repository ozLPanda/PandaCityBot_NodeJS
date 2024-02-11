import CommonModel from "../../engine/commonClasses/CommonModel.js";
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
                prestigeLvl: {
                    type: DataTypes.INTEGER,
                },
                desc:{
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                cmd:{
                    type: DataTypes.STRING
                },
                objectName:{
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                idCategory:{
                    type: DataTypes.INTEGER,
                    allowNull: false,
                }
            },
            {
                sequelize,
                tableName: 'buildItems',
                timestamps: false
            }
        )
    }
}

// BuildItemsModel.hasOne(BuildCategoryModel);

export default BuildItemsModel