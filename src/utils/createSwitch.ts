// Типы для пропсов
interface SwitchProps {
    checked: boolean;
    disabled?: boolean;
    label?: string;
    category: string;
}

/**
 * Создает HTML строку переключателя
 * @param props
 * @returns
 */
export function createSwitch(props: SwitchProps): string {
    const { checked, disabled, label, category } = props;
    const inputId = "switch-" + Math.random().toString(36).slice(2);

    return `
        <div class="switch">
            ${label ? `<span class="switch__label">${label}</span>` : ""}
            <input
                id="${inputId}"
                type="checkbox"
                class="switch__input"
                data-category="${category}"
                ${checked ? "checked" : ""}
                ${disabled ? "disabled" : ""}
            />
            <label for="${inputId}" class="switch__slider${checked ? " checked" : ""}">
                <span class="switch__knob" style="left: ${checked ? 20 : 2}px"></span>
            </label>
        </div>
    `;
}
