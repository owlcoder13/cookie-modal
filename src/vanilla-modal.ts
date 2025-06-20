import {
    defaultUserCookieCategories,
    defaultCookieCategories,
    defaultCookieModalOptions,
} from "./model/defaultData";
import {
    CookieCategoriesState,
    CookieCategory,
    CookieModalOptions,
} from "./types";
import { getConsent, hasConsent, saveConsent } from "./utils/cookieConsent";
import { createSwitch } from "./utils/createSwitch";
import { createToggle } from "./utils/createToggle";
import { getToggleIcon } from "./utils/getToggleIcon";

class CookieModalManager {
    private modal: HTMLElement;
    private options: CookieModalOptions;
    private userCookieCategories: any;
    private openedCategories: any = {};

    constructor(options?: CookieModalOptions) {
        this.options = {
            ...defaultCookieModalOptions,
            ...options,
            cookieCategories: options?.cookieCategories
                ? [...options.cookieCategories]
                : [...defaultCookieModalOptions.cookieCategories],
        };

        this.modal = document.createElement("div");

        this.userCookieCategories = getConsent() ?? {
            ...defaultUserCookieCategories,
        };

        this.modal.classList.add("cookie-modal");
        document.body.appendChild(this.modal);

        this.showIfNeeded();
    }

    showIfNeeded() {
        if (!hasConsent()) {
            this.renderMainScreen();
            this.open();
        } else {
            this.close();
        }
    }

    open() {
        this.modal.style.display = "";
    }

    close() {
        this.modal.style.display = "none";
    }

    saveCategories(categories: CookieCategoriesState) {
        saveConsent(categories);
        this.close();
    }

    renderMainScreen() {
        const html = `
    <div class="cookie-modal__inner">
        <div class="cookie-modal__header">
            <button class="cookie-modal__icon btn-close">
                <svg
                    width="16px"
                    height="16px"
                    viewBox="-0.5 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                        <path
                            d="M3 21.32L21 3.32001"
                            stroke="#000000"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></path>
                        <path
                            d="M3 3.32001L21 21.32"
                            stroke="#000000"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></path>
                    </g>
                </svg>
            </button>
            <div class="cookie-modal__title">
                ${this.options.mainModalTitle}
            </div>
        </div>
        <div class="cookie-modal__text">
            ${this.options.mainModalSubtitle}
        </div>
        <div class="cookie-modal__buttons">
            <button class="cookie-modal__btn cookie-modal__btn--accept-all">
                ${this.options.acceptAllButtonLabel}
            </button>
            <button class="cookie-modal__btn cookie-modal__btn--settings">
                ${this.options.preferencesButtonLabel}
            </button>
        </div>
    </div>
    `;

        this.modal.innerHTML = html;

        this.modal
            .querySelector(".btn-close")
            ?.addEventListener("click", () => {
                this.close();
            });

        this.modal
            .querySelector(".cookie-modal__btn--accept-all")
            ?.addEventListener("click", () => {
                this.saveCategories({ ...defaultUserCookieCategories });
            });

        this.modal
            .querySelector(".cookie-modal__btn--settings")
            ?.addEventListener("click", () => {
                this.renderSettingsScreen();
            });
    }

    renderSettingsScreen() {
        const categories = this.options.cookieCategories
            .map((cat) => {
                const switcher = createSwitch({
                    checked: this.userCookieCategories[cat.key],
                    label: cat.label,
                    category: cat.key,
                    disabled: cat.locked ?? false,
                });

                const toggle = createToggle({
                    isOpen: this.openedCategories?.[cat.key] ?? false,
                    category: cat.key,
                });

                return `
                    <div class="cookie-modal__item">
                        <div class="cookie-modal__row">
                            ${toggle}
                            ${switcher}
                        </div>
                        <div 
                            class="cookie-modal__description" 
                            id="desc-${cat.key}"
                            style="display: ${this.openedCategories?.[cat.key] ? "" : "none"}"
                        >
                            ${cat.description}
                        </div>
                    </div>
                `;
            })
            .join("");

        const html = `
       <div class="cookie-modal__inner">
            <div class="cookie-modal__header">
                <button class="cookie-modal__icon btn-back">
                    <svg
                        width="18px"
                        height="18px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        transform="rotate(90)"
                    >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M12 5V19M12 19L6 13M12 19L18 13"
                                stroke="#000000"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></path>
                        </g>
                    </svg>
                </button>
                <div class="cookie-modal__title">
                    ${this.options.preferencesModalTitle}
                </div>
            </div>
                <form class="cookie-modal__form">
                    <div class="cookie-modal__list">
                        ${categories}
                    </div>
                    <div class="cookie-modal__buttons">
                        <button type="submit" class="cookie-modal__btn cookie-modal__btn--save">
                            ${this.options.saveButtonLabel}
                        </button>
                    </div>
                </form>
            </div>
    `;
        this.modal.innerHTML = html;

        this.modal.querySelector(".btn-back")?.addEventListener("click", () => {
            this.renderMainScreen();
        });

        this.modal
            .querySelectorAll<HTMLInputElement>(
                "input[type=checkbox][data-category]"
            )
            .forEach((input) => {
                input.addEventListener("change", (e) => {
                    const target = e.target as HTMLInputElement;
                    const cat = target.getAttribute("data-category");

                    if (!cat) return;

                    const targetCategory: CookieCategory | undefined =
                        defaultCookieCategories.find((c) => c.key === cat);

                    if (!targetCategory || targetCategory.locked) return;

                    this.userCookieCategories[cat] = target.checked;

                    const switchDiv = target.closest(".switch");
                    if (!switchDiv) return;

                    const slider = switchDiv.querySelector(".switch__slider");
                    if (slider) {
                        if (target.checked) {
                            slider.classList.add("checked");
                        } else {
                            slider.classList.remove("checked");
                        }
                    }

                    const knob = switchDiv.querySelector(
                        ".switch__knob"
                    ) as HTMLElement | null;

                    if (knob) {
                        knob.style.left = target.checked ? "20px" : "2px";
                    }
                });
            });

        this.modal
            .querySelectorAll<HTMLButtonElement>(".cookie-modal__toggle")
            .forEach((btn) => {
                btn.addEventListener("click", () => {
                    const cat = btn.getAttribute("data-category");

                    if (!cat) return;

                    const state = !this.openedCategories[cat];
                    // Инвертируем состояние
                    this.openedCategories[cat] = state;

                    const description = this.modal.querySelector<HTMLElement>(
                        `#desc-${cat}`
                    );

                    if (description) {
                        description.style.display = state ? "" : "none";
                    }

                    btn.innerHTML = getToggleIcon(state);
                });
            });

        this.modal
            .querySelector<HTMLFormElement>(".cookie-modal__form")
            ?.addEventListener("submit", (e) => {
                e.preventDefault();
                this.saveCategories({ ...this.userCookieCategories });
            });
    }
}

export default function initCookieModal(options?: CookieModalOptions) {
    return new CookieModalManager(options);
}
