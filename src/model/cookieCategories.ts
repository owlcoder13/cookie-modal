export type CookieCategory =
    | "necessary"
    | "preferences"
    | "analytics"
    | "marketing";

export type CookieCategoriesState = {
    [K in CookieCategory]: boolean;
};

export interface CookieCategoryInfo {
    key: CookieCategory;
    label: string;
    description: string;
}

export const defaultCategories: CookieCategoriesState = {
    necessary: true,
    preferences: true,
    analytics: true,
    marketing: true,
};

/**
 * Список всех категорий с описанием
 */
export const cookieCategories: CookieCategoryInfo[] = [
    {
        key: "necessary",
        label: "Строго необходимые",
        description:
            "Обеспечивают базовую работу сайта (например, запоминание содержимого корзины и данных форм). Без них сайт будет работать некорректно.",
    },
    {
        key: "preferences",
        label: "Предпочтения",
        description:
            "Позволяют сохранять настройки пользователя, такие как язык или регион.",
    },
    {
        key: "analytics",
        label: "Анатилические",
        description:
            "Помогают анализировать взаимодействие пользователей с сайтом, собирают обезличенную статистику.",
    },
    {
        key: "marketing",
        label: "Маркетинговые",
        description:
            "Используются для отслеживания пользователей и показа релевантной рекламы.",
    },
];
