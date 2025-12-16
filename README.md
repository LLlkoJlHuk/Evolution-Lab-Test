# Компонент карты развития с последовательными уроками.

## Запуск

```bash
npm install
npx expo start
```

Открыть можно:

- В браузере (нажать `w`)
- Expo Go на телефоне (сканировать QR)
- Эмулятор Android/iOS

## Описание

- Список уроков с 3 статусами (done/active/locked)
- Клик по active выводит в консоль "Start lesson"
- Клик по locked показывает алерт
- TypeScript

## Структура

```
src/
├── types/lesson.ts
├── data/lessons.ts
└── components/
    ├── GrowthMap.tsx
    └── LessonItem.tsx
```
