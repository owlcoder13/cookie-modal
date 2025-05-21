import { getToggleIcon } from "./getToggleIcon";

interface ToggleProps {
    isOpen: boolean;
    category: string;
}

/**
 * Создает HTML строку переключателя видимости описания
 * @param props
 * @returns
 */
export function createToggle(props: ToggleProps): string {
    const { isOpen, category } = props;

    const icon = getToggleIcon(isOpen);

    const ariaLabel = isOpen ? "Скрыть описание" : "Показать описание";

    return `
        <button
            aria-label="${ariaLabel}"
            type="button"
            class="cookie-modal__toggle"
            data-category="${category}"
        >
            ${icon}
        </button>
    `;
}
