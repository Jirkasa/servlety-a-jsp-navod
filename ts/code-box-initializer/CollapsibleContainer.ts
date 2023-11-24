import SVGIconElementCreator from "./SVGIconElementCreator";

/**
 * Represents collapsible container.
 */
class CollapsibleContainer {
    /** CSS class for button element. */
    private static CSS_ITEM_CLASS = "code-box-project-panel__item";
    /** CSS class for arrow icon of button. */
    private static CSS_ITEM_ARROW_ICON_CLASS = "code-box-project-panel__item-arrow-icon";
    /** CSS class for icon of button. */
    private static CSS_ITEM_ICON_CLASS = "code-box-project-panel__item-icon";
    /** CSS class for collapsible element. */
    private static CSS_COLLAPSIBLE_CLASS = "code-box-project-panel__collapsible";
    /** CSS class to be used for collapsible when it should be opened. */
    private static CSS_COLLAPSIBLE_ACTIVE_CLASS = "is-active";

    /** Name of icon to be used for arrow icon. */
    private static ITEM_ARROW_ICON_NAME = "arrow-right";

    /** Button element of collapsible container. */
    public readonly buttonElement: HTMLButtonElement;
    /** Collapsible element of collapsible container. */
    public readonly collapsibleElement: HTMLElement;
    /** Element containing text of button. */
    private readonly nameElement: HTMLElement;

    /**
     * Creates new collapsible container.
     * @param iconName Name of icon to be used for button.
     * @param name Text to be displayed in button.
     * @param collapsibleId Unique identifier for collapsible functionality (this value should be unique for each collapsible on page).
     * @param openedOnInit Determines whether collapsible should be created as opened.
     * @param cssIconModifierClass CSS class to be added for icon of button.
     */
    constructor(iconName: string, name: string, collapsibleId: string, openedOnInit: boolean = false, cssIconModifierClass: string = "") {
        // create button
        this.buttonElement = document.createElement("button");
        this.buttonElement.classList.add(CollapsibleContainer.CSS_ITEM_CLASS);
        this.buttonElement.innerHTML = `
        <div class="${CollapsibleContainer.CSS_ITEM_ARROW_ICON_CLASS}">
            ${SVGIconElementCreator.create(CollapsibleContainer.ITEM_ARROW_ICON_NAME)}
        </div>
        <div class="${CollapsibleContainer.CSS_ITEM_ICON_CLASS} ${cssIconModifierClass}">
            ${SVGIconElementCreator.create(iconName)}
        </div>
        `;
        // create name element in button
        this.nameElement = document.createElement("span");
        this.nameElement.innerText = name;
        this.buttonElement.appendChild(this.nameElement);

        // create collapsible element
        this.collapsibleElement = document.createElement("div");
        this.collapsibleElement.classList.add(CollapsibleContainer.CSS_COLLAPSIBLE_CLASS);

        if (openedOnInit) this.setAsOpenedOnInit();

        // add attributes for collapsible functionality
        this.buttonElement.setAttribute("data-hc-control", collapsibleId);
        this.collapsibleElement.setAttribute("data-hc-content", collapsibleId);
    }

    /** Text of collapsible container button. */
    public get name() : string {
        return this.nameElement.innerText;
    }

    public set name(newName: string) {
        this.nameElement.innerText = newName;
    }

    /**
     * Sets that collapsible should be opened after collapsibles initialization.
     */
    public setAsOpenedOnInit() : void {
        this.buttonElement.classList.add(CollapsibleContainer.CSS_COLLAPSIBLE_ACTIVE_CLASS);
        this.collapsibleElement.classList.add(CollapsibleContainer.CSS_COLLAPSIBLE_ACTIVE_CLASS);
    }

    /**
     * Appends collapsible container to passed element.
     * @param element Element into which should be collapsible container appended.
     */
    public appendToElement(element: Element) : void {
        element.appendChild(this.buttonElement);
        element.appendChild(this.collapsibleElement);
    }

    /**
     * Detaches collapsible container from DOM.
     */
    public detachFromElement() : void {
        this.buttonElement.remove();
        this.collapsibleElement.remove();
    }

    /**
     * Sorts all file buttons located in container.
     */
    public sortFileButtons() : void {
        const buttons: HTMLElement[] = [];

        const children = this.collapsibleElement.children;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];

            if (child.tagName === "BUTTON" && (!child.nextElementSibling || child.nextElementSibling.tagName == "BUTTON")) {
                buttons.push(child as HTMLElement);
            }
        }

        buttons.sort((a, b) => {
            if (a.innerText.toLowerCase() < b.innerText.toLowerCase()) return -1;
            if (a.innerText.toLowerCase() == b.innerText.toLowerCase()) return 0;
            return 1;
        });

        for (let button of buttons) {
            this.collapsibleElement.appendChild(button);
        }
    }

    /**
     * Sorts all folders located in container.
     */
    public sortChildFolders() {
        const childFolders: {buttonElement: HTMLElement, collapsibleElement: HTMLElement}[] = [];

        const children = this.collapsibleElement.children;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];

            if (child.tagName === "BUTTON" && child.nextElementSibling && child.nextElementSibling.tagName == "DIV") {
                childFolders.push({
                    buttonElement: child as HTMLElement,
                    collapsibleElement: child.nextElementSibling as HTMLElement
                });
            }
        }

        childFolders.sort((a, b) => {
            if (a.buttonElement.innerText.toLowerCase() < b.buttonElement.innerText.toLowerCase()) return -1;
            if (a.buttonElement.innerText.toLowerCase() == b.buttonElement.innerText.toLowerCase()) return 0;
            return 1;
        });

        for (let folder of childFolders) {
            this.collapsibleElement.appendChild(folder.buttonElement);
            this.collapsibleElement.appendChild(folder.collapsibleElement);
        }
    }
}

export default CollapsibleContainer;