import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  PORT,
  CART_EMPTY_RESPONSE,
  CART_AVAILABLE_RESPONSE,
  CART_NOT_AVAILABLE_RESPONSE,
} from './config/constants.js';
import { getCartEntry } from './utils/cart.js';
import { getGoods } from './services/goods.service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cookieParser());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/cart', async (req, res) => {
  const cartEntry = getCartEntry(req.cookies.cart);

  if (cartEntry.type === 'empty') {
    return res.send(CART_EMPTY_RESPONSE);
  }

  if (cartEntry.type === 'invalid') {
    return res.send(CART_NOT_AVAILABLE_RESPONSE);
  }

  const goods = await getGoods();
  const product = goods.find((item) => item.url === cartEntry.productUrl);

  if (!product) {
    return res.send(CART_NOT_AVAILABLE_RESPONSE);
  }

  if (Number(product.stock) >= cartEntry.quantity) {
    return res.send(CART_AVAILABLE_RESPONSE);
  }

  return res.send(CART_NOT_AVAILABLE_RESPONSE);
});

app.listen(PORT, () => {
  console.log(`Server works on http://localhost:${PORT}`);
});
