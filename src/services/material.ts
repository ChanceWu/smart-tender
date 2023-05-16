import { request } from 'umi';
import type { PaginationResult } from './types';

// 素材库管理 目录列表
export async function queryMaterialList() {
  return request<PaginationResult<MaterialType.MaterialTree>>(`/api/mock/material/list`, {
    method: 'get',
  });
}
