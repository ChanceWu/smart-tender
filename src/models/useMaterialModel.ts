import { MaterialApi, TenderApi } from '@/services';
import { formatTreeData, getTreeFromList } from '@/utils/tender';
import { useState, useCallback, useEffect } from 'react';

export default function useMaterialModel() {
  const [dirList, setDirList] = useState<TenderType.TenderDir[]>([]);
  const [dirTree, setDirTree] = useState<TenderType.TenderDirTreeNode[]>([]);

  const [materialTree, setMaterialTree] = useState<MaterialType.MaterialTree[]>([]);

  const queryMaterialTree = useCallback(async () => {
    const { resultList } = await MaterialApi.queryMaterialList();
    // const { data = [] } = await allUsingGET();
    // const topDirList = formatTreeData(data);
    setMaterialTree(resultList);
  }, []);

  useEffect(() => {
    setDirTree(getTreeFromList(dirList));
  }, [dirList]);

  const delDir = useCallback(
    (id: string) => {
      const newDirList = dirList.filter((v) => v.id !== id);
      setDirList(newDirList);
    },
    [dirList],
  );

  const updateDir = useCallback(
    (d: TenderType.TenderDir) => {
      const newDirList = dirList.map((v) => {
        if (v.id !== d.id) return v;
        return { ...v, name: d.name };
      });
      setDirList(newDirList);
    },
    [dirList],
  );

  return {
    dirList,
    setDirList,
    delDir,
    updateDir,
    dirTree,
    setDirTree,
    materialTree,
    queryMaterialTree,
  };
}
