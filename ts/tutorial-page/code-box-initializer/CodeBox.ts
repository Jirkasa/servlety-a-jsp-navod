import CodeBoxCode from "./CodeBoxCode";
import CodeButton from "./CodeButton";
import EventSourcePoint from "./EventSourcePoint";
import FileButton from "./FileButton";

/**
 * Base class for code box.
 */
abstract class CodeBox {
    /** CSS class for root code box element. */
    private static readonly CSS_CODE_BOX_CLASS = "code-box";
    /** CSS class for no code message element. */
    private static readonly CSS_NO_CODE_MESSAGE_CLASS = "code-box__no-code-message";
    /** CSS class to be used for no code message element when it should be hidden. */
    private static readonly CSS_NO_CODE_MESSAGE_HIDDEN_CLASS = "code-box__no-code-message--hidden";
    /** Text displayed in no code message element. */
    private static readonly NO_CODE_MESSAGE_TEXT = "Není vybrán žádný soubor";

    /** Root element of code box. */
    protected codeBoxElement : HTMLElement;
    /** Determines whether no code should be implicitly set as active. */
    private noImplicitActiveCode : boolean;
    /** Element with message that is displayed when no code is displayed. */
    private noCodeElement : HTMLElement;
    /** Code buttons of code box. */
    private codeButtons : CodeButton[];
    /** Codes of code box. */
    protected codes : CodeBoxCode[];
    /** Event source for clicks of code buttons. */
    private onCodeButtonClickEventSource : EventSourcePoint<CodeButton>;
    /** Currently active code button. */
    private activeCodeButton : CodeButton | null;
    /** File buttons of code box. */
    private fileButtons : FileButton[];

    /**
     * @param codeBoxElement Code box element.
     * @param noImplicitActiveCode Determines whether no code should be implicitly set as active.
     */
    constructor(codeBoxElement: HTMLElement, noImplicitActiveCode: boolean = false) {
        this.codeBoxElement = codeBoxElement;
        this.noImplicitActiveCode = noImplicitActiveCode;
        this.codeButtons = [];
        this.codes = [];
        this.onCodeButtonClickEventSource = new EventSourcePoint();
        this.activeCodeButton = null;
        this.fileButtons = [];

        codeBoxElement.classList.add(CodeBox.CSS_CODE_BOX_CLASS);

        // create no code message element
        this.noCodeElement = document.createElement("div");
        this.noCodeElement.innerHTML = `<span>${CodeBox.NO_CODE_MESSAGE_TEXT}</span>`;
        this.noCodeElement.classList.add(CodeBox.CSS_NO_CODE_MESSAGE_CLASS);

        // subscribe to event source
        this.onCodeButtonClickEventSource.subscribe(codeButton => this.onCodeButtonClick(codeButton));
    }

    /**
     * Initializes code box.
     */
    protected init() : void {
        this.codeBoxElement.appendChild(this.noCodeElement);

        const codeElements = this.codeBoxElement.querySelectorAll("[data-code]");
        // process all code elements (pre elements with code element) in code box
        codeElements.forEach(codeElement => {
            // validate
            if (!this.validateCodeElement(codeElement as HTMLElement)) {
                codeElement.remove();
                return;
            }

            // create code
            const codeBoxCode = new CodeBoxCode(codeElement as HTMLElement, this.codeBoxElement);
            const codeElementDataset = (codeElement as HTMLElement).dataset;

            // create code button for code
            const codeButton = this.createCodeButton(codeBoxCode, codeElementDataset);
            codeButton.setOnClickEventSource(this.onCodeButtonClickEventSource);

            if (codeElement.hasAttribute("data-active")) {
                this.activeCodeButton = codeButton;
            }

            this.codeButtons.push(codeButton);
            this.codes.push(codeBoxCode);
        });

        // potentionally implicitly set first code as active
        if (!this.activeCodeButton && !this.noImplicitActiveCode && this.codeButtons.length > 0) {
            this.activeCodeButton = this.codeButtons[0];
        }

        if (this.activeCodeButton) {
            this.noCodeElement.classList.add(CodeBox.CSS_NO_CODE_MESSAGE_HIDDEN_CLASS);
            this.activeCodeButton.activate();
            this.activeCodeButton.codeBoxCode.show();
        }

        const fileElements = this.codeBoxElement.querySelectorAll("[data-file]");
        // process all file elements in code box
        fileElements.forEach(fileElement => {
            // validate
            if (!this.validateFileElement(fileElement as HTMLElement)) {
                fileElement.remove();
                return;
            }

            // create file button
            const fileButton = this.createFileButton((fileElement as HTMLElement).innerText, (fileElement as HTMLElement).dataset);

            this.fileButtons.push(fileButton);
            (fileElement as HTMLElement).style.display = "none";
        });
    }

    /**
     * Handles clicks of code buttons.
     * @param codeButton Code button that was clicked.
     */
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

    /**
     * Validates code element. This method can be overriden in subclasses.
     * @param codeElement Code element (pre element with code element) to be validated.
     * @returns Validation result.
     */
    protected validateCodeElement(codeElement: HTMLElement) : boolean {
        return true;
    }

    /**
     * Validates file element. This method can be overriden in subclasses.
     * @param fileElement File element to be validated.
     * @returns Validation result.
     */
    protected validateFileElement(fileElement: HTMLElement) : boolean {
        return true;
    }

    /**
     * Creates new code button.
     * @param codeBoxCode Code that should be associated with button.
     * @param codeElementDataset Dataset of code element (pre element with code element).
     */
    protected abstract createCodeButton(codeBoxCode: CodeBoxCode, codeElementDataset: DOMStringMap) : CodeButton;

    /**
     * Creates new file button.
     * @param fileName Name of file.
     * @param fileElementDataset Dataset of file element.
     */
    protected abstract createFileButton(fileName: string, fileElementDataset: DOMStringMap) : FileButton;

    /**
     * Called after new code is displayed in code box. This method can be overriden in subclasses.
     */
    protected onDisplayedCodeChanged() {}
}

export default CodeBox;