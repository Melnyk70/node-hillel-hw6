import express from 'express';
import cookieParser from 'cookie-parser';
import crypto from 'crypto';

const app = express();
const PORT = process.env.PORT || 3500;
const COOKIE_MAX_AGE = 25 * 24 * 60 * 60 * 1000;
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term'];

app.use(cookieParser());

app.use((req, res, next) => {
  const { uid } = req.cookies;

  if (typeof uid !== 'string' || uid.length !== 16) {
    res.cookie('uid', crypto.randomBytes(8).toString('hex'), {
      maxAge: COOKIE_MAX_AGE,
      httpOnly: true,
      sameSite: 'lax',
    });
  }

  next();
});

app.get('/', (req, res) => {
  res.send('Server works');
});

app.get('/product', (req, res) => {
  for (const key of UTM_KEYS) {
    const value = req.query[key];

    if (typeof value === 'string' && value.trim() !== '') {
      res.cookie(key, value, {
        maxAge: COOKIE_MAX_AGE,
        sameSite: 'lax',
      });
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
