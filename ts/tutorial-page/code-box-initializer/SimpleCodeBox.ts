import CodeBox from "./CodeBox";
import CodeBoxCode from "./CodeBoxCode";
import CodeButton from "./CodeButton";
import SimpleCodeButton from "./SimpleCodeButton";

/**
 * Represents simple code box with buttons container.
 */
class SimpleCodeBox extends CodeBox {
    /** CSS modifier class for root element of code box. */
    private static readonly CSS_CODE_BOX_MODIFIER_CLASS = "code-box--simple";
    /** CSS class for buttons container. */
    private static readonly CSS_BUTTONS_CONTAINER_CLASS = "code-box__files";
    /** CSS modifier class to be used for buttons container when it should be hidden. */
    private static readonly CSS_BUTTONS_CONTAINER_HIDDEN_CLASS = "code-box__files--hidden";

    /** Buttons container element. */
    private buttonsContainer: HTMLElement;

    /**
     * Creates new simple code box.
     * @param codeBoxElement Code box element.
     */
    constructor(codeBoxElement : HTMLElement) {
        super(codeBoxElement, codeBoxElement.hasAttribute("data-no-implicit-active"));

        codeBoxElement.classList.add(SimpleCodeBox.CSS_CODE_BOX_MODIFIER_CLASS);

        // create buttons container
        this.buttonsContainer = document.createElement("div");
        this.buttonsContainer.classList.add(SimpleCodeBox.CSS_BUTTONS_CONTAINER_CLASS);
        codeBoxElement.appendChild(this.buttonsContainer);

        // potentionally hide buttons container
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