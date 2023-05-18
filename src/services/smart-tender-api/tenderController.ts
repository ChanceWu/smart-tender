// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 生成标书 POST /tender/create */
export async function createUsingPOST(body: API.Pinyin_4, options?: { [key: string]: any }) {
  return request<API.BaseResultString_>('/tender/create', {
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
  return request<API.BaseResult4>('/tender/detail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 列表 POST /tender/page */
export async function pageUsingPOST(body: API.Id_, options?: { [key: string]: any }) {
  return request<API.BaseResult_>('/tender/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
