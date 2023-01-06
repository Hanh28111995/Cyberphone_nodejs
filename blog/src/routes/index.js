import phonesRouter from './phoneList.js';
import sitesRouter from './site.js';
import coursesRouter from './courses.js';
import myprofileRouter from './myProfile.js';


export default function route(app) {
  // app.get('/', (req, res) => {
  //     return res.render('home');
  // });

  
  app.use('/courses', coursesRouter);
  app.use('/my-profile',myprofileRouter)

  app.use('/', sitesRouter);
  app.use('/phone-list', phonesRouter);

  // app.get('/search', (req, res) => {
  //     return res.render('search');
  // });

  // app.post('/search', (req, res) => {
  // console.log(req.query);   /// dung cho GET (lay param Query paremeter)
  // console.log(req.body);    /// dunG cho POST (lay param Form data)
  //     return res.send('');
  // });
}

