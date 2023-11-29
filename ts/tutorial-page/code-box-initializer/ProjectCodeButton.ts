import CodeBoxCode from "./CodeBoxCode";
import ElementCodeButton from "./ElementCodeButton";
import SVGIconElementCreator from "./SVGIconElementCreator";

/**
 * Represents code button for project code box.
 */
class ProjectCodeButton extends ElementCodeButton {
    /** CSS class for button element. */
    private static readonly CSS_BUTTON_CLASS = "code-box-project-panel__item";
    /** CSS classes for button icon element. */
    private static readonly CSS_BUTTON_ICON_CLASSES = "code-box-project-panel__item-icon code-box-project-panel__item-icon--file";
    /** Name of icon for button. */
    private static readonly BUTTON_ICON_NAME = "file";

    protected readonly ACTIVE_CSS_CLASS = "code-box-project-panel__item--active";

    /**
     * Creates new project code button.
     * @param buttonText Text of button.
     * @param container Container into which should be appended created button element.
     * @param codeBoxCode Code box code with which should be code button associated.
     */
    constructor(buttonText: string, container: HTMLElement, codeBoxCode: CodeBoxCode) {
        super(buttonText, container, codeBoxCode);

        this.buttonElement.classList.add(ProjectCodeButton.CSS_BUTTON_CLASS);
        this.buttonElement.innerHTML = `
            <div class="${ProjectCodeButton.CSS_BUTTON_ICON_CLASSES}">
                ${SVGIconElementCreator.create(ProjectCodeButton.BUTTON_ICON_NAME)}
            </div>
            <span>${this.buttonElement.innerText}</span>
        `;
    }
}

export default ProjectCodeButton;