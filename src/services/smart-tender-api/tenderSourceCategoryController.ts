// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 全标签分类结构 GET /tender/source/category/all */
export async function allUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResultListTreeNode_>('/tender/source/category/all', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 保存 POST /tender/source/category/create */
export async function createUsingPOST1(
  body: API.TenderSourceCategoryCreateReq,
  options?: { [key: string]: any },
) {
  return request<API.BaseResult3>('/tender/source/category/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除 POST /tender/source/category/delete */
export async function deleteUsingPOST1(body: API.Id_, options?: { [key: string]: any }) {
  return request<API.BaseResultBoolean_>('/tender/source/category/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 父类下的分类列表 POST /tender/source/category/listByPid */
export async function listByPidUsingPOST(body: API.Id_, options?: { [key: string]: any }) {
  return request<API.BaseResultListTreeNode_>('/tender/source/category/listByPid', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改 POST /tender/source/category/update */
export async function updateUsingPOST1(body: API.Pinyin_7, options?: { [key: string]: any }) {
  return request<API.BaseResult3>('/tender/source/category/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
