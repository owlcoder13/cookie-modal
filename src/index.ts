import { h, render } from 'preact';
import Widget from './components/Widget';
import { WidgetOptions } from './types';

// Проверка на наличие Preact в глобальном пространстве
const getPreact = (): typeof import('preact') => {
    if (typeof window !== 'undefined') {
        // Если Preact уже доступен глобально, используем его
        if ((window as any).preact) {
            return (window as any).preact;
        }
    }

    // Иначе используем локальную версию
    return require('preact');
};

// Основная функция для монтирования виджета
const mount = (options: WidgetOptions) => {

    console.log('mount', options);

    const { target } = options;

    if (!target) {
        console.error('Не указан целевой элемент для монтирования виджета');
        return;
    }

    const preact = getPreact();
    preact.render(preact.h(Widget, { options }), target);

    return {
        unmount: () => {
            preact.render(null, target);
        }
    };
};

// Функция для удаления виджета
const unmount = (target: HTMLElement) => {
    const preact = getPreact();
    preact.render(null, target);
};

// Экспортируем публичное API
const PreactShareWidget = {
    mount,
    unmount
};

// Делаем виджет доступным в глобальном пространстве имен
if (typeof window !== 'undefined') {
    (window as any).PreactShareWidget = PreactShareWidget;
}

export default PreactShareWidget; 