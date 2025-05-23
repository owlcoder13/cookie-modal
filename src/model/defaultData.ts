import {
    CookieCategoriesState,
    CookieCategory,
    CookieModalOptions,
} from "../types";

/**
 * Категории cookies по умолчанию
 */
export const defaultCookieCategories: CookieCategory[] = [
    {
        key: "necessary",
        label: "Строго необходимые",
        description:
            "Обеспечивают базовую работу сайта (например, запоминание содержимого корзины и данных форм). Без них сайт будет работать некорректно.",
        locked: true,
    },
    {
        key: "preferences",
        label: "Предпочтения",
        description:
            "Позволяют сохранять настройки пользователя, такие как язык или регион.",
        locked: false,
    },
    {
        key: "analytics",
        label: "Анатилические",
        description:
            "Помогают анализировать взаимодействие пользователей с сайтом, собирают обезличенную статистику.",
        locked: false,
    },
    {
        key: "marketing",
        label: "Маркетинговые",
        description:
            "Используются для отслеживания пользователей и показа релевантной рекламы.",
        locked: false,
    },
];

/**
 * Выбранные по умолчанию cookies
 */
export const defaultUserCookieCategories: CookieCategoriesState =
    Object.fromEntries(
        defaultCookieCategories.map((category) => [category.key, true])
    ) as CookieCategoriesState;

/**
 * Опции модального окна по умолчанию
 */
export const defaultCookieModalOptions: CookieModalOptions = {
    mainModalTitle: "Мы используем cookies",
    mainModalSubtitle: `Мы используем cookies для сбора статистики и улучшения пользовательского опыта. 
                Выберите, какие cookies вы разрешаете использовать.`,
    acceptAllButtonLabel: "Принять все",
    preferencesButtonLabel: "Настройки",
    saveButtonLabel: "Сохранить",
    preferencesModalTitle: "Выберите категории cookies",
    cookieCategories: defaultCookieCategories,
};
