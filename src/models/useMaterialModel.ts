import { MaterialApi, TenderApi } from '@/services';
import { uploadUsingPOST } from '@/services/smart-tender-api/fileController';
import {
  allUsingGET,
  createUsingPOST1,
  deleteUsingPOST1,
  listByPidUsingPOST,
  updateUsingPOST1,
} from '@/services/smart-tender-api/tenderSourceCategoryController';
import {
  createUsingPOST2,
  deleteUsingPOST2,
  pageUsingPOST1,
  updateUsingPOST2,
} from '@/services/smart-tender-api/tenderSourceController';
import { addLevelToTree, formatTreeData, getTreeFromList } from '@/utils/tender';
import { message } from 'antd';
import { useState, useCallback, useEffect } from 'react';

export default function useMaterialModel() {
  const [categoryTree, setCategoryTree] = useState<MaterialType.CategoryTree[]>([]);

  const [materialList, setMaterialList] = useState<API.Pinyin_7[]>([]);
  const [tabActiveKey, setTabActiveKey] = useState<number>();

  const queryCategoryTree = useCallback(async () => {
    // const { resultList } = await TenderApi.queryTenderKMSDirList();
    // const result = formatTreeData(resultList ?? []);
    // setCategoryTree(addLevelToTree(result));
    const { data } = await allUsingGET();
    const result = formatTreeData(data ?? []);
    setCategoryTree(addLevelToTree(result));
    setTabActiveKey(result?.[0]?.id);
  }, []);

  const queryCategoryTreeById = useCallback(async (id: number) => {
    // const { resultList } = await MaterialApi.queryMaterialList();
    const { data = [] } = await listByPidUsingPOST({ id });
    const result = formatTreeData(data);
    setCategoryTree(addLevelToTree(result));
  }, []);

  const addCategory = useCallback(async (p: API.TenderSourceCategoryCreateReq) => {
    try {
      const { code, msg } = await createUsingPOST1(p);
      if (code === 1) {
        message.success('修改成功！');
        queryCategoryTree();
      } else {
        message.error(msg);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const editCategory = useCallback(async (p: API.Pinyin_6) => {
    const { code, msg } = await updateUsingPOST1(p);
    if (code === 1) {
      message.success('修改成功！');
      queryCategoryTree();
    } else {
      message.error(msg);
    }
  }, []);

  const delCategory = useCallback(async (id: number) => {
    const { code, msg } = await deleteUsingPOST1({ id });
    if (code === 1) {
      message.success('删除成功！');
      queryCategoryTree();
    } else {
      message.error(msg);
    }
  }, []);

  const queryMaterialList = useCallback(async ({
    pageNumber = 1,
    pageSize = 10,
    categoryId,
    name,
  }: {
    pageNumber?: number;
    pageSize?: number;
    queryId?: number;
    categoryId?: number[];
    name?: string;
  }) => {
    // const { resultList } = await MaterialApi.queryMaterialList();
    // setMaterialList(resultList);
    let cateId;
    if (categoryId) {
      cateId =  categoryId?.[categoryId.length - 1];
    } else {
      cateId = tabActiveKey;
    }
    console.log('cateId', cateId)
    const res = await pageUsingPOST1({
      pageNumber: pageNumber,
      pageSize: pageSize,
      req: {
        categoryId: cateId,
        name,
      }
    });
    const { data, code, msg } = res || {};
    if (code === 1) {
      setMaterialList(data?.data || []);
    } else {
      message.error(msg);
    }
  }, [tabActiveKey]);

  const uploadResource = useCallback(async (file: File) => {
    const { data, code, msg } = await uploadUsingPOST({}, file);
    if (code === 1) {
      return data?.id;
    } else {
      message.error(msg);
    }
  }, []);

  const uploadFile = async (p: any[] = []) => {
    // const { resultList } = await MaterialApi.queryMaterialList();
    const req = p.map((v) => uploadUsingPOST({}, v.originFileObj));
    return Promise.all(req)
      .then((res) => {
        return res.map((v) => v.data!.id!);
      })
      .catch(() => {
        message.error('文件上传失败');
        return undefined;
      });
    // const { data, code, msg } = await uploadUsingPOST({}, p[0].originFileObj);
    // if (code === 1) {
    //   return data?.id;
    // } else {
    //   message.error(msg);
    // }
  };

  const addMaterial = useCallback(async (p: {
    categoryId: number;
    fileIdList?: File[];
    name?: string;
    typeCode?: string;
  }) => {
    try {
      const { fileIdList, ...rest } = p;
      const ids = fileIdList?.map((v: any) => v.response.id);
      if (!ids) return;
      const { code, msg } = await createUsingPOST2({ ...rest, fileIdList: ids });
      if (code === 1) {
        message.success('创建成功！');
        queryMaterialList({});
      } else {
        message.error(msg);
      }
    } catch (error) {
      console.error(error);
    }
  }, [tabActiveKey]);

  const editMaterial = useCallback(async (p: API.Pinyin__) => {
    try {
      const { fileIdList, ...rest } = p;
      const res = (fileIdList as any[]).map((v) => v.id);
      const { code, msg } = await updateUsingPOST2({ ...rest, fileIdList: res });
      // const { code, msg } = await updateUsingPOST2(p);
      if (code === 1) {
        message.success('修改成功！');
        queryMaterialList({});
      } else {
        message.error(msg);
      }
    } catch (error) {
      console.error(error);
    }
  }, [tabActiveKey]);

  const delMaterial = useCallback(async (p: API.Id_) => {
    try {
      const { code, msg } = await deleteUsingPOST2(p);
      if (code === 1) {
        message.success('删除成功！');
        queryMaterialList({});
      } else {
        message.error(msg);
      }
    } catch (error) {
      console.error(error);
    }
  }, [tabActiveKey]);

  return {
    categoryTree,
    queryCategoryTree,
    delCategory,
    addCategory,
    editCategory,
    queryCategoryTreeById,

    tabActiveKey,
    setTabActiveKey,
    materialList,
    queryMaterialList,
    addMaterial,
    editMaterial,
    delMaterial,
    uploadFile,
  };
}
