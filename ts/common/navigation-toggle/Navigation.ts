class Navigation {
    private element : HTMLElement;
    private openedCSSClass : string;
    private buttons : NodeListOf<Element>;
    private mql : MediaQueryList;

    constructor(element : HTMLElement, openedCSSClass : string, mql : MediaQueryList) {
        this.element = element;
        this.openedCSSClass = openedCSSClass;

        this.buttons = element.querySelectorAll("a,button");

        this.mql = mql;
        mql.addEventListener("change", () => this.onMediaQueryListChange());
        this.updateTabIndices();
    }

    public open() : void {
        this.element.classList.add(this.openedCSSClass);
        this.updateTabIndices();
    }

    public close() : void {
        this.element.classList.remove(this.openedCSSClass);
        this.updateTabIndices();
    }

    public isOpened() : boolean {
        return this.element.classList.contains(this.openedCSSClass);
    }

    private onMediaQueryListChange() {
        this.updateTabIndices();
    }

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