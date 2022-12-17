const path = require('path')
const express = require('express')
var methodOverride = require('method-override')
const hbs = require('express-handlebars')
const app = express()
const port = process.env.PORT || 3001
const morgan = require('morgan')
// const { Console } = require('console')

const route = require('./routes')
// call action for View local

const APIroute = require('./routesAPI')
// call action for API

const db = require('./config/db')
app.use(express.static(path.join(__dirname, 'public')))

//connect to DB
db.connect()

//connect route
route(app)
APIroute(app)

app.use(
  express.urlencoded({
    extended: true,
  }),
) //xu li request value từ Form data

app.use(express.json()) //xu li request value từ js (xmlHttprequest, fetch, axios)

app.use(methodOverride('_method'))
//http logger
// app.use(morgan('combined'))

//Template engine
app.engine(
  'hbs',
  hbs.engine({
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
    },
  }),
)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

app.disable('etag');

app.listen(port, '0.0.0.0', () => {
  console.log(`App listening at http://localhost:${port}`)
})
