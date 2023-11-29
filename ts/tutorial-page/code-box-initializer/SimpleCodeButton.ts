import CodeBoxCode from "./CodeBoxCode";
import ElementCodeButton from "./ElementCodeButton";
import SVGIconElementCreator from "./SVGIconElementCreator";

/**
 * Represents code button for simple code box.
 */
class SimpleCodeButton extends ElementCodeButton {
    /** CSS class for button element. */
    private static readonly CSS_BUTTON_CLASS = "code-box__file-button";
     /** Name of icon for button. */
    private static readonly BUTTON_ICON_NAME = "file";

    protected readonly ACTIVE_CSS_CLASS = "code-box__file-button--active";

    /**
     * Creates new simple code button.
     * @param buttonText Text of button.
     * @param container Container into which should be appended created button element.
     * @param codeBoxCode Code box code with which should be code button associated.
     */
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