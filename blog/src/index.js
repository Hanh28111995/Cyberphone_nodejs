const path = require('path')
const express = require('express')
var methodOverride = require('method-override')
const hbs = require('express-handlebars')
const app = express()
const port = process.env.PORT || 3002
const morgan = require('morgan')
// const { Console } = require('console')

const route = require('./routes') 
// call action for View local

const APIroute = require('./routesAPI')
// call action for API


const db = require('./config/db')

//connect to DB
db.connect()

app.use(express.static(path.join(__dirname, 'public')))

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

//connect route
route(app)
APIroute(app)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
