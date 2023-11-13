import CodeBoxCode from "./CodeBoxCode";
import ElementCodeButton from "./ElementCodeButton";

class SimpleCodeButton extends ElementCodeButton {
    private static readonly CSS_BUTTON_CLASS = "code-box__file-button";
    private static readonly BUTTON_ICON_NAME = "file";

    protected readonly ACTIVE_CSS_CLASS = "code-box__file-button--active";

    constructor(buttonText: string, container: HTMLElement, codeBoxCode: CodeBoxCode) {
        super(buttonText, container, codeBoxCode);

        this.buttonElement.classList.add(SimpleCodeButton.CSS_BUTTON_CLASS);
        this.buttonElement.innerHTML = `
            <svg>
                <use xlink:href="./static/icon-sprite.svg#${SimpleCodeButton.BUTTON_ICON_NAME}"></use>
            </svg>
            <span>${this.buttonElement.innerText}</span>
        `;
    }
}

export default SimpleCodeButton;