# Новая техника — сайт ntechnics.ru

Современный сайт компании «Новая техника» (продажа воздушных компрессоров и промышленной техники). Vite + React, форма заявки с отправкой на email.

## Стек

- **Frontend:** React 18, Vite, Styled Components, Framer Motion
- **Backend:** Express, Nodemailer (SMTP Yandex)

## Запуск

### Вариант 1 — всё сразу
```bash
npm run dev:all
```

### Вариант 2 — по отдельности
```bash
# Терминал 1: бэкенд (API + почта)
cd server && npm run dev

# Терминал 2: фронтенд
npm run dev
```

- **Сайт:** http://localhost:3000
- **API:** http://localhost:3001

### Bat-файлы (Windows)
- `restart.bat` — очистка портов и запуск
- `clear-ports.bat` — только очистка портов
- `start.bat` — запуск проекта

## Настройка почты

1. Скопируйте `server/.env.example` в `server/.env`
2. Заполните учётные данные SMTP (Yandex)
3. Для Яндекс: включите доступ почтовых программ в настройках ящика

## Сборка

```bash
npm run build
```

---

Разработано для компании «Новая техника».
