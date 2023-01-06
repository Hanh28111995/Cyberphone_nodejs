import express from 'express';
import methodOverride from 'method-override';
import path from 'path';
import { fileURLToPath } from 'url';
import hbs from 'express-handlebars';
import paginate from 'handlebars-paginate';
import morgan from 'morgan';
import { Console } from 'console';
import route from './routes/index.js';
import connect from './config/db/index.js';
import * as dotenv from 'dotenv'

const app = express();
dotenv.config()

const port = process.env.PORT

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// call action for View local
// call action for API
app.use(express.static(path.join(__dirname, '/public')))
//connect to DB
connect()
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
      va: process.env.PORT,
      json: (context) => {
        return JSON.stringify(context)
      },
      paginate: paginate
    },
  }),
)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '/resources', 'views'))

console.log('dotenv', process.env.MONGO_DB)
//connect route
route(app)
// mongoose.connect('mongodb://username:password@host:port/database?options...');
// APIroute(app)

app.disable('etag')
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
