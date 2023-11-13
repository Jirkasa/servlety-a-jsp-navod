import SimpleCodeBox from "./SimpleCodeBox";

function initCodeBoxes() : void {
    const codeBoxes : NodeListOf<HTMLElement> = document.querySelectorAll("[data-code-box]"); // potom brát v potaz i data-project atribute

    codeBoxes.forEach(codeBoxElement => {
        new SimpleCodeBox(codeBoxElement, codeBoxElement.hasAttribute("data-no-implicit-active"));
    });

    // todo - odstranit data attributy (ať se to neinicializuje znovu)
}

export default initCodeBoxes;