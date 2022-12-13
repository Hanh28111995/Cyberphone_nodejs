const path = require('path');
const express = require('express');
const hbs = require('express-handlebars');
const app = express();
const port = 3000;
const morgan = require('morgan');
// const { Console } = require('console')

const route = require('./routes');
const db = require('./config/db');

//connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(
  express.urlencoded({
    extended: true,
  }),
); //xu li request value từ Form data

app.use(express.json()); //xu li request value từ js (xmlHttprequest, fetch, axios)

//http logger
// app.use(morgan('combined'))

//Template engine
app.engine(
  'hbs',
  hbs.engine({
    extname: '.hbs',
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));

//connect route
route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
