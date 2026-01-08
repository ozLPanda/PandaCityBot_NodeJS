import DataBaseModule from '../modules/DatabaseState.js'
export async function getLogs(req, res) {
  try {
    return await DataBaseModule.connection.models.LogsModel.findAll({
      include: [
        {
          association: 'UserInfoLog',
          attributes: ['id_chat', 'name']
        }
      ],
      order: [['id', 'DESC']]
    })
  } catch (ex) {
    res.status(500).send(ex.message)
    return false
  }
}
