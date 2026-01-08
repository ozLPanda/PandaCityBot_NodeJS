import { DataTypes } from 'sequelize'
import CommonModel from '../../../engine/commonClasses/CommonModel.js'

class LogsModel extends CommonModel {
  static db = null

  static init(sequelize) {
    this.db = sequelize
    console.log('LogsModel loaded')
    super.init(
      {
        id: {
          type: DataTypes.BIGINT,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: DataTypes.TEXT
        },
        date_time: {
          type: DataTypes.BIGINT
        },
        id_user: {
          type: DataTypes.BIGINT
        }
      },
      {
        sequelize,
        tableName: 'logs',
        timestamps: false
      }
    )
  }
}

export default LogsModel
