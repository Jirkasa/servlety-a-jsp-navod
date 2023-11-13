import CodeBoxCode from "./CodeBoxCode";
import CodeButton from "./CodeButton";

abstract class ElementCodeButton extends CodeButton {
    protected buttonElement : HTMLButtonElement;

    protected abstract readonly ACTIVE_CSS_CLASS : string;

    constructor(buttonText: string, container: HTMLElement, codeBoxCode: CodeBoxCode) {
        super(codeBoxCode);

        this.buttonElement = document.createElement("button");
        this.buttonElement.innerText = buttonText;
        container.appendChild(this.buttonElement);

        this.buttonElement.addEventListener("click", () => this.onButtonElementClick());
    }

    public activate() {
        this.buttonElement.classList.add(this.ACTIVE_CSS_CLASS);
    }

    public deactivate() {
        this.buttonElement.classList.remove(this.ACTIVE_CSS_CLASS);
    }

    private onButtonElementClick() : void {
        if (this.onClickEventSource) {
            this.onClickEventSource.fire(this);
        }
    }
}

export default ElementCodeButton;