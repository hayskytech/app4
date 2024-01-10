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

// Get all students 
app.get('/student', (req, res) => {
  const sql = "SELECT * FROM student"
  db.all(sql, (error, result) => {
    if (error) return res.json(error.message)
    return res.json(result)
  })
})

// Get one student by id
app.get('/student/:id', (req, res) => {
  const id = req.params.id
  const sql = "SELECT * FROM student WHERE id =?"
  db.all(sql, [id], (error, result) => {
    if (error) return res.json(error.message)
    if (result.length === 0) return res.json("No data found")
    return res.json(result[0])
  })
})

// Add / Insert student 
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

// Update existing student by id
app.post('/student/:id', (req, res) => {
  const id = req.params.id
  const { name, phone } = req.body
  const sql = "UPDATE student set name=?, phone=? WHERE id = ?"
  db.run(sql, [name, phone, id], (error) => {
    if (error) return res.json(error.message)
    return res.json(`${id} updated successfully`)
  })
})

// Delete one student by id
app.delete('/student/:id', (req, res) => {
  const id = req.params.id
  const sql = "DELETE FROM student WHERE id = ?"
  db.run(sql, [id], (error) => {
    if (error) return res.json(error.message)
    return res.json(`${id} deleted successfully.`)
  })
})

// Delete all students
app.delete('/student', (req, res) => {
  const sql = "DELETE FROM student"
  db.run(sql, (error) => {
    if (error) return res.json(error.message)
    return res.json(`All data deleted successfully.`)
  })
})