interface TreeNode {
  name: string;
  id: string;
  isMaterial: boolean;
  parentId: string;
  file?: string;
  children?: TreeNode[];
}

export const getTreeFromList = (nodes: TreeNode[]) => {
  const map: { [id: string]: TreeNode } = {};
  const roots: TreeNode[] = [];

  // 将所有节点放入哈希表中，以便快速查找
  nodes.forEach((node) => {
    map[node.id] = { ...node, children: [] };
  });

  // 将子节点添加到它们的父节点中
  nodes.forEach((node) => {
    const parent = map[node.parentId];
    if (parent) {
      parent.children?.push(map[node.id]);
    } else {
      roots.push(map[node.id]);
    }
  });

  return roots;
};
