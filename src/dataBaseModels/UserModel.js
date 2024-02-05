import {DataTypes} from "sequelize";
import CommonModel from "../../engine/commonClasses/CommonModel.js";
import {ErrorEnum} from "../enums/ErrorEnums.js";
import moment from "moment";

class UserModel extends CommonModel {
    static db = null;
    static defaultSetting = {
        money: 500,
        lvl: 1,
        adminLvl: 0,
    }

    static init(sequelize) {
        this.db = sequelize;
        console.log("UserModel loaded");
        super.init(
            {
                idChat: {
                    type: DataTypes.BIGINT,
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING
                },
                cityInfo: {
                    type: DataTypes.JSON
                },
                adminLvl: {
                    type: DataTypes.TINYINT,
                },
                money: {
                    type: DataTypes.BIGINT,
                },
                lvl: {
                    type: DataTypes.INTEGER
                }
            },
            {
                sequelize,
                tableName: 'users',
                timestamps: false
            }
        )
    }

    // Функция создания начального пользователя
    static defaultCreateUser(idChat, name) {
        let checkName = this.db.models.UserModel.findAll({
            where: {
                name: name
            }
        });
        checkName.then(res => {
            if (res != null && res?.length > 0) {
                throw new Error(ErrorEnum.NameIsOccupied);
            }
            if (name.length < 5 || name.length > 20) {
                throw new Error(ErrorEnum.IncorrectName);
            }
            this.defaultSetting.idChat = idChat;
            this.defaultSetting.name = name;
            this.db.models.UserModel.create(this.defaultSetting).then(res=>{
                console.log(`${moment().format("DD.MM.YYYY HH:mm:SS")} User created ${name}`);
            });
        }).catch(ex => {
            throw new Error("Произошла ошибка при создании пользователя");
        })
    }
}


export default UserModel