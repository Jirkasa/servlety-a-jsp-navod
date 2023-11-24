import CodeBoxCode from "./CodeBoxCode";
import CodeButton from "./CodeButton";

/**
 * Represents code button with element.
 */
abstract class ElementCodeButton extends CodeButton {
    /** Button element. */
    protected buttonElement : HTMLButtonElement;

    /** CSS class for button element to be used when button should be in active state. */
    protected abstract readonly ACTIVE_CSS_CLASS : string;

    /**
     * @param buttonText Text of button.
     * @param container Container into which should be appended created button element.
     * @param codeBoxCode Code box code with which should be code button associated.
     */
    constructor(buttonText: string, container: HTMLElement, codeBoxCode: CodeBoxCode) {
        super(codeBoxCode);

        this.buttonElement = document.createElement("button");
        this.buttonElement.innerText = buttonText;
        container.appendChild(this.buttonElement);

        // subscribe to clicks of button element
        this.buttonElement.addEventListener("click", () => this.onButtonElementClick());
    }

    public activate() {
        this.buttonElement.classList.add(this.ACTIVE_CSS_CLASS);
    }

    public deactivate() {
        this.buttonElement.classList.remove(this.ACTIVE_CSS_CLASS);
    }

    /**
     * Called when button element is clicked.
     */
    private onButtonElementClick() : void {
        if (this.onClickEventSource) {
            this.onClickEventSource.fire(this);
        }
    }
}

export default ElementCodeButton;