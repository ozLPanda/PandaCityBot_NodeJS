import CommonModel from "../../../engine/commonClasses/CommonModel.js";
import {DataTypes} from "sequelize";

class BuildEconomyModel extends CommonModel{
    static db = null;

    static init(sequelize) {
        this.db = sequelize;
        console.log("BuildEconomyModel loaded");
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                build_id:{
                  type: DataTypes.INTEGER,
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
                }
            },
            {
                sequelize,
                tableName: 'build_economy',
                timestamps: false
            }
        )
    }
}

// BuildCategoryModel.belongsTo(BuildItemsModel);

export default BuildEconomyModel