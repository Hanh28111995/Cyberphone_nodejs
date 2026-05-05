import phonesRouter from './phoneList.js';
import cartRouter from './cart.js';
import accesoriesRouter from './accesories.js';
import fs from 'fs';
import path from 'path';
import url from 'url';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export default function route(app) {
  // Khi truy cập http://localhost:3001/ sẽ render trang chủ (home.hbs)
  app.get('/', (req, res) => {
    try {
      const jsonPath = path.join(__dirname, '../util/phone_data.json');
      const fileData = fs.readFileSync(jsonPath, 'utf8');
      const products = fileData.trim() ? JSON.parse(fileData) : [];

      const newProducts = products
        .filter((p) => String(p.New).toLowerCase() === 'true')
        .slice(0, 10);

      return res.render('home', {
        products: newProducts.length ? newProducts : products.slice(0, 10),
        pathname: url.parse(req.originalUrl).pathname,
      });
    } catch (e) {
      return res.render('home', {
        products: [],
        pathname: url.parse(req.originalUrl).pathname,
      });
    }
  });

  // Đảm bảo route /phone-list được đăng ký
  app.use('/phone-list', phonesRouter);
  app.use('/accesories', accesoriesRouter);
  app.use('/cart', cartRouter);
}

