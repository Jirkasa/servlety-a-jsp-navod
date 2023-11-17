class SVGIconElementCreator {
    private static readonly PATH_TO_ROOT: string = (document.getElementById("PATH_TO_ROOT") as HTMLInputElement)?.value || "./";

    public static create(iconName: string) {
        return `
        <svg>
            <use xlink:href="${SVGIconElementCreator.PATH_TO_ROOT}static/icon-sprite.svg#${iconName}"></use>
        </svg>
        `;
    }
}

export default SVGIconElementCreator;