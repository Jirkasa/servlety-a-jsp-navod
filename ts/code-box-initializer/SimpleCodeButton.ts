import CodeBoxCode from "./CodeBoxCode";
import ElementCodeButton from "./ElementCodeButton";
import SVGIconElementCreator from "./SVGIconElementCreator";

class SimpleCodeButton extends ElementCodeButton {
    private static readonly CSS_BUTTON_CLASS = "code-box__file-button";
    private static readonly BUTTON_ICON_NAME = "file";

    protected readonly ACTIVE_CSS_CLASS = "code-box__file-button--active";

    constructor(buttonText: string, container: HTMLElement, codeBoxCode: CodeBoxCode) {
        super(buttonText, container, codeBoxCode);

        this.buttonElement.classList.add(SimpleCodeButton.CSS_BUTTON_CLASS);
        this.buttonElement.innerHTML = `
            ${SVGIconElementCreator.create(SimpleCodeButton.BUTTON_ICON_NAME)}
            <span>${this.buttonElement.innerText}</span>
        `;
    }
}

export default SimpleCodeButton;