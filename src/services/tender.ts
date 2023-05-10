import { request } from 'umi';
import type { PaginationResult } from './types';

// 标书制作 目录列表
export async function queryTenderDirList() {
  return request<PaginationResult<TenderType.TenderDir>>(`/api/mock/tender/dirList`, {
    method: 'get',
  });
}
