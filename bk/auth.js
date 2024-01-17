const bcrypt = require("bcrypt")
const saltRounds = 10
const jwt = require("jsonwebtoken")

function AuthenticationAPIs(app, db) {

  db.run(`
  CREATE TABLE IF NOT EXISTS users (
    [id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    [username] TEXT,
    [password] TEXT
    )`);

  app.post('/auth/register', (req, res) => {
    const { username, password } = req.body
    const sql = "SELECT id FROM users WHERE username=?"
    db.get(sql, [username], (error, result) => {
      if (error) return res.json(error.message)
      if (result) return res.json('user already exists')
      const sql = "INSERT INTO users (username,password) values (?,?)"
      bcrypt
        .genSalt(saltRounds)
        .then(salt => {
          return bcrypt.hash(password, salt)
        })
        .then(hash => {
          db.run(sql, [username, hash], (error) => {
            if (error) return res.json(error.message)
            console.log('error', error);
            return res.json('user created')
          })
        })
    })
  })

  app.post("/auth/login", (req, res) => {
    const { username, password } = req.body
    const sql = `SELECT * FROM users WHERE username=?`
    db.get(sql, [username], (error, result) => {
      if (error) return res.status(500).json(error)
      if (!result) return res.status(404).json('User not found')
      bcrypt.compare(password, result.password)
        .then((matched) => {
          if (!matched) return res.status(500).json('Wrong password')
          const token = jwt.sign(
            { userId: username, },
            "RANDOM-TOKEN",
            { expiresIn: "30d" }
          )
          res.status(200).json({ username, token });
        })
        .catch(err => res.status(500).json(err.message))
    })
  })

  app.get('/auth/users', (req, res) => {
    const sql = "SELECT * FROM users"
    db.all(sql, (error, result) => {
      if (error) return res.json(error.message)
      return res.json(result)
    })
  })
}

module.exports = { AuthenticationAPIs }