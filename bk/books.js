function booksSQLite(app, db) {
  db.run(`
  CREATE TABLE IF NOT EXISTS books (
    [id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    [name] TEXT,
    [price] TEXT
    )
  `);

  app.get('/api/books', (req, res) => {
    const sql = "SELECT * FROM books"
    db.all(sql, (error, result) => {
      if (error) return res.json(error.message)
      return res.json(result)
    })
  })

  app.get('/api/books/:id', (req, res) => {
    const { id } = req.params
    const sql = "SELECT * FROM books WHERE id=?"
    db.get(sql, [id], (error, result) => {
      if (error) return res.json(error.message)
      return res.json(result)
    })
  })

  app.post('/api/books', (req, res) => {
    const { name, price } = req.body
    const sql = "INSERT INTO books (name,price) VALUES (?,?)"
    db.run(sql, [name, price], (error) => {
      if (error) return res.json(error.message)
      return res.json(name + " book added")
    })
  })

  app.post('/api/books/:id', (req, res) => {
    const { id } = req.params
    const { name, price } = req.body
    const sql = "UPDATE books set name=?, price=? WHERE id=?"
    db.run(sql, [name, price, id], (error) => {
      if (error) return res.json(error.message)
      return res.json(name + " book updated")
    })
  })

  app.delete('/api/books', (req, res) => {
    const sql = "DELETE FROM books"
    db.run(sql, (error) => {
      if (error) return res.json(error.message)
      return res.json("all books deleted")
    })
  })

  app.delete('/api/books/:id', (req, res) => {
    const { id } = req.params
    const sql = "DELETE FROM books WHERE id=?"
    db.run(sql, [id], (error) => {
      if (error) return res.json(error.message)
      return res.json(id + " book deleted")
    })
  })


}
module.exports = { booksSQLite }