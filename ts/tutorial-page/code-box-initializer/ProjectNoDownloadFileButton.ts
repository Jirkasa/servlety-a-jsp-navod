import ButtonElementFileButton from "./ButtonElementFileButton";
import SVGIconElementCreator from "./SVGIconElementCreator";

/**
 * Represents file button for project code box (without download functionality).
 */
class ProjectNoDownloadFileButton extends ButtonElementFileButton {
    /** CSS class for button element. */
    private static readonly CSS_BUTTON_CLASS = "code-box-project-panel__item";
    /** CSS classes for button icon element. */
    private static readonly CSS_BUTTON_ICON_CLASSES = "code-box-project-panel__item-icon code-box-project-panel__item-icon--file";
    /** Name of icon for button. */
    private static readonly BUTTON_ICON_NAME = "file-2";

    /**
     * @param buttonText Text of button.
     * @param container Container into which should be appended created button.
     */
    constructor(buttonText: string, container: HTMLElement) {
        super(buttonText, container);

        this.buttonElement.classList.add(ProjectNoDownloadFileButton.CSS_BUTTON_CLASS);
        this.buttonElement.innerHTML = `
            <div class="${ProjectNoDownloadFileButton.CSS_BUTTON_ICON_CLASSES}">
                ${SVGIconElementCreator.create(ProjectNoDownloadFileButton.BUTTON_ICON_NAME)}
            </div>
            <span>${this.buttonElement.innerText}</span>
        `;
    }
}

export default ProjectNoDownloadFileButton;