const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

const connect = require('./models/index')
const gamesRouter = require('./routes/games')

const app = express()
connect() // faz conexão ao MongoDB

app.get('/', (req, res) => {
  return res.json({ message: 'API OK' })
})

app.use('/games', gamesRouter)

app.listen(3000, () => {
  console.log('Api running on port 3000')
})