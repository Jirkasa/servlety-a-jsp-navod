import ProjectCodeBox from "./ProjectCodeBox";
import SimpleCodeBox from "./SimpleCodeBox";
import HandyCollapse from "handy-collapse";

let initialized = false;

/**
 * Initializes code boxes.
 */
function initCodeBoxes() : void {
    if (initialized) throw new Error("Code boxes are already initialized.");

    // get all code box elements on page
    const codeBoxElements : NodeListOf<HTMLElement> = document.querySelectorAll("[data-code-box], [data-project]");

    const createdProjectCodeBoxes = new Map<string, ProjectCodeBox>();
    const postponedCodeBoxElements: HTMLElement[] = [];

    // create code boxes or postpone their creation for later
    codeBoxElements.forEach(codeBoxElement => {
        // create project|simple code box
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

    // create project code boxes which creation was postponed
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

    // initialize collapsibles
    new HandyCollapse({
        closeOthers: false,
        animationSpeed: 140,
        cssEasing: "linear"
    });

    initialized = true;
}

export default initCodeBoxes;