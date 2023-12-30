import sequelize, {DataTypes} from "sequelize";
import DefaultModel from "../classes/DefaultModel.js";

class UserModel extends DefaultModel{
    DataBase = null;

    constructor(db) {
        super();
        this.DataBase = db;
    }

    init() {
        let db = this.DataBase;
        super.init(
            {
                idChat: {
                    type: DataTypes.BIGINT,
                    allowNull: false,
                },
                name: {
                    type: DataTypes.STRING
                },
                cityInfo: {
                    type: DataTypes.JSON
                },
                adminLvl: {
                    type: DataTypes.TINYINT,
                    allowNull: false,
                },
                money: {
                    type: DataTypes.BIGINT,
                    allowNull: false
                }
            },
            {db, modelName: 'users'})
    }

    execute(cmd, obj) {
        super.execute(this, cmd, obj);
    }
}


export default UserModel