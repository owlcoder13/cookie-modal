import initCookieModal from "./vanilla-modal";
// import "./style.scss";

if (typeof window !== "undefined") {
    ((global) => {
        global.initCookieModal = initCookieModal;
    })(window);
}

export { usingCookieCheck } from "./utils/cookieConsent";
export { usingCookieAllowed } from "./utils/usingCookieConsent";

export default initCookieModal;
