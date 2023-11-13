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

/*
Struktura tříd:
    CodeBox
        SimpleCodeBox
        ProjectCodeBox
    CodeBoxCode (ten nakonec nebude mít tlačítko) - bude představovat jen samotný kód
    CodeButton
        

    - v README bych potom mohl vytvořit UML diagram
*/

export default CodeBoxInitializer;