import CodeBox from "./CodeBox";
import CodeBoxCode from "./CodeBoxCode";
import CodeButton from "./CodeButton";
import SimpleCodeButton from "./SimpleCodeButton";

class SimpleCodeBox extends CodeBox {
    private static readonly CSS_CODE_BOX_MODIFIER_CLASS = "code-box--simple";
    private static readonly CSS_BUTTONS_CONTAINER_CLASS = "code-box__files";
    private static readonly CSS_BUTTONS_CONTAINER_HIDDEN_CLASS = "code-box__files--hidden";

    private buttonsContainer: HTMLElement;

    constructor(codeBoxElement : HTMLElement) {
        super(codeBoxElement, codeBoxElement.hasAttribute("data-no-implicit-active"));

        codeBoxElement.classList.add(SimpleCodeBox.CSS_CODE_BOX_MODIFIER_CLASS);

        this.buttonsContainer = document.createElement("div");
        this.buttonsContainer.classList.add(SimpleCodeBox.CSS_BUTTONS_CONTAINER_CLASS);
        codeBoxElement.appendChild(this.buttonsContainer);

        if (codeBoxElement.hasAttribute("data-no-buttons")) {
            this.buttonsContainer.classList.add(SimpleCodeBox.CSS_BUTTONS_CONTAINER_HIDDEN_CLASS);
            codeBoxElement.classList.remove(SimpleCodeBox.CSS_CODE_BOX_MODIFIER_CLASS);
        }

        this.init();
    }
    
    protected createCodeButton(codeBoxCode: CodeBoxCode, codeElementDataset: DOMStringMap) : CodeButton {
        const codeButton = new SimpleCodeButton(codeElementDataset.code || "unnamed", this.buttonsContainer, codeBoxCode);
        return codeButton;
    }
}

export default SimpleCodeBox;