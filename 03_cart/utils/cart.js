export function getCartEntry(cartCookieValue) {
  if (!cartCookieValue) {
    return { type: 'empty' };
  }

  let parsedCart;

  try {
    parsedCart = JSON.parse(cartCookieValue);
  } catch {
    return { type: 'invalid' };
  }

  if (!parsedCart || typeof parsedCart !== 'object' || Array.isArray(parsedCart)) {
    return { type: 'invalid' };
  }

  const entries = Object.entries(parsedCart);

  if (entries.length === 0) {
    return { type: 'empty' };
  }

  const [productUrl, quantityRaw] = entries[0];
  const quantity = Number(quantityRaw);

  if (!productUrl || !Number.isInteger(quantity) || quantity < 1) {
    return { type: 'invalid' };
  }

  return {
    type: 'ok',
    productUrl,
    quantity,
  };
}
