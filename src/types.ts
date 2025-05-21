export interface WidgetOptions {
    /**
     * Элемент DOM, в который будет монтироваться виджет
     */
    target: HTMLElement;
    
    /**
     * Контент для отображения в виджете
     */
    content?: string;
    
    /**
     * Заголовок виджета
     */
    title?: string;
    
    /**
     * Настройки внешнего вида
     */
    theme?: {
        primaryColor?: string;
        fontSize?: string;
        borderRadius?: string;
    };
    
    /**
     * Настройки модального окна
     */
    modal?: {
        /**
         * Показывать ли модальное окно при инициализации
         */
        show?: boolean;
        
        /**
         * Заголовок модального окна
         */
        title?: string;
        
        /**
         * Содержимое модального окна
         */
        content?: string;
        
        /**
         * Обработчик нажатия на кнопку OK
         */
        onOk?: () => void;
        
        /**
         * Обработчик нажатия на кнопку CANCEL
         */
        onCancel?: () => void;
    };
    
    /**
     * Колбэк для событий виджета
     */
    onAction?: (action: string, data?: any) => void;
}

export interface WidgetProps {
    options: WidgetOptions;
}

export interface ModalProps {
    title?: string;
    content?: string;
    onOk?: () => void;
    onCancel?: () => void;
    autoShow?: boolean;
} 