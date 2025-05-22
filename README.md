# Preact Share Widget

Библиотека добавляем модалку для подтверждения cookie на страницу

Библиотека в стадии разработки

## Особенности

- без react, vue, angular и тд 
- использует библиотеку js-cookie для запоминания ответа от пользователя

## Установка

```bash
npm install using-cookie-modal
```

## Использование

### Вариант 1: Пример использовани с npm

```js

import initCookieModal from 'using-cookie-modal';


document.addEventListener('DOMContentLoaded', function() {
    initCookieModal({ /* some options here */ });
});

```

### Вариант 2: Подключение через тег script

```html

<script src="https://unpkg.com/using-cookie-modal/dist/index.js"></script>

<script>
    document.addEventListener('DOMContentLoaded', () => {
        initCookieModal({ /* some options here */ });
    });
</script>

```

## Опции initCookieModal (options)

В разработки


## Лицензия

CC 