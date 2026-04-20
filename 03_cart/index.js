import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/cart', async (req, res) => {
  const { cart } = req.cookies;

  if (!cart) {
    return res.send('cart is empty');
  }

  let parsedCart;

  try {
    parsedCart = JSON.parse(cart);
  } catch {
    return res.send('0');
  }

  if (!parsedCart || typeof parsedCart !== 'object' || Array.isArray(parsedCart)) {
    return res.send('0');
  }

  const entries = Object.entries(parsedCart);

  if (entries.length === 0) {
    return res.send('cart is empty');
  }

  const [productUrl, quantityRaw] = entries[0];
  const quantity = Number(quantityRaw);

  if (!productUrl || !Number.isInteger(quantity) || quantity < 1) {
    return res.send('0');
  }

  const goodsPath = path.join(__dirname, 'data', 'goods.json');
  const goodsData = await fs.readFile(goodsPath, 'utf-8');
  const goods = JSON.parse(goodsData);

  const product = goods.find((item) => item.url === productUrl);

  if (!product) {
    return res.send('0');
  }

  if (Number(product.stock) >= quantity) {
    return res.send('1');
  }

  return res.send('0');
});

app.listen(PORT, () => {
  console.log(`Server works on http://localhost:${PORT}`);
});
