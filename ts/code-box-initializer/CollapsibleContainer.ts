import SVGIconElementCreator from "./SVGIconElementCreator";

class CollapsibleContainer {
    private static CSS_ITEM_CLASS = "code-box-project-panel__item";
    private static CSS_ITEM_ARROW_ICON_CLASS = "code-box-project-panel__item-arrow-icon";
    private static CSS_ITEM_ICON_CLASS = "code-box-project-panel__item-icon";
    private static CSS_COLLAPSIBLE_CLASS = "code-box-project-panel__collapsible";
    private static CSS_COLLAPSIBLE_ACTIVE_CLASS = "is-active";

    private static ITEM_ARROW_ICON_NAME = "arrow-right";

    public readonly buttonElement: HTMLButtonElement;
    public readonly collapsibleElement: HTMLElement;
    private readonly nameElement: HTMLElement;

    constructor(iconName: string, name: string, collapsibleId: string, openedOnInit: boolean = false, cssIconModifierClass: string = "") {
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
        this.nameElement = document.createElement("span");
        this.nameElement.innerText = name;
        this.buttonElement.appendChild(this.nameElement);

        this.collapsibleElement = document.createElement("div");
        this.collapsibleElement.classList.add(CollapsibleContainer.CSS_COLLAPSIBLE_CLASS);

        if (openedOnInit) this.setAsOpenedOnInit();

        this.buttonElement.setAttribute("data-hc-control", collapsibleId);
        this.collapsibleElement.setAttribute("data-hc-content", collapsibleId);
    }

    public get name() : string {
        return this.nameElement.innerText;
    }

    public set name(newName: string) {
        this.nameElement.innerText = newName;
    }

    public setAsOpenedOnInit() : void {
        this.buttonElement.classList.add(CollapsibleContainer.CSS_COLLAPSIBLE_ACTIVE_CLASS);
        this.collapsibleElement.classList.add(CollapsibleContainer.CSS_COLLAPSIBLE_ACTIVE_CLASS);
    }

    public appendToElement(element: Element) : void {
        element.appendChild(this.buttonElement);
        element.appendChild(this.collapsibleElement);
    }

    public detachFromElement() : void {
        this.buttonElement.remove();
        this.collapsibleElement.remove();
    }

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