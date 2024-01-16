const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const sqlite3 = require('sqlite3')
const { studentsSQLiteAPI } = require("./students")
const { booksSQLite } = require("./books")
const db = new sqlite3.Database('./sample.db')

const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.listen(4000, () => {
  // console.log("Server is running on port 4000");
})

app.get('/', (req, res) => {
  return res.json('hai')
})
app.post('/', (req, res) => {
  return res.json('hello')
})

// API with query
app.get('/test1', (req, res) => {
  const { name, age } = req.query
  return res.json({ name, age })
})
// API with body
app.get('/test2', (req, res) => {
  const { name, age } = req.body
  return res.json({ name, age })
})
// API with params
app.get('/book/:name', (req, res) => {
  const { name } = req.params
  return res.json({ name })
})
// API with params
app.get('/product/:category/:item', (req, res) => {
  const { category, item } = req.params
  return res.status(200).json({ category, item })
})

studentsSQLiteAPI(app, db)
booksSQLite(app, db)