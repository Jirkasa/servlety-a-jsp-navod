/**
 * Represents sticky header. (Automatically adds/remove css class to/from element when element is/isn't fully visible in viewport.)
 */
class StickyHeader {
    /** Header element. */
    private headerElement: HTMLElement;
    /** CSS class that is added to header element when it is no longer fully visible in viewport. */
    private stickyCSSClass: string;

    /**
     * Creates new sticky header.
     * @param headerContainer Container of header (based on this element will be determined whether header element is fully visible in viewport).
     * @param headerElement Header element.
     * @param stickyCSSClass CSS class that should be added to header element when it is no longer fully visible.
     */
    constructor(headerContainer: HTMLElement, headerElement: HTMLElement, stickyCSSClass: string) {
        this.headerElement = headerElement;
        this.stickyCSSClass = stickyCSSClass;

        const observerOptions = {
            root: null, // intersection will be with viewport
            threshold: 0.99
        };

        // observe changes of intersection between header container and viewport
        const observer = new IntersectionObserver(entries => this.intersectionObserverCallback(entries), observerOptions);
        observer.observe(headerContainer);
    }

    /** Called when intersection between header container and viewport changes. */
    private intersectionObserverCallback([entry]: IntersectionObserverEntry[]) {
        if (!entry.isIntersecting) {
            this.headerElement.classList.add(this.stickyCSSClass);
        } else {
            this.headerElement.classList.remove(this.stickyCSSClass);
        }
    }
}

export default StickyHeader;