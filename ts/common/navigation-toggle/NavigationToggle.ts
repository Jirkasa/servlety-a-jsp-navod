import Navigation from "./Navigation";

/**
 * Manages navigation toggle functionality.
 */
class NavigationToggle {
    /** Determines whether navigations are opened. */
    private opened : boolean;
    /** Navigations controlled by toggle. */
    private navigations : Array<Navigation>;
    /** Toggle button. */
    private toggleButton : HTMLElement;
    /** CSS class that is added to toggle button when navigations are opened. */
    private toggleButtonCheckedCSSClass : string;

    /**
     * Creates new navigation toggle.
     * @param toggleButton Toggle button.
     * @param toggleButtonCheckedCSSClass CSS class to be added to toggle button when navigations are opened.
     * @param navigations Navigations to be controlled.
     */
    constructor(toggleButton : HTMLElement, toggleButtonCheckedCSSClass : string, navigations : Array<Navigation>) {
        this.opened = false;
        this.navigations = [];
        this.toggleButton = toggleButton;
        this.toggleButtonCheckedCSSClass = toggleButtonCheckedCSSClass;
        this.navigations = navigations;

        this.toggleButton.addEventListener("click", () => this.onToggleButtonClick());
    }

    /** Called when toggle button is clicked. */
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