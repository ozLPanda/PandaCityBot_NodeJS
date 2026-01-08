import DataBaseModule from "../modules/DatabaseState.js";
import {useJwt} from "../utils/Jwt.js";

export const CheckAdmin = (checkLvl)=>{
  async function check(req, res){
    try {
      const jwt = useJwt()
      const tokenData = await jwt.decodeToken(req.header('authorization'))
      let user = await DataBaseModule.connection.models.UserModel.findOne({
        where: {
          id_chat: tokenData.id
        }
      })
      if(user != null){
        if(user.admin_lvl >= checkLvl) return true
        else return false
      }else res.status(401).send()
    }catch(ex){
      res.status(401).send()
    }
  }

  return {
    check
  }
}
