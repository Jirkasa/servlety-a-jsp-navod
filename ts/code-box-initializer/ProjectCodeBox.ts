import CodeBox from "./CodeBox";
import CodeBoxCode from "./CodeBoxCode";
import CodeButton from "./CodeButton";
import CollapsibleContainer from "./CollapsibleContainer";
import CollapsibleContainerFactory from "./CollapsibleContainerFactory";
import MultiProjectCodeButton from "./MultiProjectCodeButton";
import ProjectCodeButton from "./ProjectCodeButton";
import SVGIconElementCreator from "./SVGIconElementCreator";

class ProjectCodeBox extends CodeBox {
    private static readonly CSS_CODE_BOX_MODIFIER_CLASS = "code-box--project";
    private static readonly CSS_PANEL_CLASS = "code-box-project-panel";
    private static readonly CSS_PANEL_OPENED_MODIFIER_CLASS = "code-box-project-panel--opened";
    private static readonly CSS_PANEL_CONTENT_CLASS = "code-box-project-panel__content";
    private static readonly CSS_PANEL_TOGGLE_BUTTON_CLASS = "code-box-project-panel__toggle-button";
    private static readonly CSS_PANEL_TOGGLE_BUTTON_OPENED_MODIFIER_CLASS = "code-box-project-panel__toggle-button--opened";
    private static readonly CSS_PANEL_HEADING_CLASS = "code-box-project-panel__heading";
    private static readonly CSS_PANEL_HORIZONTAL_RULE_CLASS = "code-box-project-panel__horizontal-rule";

    private static readonly PANEL_TOGGLE_BUTTON_ICON_NAME = "double-arrow-right";

    private static readonly PANEL_TOGGLE_BUTTON_TEXT = "Otevří/Zavřít boční panel";

    private static readonly occupiedProjectIds : Map<string, boolean> = new Map();

    private rootFolder : CollapsibleContainer;
    private folders : Map<string, CollapsibleContainer>;
    private defaultJavaPackage : CollapsibleContainer | null;
    private javaPackages : Map<string, CollapsibleContainer>; // todo - toto ještě nevím jak udělám, ono se ty balíčky tvoří automaticky a mělo by to být seřazené - řazení pořeším potom
    private panelElement : HTMLElement;
    private panelContentElement : HTMLElement;
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
        this.defaultJavaPackage = null;

        codeBoxElement.classList.add(ProjectCodeBox.CSS_CODE_BOX_MODIFIER_CLASS);

        this.panelElement = document.createElement("div");
        this.panelElement.classList.add(ProjectCodeBox.CSS_PANEL_CLASS);
        codeBoxElement.appendChild(this.panelElement);

        this.panelContentElement = document.createElement("div");
        this.panelContentElement.classList.add(ProjectCodeBox.CSS_PANEL_CONTENT_CLASS);
        this.panelElement.appendChild(this.panelContentElement);

        this.panelToggleButton = this.createPanelToggleButton();
        this.panelToggleButton.addEventListener("click", () => this.onPanelToggleButtonClick());

        const folderStructureHeading = document.createElement("h3");
        folderStructureHeading.classList.add(ProjectCodeBox.CSS_PANEL_HEADING_CLASS);
        folderStructureHeading.innerText = "Adresářová struktura";
        this.panelContentElement.appendChild(folderStructureHeading);

        this.rootFolder = CollapsibleContainerFactory.createProjectRoot(codeBoxElement.dataset.projectName || "unnamed", this.projectId);
        this.rootFolder.appendToElement(this.panelContentElement);
        this.createFoldersStructure(this.rootFolder);

        const horizontalRule = document.createElement("hr");
        horizontalRule.classList.add(ProjectCodeBox.CSS_PANEL_HORIZONTAL_RULE_CLASS);
        this.panelContentElement.appendChild(horizontalRule);

        const javaPackagesHeading = document.createElement("h3");
        javaPackagesHeading.classList.add(ProjectCodeBox.CSS_PANEL_HEADING_CLASS);
        javaPackagesHeading.innerText = "Java balíčky";
        this.panelContentElement.appendChild(javaPackagesHeading);

