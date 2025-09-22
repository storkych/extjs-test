# extjs-test

[**🔗 Демо: extjs-test.storkyproduct.ru**](https://extjs-test.storkyproduct.ru)

![ExtJS](https://img.shields.io/badge/ExtJS-6.0.0-1E88E5?logo=sencha&logoColor=white)
![JavaScript](https://img.shields.io/badge/ES6-JavaScript-F7DF1E?logo=javascript&logoColor=black)
![CDNJS](https://img.shields.io/badge/CDN-cdnjs-FF6F00?logo=cloudflare&logoColor=white)


---

## О проекте

Тестовое на **ExtJS 6**:

- экран входа (**admin / padmin**);
- главное окно с кнопками **«Товары»** и **«Выход»**, вкладки под списки;
- каждая кнопка «Товары» открывает **новую вкладку** со своим Store;
- **фильтры по Enter**: по **ID** (точное), по **описанию** (вхождение);
- таблица с колонками: **ID, Имя, Описание, Цена, Кол-во**;
- карточка товара (по клику по **Имени**): редактируем **Цена** (float ≥ 0) и **Кол-во** (int ≥ 0), с проверками и уведомлением об изменениях.

> UI-тема и фреймворк подключены с CDN (cdnjs). 

---

## Быстрый старт локально

**Вариант 1 (любой статический сервер):**
```bash
# в корне проекта
npx http-server -p 5173 .
# открыть http://localhost:5173
```

**Вариант 2 (XAMPP):**
- скопировать проект в `C:\xampp\htdocs\extjs-test`;
- открыть `http://localhost/extjs-test/`.


---

## Структура проекта

```
extjs-test/
├─ index.html                  # подключение Triton CSS и ext-all.js с CDN, старт app.js
├─ app.js                      # Ext.application 
└─ app/
   ├─ model/
   │  └─ Product.js            # поля: id, name, description, price, quantity
   ├─ store/
   │  └─ Products.js           # in-memory Store 
   ├─ util/
   │  └─ Validators.js         # singleton-валидаторы (float≥0, int≥0)
   ├─ controller/
   │  ├─ LoginController.js    # проверка admin/padmin, переход в Main
   │  ├─ MainController.js     # вкладки «Товары», «Выход»
   │  └─ ProductController.js  # фильтры по Enter, open Edit
   └─ view/
      ├─ login/
      │  └─ Login.js           # окно входа 
      ├─ main/
      │  └─ Main.js            # Viewport + toolbar + tabpanel
      └─ product/
         ├─ List.js            # фильтры + grid + store: { type: 'products' }
         └─ Edit.js            # карточка 
```

---

## Архитектура и навигация

- **Login → Main → ProductList → ProductEdit**:
  - `Login` создаётся при старте; успешный логин закрывает окно и создаёт `Main`.
  - `Main` содержит toolbar и tabpanel. Нажатие «Товары» добавляет **новую** вкладку `product-list`.
  - `product-list` создаёт **свой** `store: { type: 'products' }` и фильтрует по Enter.
  - Клик по колонке **Имя** открывает `product-edit` с данными записи.

---

## Деплой на VPS (кратко)

**Nginx (Ubuntu):**
```
/etc/nginx/sites-available/extjs-test
```
```nginx
server {
    listen 80;
    server_name extjs-test.storkyproduct.ru;

    root /var/www/extjs-test;
    index index.html;

    location / { try_files $uri $uri/ /index.html; }
    location ~* \.(?:js|css|png|jpg|jpeg|gif|svg|ico|woff2?|ttf)$ {
        expires 30d; add_header Cache-Control "public, immutable";
    }
    location = /index.html { add_header Cache-Control "no-cache"; }
    location ~ /\. { deny all; }
}
```
```bash
sudo ln -s /etc/nginx/sites-available/extjs-test /etc/nginx/sites-enabled/extjs-test
sudo nginx -t && sudo systemctl reload nginx
```

**SSL (Let’s Encrypt):**
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d extjs-test.storkyproduct.ru -m your@mail.com --agree-tos --redirect
```

---

## Использование ИИ 

**Модель:** GPT-5 Thinking  
**Где помогал:**
- Разбор структуры ExtJS 6: Loader, `requires`, `alias`/`xtype`.
- Исправление ошибок:
  - `Unrecognized alias: widget.product-list` → alias + requires.
  - `Unrecognized alias: store.products` → alias стора + requires.
  - Запросы на `/App.model.Product?...` → `proxy: { type: 'memory' }`.
  - `grid.getHeaderContainer is not a function` → `cellclick` отдаёт `view`, колонка через `getColumnManager()`.
  - `No type specified for controller.create` → отказ от инлайн-контроллера; `defaultListenerScope`/VC.
  - Пустой экран при логине → `show()`/`autoShow` у окна логина.
- Настройка деплоя.

**Примеры вопросов:**  
«Где прописывать `requires`?»,  
«Почему не распознаётся alias `widget.product-list` / `store.products`?»,  
«Почему лезет запрос на `/App.model.Product` и как это убрать?»,  
«Почему `getHeaderContainer` не работает в `cellclick`?».


