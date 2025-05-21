import Cookies from 'js-cookie';
import { CookieModelOptions } from './types';
const COOKIE_SETTINGS_NAME = 'modal-settings';

function setSettingsToCookie(settings: any) {
    Cookies.set(COOKIE_SETTINGS_NAME, JSON.stringify(settings));
}

function getSettingsFromCookie() {
    return JSON.parse(Cookies.get(COOKIE_SETTINGS_NAME) || '{}');
}


class CookieModalManager {
    private modal: HTMLElement;
    private options: CookieModelOptions;

    constructor(options?: CookieModelOptions) {
        this.options = options || {};
        this.modal = document.createElement('div');

        this.modal.classList.add('cookie-modal');
        document.body.appendChild(this.modal);

        this.renderMainScreen();
    }

    renderMainScreen() {
        const html = `
        <div class="cookie-modal__inner">
            <div class="cookie-modal__header">Cookie modal</div>
            <div class="cookie-modal__content">
                main model text
                <button class="cookie-modal__btn cookie-modal__btn--settings">Open settings</button>
            </div>
        </div>
        `

        this.modal.innerHTML = html;

        this.modal.querySelector('.cookie-modal__btn--settings')?.addEventListener('click', () => {
            this.renderSettingsScreen();
        })
    }

    renderSettingsScreen() {
        const html = `
        <div class="cookie-modal__inner">
            <div class="cookie-modal__header">
                <button class="btn-back">&lt;</button>
                Настройки
            </div>
            <div class="cookie-modal__content">
                settings screen
        
            </div>
        </div>
        `

        this.modal.innerHTML = html;

        this.modal.querySelector('.btn-back')?.addEventListener('click', () => {
            this.renderMainScreen();
        })
    }
}

export default function initModal(options?: CookieModelOptions) {
    return new CookieModalManager(options);
}