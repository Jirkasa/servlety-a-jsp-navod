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
        <span>${name}</span>
        `;
        // parentElement.appendChild(this.buttonElement);

        this.collapsibleElement = document.createElement("div");
        this.collapsibleElement.classList.add(CollapsibleContainer.CSS_COLLAPSIBLE_CLASS);

        if (openedOnInit) {
            this.buttonElement.classList.add(CollapsibleContainer.CSS_COLLAPSIBLE_ACTIVE_CLASS);
            this.collapsibleElement.classList.add(CollapsibleContainer.CSS_COLLAPSIBLE_ACTIVE_CLASS);
        }
        // parentElement.appendChild(collapsible);
        
        // const folderPath = [...parentFolderNames, folderName].join("/");

        this.buttonElement.setAttribute("data-hc-control", collapsibleId);
        this.collapsibleElement.setAttribute("data-hc-content", collapsibleId);
    }

    appendToElement(element: Element) {
        element.appendChild(this.buttonElement);
        element.appendChild(this.collapsibleElement);
    }
}

export default CollapsibleContainer;

// todo - na vytváření tady toho asi vytvořit factory, bude to lepší - nebo to můžou být static metody (factory method)
    // - static metody ne, nemáte to co vědět o těch CSS třídách