import ButtonElementFileButton from "./ButtonElementFileButton";
import SVGIconElementCreator from "./SVGIconElementCreator";

/**
 * Represents file button for simple code box (without download functionality).
 */
class SimpleNoDownloadFileButton extends ButtonElementFileButton {
    /** CSS class for button element. */
    private static readonly CSS_BUTTON_CLASS = "code-box__file-button";
    /** Name of icon for button. */
    private static readonly BUTTON_ICON_NAME = "file-2";

    /**
     * @param buttonText Text of button.
     * @param container Container into which should be appended created button.
     */
    constructor(buttonText: string, container: HTMLElement) {
        super(buttonText, container);

        this.buttonElement.classList.add(SimpleNoDownloadFileButton.CSS_BUTTON_CLASS);
        this.buttonElement.innerHTML = `
            ${SVGIconElementCreator.create(SimpleNoDownloadFileButton.BUTTON_ICON_NAME)}
            <span>${this.buttonElement.innerText}</span>
        `;
    }
}

export default SimpleNoDownloadFileButton;