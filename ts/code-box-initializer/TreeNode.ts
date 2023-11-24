class TreeNode<T> {
    public value: T;
    public readonly children: TreeNode<T>[];

    constructor(value: T) {
        this.value = value;
        this.children = [];
    }

    public addChildren(node: TreeNode<T>) : void {
        this.children.push(node);
    }

    public findChildrenByValue(value: T) : TreeNode<T> | null { // todo - napsat že vrací první, který se najde s touto hodnotou
        for (let child of this.children) {
            if (child.value === value) return child;
        }
        return null;
    }
}

export default TreeNode;