import phonesRouter from './phoneList.js';
import cartRouter from './cart.js';
import accesoriesRouter from './accesories.js';


export default function route(app) {
  // Khi truy cập http://localhost:3001/ sẽ render trang chủ (home.hbs)
  app.get('/', (req, res) => {
      return res.render('home');
  });

  // Đảm bảo route /phone-list được đăng ký
  app.use('/phone-list', phonesRouter);
  app.use('/accesories', accesoriesRouter);
  app.use('/cart', cartRouter);
}

