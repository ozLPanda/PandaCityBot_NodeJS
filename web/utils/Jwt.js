import jwt from 'jsonwebtoken'
import {privateKey, publicKey} from '../Server.js'

export function useJwt() {
  function createToken(data) {
    return new Promise((resolve, reject) => {
      try {
        resolve(jwt.sign(data, privateKey,{ algorithm: 'RS256', header: {"alg": "RS256"}, expiresIn: '1 days'}))
      } catch (ex) {
        reject(ex)
      }
    })
  }

  function decodeToken(token) {
    return new Promise((resolve, reject) => {
      try {
        resolve(jwt.verify(token, publicKey))
      } catch (ex) {
        reject(ex)
      }
    })
  }

  return {
    createToken,
    decodeToken
  }
}