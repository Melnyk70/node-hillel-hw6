import crypto from 'crypto';

export default function generateUid() {
  return crypto.randomBytes(8).toString('hex');
}
