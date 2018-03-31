const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')
const root = require('./controllers/root')

const db = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'joffrey',
    password: 'hello',
    database: 'smart-brain'
  }
})

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => root.handleRoot(req, res, db))
app.post('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt))
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt))
app.get('/profile/:id', (req, res) => profile.handleProfileGet(req, res, db));
app.put('/image', (req, res) => image.handleImage(req, res, db))
app.post('/imageurl', (req, res) => image.handleApiCall(req, res))

app.listen(process.env.PORT || 3000, () => {
  console.log(`App is running on port ${process.env.PORT} `)
})