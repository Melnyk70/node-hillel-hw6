import { COOKIE_MAX_AGE } from '../config/constants.js';

export const uidCookieOptions = {
  maxAge: COOKIE_MAX_AGE,
  httpOnly: true,
  sameSite: 'lax',
};

export const utmCookieOptions = {
  maxAge: COOKIE_MAX_AGE,
  sameSite: 'lax',
};
