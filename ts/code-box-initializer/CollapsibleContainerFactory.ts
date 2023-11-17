import CollapsibleContainer from "./CollapsibleContainer";

class CollapsibleContainerFactory {
    private static readonly CSS_ITEM_ICON_FOLDER_MODIFIER_CLASS = "code-box-project-panel__item-icon--folder";
    private static readonly CSS_ITEM_ICON_PACKAGE_MODIFIER_CLASS = "code-box-project-panel__item-icon--package";
    private static readonly CSS_ITEM_ICON_DEFAULT_PACKAGE_MODIFIER_CLASS = "code-box-project-panel__item-icon--default-package";

    private static readonly PROJECT_ITEM_ICON_NAME = "inventory";
    private static readonly FOLDER_ITEM_ICON_NAME = "opened-folder";
    private static readonly PACKAGE_ITEM_ICON_NAME = "package";

    public static createProjectRoot(name: string, projectId: string, openedOnInit: boolean = true) : CollapsibleContainer {
        return new CollapsibleContainer(
            CollapsibleContainerFactory.PROJECT_ITEM_ICON_NAME,
            name,
            `root_project_collapsible_${projectId}`,
            openedOnInit
        );
    }

    public static createFolder(name: string, folderPath: string, projectId: string, openedOnInit: boolean = false) : CollapsibleContainer {
        return new CollapsibleContainer(
            CollapsibleContainerFactory.FOLDER_ITEM_ICON_NAME,
            name,
            `collapsible_id_${folderPath}_${projectId}`,
            openedOnInit,
            CollapsibleContainerFactory.CSS_ITEM_ICON_FOLDER_MODIFIER_CLASS
        );
    }

    public static createJavaPackage(name: string, projectId: string, openedOnInit: boolean = false) : CollapsibleContainer {
        return new CollapsibleContainer(
            CollapsibleContainerFactory.PACKAGE_ITEM_ICON_NAME,
            name,
            `collapsible_id_java_package_${name}_${projectId}`,
            openedOnInit,
            CollapsibleContainerFactory.CSS_ITEM_ICON_PACKAGE_MODIFIER_CLASS
        );
    }

    public static createDefaultJavaPackage(projectId: string, openedOnInit: boolean = false) : CollapsibleContainer {
        return new CollapsibleContainer(
            CollapsibleContainerFactory.PACKAGE_ITEM_ICON_NAME,
            "default",
            `collapsible_id_default_java_package_${projectId}`,
            openedOnInit,
            CollapsibleContainerFactory.CSS_ITEM_ICON_DEFAULT_PACKAGE_MODIFIER_CLASS
        );
    }
}

export default CollapsibleContainerFactory;