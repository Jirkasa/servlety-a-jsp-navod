import CodeBox from "./CodeBox";
import CodeBoxCode from "./CodeBoxCode";
import CodeButton from "./CodeButton";
import ProjectCodeButton from "./ProjectCodeButton";
import SVGIconElementCreator from "./SVGIconElementCreator";
import SimpleCodeButton from "./SimpleCodeButton";

class ProjectCodeBox extends CodeBox {
    private static readonly CSS_CODE_BOX_MODIFIER_CLASS = "code-box--project";
    private static readonly CSS_PANEL_CLASS = "code-box-project-panel";
    private static readonly CSS_PANEL_OPENED_MODIFIER_CLASS = "code-box-project-panel--opened";
    private static readonly CSS_PANEL_CONTENT_CLASS = "code-box-project-panel__content";
    private static readonly CSS_PANEL_TOGGLE_BUTTON_CLASS = "code-box-project-panel__toggle-button";
    private static readonly CSS_PANEL_TOGGLE_BUTTON_OPENED_MODIFIER_CLASS = "code-box-project-panel__toggle-button--opened";
    private static readonly CSS_PANEL_HEADING_CLASS = "code-box-project-panel__heading";
    private static readonly CSS_PANEL_ITEM_CLASS = "code-box-project-panel__item";
    private static readonly CSS_PANEL_ITEM_ARROW_ICON_CLASS = "code-box-project-panel__item-arrow-icon";
    private static readonly CSS_PANEL_ITEM_ICON_CLASS = "code-box-project-panel__item-icon";
    private static readonly CSS_PANEL_ITEM_ICON_FOLDER_MODIFIER_CLASS = "code-box-project-panel__item-icon--folder";
    private static readonly CSS_PANEL_COLLAPSIBLE_CLASS = "code-box-project-panel__collapsible";
    private static readonly CSS_COLLAPSIBLE_ACTIVE_CLASS = "is-active";
    private static readonly CSS_PANEL_HORIZONTAL_RULE_CLASS = "code-box-project-panel__horizontal-rule";

    private static readonly PANEL_TOGGLE_BUTTON_ICON_NAME = "double-arrow-right";
    private static readonly ITEM_ARROW_ICON_NAME = "arrow-right";
    private static readonly PROJECT_ITEM_ICON_NAME = "inventory";
    private static readonly FOLDER_ITEM_ICON_NAME = "opened-folder";

    private static readonly PANEL_TOGGLE_BUTTON_TEXT = "Otevří/Zavřít boční panel";

    private static readonly occupiedProjectIds : Map<string, boolean> = new Map();

    private folders : Map<string, HTMLElement>;
    private rootFolder : HTMLElement;
    private javaPackages : Map<string, HTMLElement>; // todo - toto ještě nevím jak udělám, ono se ty balíčky tvoří automaticky
    private panelElement : HTMLElement;
    private panelToggleButton : HTMLButtonElement;
    private projectId : string;

    constructor(codeBoxElement : HTMLElement) {
        super(codeBoxElement, true);

        const projectId = codeBoxElement.dataset.project;
        if (!projectId) {
            throw new Error("No project ID assigned.");
        }
        if (ProjectCodeBox.occupiedProjectIds.has(projectId)) {
            throw new Error("Project with this ID already exists.");
        }
        this.projectId = projectId;
        ProjectCodeBox.occupiedProjectIds.set(projectId, true);

        this.folders = new Map();
        this.javaPackages = new Map();

        codeBoxElement.classList.add(ProjectCodeBox.CSS_CODE_BOX_MODIFIER_CLASS);

        this.panelElement = document.createElement("div");
        this.panelElement.classList.add(ProjectCodeBox.CSS_PANEL_CLASS);
        codeBoxElement.appendChild(this.panelElement);

        const panelContent = document.createElement("div");
        panelContent.classList.add(ProjectCodeBox.CSS_PANEL_CONTENT_CLASS);
        this.panelElement.appendChild(panelContent);

        this.panelToggleButton = this.createPanelToggleButton();
        this.panelToggleButton.addEventListener("click", () => this.onPanelToggleButtonClick());

        const folderStructureHeading = document.createElement("h3");
        folderStructureHeading.classList.add(ProjectCodeBox.CSS_PANEL_HEADING_CLASS);
        folderStructureHeading.innerText = "Adresářová struktura";
        panelContent.appendChild(folderStructureHeading);

        this.rootFolder = this.createRootFolder(panelContent, codeBoxElement.dataset.projectName || "unnamed");
        this.createFoldersStructure(this.rootFolder);

        const horizontalRule = document.createElement("hr");
        horizontalRule.classList.add(ProjectCodeBox.CSS_PANEL_HORIZONTAL_RULE_CLASS);
        panelContent.appendChild(horizontalRule);

        const javaPackagesHeading = document.createElement("h3");
        javaPackagesHeading.classList.add(ProjectCodeBox.CSS_PANEL_HEADING_CLASS);
        javaPackagesHeading.innerText = "Java balíčky";
        panelContent.appendChild(javaPackagesHeading);

        this.init();
    }

    private onPanelToggleButtonClick() : void {
        this.panelToggleButton.classList.toggle(ProjectCodeBox.CSS_PANEL_TOGGLE_BUTTON_OPENED_MODIFIER_CLASS);
        this.panelElement.classList.toggle(ProjectCodeBox.CSS_PANEL_OPENED_MODIFIER_CLASS);
    }

