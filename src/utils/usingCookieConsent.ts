import { getConsent } from "./cookieConsent";
import { ConsentCallback } from "../types";

let pendingCallbacks: ConsentCallback[] = [];

/**
 * Регистрирует функцию-колбэк, которая будет вызвана с актуальным состоянием consent.
 * Если consent уже есть — вызывает сразу, иначе откладывает до появления consent.
 */
export function usingCookieAllowed(callback: ConsentCallback) {
    const consent = getConsent();
    
    if (consent) {
        callback(consent);
    } else {
        pendingCallbacks.push(callback);
    }
}

/**
 * Вызывать при изменении consent. Запускает все отложенные колбэки по очереди (FIFO).
 */
export function onConsentChanged() {
    const consent = getConsent();
    if (!consent) return;

    while (pendingCallbacks.length) {
        const callback = pendingCallbacks.shift();

        if (callback) callback(consent);
    }
}
