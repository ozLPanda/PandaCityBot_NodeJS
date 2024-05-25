import DataBaseModule from '../modules/DatabaseState.js'
import { findUserById } from './User.js'
import {useJwt} from "../utils/Jwt.js";

export async function getLogs(req, res) {
  const body = req.body
  let jwt = useJwt()
  if (body.token != null) {
    try {
      let token = await jwt.decodeToken(body.token)
      let user = await findUserById(token.id)
      if (user != null) {
        if (user.admin_lvl > 10) {
          return await DataBaseModule.connection.models.LogsModel.findAll({
            include: [
              {
                association: 'UserInfoLog',
                attributes: ['id_chat', 'name']
              }
            ]
          })
        }
      }
    }catch(ex){
      res.status(500)
      return false
    }
  }
  res.status(405)
  return false
}
