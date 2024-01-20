const jwt = require("jsonwebtoken")

function studentsSQLiteAPI(app, db) {

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
    if (!verifyToken(req, res)) return
    const { name, phone } = req.body
    const sql = "INSERT INTO students (name,phone) VALUES (?,?)"
    db.run(sql, [name, phone], (error) => {
      if (error) return res.status(500).json(error.message)
      return res.status(200).json("student added successfully");
    })
  })

  // delete one student by id
  app.delete('/students/:id', (req, res) => {
    if (!verifyToken(req, res)) return
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
    if (!verifyToken(req, res)) return
    const sql = "DELETE FROM students"
    db.run(sql, (error) => {
      if (error) return res.status(500).json(error.message)
      return res.status(200).json("all students deleted successfully");
    })
  })


  // update one studnet by id
  app.post('/students/:id', (req, res) => {
    if (!verifyToken(req, res)) return
    const { id } = req.params
    const { name, phone } = req.body
    const sql = "UPDATE students set name=? , phone=? where id=?"
    db.run(sql, [name, phone, id], (error) => {
      if (error) return res.status(500).json(error.message)
      return res.status(200).json("student updated successfully");
    })
  })

  function verifyToken(req, res) {
    const token = req?.headers?.authorization?.split(" ")[1];
    try {
      return jwt.verify(token, "RANDOM-TOKEN");
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        res.status(401).json({ error: "Token has expired" });
      } else {
        res.status(500).json({ error: "Token verification failed" });
      }
      return false
    }
  }


}

module.exports = { studentsSQLiteAPI }