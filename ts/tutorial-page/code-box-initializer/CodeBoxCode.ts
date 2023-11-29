/**
 * Represents code in code box.
 */
class CodeBoxCode {
    /** Root element of code. */
    private rootElement: HTMLElement;
    /** Code element (pre element with code element). */
    private codeElement: HTMLElement;

    /** CSS class for root element. */
    private static readonly CSS_CODE_CLASS = "code-box__code";
    /** CSS class used for root element when code should be hidden. */
    private static readonly CSS_CODE_HIDDEN_CLASS = "code-box__code--hidden";
    /** CSS class used for element that contains code element (pre element with code element). */
    private static readonly CSS_CODE_CONTAINER_CLASS = "code-box__code-container";
    /** CSS class used for outer container (container of element that is container for code element). */
    private static readonly CSS_CODE_OUTER_CONTAINER_CLASS = "code-box__code-outer-container";
    /** CSS class used for line numbers container. */
    private static readonly CSS_LINE_NUMBERS_CONTAINER_CLASS = "code-box__line-numbers";
    /** CSS class used for highlight boxes. */
    private static readonly CSS_HIGHLIGHT_BOX_CLASS = "code-box__code-highlight-box";
    
    /** Line height of code text. */
    private static readonly CODE_LINE_HEIGHT = 2;
    /** Line height units of code text. */
    private static readonly CODE_LINE_HEIGHT_UNITS = "rem";

    /**
     * Creates new code for code box.
     * @param codeElement Code element (pre element with code element).
     * @param codeBoxElement Code box element into which should be code appended.
     */
    constructor(codeElement: HTMLElement, codeBoxElement: HTMLElement) {
        // create root element
        this.rootElement = document.createElement("div");
        this.rootElement.classList.add(CodeBoxCode.CSS_CODE_CLASS);
        codeBoxElement.appendChild(this.rootElement);

        this.codeElement= codeElement;

        // create line numbers container
        const lineNumbersContainer = document.createElement("div");
        lineNumbersContainer.classList.add(CodeBoxCode.CSS_LINE_NUMBERS_CONTAINER_CLASS);
        this.rootElement.appendChild(lineNumbersContainer);

        // create outer code container
        const codeElementOuterContainer = document.createElement("div");
        codeElementOuterContainer.classList.add(CodeBoxCode.CSS_CODE_OUTER_CONTAINER_CLASS);
        this.rootElement.appendChild(codeElementOuterContainer);

        // create code container
        const codeElementContainer = document.createElement("div");
        codeElementContainer.classList.add(CodeBoxCode.CSS_CODE_CONTAINER_CLASS);
        codeElementOuterContainer.appendChild(codeElementContainer);

        // append code element (pre element with code element) to code container.
        codeElementContainer.appendChild(codeElement);

        this.fillLineNumbersContainer(lineNumbersContainer, codeElement);
        this.addHighlightBoxes(codeElementOuterContainer, codeElement.dataset);
        this.hide();
    }

    /** Indicated whether code is visible. */
    get visible() : boolean {
        return !this.rootElement.classList.contains(CodeBoxCode.CSS_CODE_HIDDEN_CLASS);
    }

    /** Shows code. */
    public show() : void {
        this.rootElement.classList.remove(CodeBoxCode.CSS_CODE_HIDDEN_CLASS);
    }

    /** Hides code. */
    public hide() : void {
        this.rootElement.classList.add(CodeBoxCode.CSS_CODE_HIDDEN_CLASS);
    }

    /** Clones code element (pre element with code element) of code. */
    public cloneCodeElement() : HTMLElement {
        const codeElement = this.codeElement.cloneNode(true) as HTMLElement;

        // remove attributes that should not be on cloned code element
        delete codeElement.dataset.codeHighlight;
        delete codeElement.dataset.active;
        delete codeElement.dataset.javaPackageOpened;

        return codeElement;
    }

    /**
     * Creates highlight boxes.
     * @param container Element into which should be appended created highlight boxes.
     * @param codeElementDataset Dataset based on which should be highlight boxes created.
     */
    private addHighlightBoxes(container: HTMLElement, codeElementDataset: DOMStringMap) {
        // get code highlight attribute value
        const value = codeElementDataset.codeHighlight;
        if (!value) return;

        // get sections from value (for example [1, 3-4, 7])
        const sections = value.split(",");

        // create highlight box for each section
        for (let section of sections) {
            let range = section.split("-");
            
            let startLine: number;
            let endLine: number;

            // determine start line of highlight box
            if (range[0]) {
                startLine = parseInt(range[0]);
                if (Number.isNaN(startLine)) continue;
                if (startLine < 1) startLine = 1;
            } else {
                continue;
            }
            // determine end line of highlight box
            if (range[1]) {
                endLine = parseInt(range[1]);
                if (Number.isNaN(endLine)) continue;
            } else {
                endLine = startLine;
            }

            const highlightBox = document.createElement("div");
            highlightBox.classList.add(CodeBoxCode.CSS_HIGHLIGHT_BOX_CLASS);
            highlightBox.style.transform = `translateY(${CodeBoxCode.CODE_LINE_HEIGHT * (startLine-1)}${CodeBoxCode.CODE_LINE_HEIGHT_UNITS})`;
            highlightBox.style.height = `${CodeBoxCode.CODE_LINE_HEIGHT * (endLine-startLine+1)}${CodeBoxCode.CODE_LINE_HEIGHT_UNITS}`;

            container.appendChild(highlightBox);
        }
    }

    /**
     * Fills line numbers container.
     * @param container Container into which should be added elements with line numbers.
     * @param codeElement Code element based on which should be line number elements generated.
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