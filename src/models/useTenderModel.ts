import { TenderApi } from '@/services';
import { allUsingGET } from '@/services/smart-tender-api/tenderSourceCategoryController';
import { formatTreeData, getTreeFromList } from '@/utils/tender';
import { useState, useCallback, useEffect } from 'react';

export default function useTenderModel() {
  const [dirList, setDirList] = useState<TenderType.TenderDir[]>([]);
  const [dirTree, setDirTree] = useState<TenderType.TenderDirTreeNode[]>([]);

  const [preFormat, setPreFormat] = useState<TenderType.PreFormat>();

  const [kmsDirList, setKMSDirList] = useState<TenderType.KMSDirList[]>([]);
  const [kmsList, setKMSList] = useState<TenderType.KMSList[]>([]);

  const queryTenderKMSDirList = useCallback(async () => {
    // const { resultList } = await TenderApi.queryTenderKMSDirList();
    const { data = [] } = await allUsingGET();
    const topDirList = formatTreeData(data);
    setKMSDirList(topDirList);
  }, []);

  const queryTenderKMSList = useCallback(async (p: TenderType.KMSListQueryParams) => {
    const { resultList } = await TenderApi.queryTenderKMSList(p);
    setKMSList(resultList);
  }, []);

  const createTender = useCallback(
    async (p: TenderType.KMSListQueryParams) => {
      console.log(dirList);
      const { resultList } = await TenderApi.createTender();
    },
    [dirList],
  );

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
    createTender,
  };
}
