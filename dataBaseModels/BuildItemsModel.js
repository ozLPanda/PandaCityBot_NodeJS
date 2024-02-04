import CommonModel from "../classes/CommonModel.js";
import {DataTypes} from "sequelize";

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

export default BuildItemsModel