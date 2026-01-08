import {useJwt} from "../utils/Jwt.js";


export const Authorization = {
  async check(req, res){
    let token = req.header('authorization')
    const jwt = useJwt()
    const result = await jwt.decodeToken(token)
    if(result != null){
      return true
    }
  }
}