import CommonModel from "../../engine/commonClasses/CommonModel.js";
import {DataTypes} from "sequelize";

class BannedModel extends CommonModel{
    static db = null;

    static init(sequelize) {
        this.db = sequelize;
        console.log("BannedModel loaded");
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                user_id:{
                    type: DataTypes.BIGINT,
                },
                admin_id: {
                    type: DataTypes.BIGINT
                },
                reason: {
                    type: DataTypes.TEXT
                },
                ban_time: {
                    type: DataTypes.BIGINT
                },
                created_at: {
                    type: DataTypes.BIGINT
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

export default BannedModel