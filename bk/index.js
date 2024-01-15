const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const sqlite3 = require('sqlite3')
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


db.run(`
  CREATE TABLE IF NOT EXISTS students (
    [id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    [name] TEXT,
    [phone] TEXT
    )
  `);

// get all students
app.get("/students", (req, res) => {
  const sql = "SELECT * FROM students"
  db.all(sql, (error, result) => {
    if (error) return res.status(500).json(error.message)
    return res.status(200).json(result);
  });
})
// get one student by id
app.get("/students/:id", (req, res) => {
  const { id } = req.params
  const sql = "SELECT * FROM students where id=?"
  db.get(sql, [id], (error, result) => {
    if (error) return res.status(500).json(error.message)
    return res.status(200).json(result);
  });
})

// add a studnets
app.post('/students', (req, res) => {
  const { name, phone } = req.body
  const sql = "INSERT INTO students (name,phone) VALUES (?,?)"
  db.run(sql, [name, phone], (error) => {
    if (error) return res.status(500).json(error.message)
    return res.status(200).json("student added successfully");
  })
})

// delete one student by id
app.delete('/students/:id', (req, res) => {
  const { id } = req.params
  // const id = req.params.id
  const sql = "DELETE FROM students where id=?"
  db.run(sql, [id], (error) => {
    if (error) return res.status(500).json(error.message)
    return res.status(200).json("student deleted successfully");
  })
})

// delete all students
app.delete('/students/', (req, res) => {
  const sql = "DELETE FROM students"
  db.run(sql, (error) => {
    if (error) return res.status(500).json(error.message)
    return res.status(200).json("all students deleted successfully");
  })
})


// update one studnet by id
app.post('/students/:id', (req, res) => {
  const { id } = req.params
  const { name, phone } = req.body
  const sql = "UPDATE students set name=? , phone=? where id=?"
  db.run(sql, [name, phone, id], (error) => {
    if (error) return res.status(500).json(error.message)
    return res.status(200).json("student updated successfully");
  })
})