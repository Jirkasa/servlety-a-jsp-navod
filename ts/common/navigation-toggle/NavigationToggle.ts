import Navigation from "./Navigation";

class NavigationToggle {
    private opened : boolean;
    private navigations : Array<Navigation>;
    private toggleButton : HTMLElement;
    private toggleButtonCheckedCSSClass : string;

    constructor(toggleButton : HTMLElement, toggleButtonCheckedCSSClass : string, navigations : Array<Navigation>) {
        this.opened = false;
        this.navigations = [];
        this.toggleButton = toggleButton;
        this.toggleButtonCheckedCSSClass = toggleButtonCheckedCSSClass;
        this.navigations = navigations;

        this.toggleButton.addEventListener("click", () => this.onToggleButtonClick());
    }

    private onToggleButtonClick() {
        this.opened = !this.opened;

        if (this.opened) {
            this.toggleButton.classList.add(this.toggleButtonCheckedCSSClass);
            for (let navigation of this.navigations) {
                navigation.open();
            }
        } else {
            this.toggleButton.classList.remove(this.toggleButtonCheckedCSSClass);
            for (let navigation of this.navigations) {
                navigation.close();
            }
        }
    }
}

export default NavigationToggle;