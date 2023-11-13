import CodeBoxCode from "./CodeBoxCode";
import EventSourcePoint from "./EventSourcePoint";

/**
 * Represents code box.
 */
class CodeBox {
    /** Stores all code box codes. */
    private codes : CodeBoxCode[];
    /** Event source for file button clicks. */
    private onFileButtonClickEventSource : EventSourcePoint<CodeBoxCode>;
    /** Stores code that is currently being displayed in code box. */
    private activeCode : CodeBoxCode | null;

    private static readonly CSS_CODE_BOX_CLASS = "code-box";
    private static readonly CSS_BUTTONS_CONTAINER_CLASS = "code-box__files";

    /**
     * Initializes new code box.
     * @param codeBoxElement Element containing code examples (pre elements with data-code attribute) to be used as code box.
     */
    constructor(codeBoxElement : HTMLElement) {
        this.codes = [];
        this.activeCode = null;
        this.onFileButtonClickEventSource = new EventSourcePoint();

        codeBoxElement.classList.add(CodeBox.CSS_CODE_BOX_CLASS);

        // create container for file buttons
        const buttonsContainer = document.createElement("div");
        buttonsContainer.classList.add(CodeBox.CSS_BUTTONS_CONTAINER_CLASS);
        codeBoxElement.appendChild(buttonsContainer);

        const codeElements : NodeListOf<HTMLElement> = codeBoxElement.querySelectorAll("[data-code]");

        // create codes (instances of CodeBoxCode)
        codeElements.forEach(codeElement => {
            const code = new CodeBoxCode(
                codeElement,
                buttonsContainer,
                codeBoxElement,
                this.onFileButtonClickEventSource
            );
            this.codes.push(code);

            // if code should be active
            if (codeElement.hasAttribute("data-code-active")) {
                this.activeCode = code;
                delete codeElement.dataset.codeActive;
            }
        });

        // if no code is set as active, the first one is activated
        if (!this.activeCode && this.codes.length > 0) {
            this.activeCode = this.codes[0];
        }

        if (this.activeCode) {
            this.activeCode.show();
        }

        // remove data attribute
        delete codeBoxElement.dataset.codeBox;

        // assign handler for event source
        this.onFileButtonClickEventSource.subscribe((code) => this.onFileButtonClick(code));
    }

    /**
     * Called when file button is clicked.
     * @param code CodeBoxCode which file button was clicked.
     */
    private onFileButtonClick(code : CodeBoxCode) : void {
        if (this.activeCode) this.activeCode.hide();
        code.show();
        this.activeCode = code;
    }
}

export default CodeBox;