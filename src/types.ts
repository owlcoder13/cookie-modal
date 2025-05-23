export interface CookieCategory {
    key: string;
    label: string;
    description?: string;
    locked?: boolean;
}

export interface CookieModalOptions {
    mainModalTitle: string;
    mainModalSubtitle: string;
    acceptAllButtonLabel: string;
    preferencesButtonLabel: string;
    preferencesModalTitle: string;
    saveButtonLabel: string;
    cookieCategories: CookieCategory[];
}

export type CookieCategoriesState = {
    [K in CookieCategory["key"]]: boolean;
};

declare global {
    interface Window {
        initCookieModal: (options?: CookieModalOptions) => void;
    }
}

export {};
