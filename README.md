# Hubnity

Фронтенд-приложение для тайм-трекинга и управления командной продуктивностью.

## Технологии

- **Next.js 16** (App Router), **React 19**, **TypeScript**
- **Tailwind CSS 4**, **Radix UI**, **Framer Motion**
- **React Query** — серверное состояние, **Zustand** — клиентское состояние
- **React Hook Form** + **Zod** — формы и валидация
- **Biome** — линтинг и форматирование, **Husky** — pre-commit хуки
- **Sentry** — мониторинг ошибок

## Архитектура (FSD)

Проект построен по методологии [Feature-Sliced Design](https://feature-sliced.design):

```
src/
├── app/         — роуты и лейауты Next.js (App Router)
├── widgets/     — составные блоки UI (sidebar, header, dashboard, ...)
├── features/    — бизнес-фичи (auth, timer, analytics, ...)
├── entities/    — доменные сущности (user, project, time-entry, ...)
├── shared/      — общее (ui-компоненты, hooks, lib, config)
```

Импорты идут строго сверху вниз по слоям: `app → widgets → features → entities → shared`. Слой не может импортировать из слоя выше или из соседних модулей на своём уровне.

## Запуск

```bash
# Установка зависимостей
pnpm install

# Dev-сервер (http://localhost:3000)
pnpm dev

# Продакшен-билд
pnpm build

# Линтинг и форматирование
pnpm lint
pnpm format
```

## Переменные окружения

Скопируйте `.env.local.example` → `.env.local` и заполните значения:

| Переменная             | Описание         |
| ---------------------- | ---------------- |
| `NEXT_PUBLIC_API_URL`  | URL бэкенд-API   |
| `NEXT_PUBLIC_APP_URL`  | URL фронтенда    |
