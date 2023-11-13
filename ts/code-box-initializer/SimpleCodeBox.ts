import CodeBox from "./CodeBox";
import CodeBoxCode from "./CodeBoxCode";
import CodeButton from "./CodeButton";
import SimpleCodeButton from "./SimpleCodeButton";

class SimpleCodeBox extends CodeBox {
    private static readonly CSS_BUTTONS_CONTAINER_CLASS = "code-box__files";

    private buttonsContainer: HTMLElement;

    constructor(codeBoxElement : HTMLElement, noImplicitActiveCode: boolean = false) {
        super(codeBoxElement, noImplicitActiveCode);

        this.buttonsContainer = document.createElement("div");
        this.buttonsContainer.classList.add(SimpleCodeBox.CSS_BUTTONS_CONTAINER_CLASS);
        codeBoxElement.appendChild(this.buttonsContainer);

        this.init();
    }
    
    protected createCodeButton(codeBoxCode: CodeBoxCode, codeElementDataset: DOMStringMap) : CodeButton {
        const codeButton = new SimpleCodeButton(codeElementDataset.code || "unnamed", this.buttonsContainer, codeBoxCode);
        return codeButton;
    }
}

export default SimpleCodeBox;