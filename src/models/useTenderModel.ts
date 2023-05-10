import { TenderApi } from '@/services';
import { getTreeFromList } from '@/utils/tender';
import { useState, useCallback, useEffect } from 'react';

export default function useTenderModel() {
  const [dirList, setDirList] = useState<TenderType.TenderDir[]>([]);
  const [dirTree, setDirTree] = useState<TenderType.TenderDirTreeNode[]>([]);

  const [preFormat, setPreFormat] = useState<TenderType.PreFormat>();

  const [kmsDirList, setKMSDirList] = useState<TenderType.KMSDirList[]>([]);
  const [kmsList, setKMSList] = useState<TenderType.KMSList[]>([]);

  const queryTenderKMSDirList = useCallback(async () => {
    const { resultList } = await TenderApi.queryTenderKMSDirList();
    setKMSDirList(resultList);
  }, []);

  const queryTenderKMSList = useCallback(async (p: TenderType.KMSListQueryParams) => {
    const { resultList } = await TenderApi.queryTenderKMSList(p);
    setKMSList(resultList);
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
    preFormat,
    setPreFormat,
    kmsDirList,
    queryTenderKMSDirList,
    kmsList,
    queryTenderKMSList,
  };
}
