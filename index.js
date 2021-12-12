const express = require('express')
const expressHandlebars  = require('express-handlebars')
const routes = require('./routes/routes')

const app = express()

app.engine('handlebars', expressHandlebars())
app.set('view engine', 'handlebars')

app.use(express.static('resources'))
app.use(routes)

app.listen(3000)