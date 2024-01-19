import Navigation from "./navigation-toggle/Navigation";
import NavigationToggle from "./navigation-toggle/NavigationToggle";
import StickyHeader from "./sticky-header/StickyHeader";

const CSS_STICKY_HEADER_CLASS = "header__container--fixed";
const CSS_NAVIGATION_TOGGLE_BUTTON_CHECKED_CLASS = "menu-toggle-button--checked";
const NAVIGATION_BREAKPOINT = "56.25em";
const CSS_HEADER_NAVIGATION_OPENED_CLASS = "header__navigation--opened";
const CSS_TUTORIAL_NAVIGATION_OPENED_CLASS = "tutorial-page-layout__navigation-side--opened";

function createStickyHeader() {
    const headerContainer = document.getElementById("HeaderContainer");
    const header = document.getElementById("Header");

    if (headerContainer && header) {
        new StickyHeader(headerContainer, header, CSS_STICKY_HEADER_CLASS);
    }
}

function createNavigationToggle() {
    const navigationToggleButton = document.getElementById("NavigationToggleButton") as HTMLElement;
    const headerNavigation = document.getElementById("HeaderNavigation") as HTMLElement;
    const tutorialNavigation = document.getElementById("TutorialNavigation") as HTMLElement;

    const mql = window.matchMedia(`(max-width: ${NAVIGATION_BREAKPOINT})`);

    const navigations : Array<Navigation> = [new Navigation(headerNavigation, CSS_HEADER_NAVIGATION_OPENED_CLASS, mql)];
    if (tutorialNavigation) {
        navigations.push(new Navigation(tutorialNavigation, CSS_TUTORIAL_NAVIGATION_OPENED_CLASS, mql));
    }

    if (headerNavigation && navigationToggleButton) {
        new NavigationToggle(navigationToggleButton, CSS_NAVIGATION_TOGGLE_BUTTON_CHECKED_CLASS, navigations);
    }
}

createStickyHeader();
createNavigationToggle();