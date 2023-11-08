import EventSourcePoint from "./EventSourcePoint";

/**
 * Represents code (file) in code box.
 */
class CodeBoxCode {
    /** File button for code. */
    private button : HTMLButtonElement;
    /** Root element for code. */
    private rootElement : HTMLElement;

    private static readonly CSS_BUTTON_CLASS = "code-box__file-button";
    private static readonly CSS_BUTTON_ACTIVE_CLASS = "code-box__file-button--active";
    private static readonly CSS_CODE_CLASS = "code-box__code";
    private static readonly CSS_CODE_HIDDEN_CLASS = "code-box__code--hidden";
    private static readonly CSS_CODE_CONTAINER_CLASS = "code-box__code-container";
    private static readonly CSS_LINE_NUMBERS_CONTAINER = "code-box__line-numbers";

    /**
     * Creates new code box code.
     * @param codeElement Code element.
     * @param buttonsContainer Element into which should be added file button for code.
     * @param codeBoxElement Element in which should be root element for code added.
     * @param onButtonClick Event source that should be used to fire event when file button is clicked.
     */
    constructor(codeElement: HTMLElement, buttonsContainer : HTMLElement, codeBoxElement : HTMLElement, onButtonClick : EventSourcePoint<CodeBoxCode>) {
        // create file button
        this.button = document.createElement("button");
        this.button.classList.add(CodeBoxCode.CSS_BUTTON_CLASS);
        this.button.innerHTML = `
        <svg>
                <use xlink:href="./static/icon-sprite.svg#file"></use>
            </svg>
        <span>${codeElement.dataset.code || "unnamed"}</span>
        `;
        buttonsContainer.appendChild(this.button);

        // create root element
        this.rootElement = document.createElement("div");
        this.rootElement.classList.add(CodeBoxCode.CSS_CODE_CLASS);
        codeBoxElement.appendChild(this.rootElement);

        // create element with line numbers
        const lineNumbersContainer = document.createElement("div");
        lineNumbersContainer.classList.add(CodeBoxCode.CSS_LINE_NUMBERS_CONTAINER);
        this.rootElement.appendChild(lineNumbersContainer);

        // create code container in root element
        const codeElementContainer = document.createElement("div");
        this.rootElement.appendChild(codeElementContainer);
        codeElementContainer.classList.add(CodeBoxCode.CSS_CODE_CONTAINER_CLASS);

        // place code element in code container
        codeElementContainer.appendChild(codeElement);

        this.button.addEventListener("click", () => onButtonClick.fire(this));

        this.fillLineNumbersContainer(lineNumbersContainer, codeElement);

        // remove data attribute
        delete codeElement.dataset.code;

        this.hide();
    }

    /**
     * Indicates whether code is visible in code box.
     */
    get visible() : boolean {
        return !this.rootElement.classList.contains(CodeBoxCode.CSS_CODE_HIDDEN_CLASS);
    }

    /**
     * Shows code.
     */
    show() : void {
        this.rootElement.classList.remove(CodeBoxCode.CSS_CODE_HIDDEN_CLASS);
        this.button.classList.add(CodeBoxCode.CSS_BUTTON_ACTIVE_CLASS);
    }

    /**
     * Hides code.
     */
    hide() : void {
        this.rootElement.classList.add(CodeBoxCode.CSS_CODE_HIDDEN_CLASS);
        this.button.classList.remove(CodeBoxCode.CSS_BUTTON_ACTIVE_CLASS);
    }

    /**
     * Fills line numbers container.
     * @param container Container for line numbers that should be filled.
     * @param codeElement Element with code based on which should be determined how many line numbers should be created.
     */
    private fillLineNumbersContainer(container : HTMLElement, codeElement: HTMLElement) : void {
        const elementHeight = codeElement.offsetHeight;
        const lineHeight = +getComputedStyle(codeElement).getPropertyValue("line-height").replace("px", "");
      
        const linesCount = elementHeight / lineHeight;
        
        for (let i = 1; i <= linesCount; i++) {
            const element = document.createElement("div");
            element.innerText = i.toString();
            container.appendChild(element);
        }
    }
}

export default CodeBoxCode;