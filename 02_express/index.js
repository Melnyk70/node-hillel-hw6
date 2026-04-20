import express from 'express';
import cookieParser from 'cookie-parser';
import { PORT, UTM_KEYS } from './config/constants.js';
import ensureUid from './middleware/ensureUid.js';
import { utmCookieOptions } from './utils/cookieOptions.js';

const app = express();

app.use(cookieParser());
app.use(ensureUid);

app.get('/', (req, res) => {
  res.send('Server works');
});

app.get('/product', (req, res) => {
  for (const key of UTM_KEYS) {
    const value = req.query[key];

    if (typeof value === 'string' && value.trim() !== '') {
      res.cookie(key, value, utmCookieOptions);
    }
  }

  res.send('Product page');
});

app.get('/clear', (req, res) => {
  Object.keys(req.cookies || {}).forEach((cookieName) => {
    res.clearCookie(cookieName);
  });

  res.send('Cookies cleared');
});

app.listen(PORT, () => {
  console.log(`Server works on http://localhost:${PORT}`);
});
