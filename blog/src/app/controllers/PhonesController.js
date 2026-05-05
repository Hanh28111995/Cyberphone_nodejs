import CopyDB from '../../util/mongoose.js'
import url from 'url'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import https from 'https'
import http from 'http'
import crypto from 'crypto'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class PhonesController {
  //[GET] /phoneList
  show(req, res, next) {
    let type_search = req.query.type || ''
    let page = req.query.p || 1
    let pageSize = 9
    let skip = (page - 1) * pageSize

    try {
      // Đọc dữ liệu từ file JSON
      const jsonPath = path.join(__dirname, '../../util/phone_data.json');
      const fileData = fs.readFileSync(jsonPath, 'utf8');
      const products = JSON.parse(fileData);

      // Đảm bảo chỉ truyền 5 option tĩnh sang view
      let AllTypes = ['Apple', 'Samsung', 'Xiaomi', 'Oppo', 'Others'];
      
      let filter_product = products;

      if (type_search !== '') {
        filter_product = products.filter((item) => {
          let typeLower = item.type.toLowerCase();
          let mainBrands = ['apple', 'samsung', 'xiaomi', 'oppo'];
          let isMainBrand = mainBrands.includes(typeLower);
          
          // Kiểm tra xem type của sản phẩm có khớp với hãng đang chọn không
          let matchedMain = type_search.toLowerCase() === typeLower;
          
          // Nếu người dùng chọn "Others"
          let matchedOthers = type_search.toLowerCase() === 'others' && !isMainBrand;
          
          return matchedMain || matchedOthers;
        });
      }
      let pageFilter_products = filter_product.slice(skip, skip + pageSize)
      
      let objectProduct = { AllTypes, products: pageFilter_products }

      const allProducts = objectProduct.products;

const top5Products = allProducts
    .sort((a, b) => {
        // Hàm bổ trợ để biến chuỗi "28.990.000 ₫" thành số 28990000
        const parsePrice = (priceStr) => {
            if (!priceStr) return 0;
            // Dùng Regex xóa tất cả ký tự không phải là số
            return Number(priceStr.replace(/[^0-9]/g, ""));
        };

        return parsePrice(b.price) - parsePrice(a.price); // Sắp xếp giảm dần
    })
    .slice(0, 5); 

      res.render('phones/phoneList', {
        newProducts: top5Products,
        products: objectProduct.products, // JSON đã là object thường, không cần CopyDB.MultiResponseToObject
        typeList: objectProduct.AllTypes,
        pathname: url.parse(req.originalUrl).pathname,
        response: type_search || '',
        pagination: {
          page: page, // The current page the user is on
          pageCount: Math.ceil(filter_product.length / pageSize), // Calculate real page count
        },
      })
    } catch (error) {
      console.log('Lỗi đọc file JSON:', error);
      next(error);
    }
  }
  
  //[GET] /phone-list/:slug
  detail(req, res, next) {
    try {
      const jsonPath = path.join(__dirname, '../../util/phone_data.json');
      const fileData = fs.readFileSync(jsonPath, 'utf8');
      const products = JSON.parse(fileData);
      
      const phone = products.find(p => p.slug === req.params.slug);
      
      if (!phone) {
        return res.status(404).send('Không tìm thấy điện thoại!');
      }

      res.render('phones/phoneDetail', {
        phone: phone
      });
    } catch (error) {
      console.log('Lỗi lấy thông tin chi tiết:', error);
      next(error);
    }
  }
}
export default new PhonesController()
