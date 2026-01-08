import CommonModel from "../../../engine/commonClasses/CommonModel.js";
import {DataTypes} from "sequelize";
import BuildItemsModel from "./BuildItemsModel.js";

class BuildCategoryModel extends CommonModel{
    static db = null;

    static init(sequelize) {
        this.db = sequelize;
        console.log("BuildCategoryModel loaded");
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                name: {
                    type: DataTypes.STRING
                },
                code_name: {
                    type: DataTypes.STRING
                }
            },
            {
                sequelize,
                tableName: 'build_category',
                timestamps: false
            }
        )
    }
}

// BuildCategoryModel.belongsTo(BuildItemsModel);

export default BuildCategoryModel