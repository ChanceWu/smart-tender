type TreeNode = TenderType.TenderDirTreeNode;
export const getTreeFromList = (nodes: TenderType.TenderDir[]) => {
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

export const formatTreeData = (data: API.TreeNode2[]): MaterialType.CategoryTree[] => {
  return data.map(v => {
    return {
      ...v.t,
      children: v.children?.length ? formatTreeData(v.children) : [],
    }
  })
}

export const addLevelToTree = (treeData: MaterialType.CategoryTree[], level = 0): MaterialType.CategoryTree[] => {
  return treeData.map(node => {
    // 为当前节点添加 level 属性
    const currentNode = { ...node, level };

    // 如果当前节点有子节点，则递归处理子节点，并将子节点的 level 属性设置为当前节点的 level + 1
    if (currentNode.children && currentNode.children.length) {
      currentNode.children = addLevelToTree(currentNode.children, level + 1);
    }

    return currentNode;
  });
}