        this.init();

        this.sortJavaPackages();
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
        const javaPackage = codeElementDataset.javaPackage?.trim();
        const fileName = codeElementDataset.code;

        let javaPackageCollapsible;
        if (javaPackage !== undefined) {
            if (javaPackage.length > 0) {
                javaPackageCollapsible = this.javaPackages.get(javaPackage);
                if (!javaPackageCollapsible) {
                    javaPackageCollapsible = CollapsibleContainerFactory.createJavaPackage(javaPackage, this.projectId);
                    javaPackageCollapsible.appendToElement(this.panelContentElement);
                    this.javaPackages.set(javaPackage, javaPackageCollapsible);
                }
            } else {
                javaPackageCollapsible = this.defaultJavaPackage;
                if (!javaPackageCollapsible) {
                    javaPackageCollapsible = CollapsibleContainerFactory.createDefaultJavaPackage(this.projectId);
                    javaPackageCollapsible.appendToElement(this.panelContentElement);
                    this.defaultJavaPackage = javaPackageCollapsible;
                }
            }
            
            if (codeElementDataset.javaPackageOpened !== undefined) {
                javaPackageCollapsible.setAsOpenedOnInit();
            }
        }

        // potřebuju udělat tohle:
        /*
         - pokud má atribut javaPackage, tak umístit tlačítko i do packages části a vytvořit MultiProjectCodeButton
            - pokud nemá hodnotu, tak umístit do defaultního balíčku
            - pokud má hodnotu, tak umístit do požadovaného balíčku
         - pokud není folder atribut specifikovaný, tak se vezme automaticky podle balíčku
         - pokud je folder atribut specifikovaný, tak se tam to tlačítko umístí

         */

        let folderCollapsible;
        if (folderPath) {
            folderCollapsible = this.folders.get(folderPath);
            if (!folderCollapsible) folderCollapsible = this.rootFolder;
        } else {
            folderCollapsible = this.rootFolder;
        }

        if (javaPackageCollapsible) {
            return new MultiProjectCodeButton(fileName || "unnamed", [folderCollapsible.collapsibleElement, javaPackageCollapsible.collapsibleElement], codeBoxCode);
        } else {
            return new ProjectCodeButton(fileName || "unnamed", folderCollapsible.collapsibleElement, codeBoxCode);
        }
    }

    private sortJavaPackages() : void {
        const javaPackages: CollapsibleContainer[] = [];
        this.javaPackages.forEach(javaPackage => {
            javaPackages.push(javaPackage);
        });

        javaPackages.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name == b.name) return 0;
            return 1;
        });

        console.log(javaPackages);
        for (let javaPackage of javaPackages) {
            this.panelContentElement.appendChild(javaPackage.buttonElement);
            this.panelContentElement.appendChild(javaPackage.collapsibleElement);
        }
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

    private createFoldersStructure(rootCollapsible : CollapsibleContainer) : void {
        const foldersElement = this.codeBoxElement.querySelector("[data-project-folders]")!;

        this.createFoldersStructureTraverse(foldersElement as HTMLElement, rootCollapsible);
        foldersElement.remove();
    }

    private createFoldersStructureTraverse(ulElement: HTMLElement, parentCollapsible: CollapsibleContainer, parentFolderNames: string[] = []) { // todo - přejmenovat
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
                const folderPath = [...parentFolderNames, folderName].join("/");

                let openedOnInit = child instanceof HTMLElement && child.hasAttribute("data-opened");
                const folderCollapsible = CollapsibleContainerFactory.createFolder(folderName, folderPath, this.projectId, openedOnInit);
                folderCollapsible.appendToElement(parentCollapsible.collapsibleElement);

                this.folders.set(folderPath, folderCollapsible);

                if (childUlElement) {
                    this.createFoldersStructureTraverse(childUlElement, folderCollapsible, [...parentFolderNames, folderName]);
                }
            }
        }
    }
}

export default ProjectCodeBox;