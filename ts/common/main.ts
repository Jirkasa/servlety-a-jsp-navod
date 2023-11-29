import StickyHeader from "./sticky-header/StickyHeader";

const CSS_STICKY_HEADER_CLASS = "header__container--fixed";

const headerContainer = document.getElementById("HeaderContainer");
const header = document.getElementById("Header");

if (headerContainer && header) {
    new StickyHeader(headerContainer, header, CSS_STICKY_HEADER_CLASS);
}