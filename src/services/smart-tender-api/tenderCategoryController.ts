// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 全标签分类结构 GET /tender/category/all */
export async function allUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResultListTreeNode_>('/tender/category/all', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 保存 POST /tender/category/create */
export async function createUsingPOST(
  body: API.tenderCategoryCreateReq,
  options?: { [key: string]: any },
) {
  return request<API.BaseResult_>('/tender/category/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除 POST /tender/category/delete */
export async function deleteUsingPOST(body: API.Id_, options?: { [key: string]: any }) {
  return request<API.BaseResultBoolean_>('/tender/category/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 父类下的分类列表 POST /tender/category/listByPid */
export async function listByPidUsingPOST(body: API.Id_, options?: { [key: string]: any }) {
  return request<API.BaseResultListTreeNode_>('/tender/category/listByPid', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改 POST /tender/category/update */
export async function updateUsingPOST(body: API.Pinyin__, options?: { [key: string]: any }) {
  return request<API.BaseResult_>('/tender/category/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
