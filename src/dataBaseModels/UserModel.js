import {DataTypes} from "sequelize";
import CommonModel from "../../engine/commonClasses/CommonModel.js";
import {ErrorEnum} from "../enums/ErrorEnums.js";
import moment from "moment";
import CityInfo from "../classes/CityInfo.js";

class UserModel extends CommonModel {
    static db = null;
    static defaultSetting = {
        money: 500,
        lvl: 1,
        adminLvl: 0,
        cityInfo: JSON.stringify(new CityInfo())
    }

    static init(sequelize) {
        this.db = sequelize;
        console.log("UserModel loaded");
        super.init(
            {
                id_chat: {
                    type: DataTypes.BIGINT,
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING
                },
                city_info: {
                    type: DataTypes.JSON
                },
                admin_lvl: {
                    type: DataTypes.TINYINT,
                },
                money: {
                    type: DataTypes.BIGINT,
                },
                lvl: {
                    type: DataTypes.INTEGER
                },
                rate_speed: {
                    type: DataTypes.FLOAT
                },
                created_at: {
                    type: DataTypes.INTEGER
                },
                last_payday: {
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
            this.defaultSetting.id_chat = idChat;
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