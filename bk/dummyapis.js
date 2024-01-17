function dummyAPIs(app, db) {
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
}
module.exports = { dummyAPIs }