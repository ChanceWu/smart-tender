// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 保存 POST /tender/create */
export async function createUsingPOST1(
  body: API.tenderCategoryCreateReq,
  options?: { [key: string]: any },
) {
  return request<API.BaseResultString_>('/tender/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除 POST /tender/delete */
export async function deleteUsingPOST1(body: API.Id_, options?: { [key: string]: any }) {
  return request<API.BaseResultBoolean_>('/tender/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 详情 POST /tender/detail */
export async function detailUsingPOST(body: API.Id_, options?: { [key: string]: any }) {
  return request<API.BaseResult_>('/tender/detail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 详情 POST /tender/list */
export async function listUsingPOST(body: API.Id_, options?: { [key: string]: any }) {
  return request<API.BaseResultList_>('/tender/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 详情 POST /tender/page */
export async function pageUsingPOST(body: API.Id_, options?: { [key: string]: any }) {
  return request<API.BaseResultPageResult_>('/tender/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改 POST /tender/update */
export async function updateUsingPOST1(
  body: API.tenderCategoryCreateReq,
  options?: { [key: string]: any },
) {
  return request<API.BaseResultBoolean_>('/tender/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
