import AnchorElementFileButton from "./AnchorElementFileButton";
import SVGIconElementCreator from "./SVGIconElementCreator";

/**
 * Represents download file button for simple code box.
 */
class SimpleDownloadFileButton extends AnchorElementFileButton {
    /** CSS class for button element. */
    private static readonly CSS_BUTTON_CLASS = "code-box__file-button";
    /** Name of icon for button. */
    private static readonly BUTTON_ICON_NAME = "file-2";
    /** CSS class for download icon container. */
    private static readonly CSS_DOWNLOAD_ICON_CONTAINER_CLASS = "code-box__file-button-download-icon";
    /** Name of download icon. */
    private static readonly DOWNLOAD_ICON_NAME = "download";

    /**
     * @param buttonText Text of button.
     * @param link Link to resource that should be downloaded.
     * @param container Container into which should be appended created button.
     */
    constructor(buttonText: string, link: string, container: HTMLElement) {
        super(buttonText, link, container);

        this.buttonElement.classList.add(SimpleDownloadFileButton.CSS_BUTTON_CLASS);
        this.buttonElement.setAttribute("download", "");
        this.buttonElement.innerHTML = `
            ${SVGIconElementCreator.create(SimpleDownloadFileButton.BUTTON_ICON_NAME)}
            <span>${this.buttonElement.innerText}</span>
            <div class="${SimpleDownloadFileButton.CSS_DOWNLOAD_ICON_CONTAINER_CLASS}">
                ${SVGIconElementCreator.create(SimpleDownloadFileButton.DOWNLOAD_ICON_NAME)}
            </div>
        `;
    }
}

export default SimpleDownloadFileButton;