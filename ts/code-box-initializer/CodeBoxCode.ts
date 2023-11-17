class CodeBoxCode {
    private rootElement : HTMLElement;

    private static readonly CSS_CODE_CLASS = "code-box__code";
    private static readonly CSS_CODE_HIDDEN_CLASS = "code-box__code--hidden";
    private static readonly CSS_CODE_CONTAINER_CLASS = "code-box__code-container";
    private static readonly CSS_CODE_OUTER_CONTAINER_CLASS = "code-box__code-outer-container";
    private static readonly CSS_LINE_NUMBERS_CONTAINER_CLASS = "code-box__line-numbers";
    private static readonly CSS_HIGHLIGHT_BOX_CLASS = "code-box__code-highlight-box";
    
    private static readonly CODE_LINE_HEIGHT = 2;
    private static readonly CODE_LINE_HEIGHT_UNITS = "rem";

    constructor(codeElement: HTMLElement, codeBoxElement: HTMLElement) {
        this.rootElement = document.createElement("div");
        this.rootElement.classList.add(CodeBoxCode.CSS_CODE_CLASS);
        codeBoxElement.appendChild(this.rootElement);

        const lineNumbersContainer = document.createElement("div");
        lineNumbersContainer.classList.add(CodeBoxCode.CSS_LINE_NUMBERS_CONTAINER_CLASS);
        this.rootElement.appendChild(lineNumbersContainer);

        const codeElementOuterContainer = document.createElement("div");
        codeElementOuterContainer.classList.add(CodeBoxCode.CSS_CODE_OUTER_CONTAINER_CLASS);
        this.rootElement.appendChild(codeElementOuterContainer);

        const codeElementContainer = document.createElement("div");
        codeElementContainer.classList.add(CodeBoxCode.CSS_CODE_CONTAINER_CLASS);
        codeElementOuterContainer.appendChild(codeElementContainer);

        codeElementContainer.appendChild(codeElement);

        this.fillLineNumbersContainer(lineNumbersContainer, codeElement);
        this.addHighlightBoxes(codeElementOuterContainer, codeElement.dataset);
        this.hide();
    }

    get visible() : boolean {
        return !this.rootElement.classList.contains(CodeBoxCode.CSS_CODE_HIDDEN_CLASS);
    }

    show() : void {
        this.rootElement.classList.remove(CodeBoxCode.CSS_CODE_HIDDEN_CLASS);
    }

    hide() : void {
        this.rootElement.classList.add(CodeBoxCode.CSS_CODE_HIDDEN_CLASS);
    }

    private addHighlightBoxes(container: HTMLElement, codeElementDataset: DOMStringMap) {
        const value = codeElementDataset.codeHighlight;
        if (!value) return;

        const sections = value.split(",");

        for (let section of sections) {
            let range = section.split("-");
            
            let startLine: number;
            let endLine: number;

            if (range[0]) {
                startLine = parseInt(range[0]);
                if (Number.isNaN(startLine)) continue;
                if (startLine < 1) startLine = 1;
            } else {
                continue;
            }
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