import { DataTypes } from 'sequelize'
import CommonModel from '../../../engine/commonClasses/CommonModel.js'
import { ErrorEnum } from '../../enums/ErrorEnums.js'
import moment from 'moment'
import CityInfo from '../../classes/CityInfo.js'

class UserModel extends CommonModel {
  static db = null
  static defaultSetting = {
    money: 500,
    lvl: 1,
    adminLvl: 0,
    cityInfo: JSON.stringify(new CityInfo()),
    created_at: Math.floor(Date.now() / 1000)
  }

  static init(sequelize) {
    this.db = sequelize
    console.log('UserModel loaded')
    super.init(
      {
        id_chat: {
          type: DataTypes.BIGINT,
          primaryKey: true
        },
        name: {
          type: DataTypes.STRING
        },
        login: {
          type: DataTypes.STRING
        },
        password: {
          type: DataTypes.TEXT
        },
        city_info: {
          type: DataTypes.JSON
        },
        admin_lvl: {
          type: DataTypes.SMALLINT
        },
        money: {
          type: DataTypes.STRING
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
        },
        deleted: {
          type: DataTypes.BOOLEAN
        },
        exp: {
          type: DataTypes.INTEGER
        },
        prestige: {
          type: DataTypes.STRING
        },
        settings: {
          type: DataTypes.JSON
        },
        use_casino: {
          type: DataTypes.BOOLEAN
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
  static async defaultCreateUser(bot, idChat, name) {
    let regx = /\p{Extended_Pictographic}/u
    if (regx.test(name)) {
      await bot.sendMessage(idChat, ErrorEnum.EmojiInName)
      throw new Error(ErrorEnum.EmojiInName)
    }
    const fallbackLevel = await this.db.models.UserLevelsModel.findOne({
      where: { lvl: this.defaultSetting.lvl }
    })
    const levelRow =
      fallbackLevel ??
      (await this.db.models.UserLevelsModel.findOne({
        order: [['lvl', 'ASC']]
      }))
    if (!levelRow) {
      await bot.sendMessage(idChat, ErrorEnum.ServerError)
      throw new Error('User levels table is empty')
    }
    let checkName = this.db.models.UserModel.findAll({
      where: {
        name: name
      }
    })
    checkName
      .then(async (res) => {
        if (res != null && res?.length > 0) {
          await bot.sendMessage(idChat, ErrorEnum.NameIsOccupied)
          throw new Error(ErrorEnum.NameIsOccupied)
        }
        if (name.length < 5 || name.length > 20) {
          await bot.sendMessage(idChat, ErrorEnum.IncorrectName)
          throw new Error(ErrorEnum.IncorrectName)
        }
        const payload = {
          ...this.defaultSetting,
          id_chat: idChat,
          name,
          lvl: levelRow.lvl,
          created_at: Math.floor(Date.now() / 1000)
        }
        this.db.models.UserModel.create(payload).then((res) => {
          console.log(`${moment().format('DD.MM.YYYY HH:mm:SS')} User created ${name}`)
        })
      })
      .catch((ex) => {
        console.error(ex)
        throw new Error('Произошла ошибка при создании пользователя')
      })
  }
}

export default UserModel
