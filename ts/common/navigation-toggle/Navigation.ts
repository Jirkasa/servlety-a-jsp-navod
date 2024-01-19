/**
 * Represents navigation.
 */
class Navigation {
    /** Navigation element. */
    private element : HTMLElement;
    /** CSS class that is added to navigation element when it should be opened. */
    private openedCSSClass : string;
    /** "button" and "a" elements inside navigation. */
    private buttons : NodeListOf<Element>;
    /** Media query list based on which is determined whether tab indices of buttons should be controlled. */
    private mql : MediaQueryList;

    /**
     * Creates new navigation.
     * @param element Navigation element.
     * @param openedCSSClass CSS class to be added to navigation element when it should be opened.
     * @param mql Media query list based on which should be determined whether tab indices of buttons should be controlled.
     */
    constructor(element : HTMLElement, openedCSSClass : string, mql : MediaQueryList) {
        this.element = element;
        this.openedCSSClass = openedCSSClass;

        this.buttons = element.querySelectorAll("a,button");

        this.mql = mql;
        mql.addEventListener("change", () => this.onMediaQueryListChange());
        this.updateTabIndices();
    }

    /** Opens navigation. */
    public open() : void {
        this.element.classList.add(this.openedCSSClass);
        this.updateTabIndices();
    }

    /** Closes navigation. */
    public close() : void {
        this.element.classList.remove(this.openedCSSClass);
        this.updateTabIndices();
    }

    /** Checks whether navigation is opened. */
    public isOpened() : boolean {
        return this.element.classList.contains(this.openedCSSClass);
    }

    /** Called when media query list is changed. */
    private onMediaQueryListChange() {
        this.updateTabIndices();
    }

    /** Updates tab indices of "button" and "a" elements inside navigation. */
    private updateTabIndices() {
        if (this.mql.matches && !this.isOpened()) {
            this.buttons.forEach(button => {
                button.setAttribute("tabindex", "-1");
            });
        } else {
            this.buttons.forEach(button => {
                button.removeAttribute("tabindex");
            });
        }
    }
}

export default Navigation;