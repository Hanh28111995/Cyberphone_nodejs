const newsRouter = require('./phoneList');
const sitesRouter = require('./site');
const coursesRouter = require('./courses');
const myprofileRouter = require('./myProfile');


function route(app) {
  // app.get('/', (req, res) => {
  //     return res.render('home');
  // });

  
  app.use('/courses', coursesRouter);
  app.use('/', sitesRouter);
  app.use('/phone-list', newsRouter);
  app.use('/my-profile',myprofileRouter)

  // app.get('/search', (req, res) => {
  //     return res.render('search');
  // });

  // app.post('/search', (req, res) => {
  // console.log(req.query);   /// dung cho GET (lay param Query paremeter)
  // console.log(req.body);    /// dunG cho POST (lay param Form data)
  //     return res.send('');
  // });
}
module.exports = route;
