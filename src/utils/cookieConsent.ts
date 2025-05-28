import Cookies from "js-cookie";
import { CookieCategoriesState } from "../types";

// Ключ в хранилище
const CONSENT_KEY = "cookieConsent";

// Возможные варианты типов хранилища
type SaveMode = "cookies" | "localStorage";

// Текущий режим хранилища cookies
const CURRENT_MODE: SaveMode = "cookies";

function setCookie(name: string, value: string) {
    Cookies.set(name, value);
}

function getCookie(name: string): string | null {
    return Cookies.get(name) ?? null;
}

export function getConsent(): CookieCategoriesState | null {
    let raw: string | null;

    if (CURRENT_MODE === "cookies") {
        raw = getCookie(CONSENT_KEY);
        if (!raw) return null;
        try {
            let consent = JSON.parse(raw);

            if (typeof consent === "string") {
                consent = JSON.parse(consent);
            }
            return consent;
        } catch {
            return null;
        }
    } else {
        raw = localStorage.getItem(CONSENT_KEY);
        if (!raw) return null;
        try {
            return JSON.parse(raw);
        } catch {
            return null;
        }
    }
}

export function hasConsent(): boolean {
    if (CURRENT_MODE === "cookies") {
        return !!getCookie(CONSENT_KEY);
    } else {
        return !!localStorage.getItem(CONSENT_KEY);
    }
}

export function saveConsent(categories: CookieCategoriesState) {
    const data = JSON.stringify(categories);
    if (CURRENT_MODE === "cookies") {
        setCookie(CONSENT_KEY, data);
    } else {
        localStorage.setItem(CONSENT_KEY, data);
    }
}
