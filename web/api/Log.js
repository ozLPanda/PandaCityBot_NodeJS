import DataBaseModule from '../modules/DatabaseState.js'

export async function getLogs(req, res) {
  try {
      return await DataBaseModule.connection.models.LogsModel.findAll({
        include: [
          {
            association: 'UserInfoLog',
            attributes: ['id_chat', 'name']
          }
        ]
      })
  } catch (ex) {
    res.status(500).send()
    return false
  }
  res.status(405).send()
  return false
}
