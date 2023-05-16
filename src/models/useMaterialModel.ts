import { MaterialApi, TenderApi } from '@/services';
import { uploadUsingPOST } from '@/services/smart-tender-api/fileController';
import { allUsingGET, createUsingPOST1, deleteUsingPOST1, listByPidUsingPOST, updateUsingPOST1 } from '@/services/smart-tender-api/tenderSourceCategoryController';
import { createUsingPOST2, deleteUsingPOST2, pageUsingPOST1, updateUsingPOST2 } from '@/services/smart-tender-api/tenderSourceController';
import { addLevelToTree, formatTreeData, getTreeFromList } from '@/utils/tender';
import { message } from 'antd';
import { useState, useCallback, useEffect } from 'react';

export default function useMaterialModel() {
  const [categoryTree, setCategoryTree] = useState<MaterialType.CategoryTree[]>([]);

  const [materialList, setMaterialList] = useState<API.Pinyin_7[]>([]);

  const queryCategoryTree = useCallback(async () => {
    // const { resultList } = await MaterialApi.queryMaterialList();
    const { data = [] } = await allUsingGET();
    const categoryTree = formatTreeData(data);
    setCategoryTree(addLevelToTree(categoryTree));
  }, []);

  const queryCategoryTreeById = useCallback(async (id: number) => {
    // const { resultList } = await MaterialApi.queryMaterialList();
    const { data = [] } = await listByPidUsingPOST({ id });
    const categoryTree = formatTreeData(data);
    setCategoryTree(addLevelToTree(categoryTree));
  }, []);

  const addCategory = useCallback(async (p: API.TenderSourceCategoryCreateReq) => {
    try {
      const { code, msg } = await createUsingPOST1(p);
      if (code === 1) {
        message.success('修改成功！')
        queryCategoryTree();
      } else {
        message.error(msg)
      }
    } catch (error) {
      console.error(error)
    }
  }, []);

  const editCategory = useCallback(async (p: API.Pinyin_6) => {
    const { code, msg } = await updateUsingPOST1(p);
    if (code === 1) {
      message.success('修改成功！')
      queryCategoryTree();
    } else {
      message.error(msg)
    }
  }, []);

  const delCategory = useCallback(async (id: number) => {
    const { code, msg } = await deleteUsingPOST1({ id });
    if (code === 1) {
      message.success('删除成功！')
      queryCategoryTree();
    } else {
      message.error(msg)
    }
  }, []);


  const queryMaterialList = useCallback(async (p: API.Pinyin_2) => {
    // const { resultList } = await MaterialApi.queryMaterialList();
    const { data, code, msg } = await pageUsingPOST1({ pageNumber: 1, pageSize: 10, ...p });
    if (code === 1) {
      setMaterialList(data?.data || []);
    } else {
      message.error(msg)
    }
  }, []);

  const uploadFile = async (p: any) => {
    // const { resultList } = await MaterialApi.queryMaterialList();
    const { data, code, msg } = await uploadUsingPOST({}, p[0].originFileObj);
    if (code === 1) {
      return data?.id;
    } else {
      message.error(msg);
      return -1;
    }
  };

  const addMaterial = useCallback(async (p: API.Pinyin_4) => {
    try {
      const { fileIdList, ...rest } = p;
      const res = await uploadFile(p.fileIdList);
      if (!res) return;
      const { code, msg } = await createUsingPOST2({ ...rest, fileIdList: [res] });
      if (code === 1) {
        message.success('创建成功！')
        queryMaterialList({});
      } else {
        message.error(msg)
      }
    } catch (error) {
      console.error(error)
    }
  }, []);

  const editMaterial = useCallback(async (p: API.Pinyin__) => {
    try {
      const { code, msg } = await updateUsingPOST2(p);
      if (code === 1) {
        message.success('修改成功！')
        queryMaterialList({});
      } else {
        message.error(msg)
      }
    } catch (error) {
      console.error(error)
    }
  }, []);

  const delMaterial = useCallback(async (p: API.Id_) => {
    try {
      const { code, msg } = await deleteUsingPOST2(p);
      if (code === 1) {
        message.success('删除成功！')
        queryMaterialList({});
      } else {
        message.error(msg)
      }
    } catch (error) {
      console.error(error)
    }
  }, []);

  return {
    categoryTree,
    queryCategoryTree,
    delCategory,
    addCategory,
    editCategory,
    queryCategoryTreeById,

    materialList,
    queryMaterialList,
    addMaterial,
    editMaterial,
    delMaterial,
    uploadFile,
  };
}
