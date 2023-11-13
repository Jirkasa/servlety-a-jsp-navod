import CodeBoxCode from "./CodeBoxCode";
import ElementCodeButton from "./ElementCodeButton";

class ProjectCodeButton extends ElementCodeButton {
    private static readonly CSS_BUTTON_CLASS = "code-box-project-panel__item";
    private static readonly CSS_BUTTON_ICON_CLASSES = "code-box-project-panel__item-icon code-box-project-panel__item-icon--file";
    private static readonly BUTTON_ICON_NAME = "file";

    protected readonly ACTIVE_CSS_CLASS = "code-box-project-panel__item--active";

    constructor(buttonText: string, container: HTMLElement, codeBoxCode: CodeBoxCode) {
        super(buttonText, container, codeBoxCode);

        this.buttonElement.classList.add(ProjectCodeButton.CSS_BUTTON_CLASS);
        this.buttonElement.innerHTML = `
            <div class="${ProjectCodeButton.CSS_BUTTON_ICON_CLASSES}">
                <svg>
                    <use xlink:href="./static/icon-sprite.svg#${ProjectCodeButton.BUTTON_ICON_NAME}"></use>
                </svg>
            </div>
            <span>${this.buttonElement.innerText}</span>
        `;
    }
}

export default ProjectCodeButton;