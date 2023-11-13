// todo - highlighting
class CodeBoxCode {
    private rootElement : HTMLElement;

    private static readonly CSS_CODE_CLASS = "code-box__code";
    private static readonly CSS_CODE_HIDDEN_CLASS = "code-box__code--hidden";
    private static readonly CSS_CODE_CONTAINER_CLASS = "code-box__code-container";
    private static readonly CSS_LINE_NUMBERS_CONTAINER = "code-box__line-numbers";

    constructor(codeElement: HTMLElement, codeBoxElement: HTMLElement) {
        this.rootElement = document.createElement("div");
        this.rootElement.classList.add(CodeBoxCode.CSS_CODE_CLASS);
        codeBoxElement.appendChild(this.rootElement);

        const lineNumbersContainer = document.createElement("div");
        lineNumbersContainer.classList.add(CodeBoxCode.CSS_LINE_NUMBERS_CONTAINER);
        this.rootElement.appendChild(lineNumbersContainer);

        const codeElementContainer = document.createElement("div");
        this.rootElement.appendChild(codeElementContainer);
        codeElementContainer.classList.add(CodeBoxCode.CSS_CODE_CONTAINER_CLASS);

        codeElementContainer.appendChild(codeElement);

        this.fillLineNumbersContainer(lineNumbersContainer, codeElement);
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