/**
 * Creates magnifier for image (container of image should have CSS property position set to relative or absolute).
 */
class Magnifier {
    /** Originial image that is being magnified. */
    private originalImage : HTMLImageElement;
    /** Element in which is image magnified. */
    private magnifiedImage : HTMLElement;
    /** Container of image that is being magnified. */
    private originalImageContainer : HTMLElement;
    /** Bounding rect for image container. */
    private originalImageContainerRect : DOMRect;
    /** Zoom. */
    private zoom : number;

    /** CSS class for magnifier element. */
    private static readonly CSS_CLASS = "magnifier";
    /** CSS class for magnifier element to be used when magnifier should be hidden. */
    private static readonly CSS_HIDDEN_CLASS = "magnifier--hidden";

    /**
     * Creates new magnifier.
     * @param image Image to be magnified.
     * @param zoom Zoom value.
     */
    constructor(image : HTMLImageElement, zoom : number = 2) {
        this.originalImage = image;
        this.zoom = zoom;

        if (this.originalImage.parentElement === null) throw new Error("Image does not have parent element.");
        this.originalImageContainer = this.originalImage.parentElement;
        this.originalImageContainerRect = this.originalImageContainer.getBoundingClientRect();

        // create element for image magnification
        this.magnifiedImage = document.createElement("div");
        this.magnifiedImage.classList.add(Magnifier.CSS_CLASS);
        this.magnifiedImage.classList.add(Magnifier.CSS_HIDDEN_CLASS);
        this.magnifiedImage.style.background = `url(${this.originalImage.src}) no-repeat #fff`;
        this.originalImageContainer.appendChild(this.magnifiedImage);

        // add event listeners
        this.originalImage.addEventListener("mousemove", e => this.onMouseMove(e));
        this.originalImage.addEventListener("mouseenter", () => this.onMouseEnter());
        this.originalImage.addEventListener("mouseleave", () => this.onMouseLeave());
        window.addEventListener("resize", () => this.onResize());
    }

    /**
     * Called when mouse is moved on image.
     * @param e Mouse event.
     */
    private onMouseMove(e : MouseEvent) {
        let w = this.magnifiedImage.offsetWidth / 2;
        let h = this.magnifiedImage.offsetHeight / 2;

        let x = e.x - this.originalImageContainerRect.left;
        let y = e.y - this.originalImageContainerRect.top;

        if (x > this.originalImage.width - (w / this.zoom)) {x = this.originalImage.width - (w / this.zoom);}
        if (x < w / this.zoom) {x = w / this.zoom;}
        if (y > this.originalImage.height - (h / this.zoom)) {y = this.originalImage.height - (h / this.zoom);}
        if (y < h / this.zoom) {y = h / this.zoom;}

        this.magnifiedImage.style.transform = `translate(${x}px, ${y}px)`;
        this.magnifiedImage.style.backgroundPosition = "-" + ((x * this.zoom) - w) + "px -" + ((y * this.zoom) - h) + "px";
    }

    /**
     * Called when mouse enters image.
     */
    private onMouseEnter() {
        this.magnifiedImage.classList.remove(Magnifier.CSS_HIDDEN_CLASS);
        this.magnifiedImage.style.backgroundSize = `${this.originalImage.offsetWidth * this.zoom}px ${this.originalImage.offsetHeight * this.zoom}px`
        this.originalImageContainerRect = this.originalImageContainer.getBoundingClientRect();
    }

    /**
     * Called when mouse leaves image.
     */
    private onMouseLeave() {
        this.magnifiedImage.classList.add(Magnifier.CSS_HIDDEN_CLASS);
    }

    /**
     * Called when viewport is resized.
     */
    private onResize() {
        this.originalImageContainerRect = this.originalImageContainer.getBoundingClientRect();
    }
}

export default Magnifier;