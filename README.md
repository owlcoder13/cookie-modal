# Preact Share Widget

Подключаемый виджет для кнопки "Поделиться" на Preact, который можно использовать на любом сайте.

## Особенности

- Легковесный виджет на Preact
- Адаптивный дизайн
- Поддержка настройки через опции
- Автоматически использует существующий Preact/React, если он доступен на странице
- Подключается как UMD или ESM модуль

## Установка

```bash
npm install preact-share-widget
```

## Использование

### Вариант 1: Использование в проекте с NPM

```js
import PreactShareWidget from 'preact-share-widget';

// Монтирование виджета
const widget = PreactShareWidget.mount({
  target: document.getElementById('widget-container'),
  content: 'Этим контентом можно поделиться',
  title: 'Поделитесь с друзьями',
  onAction: (action, data) => {
    console.log(`Действие: ${action}`, data);
  }
});

// Демонтирование виджета при необходимости
// widget.unmount();
```

### Вариант 2: Подключение через тег script

```html
<div id="widget-container"></div>

<script src="https://unpkg.com/preact-share-widget/dist/index.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', () => {
    PreactShareWidget.mount({
      target: document.getElementById('widget-container'),
      content: 'Этим контентом можно поделиться'
    });
  });
</script>
```

## Опции

| Опция | Тип | Описание |
|-------|-----|----------|
| `target` | HTMLElement | **Обязательно**. DOM элемент для монтирования виджета |
| `content` | string | Контент для отображения в виджете |
| `title` | string | Заголовок виджета |
| `theme` | object | Настройки темы (primaryColor, fontSize, borderRadius) |
| `onAction` | function | Колбэк вызываемый при действиях пользователя |

## Разработка

```bash
# Установка зависимостей
npm install

# Запуск сервера разработки
npm run dev

# Сборка для продакшена
npm run build

# Запуск тестов
npm run test
```

## Лицензия

ISC 