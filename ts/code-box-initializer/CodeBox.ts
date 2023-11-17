import CodeBoxCode from "./CodeBoxCode";
import CodeButton from "./CodeButton";
import EventSourcePoint from "./EventSourcePoint";

abstract class CodeBox {
    private static readonly CSS_CODE_BOX_CLASS = "code-box";
    private static readonly CSS_NO_CODE_MESSAGE_CLASS = "code-box__no-code-message";
    private static readonly CSS_NO_CODE_MESSAGE_HIDDEN_CLASS = "code-box__no-code-message--hidden";
    private static readonly NO_CODE_MESSAGE_TEXT = "Není vybrán žádný soubor";

    protected codeBoxElement : HTMLElement;
    private noImplicitActiveCode : boolean;
    private noCodeElement : HTMLElement;
    private codeButtons : CodeButton[];
    private onCodeButtonClickEventSource : EventSourcePoint<CodeButton>;
    private activeCodeButton : CodeButton | null;

    constructor(codeBoxElement: HTMLElement, noImplicitActiveCode: boolean = false) {
        this.codeBoxElement = codeBoxElement;
        this.noImplicitActiveCode = noImplicitActiveCode;
        this.codeButtons = [];
        this.onCodeButtonClickEventSource = new EventSourcePoint();
        this.activeCodeButton = null;

        codeBoxElement.classList.add(CodeBox.CSS_CODE_BOX_CLASS);

        this.noCodeElement = document.createElement("div");
        this.noCodeElement.innerHTML = `<span>${CodeBox.NO_CODE_MESSAGE_TEXT}</span>`;
        this.noCodeElement.classList.add(CodeBox.CSS_NO_CODE_MESSAGE_CLASS);

        this.onCodeButtonClickEventSource.subscribe(codeButton => this.onCodeButtonClick(codeButton));
    }

    protected init() : void {
        this.codeBoxElement.appendChild(this.noCodeElement);

        const codeElements = this.codeBoxElement.querySelectorAll("[data-code]");
        codeElements.forEach(codeElement => {
            const codeBoxCode = new CodeBoxCode(codeElement as HTMLElement, this.codeBoxElement);
            const codeElementDataset = (codeElement as HTMLElement).dataset;

            const codeButton = this.createCodeButton(codeBoxCode, codeElementDataset);
            codeButton.setOnClickEventSource(this.onCodeButtonClickEventSource);

            if (codeElement.hasAttribute("data-active")) {
                this.activeCodeButton = codeButton;
            }

            this.codeButtons.push(codeButton);
        });

        if (!this.activeCodeButton && !this.noImplicitActiveCode && this.codeButtons.length > 0) {
            this.activeCodeButton = this.codeButtons[0];
        }

        if (this.activeCodeButton) {
            this.noCodeElement.classList.add(CodeBox.CSS_NO_CODE_MESSAGE_HIDDEN_CLASS);
            this.activeCodeButton.activate();
            this.activeCodeButton.codeBoxCode.show();
        }
    }

    private onCodeButtonClick(codeButton: CodeButton) : void {
        if (this.activeCodeButton === codeButton) return;

        if (this.activeCodeButton) {
            this.activeCodeButton.deactivate();
            this.activeCodeButton.codeBoxCode.hide();
        } else {
            this.noCodeElement.classList.add(CodeBox.CSS_NO_CODE_MESSAGE_HIDDEN_CLASS);
        }
        codeButton.activate();
        codeButton.codeBoxCode.show();
        this.activeCodeButton = codeButton;

        this.onDisplayedCodeChanged();
    }

    protected abstract createCodeButton(codeBoxCode: CodeBoxCode, codeElementDataset: DOMStringMap) : CodeButton;

    protected onDisplayedCodeChanged() {}
}

export default CodeBox;