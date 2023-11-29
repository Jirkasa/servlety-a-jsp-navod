/**
 * Used for creation of HTML for svg icons.
 */
class SVGIconElementCreator {
    /** Path to root folder of web determined based on input element with ID PATH_TO_ROOT. */
    private static readonly PATH_TO_ROOT: string = (document.getElementById("PATH_TO_ROOT") as HTMLInputElement)?.value || "./";

    /**
     * Creates SVG icon HTML.
     * @param iconName Name of icon.
     * @returns HTML for svg icon.
     */
    public static create(iconName: string) {
        return `
        <svg>
            <use xlink:href="${SVGIconElementCreator.PATH_TO_ROOT}static/icon-sprite.svg#${iconName}"></use>
        </svg>
        `;
    }
}

export default SVGIconElementCreator;