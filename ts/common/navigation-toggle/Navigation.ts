class Navigation {
    private element : HTMLElement;
    private openedCSSClass : string;
    private buttons : NodeListOf<Element>;

    constructor(element : HTMLElement, openedCSSClass : string) { // todo - předat i mql a budou se podle toho automaticky měnit tab indexy
        this.element = element;
        this.openedCSSClass = openedCSSClass;

        this.buttons = element.querySelectorAll("a,button");
    }

    public open() : void {
        this.element.classList.add(this.openedCSSClass);
    }

    public close() : void {
        this.element.classList.remove(this.openedCSSClass);
    }
}

export default Navigation;