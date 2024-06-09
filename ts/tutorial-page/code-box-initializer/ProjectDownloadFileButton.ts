import AnchorElementFileButton from "./AnchorElementFileButton";
import SVGIconElementCreator from "./SVGIconElementCreator";

/**
 * Represents download file button for project code box.
 */
class ProjectDownloadFileButton extends AnchorElementFileButton {
    /** CSS class for button element. */
    private static readonly CSS_BUTTON_CLASS = "code-box-project-panel__item";
    /** CSS classes for button icon element. */
    private static readonly CSS_BUTTON_ICON_CLASSES = "code-box-project-panel__item-icon code-box-project-panel__item-icon--file";
    /** Name of icon for button. */
    private static readonly BUTTON_ICON_NAME = "file-2";
    /** CSS class for download icon. */
    private static readonly CSS_DOWNLOAD_ICON_CLASS = "code-box-project-panel__item-download-icon";
    /** Name of download icon. */
    private static readonly DOWNLOAD_ICON_NAME = "download";

    /**
     * @param buttonText Text of button.
     * @param link Link to resource that should be downloaded.
     * @param container Container into which should be appended created button.
     */
    constructor(buttonText: string, link: string, container: HTMLElement) {
        super(buttonText, link, container);

        this.buttonElement.classList.add(ProjectDownloadFileButton.CSS_BUTTON_CLASS);
        this.buttonElement.setAttribute("download", "");
        this.buttonElement.innerHTML = `
            <div class="${ProjectDownloadFileButton.CSS_BUTTON_ICON_CLASSES}">
                ${SVGIconElementCreator.create(ProjectDownloadFileButton.BUTTON_ICON_NAME)}
            </div>
            <span>${this.buttonElement.innerText}</span>
            <div class="${ProjectDownloadFileButton.CSS_DOWNLOAD_ICON_CLASS}">
                ${SVGIconElementCreator.create(ProjectDownloadFileButton.DOWNLOAD_ICON_NAME)}
            </div>
        `;
    }
}

export default ProjectDownloadFileButton;