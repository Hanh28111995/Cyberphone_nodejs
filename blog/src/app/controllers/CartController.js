import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class CartController {
  // [GET] /cart
  index(req, res, next) {
    try {
      const phonePath = path.join(__dirname, '../../util/phone_data.json');
      const accessoryPath = path.join(__dirname, '../../util/accesories-data.json');

      const phones = JSON.parse(fs.readFileSync(phonePath, 'utf8'));
      const accessoriesRaw = fs.readFileSync(accessoryPath, 'utf8');
      const accessories = accessoriesRaw.trim() ? JSON.parse(accessoriesRaw) : [];

      const products = [...phones, ...accessories];

      // Đọc cookie cart
      let cart = [];
      if (req.cookies && req.cookies.cart) {
        try {
          cart = JSON.parse(req.cookies.cart);
        } catch (e) {
          console.error('Lỗi parse giỏ hàng', e);
        }
      }

      // Map cart (chứa slug, qty) với data thật
      let cartItems = [];
      let totalPrice = 0;

      cart.forEach(cartItem => {
        const product = products.find(p => p.slug === cartItem.slug);
        if (product) {
          // Convert price từ string "28.990.000 ₫" sang number để tính tổng
          const rawPrice = parseInt(product.price.replace(/[^\d]/g, ''));
          const itemTotal = rawPrice * (cartItem.quantity || 1);
          totalPrice += itemTotal;

          cartItems.push({
            ...product,
            quantity: cartItem.quantity || 1,
            itemTotalFormatted: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(itemTotal)
          });
        }
      });

      const totalPriceFormatted = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice);

      res.render('cart/index', { 
        cartItems: cartItems, 
        totalPriceFormatted: totalPriceFormatted,
        isEmpty: cartItems.length === 0
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CartController();
