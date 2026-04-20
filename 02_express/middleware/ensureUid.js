import generateUid from '../utils/generateUid.js';
import { uidCookieOptions } from '../utils/cookieOptions.js';

export default function ensureUid(req, res, next) {
  const { uid } = req.cookies;

  if (typeof uid !== 'string' || uid.length !== 16) {
    res.cookie('uid', generateUid(), uidCookieOptions);
  }

  next();
}
