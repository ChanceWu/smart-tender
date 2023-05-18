// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 保存 POST /tender/source/create */
export async function createUsingPOST2(body: API.Pinyin_5, options?: { [key: string]: any }) {
  return request<API.BaseResultBoolean_>('/tender/source/create', {
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
  return request<API.BaseResult3>('/tender/source/detail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页列表 POST /tender/source/page */
export async function pageUsingPOST1(body: API.Pinyin_2, options?: { [key: string]: any }) {
  return request<API.BaseResult_>('/tender/source/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改 POST /tender/source/update */
export async function updateUsingPOST2(body: API.Pinyin__, options?: { [key: string]: any }) {
  return request<API.BaseResultBoolean_>('/tender/source/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
