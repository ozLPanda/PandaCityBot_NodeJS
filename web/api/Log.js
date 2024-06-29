import DataBaseModule from '../modules/DatabaseState.js'
import sequelize from 'sequelize'
import UserModel from '../../src/dataBaseModels/botModels/UserModel.js'

export async function getLogs(req, res) {
  try {
    return (
      await DataBaseModule.connection.models.LogsModel.findAll({
        include: [
          {
            association: 'UserInfoLog',
            attributes: ['id_chat', 'name']
          }
        ],
        order: [[{ model: 'UserInfoLog' }, 'id_chat', 'DESC']]
      })
    ).sort((a, b) => {
      if (a.id > b.id) return -1
      if (a.id == b.id) return 0
      if (a.id < b.id) return 1
    })
  } catch (ex) {
    res.status(500).send(ex.message)
    return false
  }
}
