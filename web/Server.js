import express from 'express'
import cors from 'cors'
import { useApi } from './common/LoadApi.js'
import DataBaseModule from './modules/DatabaseState.js'
import bodyParser from 'body-parser'
import multer from 'multer'
import fs from 'fs'

export const privateKey = fs.readFileSync('assets\\keys\\private.key', 'utf8')
export const publicKey = fs.readFileSync('assets\\keys\\public.key', 'utf8')
const app = express()
const port = 4004

const apiModule = useApi()
const middleware = apiModule.getMiddlewareApi()
const api = apiModule.getApi()

const upload = multer()

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(cors())

DataBaseModule.init()

// Init middlewares
for (let key in middleware) {
  for (let action in middleware[key]) {
    for (let item of middleware[key][action]) {
      console.log(`/api/${key}.${item.callback.name}`)
      app.use(`/api/${key}.${item.callback.name}`, async (req, res, next) => {
        try {
          let status = true
          for (let middlewareCallback of item.middleware) {
            status = await middlewareCallback?.check(req, res)
            if (status === false) break
          }
          if (status === false) {
            res.status(405).send()
          }else{
            next()
          }
        } catch (ex) {
          res.status(500).send()
        }
      })
    }
  }
}

// Init api link
for (let group in api) {
  for (let action in api[group]) {
    if (api[group][action].length > 0) {
      for (let func of api[group][action]) {
        app[action]('/api/' + group + '.' + func.name, upload.none(), async (req, res) => {
          try {
            // Чтобы позволить API отослать свой ответ пользователю, необходимо вернуть false
            const response = await func(req, res)
            if (response !== false) {
              res.status(200).json({
                data: response,
                status: 200
              })
            }
          } catch (ex) {
            console.error(ex)
            res.status(500)
          }
        })
      }
    }
  }
}

app.get('/api/test.object', (req, res) => {
  res.status(200).json({ status: 'OK' })
})

app.listen(port, () => {
  console.log(`Сервер запущен на порту: http://localhost:${port}`)
})
