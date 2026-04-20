# ДЗ 6. Cookies, UTM, Cart

## Структура

* `01\_html\_with\_utm` — HTML-файл із шаблону 
* `02\_express` — Express-додаток для Task 03-06
* `03\_cart` — Express-додаток на основі шаблону для Task 08-10

## Запуск

### 02\_express

```bash
cd 02\_express
npm install
npm start
```

Відкрити: `http://localhost:3500/`\\

### 03\_cart

```bash
cd 03\_cart
npm install
npm start
```

Відкрити: `http://localhost:3000/`

## Реалізовано

* `/` -> `Server works`
* `/product` -> створення cookies для `utm\_source`, `utm\_medium`, `utm\_campaign`, `utm\_term` на 25 днів
* middleware для `uid` -> якщо cookie немає або довжина не 16 символів, створюється нова
* `/clear` -> очищення всіх cookies
* `/` у `03\_cart` -> віддає `index.html`
* `/cart` -> читає cookie `cart`, бере URL товару і кількість, перевіряє `stock` у `data/goods.json`

