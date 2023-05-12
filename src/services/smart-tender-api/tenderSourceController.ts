// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 保存 POST /tender/source/create */
export async function createUsingPOST2(
  body: API.tenderCategoryCreateReq,
  options?: { [key: string]: any },
) {
  return request<API.BaseResultString_>('/tender/source/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除 POST /tender/source/delete */
export async function deleteUsingPOST2(body: API.Id_, options?: { [key: string]: any }) {
  return request<API.BaseResultBoolean_>('/tender/source/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 详情 POST /tender/source/detail */
export async function detailUsingPOST1(body: API.Id_, options?: { [key: string]: any }) {
  return request<API.BaseResult_>('/tender/source/detail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 详情 POST /tender/source/list */
export async function listUsingPOST1(body: API.Id_, options?: { [key: string]: any }) {
  return request<API.BaseResultList_>('/tender/source/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 详情 POST /tender/source/page */
export async function pageUsingPOST1(body: API.Id_, options?: { [key: string]: any }) {
  return request<API.BaseResultPageResult_>('/tender/source/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改 POST /tender/source/update */
export async function updateUsingPOST2(
  body: API.tenderCategoryCreateReq,
  options?: { [key: string]: any },
) {
  return request<API.BaseResultBoolean_>('/tender/source/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