    protected onDisplayedCodeChanged(): void {
        this.panelToggleButton.classList.remove(ProjectCodeBox.CSS_PANEL_TOGGLE_BUTTON_OPENED_MODIFIER_CLASS);
        this.panelElement.classList.remove(ProjectCodeBox.CSS_PANEL_OPENED_MODIFIER_CLASS);
    }

    protected createCodeButton(codeBoxCode: CodeBoxCode, codeElementDataset: DOMStringMap): CodeButton {
        const folderPath = codeElementDataset.folder;

        let container;
        if (folderPath) {
            container = this.folders.get(folderPath);
            if (!container) container = this.rootFolder;
        } else {
            container = this.rootFolder;
        }
        return new ProjectCodeButton(codeElementDataset.code || "unnamed", container, codeBoxCode);
    }

    private createPanelToggleButton() : HTMLButtonElement {
        const button = document.createElement("button");
        button.classList.add(ProjectCodeBox.CSS_PANEL_TOGGLE_BUTTON_CLASS);
        button.innerHTML = `
        ${ProjectCodeBox.PANEL_TOGGLE_BUTTON_TEXT}
        ${SVGIconElementCreator.create(ProjectCodeBox.PANEL_TOGGLE_BUTTON_ICON_NAME)}
        `;
        this.panelElement.appendChild(button);

        return button;
    }

    private createRootFolder(parentElement: HTMLElement, folderName: string) : HTMLElement {
        const button = document.createElement("button");
        button.classList.add(ProjectCodeBox.CSS_PANEL_ITEM_CLASS);
        button.innerHTML = `
        <div class="${ProjectCodeBox.CSS_PANEL_ITEM_ARROW_ICON_CLASS}">
            ${SVGIconElementCreator.create(ProjectCodeBox.ITEM_ARROW_ICON_NAME)}
        </div>
        <div class="${ProjectCodeBox.CSS_PANEL_ITEM_ICON_CLASS}">
            ${SVGIconElementCreator.create(ProjectCodeBox.PROJECT_ITEM_ICON_NAME)}
        </div>
        <span>${folderName}</span>
        `;
        parentElement.appendChild(button);

        const collapsible = document.createElement("div");
        collapsible.classList.add(ProjectCodeBox.CSS_PANEL_COLLAPSIBLE_CLASS, ProjectCodeBox.CSS_COLLAPSIBLE_ACTIVE_CLASS);
        parentElement.appendChild(collapsible);

        button.setAttribute("data-hc-control", `root_project_collapsible_${this.projectId}`);
        collapsible.setAttribute("data-hc-content", `root_project_collapsible_${this.projectId}`);

        return collapsible;
    }

    private createFoldersStructure(rootElement : HTMLElement) : void {
        const foldersElement = this.codeBoxElement.querySelector("[data-project-folders]")!;

        this.createFoldersStructureTraverse(foldersElement as HTMLElement, rootElement);
        foldersElement.remove();
    }

    private createFoldersStructureTraverse(ulElement: HTMLElement, parentElement: HTMLElement, parentFolderNames: string[] = []) { // todo - přejmenovat
        for (let i = 0; i < ulElement.children.length; i++) {
            let child = ulElement.children[i];

            if (child.tagName !== "LI") continue;

            let folderName;
            let childUlElement;
            child.childNodes.forEach(node => {
                if (node instanceof Text) {
                    let text = node.textContent?.trim();

                    if (text && text.length > 0) {
                        folderName = text;
                    }
                } else if (node instanceof Element && node.tagName === "UL") {
                    childUlElement = node;
                }
            });
            if (folderName) {
                const button = document.createElement("button");
                button.classList.add(ProjectCodeBox.CSS_PANEL_ITEM_CLASS);
                button.innerHTML = `
                <div class="${ProjectCodeBox.CSS_PANEL_ITEM_ARROW_ICON_CLASS}">
                    ${SVGIconElementCreator.create(ProjectCodeBox.ITEM_ARROW_ICON_NAME)}
                </div>
                <div class="${ProjectCodeBox.CSS_PANEL_ITEM_ICON_CLASS} ${ProjectCodeBox.CSS_PANEL_ITEM_ICON_FOLDER_MODIFIER_CLASS}">
                    ${SVGIconElementCreator.create(ProjectCodeBox.FOLDER_ITEM_ICON_NAME)}
                </div>
                <span>${folderName}</span>
                `;
                parentElement.appendChild(button);

                const collapsible = document.createElement("div");
                collapsible.classList.add(ProjectCodeBox.CSS_PANEL_COLLAPSIBLE_CLASS);
                if (child instanceof HTMLElement && child.hasAttribute("data-opened")) {
                    collapsible.classList.add(ProjectCodeBox.CSS_COLLAPSIBLE_ACTIVE_CLASS);
                }
                parentElement.appendChild(collapsible);
                
                const folderPath = [...parentFolderNames, folderName].join("/");

                button.setAttribute("data-hc-control", `collapsible_id_${folderPath}_${this.projectId}`);
                collapsible.setAttribute("data-hc-content", `collapsible_id_${folderPath}_${this.projectId}`);

                this.folders.set(folderPath, collapsible);

                if (childUlElement) {
                    this.createFoldersStructureTraverse(childUlElement, collapsible, [...parentFolderNames, folderName]);
                }
            }
        }
    }
}

export default ProjectCodeBox;