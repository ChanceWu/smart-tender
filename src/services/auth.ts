import { request } from 'umi';
import type { PaginationResult } from './types';

// 验证ticket有效性
export async function checkTicket() {
  return request<any>(`/api/mock/material/list`, {
    method: 'post',
  });
}
