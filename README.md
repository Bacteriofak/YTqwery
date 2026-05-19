# YTqwery

Полноценное веб-приложение для анализа YouTube, вдохновлённое функционалом BlackQuery.

## Что реализовано

- Поиск видео и ниш в YouTube
- Фильтрация по просмотрам, дате и сортировка
- Анализ SEO для выбранного видео
- Подбор ключевых слов
- Аналитика конкурента и топ-видео
- Светлая современная тема интерфейса
- Backend на Express с мок-данными и возможностью подключения YouTube Data API по ключу

## Запуск

1. Установите зависимости:

```bash
npm install
```

2. Запустите приложение в режиме разработки:

```bash
npm run dev
```

3. Откройте в браузере:

`http://localhost:5173`

## Использование YouTube Data API

Для подключения настоящих данных YouTube создайте переменную окружения `YOUTUBE_API_KEY` и перезапустите сервер.

```bash
export YOUTUBE_API_KEY="ВАШ_API_KEY"
npm run dev
```

## Структура

- `src/` — frontend на React + Vite
- `server/` — backend на Express
- `src/components/` — компоненты интерфейса
- `src/data/mockData.ts` — образцы видео и ключевых слов

## Сборка

```bash
npm run build
```

Для production-режима:

```bash
npm run build
npm run serve
```
