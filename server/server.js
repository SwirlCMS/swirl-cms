const express = require('express')
const cors = require('cors')
const {
  createPage,
  createComponentSchemas,
  getComponentSelection,
  getPageBySlug,
} = require('./controllers')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/page', async (req, res) => {
  const results = await createPage(req.body)

  return res.json(results)
})

app.get('/page', async (req, res) => {
  const results = await getPageBySlug(req.query.slug)
  console.log(results)

  return res.json(results)
})

app.post('/components/schemas', async (req, res) => {
  const results = await createComponentSchemas(req.body)

  return res.json(results)
})

app.get('/components/selection', async (req, res) => {
  return res.json(await getComponentSelection())
})

app.listen(3001, () => {
  console.log(`Example app listening on port 3001`)
})
