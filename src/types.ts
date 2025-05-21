export interface CookieModelOptions {
    title?: string,
}

declare global {
    interface Window {
        initCookieModal: (options?: CookieModelOptions) => void;
    }
}

export {};
