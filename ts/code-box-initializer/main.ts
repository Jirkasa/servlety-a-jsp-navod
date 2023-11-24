import ProjectCodeBox from "./ProjectCodeBox";
import SimpleCodeBox from "./SimpleCodeBox";
import HandyCollapse from "handy-collapse";

let initialized = false;

function initCodeBoxes() : void {
    if (initialized) {
        throw new Error("Code boxes are already initialized.");
    }
    const codeBoxElements : NodeListOf<HTMLElement> = document.querySelectorAll("[data-code-box], [data-project]");

    // let forNow: ProjectCodeBox;

    const createdProjectCodeBoxes = new Map<string, ProjectCodeBox>();
    const postponedCodeBoxElements: HTMLElement[] = [];

    codeBoxElements.forEach(codeBoxElement => {
        if (codeBoxElement.hasAttribute("data-project")) {
            let codeBox: ProjectCodeBox | undefined;
            if (codeBoxElement.dataset.projectExtends !== undefined) {
                if (createdProjectCodeBoxes.has(codeBoxElement.dataset.projectExtends)) {
                    codeBox = new ProjectCodeBox(codeBoxElement, createdProjectCodeBoxes.get(codeBoxElement.dataset.projectExtends));
                }
            } else {
                codeBox = new ProjectCodeBox(codeBoxElement);
            }

            if (codeBox) {
                createdProjectCodeBoxes.set(codeBox.getProjectId(), codeBox);
            } else {
                postponedCodeBoxElements.push(codeBoxElement);
            }
        } else {
            new SimpleCodeBox(codeBoxElement);
        }
    });

    let resolvedCount = 0;
    while (postponedCodeBoxElements.length > 0) {
        for (let i = 0; i < postponedCodeBoxElements.length; i++) {
            const codeBoxElement = postponedCodeBoxElements[i];

            if (codeBoxElement.dataset.projectExtends === undefined) throw new Error("Something went wrong when initializing code boxes.");

            if (createdProjectCodeBoxes.has(codeBoxElement.dataset.projectExtends)) {
                const codeBox = new ProjectCodeBox(codeBoxElement, createdProjectCodeBoxes.get(codeBoxElement.dataset.projectExtends));
                createdProjectCodeBoxes.set(codeBox.getProjectId(), codeBox);
                postponedCodeBoxElements.splice(i, 1);
                i--;
                resolvedCount++;
            }
        }

        if (resolvedCount === 0) break;
        resolvedCount = 0;
    }

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