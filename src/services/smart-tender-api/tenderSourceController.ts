// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 保存 POST /inter-api/tender/tender/source/create */
export async function createUsingPOST2(body: API.Pinyin_8, options?: { [key: string]: any }) {
  return request<API.BaseResultBoolean_>('/inter-api/tender/tender/source/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除 POST /inter-api/tender/tender/source/delete */
export async function deleteUsingPOST1(body: API.Id_, options?: { [key: string]: any }) {
  return request<API.BaseResultBoolean_>('/inter-api/tender/tender/source/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 详情 POST /inter-api/tender/tender/source/detail */
export async function detailUsingPOST(body: API.Id_, options?: { [key: string]: any }) {
  return request<API.BaseResult4>('/inter-api/tender/tender/source/detail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页列表 POST /inter-api/tender/tender/source/page */
export async function pageUsingPOST1(body: API.Pinyin_4, options?: { [key: string]: any }) {
  return request<API.BaseResult_>('/inter-api/tender/tender/source/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改 POST /inter-api/tender/tender/source/update */
export async function updateUsingPOST1(body: API.Pinyin__, options?: { [key: string]: any }) {
  return request<API.BaseResultBoolean_>('/inter-api/tender/tender/source/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
