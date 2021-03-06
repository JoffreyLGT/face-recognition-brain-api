const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')
const root = require('./controllers/root')

const db = require('./utils/database').database

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => root.handleRoot(req, res))
app.post('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt))
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt))
app.get('/profile/:id', (req, res) => profile.handleProfileGet(req, res, db));
app.put('/image', (req, res) => image.handleImage(req, res, db))
app.post('/imageurl', (req, res) => image.handleApiCall(req, res))

const portToUse = process.env.PORT || 3000
app.listen(portToUse, () => {
  console.log(`App is running on port ${portToUse} `)
})