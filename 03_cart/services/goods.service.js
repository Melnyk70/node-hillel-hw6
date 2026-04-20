import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const goodsPath = path.join(__dirname, '..', 'data', 'goods.json');

export async function getGoods() {
  try {
    const goodsData = await fs.readFile(goodsPath, 'utf-8');
    const parsedGoods = JSON.parse(goodsData);

    if (!Array.isArray(parsedGoods)) {
      return [];
    }

    return parsedGoods;
  } catch (error) {
    console.error('Failed to read goods.json:', error.message);
    return [];
  }
}
