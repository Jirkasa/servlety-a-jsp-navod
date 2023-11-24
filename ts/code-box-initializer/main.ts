import ProjectCodeBox from "./ProjectCodeBox";
import SimpleCodeBox from "./SimpleCodeBox";
import HandyCollapse from "handy-collapse";

let initialized = false;

function initCodeBoxes() : void {
    if (initialized) {
        throw new Error("Code boxes are already initialized.");
    }
    const codeBoxes : NodeListOf<HTMLElement> = document.querySelectorAll("[data-code-box], [data-project]");

    let forNow: ProjectCodeBox;

    codeBoxes.forEach(codeBoxElement => {
        if (codeBoxElement.hasAttribute("data-project")) {
            // todo - promyslet to předávání předků (zatím to mám jen na zkoušku takto)
            if (forNow && codeBoxElement.hasAttribute("data-project-extends")) {
                forNow = new ProjectCodeBox(codeBoxElement, forNow);
            } else {
                forNow = new ProjectCodeBox(codeBoxElement);
            }
        } else {
            new SimpleCodeBox(codeBoxElement);
        }
    });

    new HandyCollapse({
        closeOthers: false,
        animationSpeed: 140,
        cssEasing: "linear"
    });

    initialized = true;
}

export default initCodeBoxes;

/* 
    Dědění:
        - zdědění všech folders
        - zdědění všech ukázek kódu (ukázky kódu se tedy musí někde ukládat...)
        - zdědění složky pro java packages
            - vezmou se podle toho java packages (ukázka kódu tedy musí mít vlastnost java package)
                - asi také složku - a nebo nevím, spíš ne, spíš se to, ve které složce to je bude ukládat jinak
            - java packages folder půjde nastavit jen jednou, poté již nepůjde, a vlastně se ani nebude brát konfigurační ul element pro data-project-folders

        - to je vlastně vše co se má zdědit
    
    - u složek budu muset ukládat i to, jestli byly vygenerovány automaticky když se vytvářel java balíček
*/