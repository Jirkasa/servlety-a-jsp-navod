import FileButton from "./FileButton";

/**
 * Represents file button with anchor element.
 */
abstract class AnchorElementFileButton extends FileButton {
    /** Anchor element. */
    protected buttonElement : HTMLAnchorElement;

    /**
     * @param buttonText Text of button.
     * @param link Link to be set to anchor element.
     * @param container Container into which should be appended created anchor element.
     */
    constructor(buttonText: string, link: string, container: HTMLElement) {
        super();

        this.buttonElement = document.createElement("a");
        this.buttonElement.innerText = buttonText;
        this.buttonElement.setAttribute("href", link);

        container.appendChild(this.buttonElement);
    }
}

export default AnchorElementFileButton;