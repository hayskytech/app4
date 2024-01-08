const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./sample.db')
const bcrypt = require("bcrypt")
const saltRounds = 10
const jwt = require("jsonwebtoken")

function addSqliteAPIs(app) {

  app.get("/api/persons", (req, res) => {
    const sql = "SELECT * FROM persons"
    db.all(sql, (error, result) => {
      if (error) return res.status(500).json(error)
      res.status(200).json(result);
    });
  })

}
module.exports = { addSqliteAPIs }