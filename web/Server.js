import express from 'express'
import cors from 'cors'
import { loadApi } from './common/LoadApi.js'
import DataBaseModule from './modules/DatabaseState.js'

const app = express()
const port = 4000
const api = loadApi()
app.use(cors())

DataBaseModule.init()

for (let group in api) {
  for (let action in api[group]) {
    if (api[group][action].length > 0) {
      for (let func of api[group][action]) {
        app[action]('/api/' + group + '.' + func.name, async (req, res) => {
          try {
            const b = req.body
            res.status(200).json({
              data: await func(req),
              status: 200
            })
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
