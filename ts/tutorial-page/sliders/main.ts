import Splide from '@splidejs/splide';

Splide.defaults = {
    arrowPath: "M12.3 35.0166C13.1167 35.8333 14.4334 35.8333 15.25 35.0166L29.1 21.1666C29.2545 21.0124 29.3771 20.8293 29.4607 20.6277C29.5444 20.426 29.5874 20.2099 29.5874 19.9916C29.5874 19.7733 29.5444 19.5572 29.4607 19.3556C29.3771 19.154 29.2545 18.9708 29.1 18.8166L15.25 4.96663C14.4334 4.14996 13.1167 4.14996 12.3 4.96663C11.4834 5.78329 11.4834 7.09996 12.3 7.91663L24.3667 20L12.2834 32.0833C11.4834 32.8833 11.4834 34.2166 12.3 35.0166Z",
    lazyLoad: "nearby",
    preloadPages: 2
}

let initialized = false;

/**
 * Initializes sliders.
 */
function initSliders() : void {
    if (initialized) throw new Error("Code boxes are already initialized.");

    const sliders = document.querySelectorAll("[data-slider]");
    sliders.forEach(slider => {
        new Splide(slider as HTMLElement).mount();
    });

    initialized = true;
}

export default initSliders;