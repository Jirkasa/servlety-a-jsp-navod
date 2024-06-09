import FileButton from "./FileButton";

/**
 * Represents file button with button element.
 */
class ButtonElementFileButton extends FileButton {
    /** Button element. */
    protected buttonElement : HTMLButtonElement;

    /**
     * @param buttonText Text of button.
     * @param container Container into which should be appended created anchor element.
     */
    constructor(buttonText: string, container: HTMLElement) {
        super();

        this.buttonElement = document.createElement("button");
        this.buttonElement.innerText = buttonText;

        container.appendChild(this.buttonElement);
    }
}

export default ButtonElementFileButton;