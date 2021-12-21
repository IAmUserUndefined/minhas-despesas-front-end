const express = require('express')
const { engine }  = require('express-handlebars')
const routes = require('./routes/routes')

const app = express()

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

app.use(express.static('resources'))
app.use(routes)

app.listen(process.env.PORT || 3000)