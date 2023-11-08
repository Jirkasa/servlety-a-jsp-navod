import CodeBox from "./CodeBox";

/**
 * Can be used to initialize code boxes on page.
 */
class CodeBoxInitializer {
    /**
     * Initializes all code boxes (element with data-code-box attribute).
     */
    init() : void {
        const codeBoxes : NodeListOf<HTMLElement> = document.querySelectorAll("[data-code-box]");

        codeBoxes.forEach(codeBoxElement => {
            new CodeBox(codeBoxElement);
        });
    }
}

export default CodeBoxInitializer;