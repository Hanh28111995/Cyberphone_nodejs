const express = require('express')
const methodOverride = require('method-override')
const app = express()
const path = require('path')
const hbs = require('express-handlebars')
require('dotenv').config()

const port = process.env.PORT

// const morgan = require('morgan')
// const { Console } = require('console')
const route = require('./routes')
// call action for View local
const APIroute = require('./routesAPI')
// call action for API
const db = require('./config/db')
app.use(express.static(path.join(__dirname, '/public')))

//connect to DB
db.connect()
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

console.log('dotenv', process.env.MONGO_DB)
//connect route
route(app)
// mongoose.connect('mongodb://username:password@host:port/database?options...');
// APIroute(app)
app.disable('etag');
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
