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

export const formatTreeData = (data: API.TreeNodeTenderSourceCategoryDetailResp_[]): MaterialType.CategoryTree[] => {
  return data.map((v) => {
    return {
      ...v.t,
      children: v.children?.length ? formatTreeData(v.children) : [],
    };
  });
};

export const addLevelToTree = (
  treeData: MaterialType.CategoryTree[],
  level = 0,
): MaterialType.CategoryTree[] => {
  return treeData.map((node) => {
    // 为当前节点添加 level 属性
    const currentNode = { ...node, level };

    // 如果当前节点有子节点，则递归处理子节点，并将子节点的 level 属性设置为当前节点的 level + 1
    if (currentNode.children && currentNode.children.length) {
      currentNode.children = addLevelToTree(currentNode.children, level + 1);
    }

    return currentNode;
  });
};

export const getListFromTree = (
  nodes: TenderType.TenderDirTreeNode[],
  level: number,
): TenderType.TenderDir[] => {
  const list: TenderType.TenderDir[] = [];

  nodes.forEach((node) => {
    const item: TenderType.TenderDir = {
      name: node.name,
      id: node.id,
      sourceFlag: node.sourceFlag,
      parentId: node.parentId,
      level: level,
    };

    list.push(item);

    if (node.children.length > 0) {
      const childrenList = getListFromTree(node.children, level + 1);
      list.push(...childrenList);
    }
  });

  return list;
};

export const deleteTreeNode = (
  tree: TenderType.TenderDirTreeNode[],
  id: string,
): TenderType.TenderDirTreeNode[] => {
  return tree.filter((node) => {
    if (node.id === id) {
      // 当前节点匹配到要删除的节点，返回空数组表示删除
      return false;
    } else if (node.children) {
      // 递归删除子节点
      node.children = deleteTreeNode(node.children, id);
      return true;
    }
    return true;
  });
};

export const formatParamTenderToc = (data: TenderType.TenderDirTreeNode[]): API.TreeNode_G[] => {
  return data.map((v) => {
    const t = {
      tocName: v.name,
      sourceFlag: v.sourceFlag,
    }
    if (v.tenderSourceDto) { t['tenderSourceId'] = (v.tenderSourceDto as any).id }
    return {
      t,
      children: v.children?.length ? formatParamTenderToc(v.children) : [],
    };
  });
};