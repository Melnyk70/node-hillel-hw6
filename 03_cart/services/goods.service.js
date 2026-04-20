import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const goodsPath = path.join(__dirname, '..', 'data', 'goods.json');

export async function getGoods() {
  const goodsData = await fs.readFile(goodsPath, 'utf-8');
  return JSON.parse(goodsData);
}
