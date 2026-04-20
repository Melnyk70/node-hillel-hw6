# ДЗ 6. Cookies, UTM, Cart

## Структура

- `01_html_with_utm` — HTML-файл із шаблону
- `02_express` — Express-додаток для Task 03–06
- `03_cart` — Express-додаток на основі шаблону для Task 08–10

## Запуск

### 02_express

```bash
cd 02_express
npm install
npm start
```

Відкрити: `http://localhost:3500/`

### 03_cart

```bash
cd 03_cart
npm install
npm start
```

Відкрити: `http://localhost:3000/`

## Реалізовано

### 02_express

- `/` — повертає `Server works`
- `/product` — створює cookies для:
  - `utm_source`
  - `utm_medium`
  - `utm_campaign`
  - `utm_term`
- час життя UTM cookies — 25 днів
- middleware для `uid`:
  - якщо cookie відсутня або її значення не має довжини 16 символів, створюється нова
- `/clear` — очищає всі cookies

### 03_cart

- `/` — віддає `index.html`
- `/cart` — читає cookie `cart`, отримує URL товару та кількість, перевіряє `stock` у `data/goods.json`

## Перевірені сценарії

- товар є в наявності → `1`
- товару недостатньо → `0`
- кошик порожній → `cart is empty`
