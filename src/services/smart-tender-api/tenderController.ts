// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 生成标书 POST /inter-api/tender/tender/create */
export async function createUsingPOST(body: API.Pinyin_7, options?: { [key: string]: any }) {
  return request<API.BaseResultString_>('/inter-api/tender/tender/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 生成标书通知 POST /inter-api/tender/tender/create/notice */
export async function createNoticeUsingPOST(body: API.Pinyin_9, options?: { [key: string]: any }) {
  return request<API.BaseResultBoolean_>('/inter-api/tender/tender/create/notice', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 我的标书列表 POST /inter-api/tender/tender/my/page */
export async function myPageUsingPOST(body: API.Pinyin_2, options?: { [key: string]: any }) {
  return request<API.BaseResult2>('/inter-api/tender/tender/my/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 列表 POST /inter-api/tender/tender/page */
export async function pageUsingPOST(body: API.Pinyin_3, options?: { [key: string]: any }) {
  return request<API.BaseResult2>('/inter-api/tender/tender/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
