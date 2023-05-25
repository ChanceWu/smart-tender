import { TenderApi } from '@/services';
import { createUsingGET } from '@/services/smart-tender-api/fileController';
import { reCreateUsingPOST, createUsingPOST } from '@/services/smart-tender-api/tenderController';
import { allUsingGET } from '@/services/smart-tender-api/tenderSourceCategoryController';
import { deleteTreeNode, formatParamTenderToc, formatTreeData, getListFromTree, getTreeFromList } from '@/utils/tender';
import { message } from 'antd';
import { useState, useCallback, useEffect } from 'react';

export default function useTenderModel() {
  const [dirList, setDirList] = useState<TenderType.TenderDir[]>([]);
  const [dirTree, setDirTree] = useState<TenderType.TenderDirTreeNode[]>([]);

  const [preFormat, setPreFormat] = useState<TenderType.PreFormat>();

  const [kmsDirList, setKMSDirList] = useState<TenderType.KMSDirList[]>([]);
  const [kmsList, setKMSList] = useState<TenderType.KMSList[]>([]);

  // 当前被选中的目录id
  const [selectedDirId, setSelectedDirId] = useState<string>();

  // 标书列表
  const [tenderList, setTenderList] = useState<TenderType.TenderItem[]>([]);

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
    async (p: TenderType.CreateTender) => {
      try {
        const formatData = formatParamTenderToc(dirTree);
        console.log(p, dirTree, formatData);
        // const { resultList } = await TenderApi.createTender({ ...p, tenderToc: formatData });
        const { msg } = await createUsingPOST({ ...p, tenderToc: formatData });
        message.success(msg)
      } catch (error) {
        console.error(error)
      }
    },
    [dirTree],
  );

  useEffect(() => {
    setDirTree(getTreeFromList(dirList));
  }, [dirList]);

  const delDir = useCallback(
    (id: string) => {
      const newDirTree = deleteTreeNode(dirTree, id);
      const newDirList = getListFromTree(newDirTree, 0);
      console.log(getListFromTree(newDirTree, 0));
      setDirList(newDirList);
    },
    [dirTree],
  );

  const addDir = useCallback(
    (d: TenderType.TenderDir) => {
      setDirList([...dirList, d]);
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

  const addMaterial2DirList = useCallback(
    (materials: API.Pinyin_13[]) => {
      const newLists = materials.map((v) => ({
        tenderSourceDto: v,
        name: v.name!,
        sourceFlag: true,
        id: Date.now() + '' + v.id!,
        parentId: selectedDirId!,
      }) as TenderType.TenderDir);
      setDirList((v) => [...v, ...newLists]);
    },
    [selectedDirId],
  );

  const queryTenderList = useCallback(async (p: TenderType.KMSListQueryParams) => {
    console.log(p);
    const { resultList } = await TenderApi.queryTenderList({});
    setTenderList(resultList);
  }, []);

  const downloadSource = useCallback((key: string) => {
    createUsingGET({ key });
  }, []);

  const reDownloadSource = useCallback((id: number) => {
    reCreateUsingPOST({ id });
  }, []);

  return {
    dirList,
    setDirList,
    delDir,
    addDir,
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

    selectedDirId,
    setSelectedDirId,
    addMaterial2DirList,

    tenderList,
    queryTenderList,
    downloadSource,
    reDownloadSource,
  };
}
