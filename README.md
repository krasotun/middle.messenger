# Middle Messenger

Учебный проект мессенджера: набор сверстанных экранов с базовой сборкой на Vite и шаблонами Handlebars.

## Функциональность

- Готовые страницы: вход, регистрация, чаты, редактирование профиля, 404/500
- Валидация форм (логин, пароль, email, телефон, длина и обязательность)
- Отправка форм: логирование валидности и значений (заготовка)
- HTTP транспорт: обертка над `XMLHttpRequest` с методами `get/put/post/delete`, таймаутом, заголовками и сериализацией query для GET
- Компонентный подход на базе собственного Block
  - Общие компоненты: Input, Button, Link, ErrorPage
  - Экранные компоненты: формы входа/регистрации/профиля, messenger

Деплой: https://stellular-crumble-c98f8b.netlify.app

## Страницы

- Вход: [index.html](./index.html)
- Регистрация: [sign-up.html](./sign-up.html)
- Чаты: [main.html](./main.html)
- Редактирование профиля: [edit-profile.html](./edit-profile.html)
- Ошибка 404: [404.html](./404.html)
- Ошибка 500: [500.html](./500.html)

## Команды

- `npm install` — установка зависимостей
- `npm run dev` — запуск dev-сервера
- `npm run build` — сборка проекта (typecheck + lint + stylelint)
- `npm run preview` — предпросмотр сборки
- `npm run start` — пересборка и предпросмотр
- `npm run lint` — ESLint
- `npm run lint:styles` — Stylelint
- `npm run typecheck` — проверка типов TypeScript
- `npm run format` — форматирование Prettier

## Инструменты

- Vite — сборка и dev-сервер
- Handlebars — шаблоны
- TypeScript — типизация
- PostCSS + postcss-nested — обработка CSS
- ESLint — линтинг JS/TS
- Stylelint — линтинг CSS
- Prettier — форматирование


пользователиp@ssw0rdQAZXSW@@

krasotun
alcozavr
zavroalk
p@ssw0rdQAZXSW@@