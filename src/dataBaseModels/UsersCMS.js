import CommonModel from '../../engine/commonClasses/CommonModel.js'
import { DataTypes } from 'sequelize'

class UsersCMS extends CommonModel {
  static db = null

  static init(sequelize) {
    this.db = sequelize
    console.log('UsersCMS loaded')
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true
        },
        login: {
          type: DataTypes.STRING
        },
        password: {
          type: DataTypes.TEXT
        },
        admin_lvl: {
          type: DataTypes.INTEGER
        }
      },
      {
        sequelize,
        tableName: 'cms_users',
        timestamps: false
      }
    )
  }
}

export default UsersCMS