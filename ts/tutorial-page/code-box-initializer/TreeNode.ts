/**
 * Represents node of tree.
 */
class TreeNode<T> {
    /** Value of node. */
    public value: T;
    /** Child nodes of node. */
    public readonly children: TreeNode<T>[];

    /**
     * Creates new tree node.
     * @param value Value of node.
     */
    constructor(value: T) {
        this.value = value;
        this.children = [];
    }

    /**
     * Sets node as children of node.
     * @param node Node to be added as children.
     */
    public addChildren(node: TreeNode<T>) : void {
        this.children.push(node);
    }

    /**
     * Finds first child node that is found based on passed value.
     * @param value Value of node.
     * @returns Found node.
     */
    public findChildrenByValue(value: T) : TreeNode<T> | null {
        for (let child of this.children) {
            if (child.value === value) return child;
        }
        return null;
    }
}

export default TreeNode;