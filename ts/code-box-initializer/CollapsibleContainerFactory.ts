import CollapsibleContainer from "./CollapsibleContainer";

/**
 * Factory for creation of instances of CollapsibleContainer class.
 */
class CollapsibleContainerFactory {
    /** CSS modifier class for folder collapsible container. */
    private static readonly CSS_ITEM_ICON_FOLDER_MODIFIER_CLASS = "code-box-project-panel__item-icon--folder";
    /** CSS modifier class for package collapsible container. */
    private static readonly CSS_ITEM_ICON_PACKAGE_MODIFIER_CLASS = "code-box-project-panel__item-icon--package";
    /** CSS modifier class for default package collapsible container. */
    private static readonly CSS_ITEM_ICON_DEFAULT_PACKAGE_MODIFIER_CLASS = "code-box-project-panel__item-icon--default-package";

    /** Name of icon for project root collapsible container. */
    private static readonly PROJECT_ITEM_ICON_NAME = "inventory";
    /** Name of icon for folder collapsible container. */
    private static readonly FOLDER_ITEM_ICON_NAME = "opened-folder";
    /** Name of icon for package collapsible container. */
    private static readonly PACKAGE_ITEM_ICON_NAME = "package";

    /**
     * Creates project root collapsible container.
     * @param name Project name.
     * @param projectId Project ID (to be used when creating unique identifier for collapsible).
     * @param openedOnInit Determines whether collapsible container should be created as opened.
     * @returns Created collapsible container.
     */
    public static createProjectRoot(name: string, projectId: string, openedOnInit: boolean = true) : CollapsibleContainer {
        return new CollapsibleContainer(
            CollapsibleContainerFactory.PROJECT_ITEM_ICON_NAME,
            name,
            `root_project_collapsible_${projectId}`,
            openedOnInit
        );
    }

    /**
     * Creates folder collapsible container.
     * @param name Folder name.
     * @param folderPath Folder path (to be used when creating unique identifier for collapsible).
     * @param projectId Project ID (to be used when creating unique identifier for collapsible).
     * @param openedOnInit Determines whether collapsible container should be created as opened.
     * @returns Created collapsible container.
     */
    public static createFolder(name: string, folderPath: string, projectId: string, openedOnInit: boolean = false) : CollapsibleContainer {
        return new CollapsibleContainer(
            CollapsibleContainerFactory.FOLDER_ITEM_ICON_NAME,
            name,
            `collapsible_id_${folderPath}_${projectId}`,
            openedOnInit,
            CollapsibleContainerFactory.CSS_ITEM_ICON_FOLDER_MODIFIER_CLASS
        );
    }

    /**
     * Creates java package collapsible container.
     * @param name Java package name.
     * @param projectId Project ID (to be used when creating unique identifier for collapsible).
     * @param openedOnInit Determines whether collapsible container should be created as opened.
     * @returns Created collapsible container.
     */
    public static createJavaPackage(name: string, projectId: string, openedOnInit: boolean = false) : CollapsibleContainer {
        return new CollapsibleContainer(
            CollapsibleContainerFactory.PACKAGE_ITEM_ICON_NAME,
            name,
            `collapsible_id_java_package_${name}_${projectId}`,
            openedOnInit,
            CollapsibleContainerFactory.CSS_ITEM_ICON_PACKAGE_MODIFIER_CLASS
        );
    }

    /**
     * Creates default java package collapsible container.
     * @param projectId Project ID (to be used when creating unique identifier for collapsible).
     * @param openedOnInit Determines whether collapsible container should be created as opened.
     * @returns Created collapsible container.
     */
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