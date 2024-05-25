import DataBaseModule from '../modules/DatabaseState.js'
import { EnumsResult } from '../common/Enums.js'
import BannedModel from '../../src/dataBaseModels/BannedModel.js'
import { ApiController, ApiRequest } from '../common/ApiBase.js'
import bcrypt from 'bcrypt'
import { useErrorHandler } from '../utils/APIUtils.js'
import {useJwt} from "../utils/Jwt.js";

export const UserController = new ApiController('User', [], [])

export async function findUserById(id) {
  return await DataBaseModule.connection.models.UserModel.findOne({
    where: {
      id_chat: id
    }
  })
}

export async function getUsers() {
  let users = await DataBaseModule.connection.models.UserModel.findAll()
  return users
}

export async function getUser({ body }) {
  return await findUserById(body.id)
}

export async function saveUser(req) {
  let user = await findUserById(req)
  if (user != null) {
    let body = req.body
    user = user[0]
    user.name = body.name
    user.money = body.money
    user.admin_lvl = body.admin_lvl
    let res = await user.save()
    return EnumsResult.Success
  } else {
    throw new Error('User не найден')
  }
}

export async function removeUser(req) {
  let user = await findUserById(req)
  if (user != null) {
    let body = req.body
    user.deleted = true
    await user.save()
    return EnumsResult.Success
  }
}

export async function banUser(req) {
  throw new Error('Not found function')
  let user = await findUserById(req.body.admin_id)
  if (user != null) {
    switch (user.admin_lvl) {
      case 3:
        {
          // if(user.)
        }
        break
    }
    let body = req.body
    let ban_record = await BannedModel.create({
      admin_id: body.admin_id,
      user_id: body.user_id
    })
  }
}

export async function loginUser({ body }, res) {
  const useError = useErrorHandler(res)
  const jwt = useJwt()
  const errorLogin = 'Invalid username or password'
  useError.isNullOrEmpty(body.login, 'Login field is required')
  useError.isNullOrEmpty(body.password, 'Password field is required')

  return await useError.checkStatus(async () => {
    let user = await DataBaseModule.connection.models.UsersCMS.findOne({
      where: {
        login: body.login
      }
    })
    if(user == null){
      return useError.sendErrorNotFound(errorLogin)
    }else{
      let check = checkPassword(body.password, user.password)
      if(check === false){
        return useError.sendErrorNotFound(errorLogin)
      }else{
        let token = await jwt.createToken({id: user.id, login: user.login})
        return {token}
      }
    }
  })
}

export async function adminCreate({ body }, res) {
  const useError = useErrorHandler(res)
  useError.isNullOrEmpty(body.login, 'Login field is required')
  useError.isNullOrEmpty(body.password, 'Password field is required')

  return await useError.checkStatus(async () => {
    let user = await DataBaseModule.connection.models.UsersCMS.create({
      login: body.login,
      password: await encryptPassword(body.password)
    })
    await user.save()
    return user
  })
}

async function encryptPassword(password, lenght = 10) {
  const salt = await bcrypt.genSalt(lenght)
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

function checkPassword(password, hash) {
  return bcrypt.compareSync(password, hash)
}
