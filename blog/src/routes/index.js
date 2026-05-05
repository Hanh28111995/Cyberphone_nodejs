import phonesRouter from './phoneList.js';
import cartRouter from './cart.js';
import accesoriesRouter from './accesories.js';
import blogRouter from './blog.js';
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
          .sort((a, b) => {
              // Hàm bổ trợ để biến chuỗi "28.990.000 ₫" thành số 28990000
              const parsePrice = (priceStr) => {
                  if (!priceStr) return 0;
                  // Dùng Regex xóa tất cả ký tự không phải là số
                  return Number(priceStr.replace(/[^0-9]/g, ""));
              };
      
              return parsePrice(b.price) - parsePrice(a.price); // Sắp xếp giảm dần
          });          

      return res.render('home', {
        products: newProducts?.slice(0, 5),
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
  app.use('/blog', blogRouter);
  app.use('/cart', cartRouter);
}

