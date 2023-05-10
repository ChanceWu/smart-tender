import { request } from 'umi';
import type { PaginationResult } from './types';

// 标书制作 目录列表
export async function queryTenderDirList() {
  return request<PaginationResult<TenderType.TenderDir>>(`/api/mock/tender/dirList`, {
    method: 'get',
  });
}

// 标书制作 KMS目录列表
export async function queryTenderKMSDirList() {
  return request<PaginationResult<TenderType.KMSDirList>>(`/api/mock/tender/kmsDirList`, {
    method: 'get',
  });
}

// 标书制作 KMS素材列表
export async function queryTenderKMSList(params: TenderType.KMSListQueryParams) {
  return request<PaginationResult<TenderType.KMSList>>(`/api/mock/tender/kmsList`, {
    method: 'get',
    params,
  });
}
