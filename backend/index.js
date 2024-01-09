const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./mydb.db')

const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.listen(4000, () => {
  // console.log("Server is running on port 4000");
})

app.get('/', (req, res) => {
  return res.json(['hai', 'apple', 'bat'])
})

app.get('/test1', (req, res) => {
  return res.json({
    name: 'john',
    age: 20
  })
})

app.get('/test2', (req, res) => {
  const { fname, lname } = req.query
  return res.json({ fname, lname })
})

app.post('/test3', (req, res) => {
  const { address, phone } = req.body
  return res.json({ address, phone })
})

app.get('/student', (req, res) => {
  const sql = "SELECT * FROM student"
  db.all(sql, (error, result) => {
    return res.json(result)
  })
})

app.post('/student', (req, res) => {
  const { name, phone } = req.body
  const sql = "INSERT INTO student (name,phone) values (?,?)"

  db.run(sql, [name, phone], (error) => {
    if (error) {
      return res.json(error.message)
    }
    return res.json(`${name} added successfully.`)
  })
})