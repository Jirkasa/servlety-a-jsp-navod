import ProjectCodeBox from "./ProjectCodeBox";
import SimpleCodeBox from "./SimpleCodeBox";
import HandyCollapse from "handy-collapse";

let initialized = false;

function initCodeBoxes() : void {
    if (initialized) {
        throw new Error("Code boxes are already initialized.");
    }
    const codeBoxes : NodeListOf<HTMLElement> = document.querySelectorAll("[data-code-box], [data-project]");

    codeBoxes.forEach(codeBoxElement => {
        if (codeBoxElement.hasAttribute("data-project")) {
            new ProjectCodeBox(codeBoxElement);
        } else {
            new SimpleCodeBox(codeBoxElement);
        }
    });

    const handyCollapse = new HandyCollapse({
        closeOthers: false,
        animationSpeed: 140,
        cssEasing: "linear"
    });

    initialized = true;
}

export default initCodeBoxes;