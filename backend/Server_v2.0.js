import express from 'express'
import cors from 'cors'
import { loadApi } from './common/LoadApi.js'
import {dirname, join} from 'node:path'
import { fileURLToPath } from 'node:url'

const app = express()
const port = 4000
const api = loadApi()
const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(cors())

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'testApp.html'))
})

app.get('/api/admin', (req, res) => {
  res.status(200).json({ status: 'OK' })
})

app.listen(port, () => {
  console.log(`Сервер запущен на порту: http://localhost:${port}`)
})
