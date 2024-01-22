const mysql = require("mysql")
const mydb = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydb"
});
function Mysql_Fruits(app) {
  mydb.getConnection(function (err, connection) {
    if (err) {
      console.err("Error connecting to the database", err);
      return;
    }
  })

  mydb.query(`CREATE TABLE IF NOT EXISTS fruits (
    id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name TEXT,
    price TEXT
    )`, (error, result) => {
    if (error) console.error(error);
  })

  // add one friut
  app.post('/api/fruits', (req, res) => {
    const { name, price } = req.body
    const sql = `INSERT INTO fruits (name,price) VALUES (?,?)`
    mydb.query(sql, [name, price], (error, result) => {
      if (error) res.json(error.message)
      res.json("Fruit added")
    })
  })

  // get all fruits
  app.get('/api/fruits', (req, res) => {
    const sql = `SELECT * FROM fruits`
    mydb.query(sql, (error, result) => {
      if (error) res.json(error.message)
      res.json(result)
    })
  })

  // get one fruit
  app.get('/api/fruits/:id', (req, res) => {
    const { id } = req.params
    const sql = `SELECT * FROM fruits WHERE id=?`
    mydb.query(sql, [id], (error, result) => {
      if (error) res.json(error.message)
      res.json(result)
    })
  })

  // delete one fruits
  app.delete('/api/fruits/:id', (req, res) => {
    const { id } = req.params
    const sql = `DELETE FROM fruits WHERE id=?`
    mydb.query(sql, [id], (error, result) => {
      if (error) res.json(error.message)
      res.json(result)
    })
  })
  // delete all fruits
  app.delete('/api/fruits/', (req, res) => {
    const sql = `DELETE FROM fruits`
    mydb.query(sql, (error, result) => {
      if (error) res.json(error.message)
      res.json(result)
    })
  })

  // Update fruits
  app.post('/api/fruits/:id', (req, res) => {
    const { id } = req.params
    const { name, price } = req.body
    const sql = `UPDATE fruits set name=?,price=? WHERE id=?`
    mydb.query(sql, [name, price, id], (error, result) => {
      if (error) res.json(error.message)
      res.json(result)
    })
  })

}
module.exports = { Mysql_Fruits }