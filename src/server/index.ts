require('dotenv').config()

import * as express from 'express'
import * as path from 'path'
import * as morgan from 'morgan'
import * as http from 'http'
import * as db from './db'

import heroesRoutes from './routes/heroes.routes'

db.init().catch(err => {
  console.error('Not connected with bd', err)
  process.exit(1)
})

const app = express()
app.set('port', process.env.PORT || 8000)

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

app.use('/heroes', heroesRoutes)
app.all('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const server = http.createServer(app)
server.listen(app.get('port'), () => {
    console.log('express listening on port ' + app.get('port'))
})
