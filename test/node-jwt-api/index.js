import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { MongoClient } from 'mongodb'

const VITE_URI = "mongodb://localhost:27017/jwtTest"
const client = new MongoClient(VITE_URI)
client.connect()
console.log('Connected to Mongo')

const database = client.db('jwt-api')
const usersdb = database.collection('users')

const app = express()
app.use(cors())
app.use(express.json())


// sign up
app.post('/signup', async (req, res) => {
  // 1. get user from the frontend
  const newUser = { email: req.body.email, password: req.body.password }

  // 2. hash password
  const hashedPassword = await bcrypt.hash(newUser.password, 10)

  // 3. add a new user to mongodb
  usersdb.insertOne({ email: req.body.email, password: hashedPassword })

  // 4. send status back to requestor
  res.status(201).send('User was added')
})

app.listen(4040, () => console.log('Api Running 😎'))
