class Magnifier {
    private originalImage : HTMLImageElement;
    private magnifiedImage : HTMLElement;
    private originalImageContainer : HTMLElement;
    private originalImageContainerRect : DOMRect;
    private zoom : number;

    private static readonly CSS_CLASS = "magnifier";
    private static readonly CSS_HIDDEN_CLASS = "magnifier--hidden";

    constructor(image : HTMLImageElement, zoom : number = 2) {
        this.originalImage = image;
        this.zoom = zoom;

        if (this.originalImage.parentElement === null) throw new Error("Image does not have parent element.");
        this.originalImageContainer = this.originalImage.parentElement;
        this.originalImageContainerRect = this.originalImageContainer.getBoundingClientRect();

        this.magnifiedImage = document.createElement("div");
        this.magnifiedImage.classList.add(Magnifier.CSS_CLASS);
        this.magnifiedImage.classList.add(Magnifier.CSS_HIDDEN_CLASS);
        this.magnifiedImage.style.background = `url(${this.originalImage.src}) no-repeat #fff`;
        this.magnifiedImage.style.backgroundSize = `${this.originalImage.offsetWidth * zoom}px ${this.originalImage.offsetHeight * zoom}px`
        this.originalImageContainer.appendChild(this.magnifiedImage);

        this.originalImage.addEventListener("mousemove", e => this.onMouseMove(e));
        this.originalImage.addEventListener("mouseenter", () => this.onMouseEnter());
        this.originalImage.addEventListener("mouseleave", () => this.onMouseLeave());
        window.addEventListener("resize", () => this.onResize());
    }

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

    private onMouseEnter() {
        this.magnifiedImage.classList.remove(Magnifier.CSS_HIDDEN_CLASS);
        this.magnifiedImage.style.background = `url(${this.originalImage.src}) no-repeat #fff`;
        this.originalImageContainerRect = this.originalImageContainer.getBoundingClientRect();
    }

    private onMouseLeave() {
        this.magnifiedImage.classList.add(Magnifier.CSS_HIDDEN_CLASS);
    }

    private onResize() {
        this.originalImageContainerRect = this.originalImageContainer.getBoundingClientRect();
    }
}

export default Magnifier;